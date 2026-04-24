// --- app.js ---
/* Settings functions below — T/appLang/t() declared at top of script */

function setTheme(theme){
  appTheme = theme;
  localStorage.setItem('remindTheme', theme);
  applyTheme();
  updateSettingsButtons();
}

function setLang(lang){
  appLang = lang;
  localStorage.setItem('remindLang', lang);
  applyTranslations();
  updateSettingsButtons();
  if(currentUser){
    if(currentUser.role !== 'admin'){
      setupTabsForRole(currentUser.role);
      renderSchedule(); renderHomework();
      renderAnnouncements(); renderResources(); renderClassroomPulse();
      if(currentUser.role === 'siswa') renderProgress();
    } else {
      setupTabsForRole('admin');
      renderAdminPanel();
    }
  } else {
    // Update login page dynamic elements
    selectRole(document.getElementById('role').value);
  }
}

function applyTheme(){
  document.body.classList.toggle('light', appTheme === 'light');
}

function applyTranslations(){
  // Login page
  const sub = document.getElementById('loginSubtitle');
  if(sub) sub.textContent = t('loginSubtitle');
  const lb = document.getElementById('loginBtn');
  if(lb) lb.textContent = t('btnLogin');
  document.querySelectorAll('.role-pill').forEach(p => {
    const role = p.dataset.role;
    if(role === 'siswa') p.textContent = t('roleSiswa');
    if(role === 'guru')  p.textContent = t('roleGuru');
    if(role === 'admin') p.textContent = t('roleAdmin');
  });
  const lc = document.querySelector('label[for="classSelect"]');
  const la = document.querySelector('label[for="absentSelect"]');
  const lp = document.querySelector('label[for="password"]');
  if(lc) lc.textContent = t('labelClass');
  if(la) la.textContent = t('labelAbsen');
  if(lp) lp.textContent = t('labelPwd');
  if(classSelect?.options[0])  classSelect.options[0].textContent  = t('phClass');
  if(absentSelect?.options[0]) absentSelect.options[0].textContent = t('phAbsen');
  // Nav
  const fb = document.getElementById('feedbackNavBtn');
  if(fb) fb.textContent = t('btnFeedback');
  const lo = document.getElementById('logoutBtn');
  if(lo) lo.textContent = t('btnLogout');
  // Settings panel
  const sp = document.getElementById('settingsPanelTitle');
  if(sp) sp.textContent = t('settingsTitle');
  const tl = document.getElementById('stThemeLabel');
  if(tl) tl.textContent = t('themeLabel');
  const ll = document.getElementById('stLangLabel');
  if(ll) ll.textContent = t('langLabel');
  const td = document.getElementById('togDark');
  if(td) td.textContent = t('themeDark');
  const tlt = document.getElementById('togLight');
  if(tlt) tlt.textContent = t('themeLight');
}

function updateSettingsButtons(){
  const togDark  = document.getElementById('togDark');
  const togLight = document.getElementById('togLight');
  const togID    = document.getElementById('togID');
  const togEN    = document.getElementById('togEN');
  if(togDark)  togDark.classList.toggle('active',  appTheme === 'dark');
  if(togLight) togLight.classList.toggle('active', appTheme === 'light');
  if(togID)    togID.classList.toggle('active', appLang === 'id');
  if(togEN)    togEN.classList.toggle('active', appLang === 'en');
}

function toggleSettingsPanel(){
  const panel = document.getElementById('settingsPanel');
  if(panel) panel.classList.toggle('hidden');
}

// Close settings panel when clicking outside
document.addEventListener('click', (e)=>{
  const panel = document.getElementById('settingsPanel');
  if(!panel || panel.classList.contains('hidden')) return;
  const ids = ['settingsNavBtn','authSettingsBtn','settingsPanel'];
  const inside = ids.some(id=>{ const el=document.getElementById(id); return el && el.contains(e.target); });
  if(!inside) panel.classList.add('hidden');
});

// ── Init ──
(async function() {
  try {
    if (window.syncInitialData) {
      await window.syncInitialData();
      if (window.reloadState) window.reloadState();
    }
  } catch(e) {
    console.error("Supabase sync failed:", e);
  }

  applyTheme();
  applyTranslations();
  updateSettingsButtons();
  applyAccent();
  buildColorPicker();
  pomoRender();

  /* ── Init role UI OR Restore Session ── */
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    const role = currentUser.role;
    
    document.getElementById("authPage").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    updateNavUser();
    setupTabsForRole(role);

    if(role === "guru"){
      document.getElementById("editPanel").classList.remove("hidden");
      document.getElementById("homeworkEditor").classList.remove("hidden");
      document.getElementById("announcementEditor").classList.remove("hidden");
      document.getElementById("resourceEditor").classList.remove("hidden");
    }

    const hpw = document.getElementById("hubPulseWrap");
    if(hpw) hpw.classList.toggle("hidden", role !== "guru");

    document.getElementById("feedbackNavBtn").classList.remove("hidden");
    document.getElementById("redirectUrl").value = window.location.href;

    if(role === "admin"){
      renderAdminPanel();
    } else {
      ensureClassData(currentUser.kelas);
      migrateLegacyData(currentUser.kelas);
      renderSchedule();
      renderHomework();
      if(role === "siswa"){
        renderProgress();
        renderXpChart();
        renderNotes();
        renderSubmissionHistory();
        const fab = document.getElementById('pomoFab');
        if(fab) fab.classList.add('visible');
        const tog = document.getElementById('schedViewToggle');
        if(tog) tog.style.display = 'flex';
      }
      renderAnnouncements();
      renderResources();
      renderClassroomPulse();
      renderLeaderboard();
      updateNotificationDots();
    }
  } else {
    selectRole("siswa");
  }
})();