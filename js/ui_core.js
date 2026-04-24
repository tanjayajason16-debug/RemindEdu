// --- ui_core.js ---
/* ── DOM refs ── */
const classSelect  = document.getElementById("classSelect");
const absentSelect = document.getElementById("absentSelect");

function populateClassOptions(el, blank){
  if(!el) return;
  el.innerHTML = "";
  if(blank){ const o=document.createElement("option"); o.value=""; o.textContent="— Pilih Kelas —"; el.appendChild(o); }
  classes.forEach(c=>{ const o=document.createElement("option"); o.value=c; o.textContent=c; el.appendChild(o); });
}
function populateAbsentOptions(el){
  if(!el) return;
  el.innerHTML = "";
  const o=document.createElement("option"); o.value=""; o.textContent="— Pilih Absen —"; el.appendChild(o);
  for(let i=1;i<=31;i++){ const opt=document.createElement("option"); opt.value=String(i); opt.textContent=String(i); el.appendChild(opt); }
}
populateClassOptions(classSelect, true);
populateAbsentOptions(absentSelect);

/* ── Role pill selector ── */
function selectRole(role){
  document.getElementById("role").value = role;
  document.querySelectorAll(".role-pill").forEach(p => p.classList.toggle("active", p.dataset.role === role));

  const cw = document.getElementById("classSelectWrap");
  const aw = document.getElementById("absentSelectWrap");
  if(role === "admin"){
    cw.classList.add("hidden"); aw.classList.add("hidden");
  } else if(role === "guru"){
    cw.classList.remove("hidden"); aw.classList.add("hidden");
  } else {
    cw.classList.remove("hidden"); aw.classList.remove("hidden");
  }
}

/* ── Tab management ── */
function getRoleTabs(role){
  const tabs = {
    admin: [
      {id:"admin-students", label:t('tabAdminSiswa')},
      {id:"admin-teachers", label:t('tabAdminGuru')},
      {id:"admin-view",     label:t('tabAdminView')}
    ],
    guru: [
      {id:"assignments", label:t('tabAssign')},
      {id:"schedule",    label:t('tabJadwal')},
      {id:"hub",         label:t('tabHub')}
    ],
    siswa: [
      {id:"overview",    label:t('tabHome')},
      {id:"assignments", label:t('tabTugas')},
      {id:"schedule",    label:t('tabJadwal')},
      {id:"hub",         label:t('tabHub')},
      {id:"notes",       label:t('tabNotes')}
    ]
  };
  return tabs[role] || tabs.siswa;
}

function showDashTab(tabId){
  document.querySelectorAll(".tab-pane").forEach(p => p.classList.add("hidden"));
  document.querySelectorAll(".nav-tab, .mob-tab").forEach(t => t.classList.remove("active"));

  const pane = document.getElementById("pane-" + tabId);
  if(pane) pane.classList.remove("hidden");

  document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(t => t.classList.add("active"));

  // Lazy render for specific panes
  if(tabId === 'notes')    renderNotes();
  if(tabId === 'hub')      renderLeaderboard();
  if(tabId === 'overview') { renderXpChart(); }
  if(tabId === 'schedule') {
    const isS = currentUser && currentUser.role === 'siswa';
    const tog  = document.getElementById('schedViewToggle');
    if(tog) tog.style.display = isS ? 'flex' : 'none';
  }
}

function setupTabsForRole(role){
  const tabs = getRoleTabs(role);
  const navTabs   = document.getElementById("navTabs");
  const mobBar    = document.getElementById("mobileTabs");
  navTabs.innerHTML = "";
  mobBar.innerHTML  = "";

  tabs.forEach((t, i) => {
    // desktop
    const btn = document.createElement("button");
    btn.className  = "nav-tab" + (i===0?" active":"");
    btn.textContent = t.label;
    btn.dataset.tab = t.id;
    btn.setAttribute("role", "tab");
    btn.onclick = () => showDashTab(t.id);
    navTabs.appendChild(btn);
    // mobile
    const mb = document.createElement("button");
    mb.className  = "mob-tab" + (i===0?" active":"");
    mb.textContent = t.label;
    mb.dataset.tab = t.id;
    mb.setAttribute("role", "tab");
    mb.onclick = () => showDashTab(t.id);
    mobBar.appendChild(mb);
  });

  showDashTab(tabs[0].id);
}

/* ── Nav user chip ── */
function updateNavUser(){
  const chip   = document.getElementById("navUserChip");
  const nameEl = document.getElementById("navUserName");
  const avEl   = document.getElementById("navAvatar");
  const badge  = document.getElementById("roleBadge");

  chip.style.display = "flex";

  if(currentUser.role === "admin"){
    nameEl.textContent = t('adminLabel');
    badge.textContent  = "ADMIN";
    badge.className    = "badge badge-danger";
    avEl.src = "profileempty.jpg.jpeg";
  } else if(currentUser.role === "guru"){
    const rawName = studentProfiles[currentUser.kelas]?.name;
    nameEl.textContent = rawName ? rawName : (t('guruLabel') + " " + currentUser.kelas);
    badge.textContent  = "GURU";
    badge.className    = "badge badge-success";
    avEl.src = "profileempty.jpg.jpeg";
  } else {
    const key = getStudentKey();
    nameEl.textContent = getStudentDisplayName(key);
    badge.textContent  = "SISWA";
    badge.className    = "badge badge-primary";
    avEl.src = getStudentPhoto(key);
  }
}

/* ── Auth helpers ── */
function showAuthMessage(text, type="error", duration=2500){
  const el = document.getElementById("message");
  if(!el) return alert(text);
  el.textContent = text;
  el.className   = `message ${type} show`;
  setTimeout(()=>el.classList.remove("show"), duration);
}

