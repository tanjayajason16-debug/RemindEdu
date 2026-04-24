/* ── Constants ── */
const classes = [
  "7A","7B","7C","7D","7E","7F",
  "8A","8B","8C","8D","8E","8F",
  "9A","9B","9C","9D","9E","9F"
];
const defaultPasswordSiswa = "siswa123";
const defaultPasswordGuru  = "guru123";
const defaultPasswordAdmin = "admin123";

/* ══ Settings state (must be declared before any render function uses t()) ══ */
let appLang  = localStorage.getItem('remindLang')  || 'id';
let appTheme = localStorage.getItem('remindTheme') || 'dark';

const T = {
  id: {
    loginSubtitle:'SMP Karangturi — Platform Kelas Digital',
    btnLogin:'Masuk →', btnLogout:'Keluar', btnFeedback:'💬 Saran',
    roleSiswa:'👤 Siswa', roleGuru:'👨‍🏫 Guru', roleAdmin:'🔑 Admin',
    labelClass:'KELAS', labelAbsen:'NOMOR ABSEN', labelPwd:'PASSWORD',
    phClass:'— Pilih Kelas —', phAbsen:'— Pilih Absen —',
    tabHome:'🏠 Home', tabTugas:'📚 Tugas', tabJadwal:'📅 Jadwal', tabHub:'🏫 Hub', tabNotes:'🗒️ Catatan',
    tabAssign:'📚 Assignments',
    tabAdminSiswa:'👤 Siswa', tabAdminGuru:'👨‍🏫 Guru', tabAdminView:'👁 View As',
    settingsTitle:'⚙ Pengaturan', themeLabel:'Tema', langLabel:'Bahasa', colorLabel:'Warna',
    themeDark:'🌙 Gelap', themeLight:'☀️ Terang',
    errPilihKelas:'Pilih kelas terlebih dahulu!',
    errPilihAbsen:'Pilih nomor absen!',
    errPwdSalah:'Password salah!',
    errPwdGuru:'Password guru salah!',
    errPwdAdmin:'Password admin salah!',
    errLoginOk:'Login berhasil!',
    noStreak:'Streak 0 hari', streakFmt:'🔥 Streak {n} hari',
    noBadge:'Belum ada badge',
    xpFmt:'{cur} / 100 XP → Level {next}',
    hwStatFmt:'{done}/{total} selesai',
    btnKirim:'Kirim', btnKirimUlang:'Kirim Ulang',
    btnMenunggu:'Menunggu…', btnDisetujui:'✓ Disetujui',
    btnExpired:'Expired', btnHapus:'Hapus', btnEdit:'Edit',
    btnSetujui:'✓ Setujui', btnTolak:'✕ Tolak',
    noApproval:'Tidak ada permintaan.',
    thMapel:'Mata Pelajaran', thTanggal:'Tanggal', thAksi:'Aksi',
    thJudul:'Judul', thDeadline:'Deadline',
    noAnnounce:'Belum ada pengumuman.',
    noResource:'Belum ada materi.',
    noNotes:'Belum ada catatan. Tambahkan catatan pertamamu!',
    addNote:'Tambah Catatan', editNote:'Edit Catatan',
    lbTitle:'🏆 Leaderboard Kelas', lbEmpty:'Belum ada data XP.',
    lbYou:' (Kamu)',
    chartTitle:'📈 Aktivitas XP — 7 Hari',
    historyTitle:'📋 Riwayat Pengumpulan', historyEmpty:'Belum ada riwayat.',
    pomoFocus:'🎯 Fokus Belajar', pomoBreak:'☕ Istirahat',
    pomoBtnStart:'Start', pomoBtnPause:'Pause',
    pomoSessions:'Sesi',
    calMonths:'Januari,Februari,Maret,April,Mei,Juni,Juli,Agustus,September,Oktober,November,Desember',
    calDays:'Min,Sen,Sel,Rab,Kam,Jum,Sab',
    statTugasSiswa:'Tugas Selesai', statStreak:'Streak',
    statUlangan:'Ulangan Terdekat', statPengumuman:'Pengumuman',
    statTugasGuru:'Assignments Dibuat', statMenungguGuru:'Menunggu Persetujuan',
    statMateriGuru:'Materi', statJadwalGuru:'Jadwal Ulangan',
    adminLabel:'Administrator', guruLabel:'Guru – Kelas',
    badgeExplorer:'⭐ Explorer', badgeAchiever:'🏅 Achiever', badgeMaster:'👑 Master',
    pwdMinLength:'Password minimal 4 karakter.',
    pwdNotMatch:'Password tidak sama.',
    pwdUpdated:'Password berhasil diperbarui.'
  },
  en: {
    loginSubtitle:'SMP Karangturi — Digital Classroom Platform',
    btnLogin:'Sign In →', btnLogout:'Logout', btnFeedback:'💬 Feedback',
    roleSiswa:'👤 Student', roleGuru:'👨‍🏫 Teacher', roleAdmin:'🔑 Admin',
    labelClass:'CLASS', labelAbsen:'STUDENT NO.', labelPwd:'PASSWORD',
    phClass:'— Select Class —', phAbsen:'— Select Number —',
    tabHome:'🏠 Home', tabTugas:'📚 Tasks', tabJadwal:'📅 Schedule', tabHub:'🏫 Hub',
    tabAssign:'📚 Assignments',
    tabAdminSiswa:'👤 Students', tabAdminGuru:'👨‍🏫 Teachers', tabAdminView:'👁 View As',
    settingsTitle:'⚙ Settings', themeLabel:'Theme', langLabel:'Language',
    themeDark:'🌙 Dark', themeLight:'☀️ Light',
    errPilihKelas:'Please select a class!',
    errPilihAbsen:'Please select your student number!',
    errPwdSalah:'Incorrect password!',
    errPwdGuru:'Incorrect teacher password!',
    errPwdAdmin:'Incorrect admin password!',
    errLoginOk:'Login successful!',
    noStreak:'Streak 0 days', streakFmt:'🔥 Streak {n} days',
    noBadge:'No badge yet',
    xpFmt:'{cur} / 100 XP → Level {next}',
    hwStatFmt:'{done}/{total} done',
    btnKirim:'Submit', btnKirimUlang:'Resubmit',
    btnMenunggu:'Pending…', btnDisetujui:'✓ Approved',
    btnExpired:'Expired', btnHapus:'Delete', btnEdit:'Edit',
    btnSetujui:'✓ Approve', btnTolak:'✕ Decline',
    noApproval:'No pending requests.',
    thMapel:'Subject', thTanggal:'Date', thAksi:'Action',
    thJudul:'Title', thDeadline:'Deadline',
    noAnnounce:'No announcements yet.',
    noResource:'No materials yet.',
    noNotes:'No notes yet. Add your first note!',
    addNote:'Add Note', editNote:'Edit Note',
    lbTitle:'🏆 Class Leaderboard', lbEmpty:'No XP data yet.',
    lbYou:' (You)',
    chartTitle:'📈 XP Activity — Last 7 Days',
    historyTitle:'📋 Submission History', historyEmpty:'No history yet.',
    pomoFocus:'🎯 Focus Time', pomoBreak:'☕ Break',
    pomoBtnStart:'Start', pomoBtnPause:'Pause',
    pomoSessions:'Sessions',
    calMonths:'January,February,March,April,May,June,July,August,September,October,November,December',
    calDays:'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    statTugasSiswa:'Tasks Done', statStreak:'Streak',
    statUlangan:'Next Quiz', statPengumuman:'Announcements',
    statTugasGuru:'Assignments Created', statMenungguGuru:'Pending Approval',
    statMateriGuru:'Materials', statJadwalGuru:'Quiz Schedule',
    adminLabel:'Administrator', guruLabel:'Teacher – Class',
    badgeExplorer:'⭐ Explorer', badgeAchiever:'🏅 Achiever', badgeMaster:'👑 Master',
    pwdMinLength:'Password must be at least 4 characters.',
    pwdNotMatch:'Passwords do not match.',
    pwdUpdated:'Password updated successfully.'
  }
};

function t(key, vars={}){
  let str = (T[appLang] && T[appLang][key]) ? T[appLang][key] : (T.id[key] || key);
  Object.keys(vars).forEach(k => { str = str.replace('{'+k+'}', vars[k]); });
  return str;
}

/* ══ State ══ */
let currentUser  = null;
let adminViewMode = false;

/* ── Persisted data ── */
let schedules          = JSON.parse(localStorage.getItem("schedules"))          || {};
let homeworks          = JSON.parse(localStorage.getItem("homeworks"))          || {};
let homeworkSubmissions= JSON.parse(localStorage.getItem("homeworkSubmissions"))|| {};
let homeworkDone       = JSON.parse(localStorage.getItem("homeworkDone"))       || {};
let announcements      = JSON.parse(localStorage.getItem("announcements"))      || {};
let resources          = JSON.parse(localStorage.getItem("resources"))          || {};
let progress           = JSON.parse(localStorage.getItem("progress"))           || {};
let studentProfiles    = JSON.parse(localStorage.getItem("studentProfiles"))    || {};
let studentPasswords   = JSON.parse(localStorage.getItem("studentPasswords"))   || {};
let teacherPasswords   = JSON.parse(localStorage.getItem("teacherPasswords"))   || {};

/* ── Seed default schedules ── */
classes.forEach(c => {
  if(!schedules[c]){
    schedules[c] = [
      {mapel:"Matematika",      tanggal:"12 Februari"},
      {mapel:"IPA",             tanggal:"15 Februari"},
      {mapel:"Bahasa Indonesia",tanggal:"18 Februari"}
    ];
  }
});

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
    btn.onclick = () => showDashTab(t.id);
    navTabs.appendChild(btn);
    // mobile
    const mb = document.createElement("button");
    mb.className  = "mob-tab" + (i===0?" active":"");
    mb.textContent = t.label;
    mb.dataset.tab = t.id;
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
    nameEl.textContent = t('guruLabel') + " " + currentUser.kelas;
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

/* ── Login ── */
document.getElementById("login-form").addEventListener("submit", e=>{ e.preventDefault(); login(); });

function login(){
  try{
    const role  = document.getElementById("role").value;
    const kelas = classSelect ? classSelect.value : "";
    const pass  = document.getElementById("password").value;
    const absen = absentSelect ? absentSelect.value : "";

    if(role !== "admin" && !kelas) return showAuthMessage(t('errPilihKelas'));
    if(role === "siswa" && !absen)  return showAuthMessage(t('errPilihAbsen'));

    if(role === "siswa"){
      const studentKey = `${kelas}-${absen}`;
      const expected   = studentPasswords[studentKey] || defaultPasswordSiswa;
      if(pass !== expected) return showAuthMessage(t('errPwdSalah'));
      currentUser = {role, kelas, absen};
      if(progress[kelas] && !progress[studentKey]){
        progress[studentKey] = progress[kelas];
        delete progress[kelas];
      }
      ensureStudentProgress(studentKey);
    } else if(role === "guru"){
      const expected = teacherPasswords[kelas] || defaultPasswordGuru;
      if(pass !== expected) return showAuthMessage(t('errPwdGuru'));
      currentUser = {role, kelas};
    } else {
      if(pass !== defaultPasswordAdmin) return showAuthMessage(t('errPwdAdmin'));
      currentUser = {role, kelas:""};
    }

    showAuthMessage(t('errLoginOk'), "success", 900);

    setTimeout(()=>{
      document.getElementById("authPage").classList.add("hidden");
      document.getElementById("dashboard").classList.remove("hidden");

      updateNavUser();
      setupTabsForRole(role);

      // Show teacher editors
      if(role === "guru"){
        document.getElementById("editPanel").classList.remove("hidden");
        document.getElementById("homeworkEditor").classList.remove("hidden");
        document.getElementById("announcementEditor").classList.remove("hidden");
        document.getElementById("resourceEditor").classList.remove("hidden");
      }

      // Pulse section for guru is inside hub pane
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
          // Show Pomodoro FAB
          const fab = document.getElementById('pomoFab');
          if(fab) fab.classList.add('visible');
          // Show schedule toggle
          const tog = document.getElementById('schedViewToggle');
          if(tog) tog.style.display = 'flex';
        }
        renderAnnouncements();
        renderResources();
        renderClassroomPulse();
        renderLeaderboard();
        updateNotificationDots();
      }
    }, 500);

  } catch(err){
    showAuthMessage("Terjadi error saat login.");
    console.error(err);
  }
}

/* ── Utility ── */
function genId(){
  return "id" + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
}
function todayStr(){
  return new Date().toISOString().slice(0,10);
}
function addDays(dateStr, days){
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0,10);
}
function formatDate(dateStr){
  if(!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if(Number.isNaN(d.getTime())) return "";
  const day  = d.toLocaleDateString("id-ID",{weekday:"long"});
  const part = d.toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"});
  return `${day}, ${part}`;
}
function isYesterday(dateStr){
  if(!dateStr) return false;
  const d = new Date(dateStr+"T00:00:00");
  const y = new Date(); y.setHours(0,0,0,0); y.setDate(y.getDate()-1);
  return d.toDateString()===y.toDateString();
}
function isOnOrBefore(a,b){
  return new Date(a+"T00:00:00") <= new Date(b+"T00:00:00");
}
function nextWeekdayDate(dayName){
  const map={senin:1,selasa:2,rabu:3,kamis:4,jumat:5,sabtu:6,minggu:0};
  const key=(dayName||"").toLowerCase().trim();
  if(!(key in map)) return "";
  const today=new Date(); today.setHours(0,0,0,0);
  const diff=(map[key]-today.getDay()+7)%7||7;
  const d=new Date(today); d.setDate(today.getDate()+diff);
  return d.toISOString().slice(0,10);
}
function daysBetween(a,b){
  return Math.max(0,Math.floor((new Date(b+"T00:00:00")-new Date(a+"T00:00:00"))/86400000));
}
function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

/* ── Student helpers ── */
function getStudentKey(){
  if(!currentUser||currentUser.role!=="siswa") return "";
  return `${currentUser.kelas}-${currentUser.absen}`;
}
function parseStudentKey(k){
  if(!k) return {kelas:"",absen:""};
  const p=k.split("-");
  return {kelas:p[0]||"",absen:p[1]||""};
}
function getStudentDisplayName(sk){
  if(!sk) return "";
  if(studentProfiles[sk]?.name) return studentProfiles[sk].name;
  const i=parseStudentKey(sk);
  return `User${i.kelas}${i.absen}`;
}
function getStudentPhoto(sk){
  if(studentProfiles[sk]?.photo) return studentProfiles[sk].photo;
  return "profileempty.jpg.jpeg";
}
function updateProfilePic(){
  const src = getStudentPhoto(getStudentKey());
  const navAv = document.getElementById("navAvatar");
  if(navAv) navAv.src = src;
  const pic = document.getElementById("profilePic");
  if(pic){ pic.src=src; }
}

/* ── Data helpers ── */
function ensureClassData(kelas){
  if(!kelas) return;
  const base = todayStr();
  if(!homeworks[kelas]){
    homeworks[kelas] = [
      {id:genId(),title:"Rangkuman Bab 2",due:"",desc:"Ringkas 1 halaman",createdAt:base,dueDate:addDays(base,3)},
      {id:genId(),title:"Latihan Soal IPA",due:"",desc:"Nomor 1-10",createdAt:base,dueDate:addDays(base,5)}
    ];
  } else {
    homeworks[kelas].forEach(item=>{
      if(!item.dueDate&&item.due){
        const nxt=nextWeekdayDate(item.due);
        if(nxt){ item.dueDate=nxt; item.due=""; }
        else { const p=Date.parse(item.due); if(!isNaN(p)){ item.dueDate=new Date(p).toISOString().slice(0,10); item.due=""; } }
      }
    });
  }
  if(!homeworkSubmissions[kelas]) homeworkSubmissions[kelas]={};
  if(!announcements[kelas]) announcements[kelas]=[
    {text:"Ulangan Matematika pekan depan.",date:"Info kelas"},
    {text:"Bawa buku catatan lengkap.",date:"Pengingat"}
  ];
  if(!resources[kelas]) resources[kelas]=[
    {title:"Ringkasan IPA",url:"https://example.com"},
    {title:"Latihan Bahasa Indonesia",url:"https://example.com"}
  ];
}

function migrateLegacyData(kelas){
  if(!kelas) return;
  if(homeworkDone?.[kelas]){
    Object.keys(homeworkDone[kelas]).forEach(id=>{
      if(homeworkDone[kelas][id]){
        if(!homeworkSubmissions[kelas][id]) homeworkSubmissions[kelas][id]={};
        if(!homeworkSubmissions[kelas][id].legacy){
          homeworkSubmissions[kelas][id].legacy={status:"approved",completedAt:todayStr(),approvedAt:todayStr()};
        }
      }
    });
  }
  if(progress[kelas]?.lastDoneDate && !progress[kelas].lastApprovedDate){
    progress[kelas].lastApprovedDate = progress[kelas].lastDoneDate;
    delete progress[kelas].lastDoneDate;
  }
  if(progress[kelas] && !progress[kelas].lastOnTimeDate) progress[kelas].lastOnTimeDate="";
}

function ensureStudentProgress(sk){
  if(!sk) return null;
  if(!progress[sk]) progress[sk]={xp:0,level:1,streak:0,lastApprovedDate:"",lastOnTimeDate:""};
  return progress[sk];
}

/* ── Schedule ── */
function renderSchedule(){
  const thead = document.querySelector("#scheduleTable thead");
  const tbody = document.querySelector("#scheduleTable tbody");
  if(!thead||!tbody) return;

  const isGuru = currentUser.role==="guru";
  thead.innerHTML = isGuru
    ? `<tr><th>${t('thMapel')}</th><th>${t('thTanggal')}</th><th>${t('thAksi')}</th></tr>`
    : `<tr><th>${t('thMapel')}</th><th>${t('thTanggal')}</th></tr>`;
  tbody.innerHTML = "";

  const kelas = currentUser.kelas;
  if(!schedules[kelas]||!Array.isArray(schedules[kelas])) schedules[kelas]=[];

  schedules[kelas].forEach((item,index)=>{
    const tr = document.createElement("tr");
    const mapel = item?.mapel||"-";
    let tanggal = item?.tanggal||"-";
    if(tanggal!=="-"){ const p=Date.parse(tanggal); if(!isNaN(p)) tanggal=formatDate(new Date(p).toISOString().slice(0,10)); }

    tr.innerHTML = isGuru
      ? `<td>${mapel}</td><td>${tanggal}</td><td><button onclick="deleteSchedule('${kelas}',${index})" class="btn-delete">${t('btnHapus')}</button></td>`
      : `<td>${mapel}</td><td>${tanggal}</td>`;
    tbody.appendChild(tr);
  });
  localStorage.setItem("schedules",JSON.stringify(schedules));
}
function addSchedule(){
  const mapel   = document.getElementById("newMapel").value.trim();
  const tanggal = document.getElementById("newTanggal").value.trim();
  if(!mapel||!tanggal) return;
  schedules[currentUser.kelas].push({mapel,tanggal});
  document.getElementById("newMapel").value="";
  document.getElementById("newTanggal").value="";
  renderSchedule();
}
function deleteSchedule(kelas,index){
  schedules[kelas].splice(index,1);
  renderSchedule();
}

/* ── Homework ── */
function renderHomework(){
  const thead = document.querySelector("#homeworkTable thead");
  const tbody = document.querySelector("#homeworkTable tbody");
  const stats = document.getElementById("homeworkStats");
  const approvalPanel = document.getElementById("approvalPanel");
  if(!thead||!tbody) return;

  thead.innerHTML=`<tr><th>${t('thJudul')}</th><th>${t('thDeadline')}</th><th>${t('thAksi')}</th></tr>`;
  tbody.innerHTML="";

  const kelas = currentUser.kelas;
  ensureClassData(kelas);
  migrateLegacyData(kelas);
  autoApproveSubmissions(kelas);
  updateStreakForOverdue(kelas);

  const studentKey = getStudentKey();
  const today      = todayStr();

  const sorted = [...homeworks[kelas]].sort((a,b)=>{
    const ae = a.dueDate ? new Date(a.dueDate+"T00:00:00")<new Date(today+"T00:00:00") : false;
    const be = b.dueDate ? new Date(b.dueDate+"T00:00:00")<new Date(today+"T00:00:00") : false;
    if(ae!==be) return ae?1:-1;
    return 0;
  });

  sorted.forEach(item=>{
    const tr = document.createElement("tr");
    if(!homeworkSubmissions[kelas][item.id]) homeworkSubmissions[kelas][item.id]={};
    const sub     = studentKey ? homeworkSubmissions[kelas][item.id][studentKey] : null;
    if(!item.createdAt) item.createdAt=todayStr();
    const expired = item.dueDate ? new Date(item.dueDate+"T00:00:00")<new Date(today+"T00:00:00") : false;

    const actionCell = document.createElement("td");
    if(currentUser.role==="guru"){
      const btn=document.createElement("button");
      btn.className="btn-delete"; btn.textContent=t('btnHapus');
      btn.onclick=()=>deleteHomework(item.id);
      actionCell.appendChild(btn);
    } else {
      const btn=document.createElement("button");
      btn.className="btn-done";
      if(!sub){
        if(expired){ btn.textContent=t('btnExpired'); btn.classList.add("btn-expired"); btn.disabled=true; }
        else{ btn.textContent=t('btnKirim'); btn.onclick=()=>submitHomework(item.id,item.createdAt); }
      } else if(sub.status==="pending"){
        btn.textContent=t('btnMenunggu'); btn.disabled=true;
      } else if(sub.status==="declined"){
        if(expired){ btn.textContent=t('btnExpired'); btn.classList.add("btn-expired"); btn.disabled=true; }
        else{ btn.textContent=t('btnKirimUlang'); btn.onclick=()=>submitHomework(item.id,item.createdAt,true); }
      } else {
        btn.textContent=t('btnDisetujui'); btn.disabled=true;
      }
      actionCell.appendChild(btn);
    }

    if(!item.dueDate&&item.due){ const nxt=nextWeekdayDate(item.due); if(nxt) item.dueDate=nxt; }
    const displayDue = item.dueDate ? formatDate(item.dueDate) : (item.due||"-");
    const safeDesc   = item.desc ? item.desc.replace(/"/g,"&quot;") : "";
    const desc       = item.desc ? `<span class="desc-tip" data-tip="${safeDesc}">i</span>` : "";
    const badge      = currentUser.role === 'siswa' ? deadlineBadge(item.dueDate) : '';
    tr.innerHTML=`<td>${item.title||"-"}${desc}${badge}</td><td>${displayDue||"-"}</td>`;
    tr.appendChild(actionCell);
    if(expired) tr.classList.add("expired-row");
    tbody.appendChild(tr);
  });

  const total = homeworks[kelas].length;
  let doneCount=0;
  if(studentKey){
    doneCount = Object.values(homeworkSubmissions[kelas])
      .filter(h=>h&&h[studentKey]&&h[studentKey].status==="approved").length;
  }
  if(stats) stats.textContent = currentUser.role==="guru" ? "" : t('hwStatFmt',{done:doneCount,total});

  localStorage.setItem("homeworks",JSON.stringify(homeworks));
  localStorage.setItem("homeworkSubmissions",JSON.stringify(homeworkSubmissions));

  if(currentUser.role==="guru"){
    approvalPanel.classList.remove("hidden");
    renderApprovalRequests();
  } else {
    approvalPanel.classList.add("hidden");
  }
}

function addHomework(){
  const title=document.getElementById("hwTitle").value.trim();
  const due  =document.getElementById("hwDue").value.trim();
  const desc =document.getElementById("hwDesc").value.trim();
  if(!title||!due) return;
  ensureClassData(currentUser.kelas);
  homeworks[currentUser.kelas].push({id:genId(),title,due,desc,createdAt:todayStr(),dueDate:due});
  document.getElementById("hwTitle").value="";
  document.getElementById("hwDue").value="";
  document.getElementById("hwDesc").value="";
  renderHomework(); renderClassroomPulse();
}
function deleteHomework(id){
  const kelas=currentUser.kelas;
  homeworks[kelas]=homeworks[kelas].filter(i=>i.id!==id);
  delete homeworkSubmissions[kelas][id];
  renderHomework(); renderClassroomPulse();
}

/* ── Submissions ── */
function xpForCompletion(createdAt,completedAt){
  const diff=daysBetween(createdAt,completedAt);
  if(diff===0) return randInt(50,60);
  if(diff>=5)  return randInt(10,15);
  return randInt(Math.max(10,50-diff*8), Math.max(15,60-diff*9));
}
function submitHomework(id,createdAt,isResubmit){
  const kelas=currentUser.kelas;
  ensureClassData(kelas);
  if(!homeworkSubmissions[kelas][id]) homeworkSubmissions[kelas][id]={};
  const sk=getStudentKey(); if(!sk) return;
  if(homeworkSubmissions[kelas][id][sk]&&!isResubmit) return;
  const item=homeworks[kelas].find(h=>h.id===id);
  const dueDate=item?.dueDate||"";
  const today=todayStr();
  const onTime=dueDate ? isOnOrBefore(today,dueDate) : true;
  homeworkSubmissions[kelas][id][sk]={status:"pending",completedAt:today,approvedAt:"",comment:""};
  updateStreakForSubmission(sk,onTime,today);
  localStorage.setItem("homeworkSubmissions",JSON.stringify(homeworkSubmissions));
  renderHomework(); renderClassroomPulse();
  renderSubmissionHistory();
  updateNotificationDots();
}
function approveSubmissionForStudent(id,studentKey){
  const kelas=currentUser.kelas;
  ensureClassData(kelas);
  if(!homeworkSubmissions[kelas][id]) return;
  const sub=homeworkSubmissions[kelas][id][studentKey];
  if(!sub||sub.status==="approved") return;
  sub.status="approved"; sub.approvedAt=todayStr();
  const item=homeworks[kelas].find(h=>h.id===id);
  grantXpForApproval(studentKey,item?.createdAt||todayStr(),sub.completedAt);
  localStorage.setItem("homeworkSubmissions",JSON.stringify(homeworkSubmissions));
  renderHomework(); renderProgress(); renderClassroomPulse();
  renderSubmissionHistory();
  updateNotificationDots();
}
function declineSubmissionForStudent(id,studentKey,comment){
  const kelas=currentUser.kelas;
  ensureClassData(kelas);
  if(!homeworkSubmissions[kelas][id]) return;
  const sub=homeworkSubmissions[kelas][id][studentKey];
  if(!sub||sub.status==="approved") return;
  sub.status="declined"; sub.comment=comment||""; sub.declinedAt=todayStr();
  localStorage.setItem("homeworkSubmissions",JSON.stringify(homeworkSubmissions));
  renderHomework(); renderClassroomPulse();
  renderSubmissionHistory();
  updateNotificationDots();
}
function autoApproveSubmissions(kelas){
  ensureClassData(kelas);
  let changed=false;
  Object.keys(homeworkSubmissions[kelas]).forEach(id=>{
    const byS=homeworkSubmissions[kelas][id]; if(!byS) return;
    Object.keys(byS).forEach(sk=>{
      const sub=byS[sk];
      if(sub&&sub.status==="pending"){
        if(!sub.completedAt) sub.completedAt=todayStr();
        if(daysBetween(sub.completedAt,todayStr())>=7){
          sub.status="approved"; sub.approvedAt=todayStr();
          const item=homeworks[kelas].find(h=>h.id===id);
          grantXpForApproval(sk,item?.createdAt||todayStr(),sub.completedAt);
          changed=true;
        }
      }
    });
  });
  if(changed) localStorage.setItem("homeworkSubmissions",JSON.stringify(homeworkSubmissions));
}

/* ── Streak / XP ── */
function updateStreakForSubmission(sk,onTime,today){
  const p=ensureStudentProgress(sk); if(!p) return;
  if(!onTime){ p.streak=0; p.lastOnTimeDate=""; }
  else if(p.lastOnTimeDate===today){ /* same day, no change */ }
  else if(isYesterday(p.lastOnTimeDate)) p.streak+=1;
  else p.streak=1;
  if(onTime) p.lastOnTimeDate=today;
  localStorage.setItem("progress",JSON.stringify(progress));
  renderProgress();
}
function updateStreakForOverdue(kelas){
  if(currentUser.role!=="siswa") return;
  const sk=getStudentKey(); if(!sk) return;
  const today=todayStr();
  const overdue=homeworks[kelas].some(item=>{
    if(!item.dueDate) return false;
    if(!homeworkSubmissions[kelas][item.id]?.[sk])
      return new Date(item.dueDate+"T00:00:00")<new Date(today+"T00:00:00");
    return false;
  });
  if(overdue){
    const p=ensureStudentProgress(sk); if(!p) return;
    p.streak=0; p.lastOnTimeDate="";
    localStorage.setItem("progress",JSON.stringify(progress));
  }
}
function grantXpForApproval(sk,createdAt,completedAt){
  const p=ensureStudentProgress(sk); if(!p) return;
  const today=todayStr();
  if(p.lastApprovedDate===today){ /* same day */ }
  else if(isYesterday(p.lastApprovedDate)) p.streak+=1;
  else p.streak=1;
  p.lastApprovedDate=today;
  const gainedValue = xpForCompletion(createdAt||today,completedAt||today);
  p.xp += gainedValue;
  if(typeof trackXpGain === 'function') trackXpGain(sk, gainedValue);
  p.level=Math.floor(p.xp/100)+1;
  localStorage.setItem("progress",JSON.stringify(progress));
}

/* ── Approval panel ── */
function openDeclineDialog(id,sk){
  const input=prompt(`Komentar penolakan untuk ${getStudentDisplayName(sk)} (opsional):`);
  if(input===null) return;
  const comment=(input||"").trim();
  if(comment) declineSubmissionForStudent(id,sk,comment);
  else if(confirm("Kirim penolakan tanpa komentar?")) declineSubmissionForStudent(id,sk,"");
}
function renderApprovalRequests(){
  const table=document.getElementById("approvalTable"); if(!table) return;
  const tbody=table.querySelector("tbody"); tbody.innerHTML="";
  const kelas=currentUser.kelas;
  const pending=[];
  Object.keys(homeworkSubmissions[kelas]).forEach(hwId=>{
    const byS=homeworkSubmissions[kelas][hwId]; if(!byS) return;
    Object.keys(byS).forEach(sk=>{
      const sub=byS[sk];
      if(sub&&sub.status==="pending") pending.push({hwId,studentKey:sk,sub});
    });
  });
  if(pending.length===0){
    const tr=document.createElement("tr");
    tr.innerHTML=`<td colspan="4" style="color:var(--text3);text-align:center;">${t('noApproval')}</td>`;
    tbody.appendChild(tr); return;
  }
  pending.forEach(item=>{
    const tr=document.createElement("tr");
    const hw=homeworks[kelas].find(h=>h.id===item.hwId);
    const name=getStudentDisplayName(item.studentKey);
    const submitted=item.sub.completedAt ? formatDate(item.sub.completedAt) : "-";
    tr.innerHTML=`<td>${name}</td><td>${hw?hw.title:"-"}</td><td>${submitted}</td><td></td>`;
    const actionCell=tr.querySelector("td:last-child");
    const ab=document.createElement("button");
    ab.className="btn-done"; ab.textContent=t('btnSetujui');
    ab.onclick=()=>approveSubmissionForStudent(item.hwId,item.studentKey);
    const db=document.createElement("button");
    db.className="btn-delete"; db.textContent=t('btnTolak'); db.style.marginLeft="6px";
    db.onclick=()=>openDeclineDialog(item.hwId,item.studentKey);
    actionCell.appendChild(ab); actionCell.appendChild(db);
    tbody.appendChild(tr);
  });
}

/* ── Progress (SISWA ONLY — admin bug fixed here) ── */
function renderProgress(){
  const card=document.getElementById("levelCard");
  // FIX: admin and guru must not see the level card
  if(!currentUser || currentUser.role==="guru" || currentUser.role==="admin"){
    if(card) card.classList.add("hidden");
    return;
  }
  if(card) card.classList.remove("hidden");

  const sk=getStudentKey();
  const p=ensureStudentProgress(sk); if(!p) return;

  // Update name in nav
  const nameEl=document.getElementById("navUserName");
  if(nameEl) nameEl.textContent=getStudentDisplayName(sk);

  updateProfilePic();

  const level  = Math.floor(p.xp/100)+1;
  const prev   = (level-1)*100;
  const current= p.xp-prev;
  const percent= Math.min(100,Math.round((current/100)*100));

  document.getElementById("levelBadge").textContent=`Level ${level}`;
  document.getElementById("xpText").textContent=t('xpFmt',{cur:current,next:level+1});
  document.getElementById("xpBar").style.width=`${percent}%`;

  const streakChip=document.getElementById("streakChip");
  if(p.streak>0){
    streakChip.textContent=t('streakFmt',{n:p.streak});
    streakChip.classList.remove("zero");
  } else {
    streakChip.textContent=t('noStreak');
    streakChip.classList.add("zero");
  }

  const badgeRow=document.getElementById("badgeRow");
  badgeRow.innerHTML="";
  const badges=[{name:t('badgeExplorer'),xp:100},{name:t('badgeAchiever'),xp:250},{name:t('badgeMaster'),xp:500}];
  let currentBadge=null;
  badges.forEach(b=>{ if(p.xp>=b.xp) currentBadge=b; });
  const bs=document.createElement("span");
  bs.className="chip"+(currentBadge?" active":"");
  bs.textContent=currentBadge?currentBadge.name:t('noBadge');
  const lw=document.createElement("div"); lw.appendChild(bs);
  badgeRow.appendChild(lw);
  if(streakChip) badgeRow.appendChild(streakChip);

  localStorage.setItem("progress",JSON.stringify(progress));
}

/* ── Classroom Pulse (admin bug fixed) ── */
function renderClassroomPulse(){
  const pulse=document.getElementById("classroomPulse");
  if(!pulse) return;
  pulse.innerHTML="";

  // Admin in admin mode → no pulse
  if(currentUser.role==="admin" && !adminViewMode) return;

  const kelas=currentUser.kelas;
  if(!kelas) return;
  ensureClassData(kelas);

  const total=homeworks[kelas].length;
  let doneCount=0, pendingCount=0;
  const sk=getStudentKey();
  Object.keys(homeworkSubmissions[kelas]).forEach(hwId=>{
    const byS=homeworkSubmissions[kelas][hwId]; if(!byS) return;
    Object.values(byS).forEach(sub=>{ if(sub?.status==="pending") pendingCount+=1; });
    if(sk&&byS[sk]?.status==="approved") doneCount+=1;
  });

  const nextQuiz=schedules[kelas]?.[0]
    ? `${schedules[kelas][0].tanggal} – ${schedules[kelas][0].mapel}`
    : "–";

  let stats=[];
  if(currentUser.role==="guru"){
    stats=[
      {label:t('statTugasGuru'),    value:total},
      {label:t('statMenungguGuru'), value:pendingCount},
      {label:t('statPengumuman'),   value:announcements[kelas].length},
      {label:t('statMateriGuru'),   value:resources[kelas].length},
      {label:t('statJadwalGuru'),   value:schedules[kelas].length}
    ];
  } else {
    const p=ensureStudentProgress(sk);
    stats=[
      {label:t('statTugasSiswa'),   value:`${doneCount}/${total}`},
      {label:t('statStreak'),       value:`${p?p.streak:0} ${appLang==='id'?'hari':'days'}`},
      {label:t('statUlangan'),      value:nextQuiz},
      {label:t('statPengumuman'),   value:announcements[kelas].length}
    ];
  }
  stats.forEach(s=>{
    const d=document.createElement("div"); d.className="stat";
    d.innerHTML=`<div class="label">${s.label}</div><div class="value">${s.value}</div>`;
    pulse.appendChild(d);
  });
}

/* ── Announcements ── */
function renderAnnouncements(){
  const list=document.getElementById("announcementList"); if(!list) return;
  list.innerHTML="";
  const kelas=currentUser.kelas;
  ensureClassData(kelas);
  if(!announcements[kelas].length){
    const li=document.createElement("li"); li.className="list-item";
    li.innerHTML=`<span style="color:var(--text3);">${t('noAnnounce')}</span>`;
    list.appendChild(li); return;
  }
  announcements[kelas].forEach((item,index)=>{
    const li=document.createElement("li"); li.className="list-item";
    const txt=document.createElement("div"); txt.textContent=item.text;
    const meta=document.createElement("small"); meta.className="subtle"; meta.style.marginTop="2px"; meta.textContent=item.date;
    li.appendChild(txt); li.appendChild(meta);
    if(currentUser.role==="guru"){
      const row=document.createElement("div"); row.className="list-row"; row.style.marginTop="6px";
      row.appendChild(document.createElement("div"));
      const btn=document.createElement("button"); btn.className="btn-delete"; btn.textContent=t('btnHapus');
      btn.onclick=()=>deleteAnnouncement(index);
      row.appendChild(btn); li.appendChild(row);
    }
    list.appendChild(li);
  });
  localStorage.setItem("announcements",JSON.stringify(announcements));
}
function addAnnouncement(){
  const text=document.getElementById("announcementText").value.trim(); if(!text) return;
  ensureClassData(currentUser.kelas);
  announcements[currentUser.kelas].unshift({text,date:"Baru"});
  document.getElementById("announcementText").value="";
  renderAnnouncements(); renderClassroomPulse();
}
function deleteAnnouncement(index){
  announcements[currentUser.kelas].splice(index,1);
  renderAnnouncements(); renderClassroomPulse();
}

/* ── Resources ── */
function renderResources(){
  const list=document.getElementById("resourceList"); if(!list) return;
  list.innerHTML="";
  const kelas=currentUser.kelas;
  ensureClassData(kelas);
  if(!resources[kelas].length){
    const li=document.createElement("li"); li.className="list-item";
    li.innerHTML=`<span style="color:var(--text3);">${t('noResource')}</span>`;
    list.appendChild(li); return;
  }
  resources[kelas].forEach((item,index)=>{
    const li=document.createElement("li"); li.className="list-item";
    const a=document.createElement("a"); a.textContent=item.title||"Materi";
    a.href=item.url||"#"; a.target="_blank"; a.rel="noopener";
    a.style.color="var(--accent2)"; a.style.textDecoration="none"; a.style.fontWeight="600";
    li.appendChild(a);
    if(currentUser.role==="guru"){
      const row=document.createElement("div"); row.className="list-row"; row.style.marginTop="6px";
      row.appendChild(document.createElement("div"));
      const btn=document.createElement("button"); btn.className="btn-delete"; btn.textContent=t('btnHapus');
      btn.onclick=()=>deleteResource(index);
      row.appendChild(btn); li.appendChild(row);
    }
    list.appendChild(li);
  });
  localStorage.setItem("resources",JSON.stringify(resources));
}
function addResource(){
  const title=document.getElementById("resourceTitle").value.trim();
  const url  =document.getElementById("resourceUrl").value.trim();
  if(!title||!url) return;
  ensureClassData(currentUser.kelas);
  resources[currentUser.kelas].push({title,url});
  document.getElementById("resourceTitle").value="";
  document.getElementById("resourceUrl").value="";
  renderResources(); renderClassroomPulse();
}
function deleteResource(index){
  resources[currentUser.kelas].splice(index,1);
  renderResources(); renderClassroomPulse();
}

/* ── Admin panel ── */
function renderAdminPanel(){
  const st=document.getElementById("adminStudentTable");
  const tt=document.getElementById("adminTeacherTable");
  const sv=document.getElementById("adminStudentView");
  const tv=document.getElementById("adminTeacherView");

  if(st){
    const tbody=st.querySelector("tbody"); tbody.innerHTML="";
    classes.forEach(kelas=>{
      for(let i=1;i<=31;i++){
        const key=`${kelas}-${i}`;
        const name=getStudentDisplayName(key);
        const pass=studentPasswords[key]||defaultPasswordSiswa;
        const tr=document.createElement("tr");
        tr.innerHTML=`<td>${name}</td><td style="color:var(--text2);font-family:monospace;">${pass}</td><td></td>`;
        const action=tr.querySelector("td:last-child");
        const editBtn=document.createElement("button"); editBtn.className="btn-done"; editBtn.textContent=t('btnEdit');
        editBtn.onclick=()=>adminEditStudent(key);
        action.appendChild(editBtn); tbody.appendChild(tr);
      }
    });
  }
  if(tt){
    const tbody=tt.querySelector("tbody"); tbody.innerHTML="";
    classes.forEach(kelas=>{
      const pass=teacherPasswords[kelas]||defaultPasswordGuru;
      const tr=document.createElement("tr");
      tr.innerHTML=`<td>${kelas}</td><td style="color:var(--text2);font-family:monospace;">${pass}</td><td></td>`;
      const action=tr.querySelector("td:last-child");
      const editBtn=document.createElement("button"); editBtn.className="btn-done"; editBtn.textContent=t('btnEdit');
      editBtn.onclick=()=>adminEditTeacher(kelas);
      action.appendChild(editBtn); tbody.appendChild(tr);
    });
  }
  if(sv){
    sv.innerHTML="";
    classes.forEach(kelas=>{ for(let i=1;i<=31;i++){
      const key=`${kelas}-${i}`;
      const opt=document.createElement("option"); opt.value=key;
      opt.textContent=getStudentDisplayName(key); sv.appendChild(opt);
    }});
  }
  if(tv){
    tv.innerHTML="";
    classes.forEach(kelas=>{
      const opt=document.createElement("option"); opt.value=kelas;
      opt.textContent=`Guru Kelas ${kelas}`; tv.appendChild(opt);
    });
  }
}
function adminEditStudent(sk){
  document.getElementById("adminEditTitle").textContent="Edit Akun Siswa";
  document.getElementById("adminEditKey").value=sk;
  document.getElementById("adminEditType").value="student";
  document.getElementById("adminEditName").value=getStudentDisplayName(sk);
  document.getElementById("adminEditPass").value=studentPasswords[sk]||defaultPasswordSiswa;
  document.getElementById("adminEditNameWrap").classList.remove("hidden");
  document.getElementById("adminEditModal").classList.remove("hidden");
  document.getElementById("adminEditOverlay").classList.remove("hidden");
}
function adminEditTeacher(kelas){
  document.getElementById("adminEditTitle").textContent=`Edit Guru Kelas ${kelas}`;
  document.getElementById("adminEditKey").value=kelas;
  document.getElementById("adminEditType").value="teacher";
  document.getElementById("adminEditPass").value=teacherPasswords[kelas]||defaultPasswordGuru;
  document.getElementById("adminEditNameWrap").classList.add("hidden");
  document.getElementById("adminEditModal").classList.remove("hidden");
  document.getElementById("adminEditOverlay").classList.remove("hidden");
}
function saveAdminEdit(){
  const key =document.getElementById("adminEditKey").value;
  const type=document.getElementById("adminEditType").value;
  const pass=document.getElementById("adminEditPass").value.trim();
  if(type==="student"){
    const name=document.getElementById("adminEditName").value.trim();
    if(!studentProfiles[key]) studentProfiles[key]={};
    studentProfiles[key].name=name||getStudentDisplayName(key);
    if(pass) studentPasswords[key]=pass;
    localStorage.setItem("studentProfiles",JSON.stringify(studentProfiles));
    localStorage.setItem("studentPasswords",JSON.stringify(studentPasswords));
  } else {
    if(pass) teacherPasswords[key]=pass;
    localStorage.setItem("teacherPasswords",JSON.stringify(teacherPasswords));
  }
  closeAdminEdit(); renderAdminPanel();
}
function closeAdminEdit(){
  document.getElementById("adminEditModal").classList.add("hidden");
  document.getElementById("adminEditOverlay").classList.add("hidden");
}

/* ── Admin view-as ── */
function adminViewAsStudent(){
  const key=document.getElementById("adminStudentView").value;
  const info=parseStudentKey(key);
  if(!info.kelas||!info.absen) return;
  currentUser={role:"siswa",kelas:info.kelas,absen:info.absen};
  adminViewMode=true;
  document.getElementById("adminViewBar").classList.remove("hidden");
  updateNavUser();
  setupTabsForRole("siswa");
  ensureClassData(currentUser.kelas);
  migrateLegacyData(currentUser.kelas);
  renderSchedule(); renderHomework(); renderProgress();
  renderAnnouncements(); renderResources(); renderClassroomPulse();
}
function adminViewAsTeacher(){
  const kelas=document.getElementById("adminTeacherView").value; if(!kelas) return;
  currentUser={role:"guru",kelas};
  adminViewMode=true;
  document.getElementById("editPanel").classList.remove("hidden");
  document.getElementById("homeworkEditor").classList.remove("hidden");
  document.getElementById("announcementEditor").classList.remove("hidden");
  document.getElementById("resourceEditor").classList.remove("hidden");
  document.getElementById("adminViewBar").classList.remove("hidden");
  const hpw=document.getElementById("hubPulseWrap"); if(hpw) hpw.classList.remove("hidden");
  updateNavUser();
  setupTabsForRole("guru");
  ensureClassData(currentUser.kelas);
  migrateLegacyData(currentUser.kelas);
  renderSchedule(); renderHomework(); renderProgress();
  renderAnnouncements(); renderResources(); renderClassroomPulse();
}
function exitAdminView(){
  adminViewMode=false;
  currentUser={role:"admin",kelas:""};
  document.getElementById("adminViewBar").classList.add("hidden");
  // Hide teacher editors
  ["editPanel","homeworkEditor","announcementEditor","resourceEditor"].forEach(id=>{
    const el=document.getElementById(id); if(el) el.classList.add("hidden");
  });
  updateNavUser();
  setupTabsForRole("admin");
  renderAdminPanel();
}
function resetAllData(){
  if(!confirm("Reset semua data ke default? Tidak bisa dibatalkan.")) return;
  localStorage.clear(); location.reload();
}

/* ── Account settings ── */
function toggleAccountSettings(){
  if(!currentUser) return;
  const panel=document.getElementById("accountSettings"); if(!panel) return;
  panel.classList.toggle("hidden");
  const ss=document.getElementById("studentSettings");
  const ts=document.getElementById("teacherSettings");
  if(currentUser.role==="guru"){ ss?.classList.add("hidden"); ts?.classList.remove("hidden"); }
  else { ss?.classList.remove("hidden"); ts?.classList.add("hidden"); }
}
function saveProfile(){
  if(!currentUser||currentUser.role!=="siswa") return;
  const sk=getStudentKey(); if(!sk) return;
  const np=document.getElementById("newPassword").value;
  const cp=document.getElementById("confirmPassword").value;
  const pi=document.getElementById("profilePhoto");
  if(np||cp){
    if(np.length<4) return showAuthMessage("Password minimal 4 karakter.");
    if(np!==cp)     return showAuthMessage("Password tidak sama.");
    studentPasswords[sk]=np;
    localStorage.setItem("studentPasswords",JSON.stringify(studentPasswords));
  }
  if(pi?.files?.[0]){
    const reader=new FileReader();
    reader.onload=()=>{
      if(!studentProfiles[sk]) studentProfiles[sk]={};
      studentProfiles[sk].photo=reader.result;
      localStorage.setItem("studentProfiles",JSON.stringify(studentProfiles));
      renderProgress();
    };
    reader.readAsDataURL(pi.files[0]);
  }
  document.getElementById("newPassword").value="";
  document.getElementById("confirmPassword").value="";
  if(pi) pi.value="";
  renderProgress();
}
function removeProfilePhoto(){
  if(!currentUser||currentUser.role!=="siswa") return;
  const sk=getStudentKey(); if(!sk) return;
  if(!studentProfiles[sk]) studentProfiles[sk]={};
  delete studentProfiles[sk].photo;
  localStorage.setItem("studentProfiles",JSON.stringify(studentProfiles));
  const pi=document.getElementById("profilePhoto"); if(pi) pi.value="";
  renderProgress();
}
function saveTeacherPassword(){
  if(!currentUser||currentUser.role!=="guru") return;
  const np=document.getElementById("newTeacherPassword").value;
  const cp=document.getElementById("confirmTeacherPassword").value;
  if(np.length<4) return showAuthMessage(t('pwdMinLength'));
  if(np!==cp)     return showAuthMessage(t('pwdNotMatch'));
  teacherPasswords[currentUser.kelas]=np;
  localStorage.setItem("teacherPasswords",JSON.stringify(teacherPasswords));
  document.getElementById("newTeacherPassword").value="";
  document.getElementById("confirmTeacherPassword").value="";
  alert(t('pwdUpdated'));
}

/* ── Modals ── */
function toggleFeedbackForm(){
  document.getElementById("feedbackOverlay").classList.toggle("hidden");
  document.getElementById("feedbackModal").classList.toggle("hidden");
}
function toggleLevelInfo(){
  document.getElementById("levelOverlay").classList.toggle("hidden");
  document.getElementById("levelModal").classList.toggle("hidden");
}
function logout(){ location.reload(); }

/* ════════════════════════════════════════════════════════
   NEW FEATURES: Deadline Badges, Notifications, Leaderboard,
   XP Chart, Calendar, Notes, Pomodoro, Colors, CSV Export
   ════════════════════════════════════════════════════════ */

/* ── Deadline Badge Helper ── */
function deadlineBadge(dueDate){
  if(!dueDate) return '';
  const due  = new Date(dueDate + 'T00:00:00');
  const now  = new Date(); now.setHours(0,0,0,0);
  const diff = Math.round((due - now) / 864e5);
  if(diff < 0)  return `<span class="deadline-badge badge-crit">⛔ Expired</span>`;
  if(diff === 0)return `<span class="deadline-badge badge-crit">⚡ Hari Ini</span>`;
  if(diff === 1)return `<span class="deadline-badge badge-crit">⚡ Besok</span>`;
  if(diff <= 4) return `<span class="deadline-badge badge-warn">⏰ ${diff} hari lagi</span>`;
  return `<span class="deadline-badge badge-safe">📅 ${diff} hari lagi</span>`;
}

/* ── Notification Dots ── */
function updateNotificationDots(){
  if(!currentUser || currentUser.role === 'admin') return;
  const kelas = currentUser.kelas;
  const sk    = currentUser.role === 'siswa' ? `${kelas}-${currentUser.absen}` : null;
  if(currentUser.role === 'siswa' && sk){
    const hw    = homeworks[kelas] || [];
    const subs  = homeworkSubmissions[kelas] || {};
    const today = new Date(); today.setHours(0,0,0,0);
    let pending = 0;
    hw.forEach(h => {
      const sub     = subs[h.id] && subs[h.id][sk];
      const expired = h.dueDate && new Date(h.dueDate + 'T00:00:00') < today;
      if(!expired && (!sub || sub.status === 'declined')) pending++;
    });
    updateTabDot('assignments', pending);
  }
  if(currentUser.role === 'guru'){
    const subs = homeworkSubmissions[kelas] || {};
    let pending = 0;
    Object.values(subs).forEach(byHw => {
      if(byHw) Object.values(byHw).forEach(s => { if(s && s.status === 'pending') pending++; });
    });
    updateTabDot('assignments', pending);
  }
}
function updateTabDot(tabId, count){
  document.querySelectorAll(`.nav-tab[data-tab="${tabId}"], .mob-tab[data-tab="${tabId}"]`).forEach(t => {
    let dot = t.querySelector('.tab-dot');
    if(count > 0){
      if(!dot){ dot = document.createElement('span'); dot.className = 'tab-dot'; t.appendChild(dot); }
      dot.textContent = count > 9 ? '9+' : count;
    } else if(dot){ dot.remove(); }
  });
}

/* ── Leaderboard ── */
function renderLeaderboard(){
  const section = document.getElementById('leaderboardSection');
  const list    = document.getElementById('leaderboardList');
  if(!section || !list || !currentUser) return;
  if(currentUser.role === 'admin' && !adminViewMode) return;
  section.classList.remove('hidden');
  const kelas = currentUser.kelas;
  const sk    = currentUser.role === 'siswa' ? `${kelas}-${currentUser.absen}` : null;
  // Gather all students with XP data in this class
  const entries = [];
  for(let n = 1; n <= 40; n++){
    const key = `${kelas}-${n}`;
    const p   = progress[key];
    if(p && (p.xp > 0 || p.streak > 0)){
      const name = studentProfiles[key]?.name || `Siswa ${n}`;
      entries.push({ key, xp: p.xp || 0, streak: p.streak || 0, name });
    }
  }
  entries.sort((a,b) => b.xp - a.xp);
  const top = entries.slice(0, 10);
  if(top.length === 0){
    list.innerHTML = `<div style="color:var(--text3);font-size:13px;text-align:center;padding:14px;">${t('lbEmpty')}</div>`;
    return;
  }
  list.innerHTML = '';
  top.forEach((e, i) => {
    const row    = document.createElement('div');
    const isOwn  = e.key === sk;
    row.className = 'lb-row' + (isOwn ? ' lb-own' : '');
    const medal  = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    const icon   = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
    row.innerHTML = `
      <div class="lb-rank ${medal}">${icon}</div>
      <div class="lb-name">${e.name}${isOwn ? t('lbYou') : ''}</div>
      <div class="lb-xp">${e.xp} XP ⚡${e.streak}d</div>`;
    list.appendChild(row);
  });
}

/* ── XP History & Chart ── */
let xpHistory = JSON.parse(localStorage.getItem('xpHistory')) || {};

function trackXpGain(studentKey, amount){
  if(!xpHistory[studentKey]) xpHistory[studentKey] = [];
  const today = new Date().toISOString().slice(0, 10);
  xpHistory[studentKey].push({ date: today, xp: amount });
  // Keep 60 days rolling window
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 60);
  xpHistory[studentKey] = xpHistory[studentKey].filter(h => new Date(h.date) >= cutoff);
  localStorage.setItem('xpHistory', JSON.stringify(xpHistory));
}

function renderXpChart(){
  const canvas = document.getElementById('xpChart');
  const card   = document.getElementById('xpChartCard');
  if(!canvas || !card || !currentUser || currentUser.role !== 'siswa'){
    if(card) card.classList.add('hidden'); return;
  }
  card.classList.remove('hidden');
  const sk   = `${currentUser.kelas}-${currentUser.absen}`;
  const hist = xpHistory[sk] || [];
  // Last 7 days
  const days = [];
  for(let i = 6; i >= 0; i--){
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  const vals = days.map(d => hist.filter(h => h.date === d).reduce((s,h) => s + h.xp, 0));
  const maxV = Math.max(...vals, 10);
  const W    = canvas.offsetWidth || 380;
  const H    = 100;
  canvas.width  = W * devicePixelRatio;
  canvas.height = H * devicePixelRatio;
  const ctx = canvas.getContext('2d');
  ctx.scale(devicePixelRatio, devicePixelRatio);
  ctx.clearRect(0, 0, W, H);
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6366f1';
  const barW   = Math.floor((W - 32) / 7);
  const dayLabels = t('calDays').split(',');
  vals.forEach((v, i) => {
    const bh  = v > 0 ? Math.max(6, Math.round((v / maxV) * 70)) : 4;
    const x   = 16 + i * barW + barW * 0.12;
    const bw  = barW * 0.76;
    const y   = 76 - bh;
    // Draw bar
    const grad = ctx.createLinearGradient(0, y, 0, 76);
    grad.addColorStop(0, accent);
    grad.addColorStop(1, accent + '55');
    ctx.fillStyle = v > 0 ? grad : 'rgba(148,163,184,0.1)';
    ctx.beginPath();
    if(ctx.roundRect) ctx.roundRect(x, y, bw, bh, 4);
    else ctx.rect(x, y, bw, bh);
    ctx.fill();
    // Day label
    const d = new Date(days[i] + 'T12:00:00');
    ctx.fillStyle = 'rgba(148,163,184,0.65)';
    ctx.font = `bold 10px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(dayLabels[d.getDay()], x + bw / 2, 94);
    // Value
    if(v > 0){
      ctx.fillStyle = accent;
      ctx.font = `bold 10px Inter, sans-serif`;
      ctx.fillText('+' + v, x + bw / 2, y - 3);
    }
  });
}

/* ── Calendar ── */
let calYear  = new Date().getFullYear();
let calMonth = new Date().getMonth();
let calView  = 'list';

function setScheduleView(view){
  calView = view;
  const sd = document.getElementById('scheduleCard');
  const cv = document.getElementById('calendarView');
  const bl = document.getElementById('btnListView');
  const bc = document.getElementById('btnCalView');
  if(sd) sd.classList.toggle('hidden', view !== 'list');
  if(cv) cv.classList.toggle('hidden', view !== 'cal');
  if(bl) bl.classList.toggle('secondary', view !== 'list');
  if(bc) bc.classList.toggle('secondary', view === 'list');
  if(view === 'cal') renderCalendar();
}
function renderCalendar(){
  const wrap = document.getElementById('calendarView');
  if(!wrap || !currentUser) return;
  const kelas   = currentUser.kelas;
  const today   = new Date();
  const first   = new Date(calYear, calMonth, 1);
  const last    = new Date(calYear, calMonth + 1, 0);
  const startDow = first.getDay();
  // Build events map
  const evts = {};
  const addE  = (ds, label, type) => {
    if(!evts[ds]) evts[ds] = [];
    evts[ds].push({ label, type });
  };
  (schedules[kelas] || []).forEach(s => {
    if(s.tanggal){
      const parsed = Date.parse(s.tanggal + ' ' + calYear);
      if(!isNaN(parsed)) addE(new Date(parsed).toISOString().slice(0,10), s.mapel, 'quiz');
    }
  });
  (homeworks[kelas] || []).forEach(h => {
    if(h.dueDate) addE(h.dueDate, h.title, 'deadline');
  });
  const mNames = t('calMonths').split(',');
  const dNames = t('calDays').split(',');
  let html = `<div class="cal-header">
    <button onclick="calPrev()" style="padding:6px 12px;font-size:13px;" class="secondary">‹</button>
    <span class="cal-month-label">${mNames[calMonth]} ${calYear}</span>
    <button onclick="calNext()" style="padding:6px 12px;font-size:13px;" class="secondary">›</button>
  </div>
  <div class="cal-grid">
    ${dNames.map(d => `<div class="cal-dayname">${d}</div>`).join('')}`;
  for(let i = 0; i < startDow; i++){
    const pd = new Date(calYear, calMonth, -startDow + i + 1);
    html += `<div class="cal-day other-month"><div class="cal-day-num">${pd.getDate()}</div></div>`;
  }
  for(let d = 1; d <= last.getDate(); d++){
    const date    = new Date(calYear, calMonth, d);
    const ds      = date.toISOString().slice(0,10);
    const isToday = date.toDateString() === today.toDateString();
    const dayEvts = evts[ds] || [];
    html += `<div class="cal-day${isToday ? ' today' : ''}">
      <div class="cal-day-num">${d}</div>
      ${dayEvts.slice(0,2).map(e=>`<div class="cal-event ${e.type}" title="${e.label}">${e.label}</div>`).join('')}
      ${dayEvts.length > 2 ? `<div style="font-size:10px;color:var(--text3)">+${dayEvts.length-2}</div>` : ''}
    </div>`;
  }
  const total    = startDow + last.getDate();
  const trailing = total % 7 === 0 ? 0 : 7 - (total % 7);
  for(let i = 1; i <= trailing; i++)
    html += `<div class="cal-day other-month"><div class="cal-day-num">${i}</div></div>`;
  html += '</div>';
  wrap.innerHTML = html;
}
function calPrev(){ if(calMonth===0){calMonth=11;calYear--;} else calMonth--; renderCalendar(); }
function calNext(){ if(calMonth===11){calMonth=0;calYear++;} else calMonth++; renderCalendar(); }

/* ── Personal Notes ── */
let notes = JSON.parse(localStorage.getItem('remindNotes')) || {};

function renderNotes(){
  const grid = document.getElementById('notesGrid');
  if(!grid || !currentUser || currentUser.role !== 'siswa') return;
  const sk      = `${currentUser.kelas}-${currentUser.absen}`;
  const myNotes = (notes[sk] || []).slice().reverse();
  if(myNotes.length === 0){
    grid.innerHTML = `<div style="color:var(--text3);font-size:13px;padding:12px;">${t('noNotes')}</div>`;
    return;
  }
  grid.innerHTML = '';
  myNotes.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.onclick   = () => openNoteEditor(note.id);
    const dateStr  = new Date(note.date).toLocaleDateString(appLang === 'id' ? 'id-ID' : 'en-US', {dateStyle:'medium'});
    card.innerHTML = `
      ${note.subject ? `<span class="note-card-subj">${note.subject}</span>` : ''}
      <div class="note-card-title">${note.title}</div>
      <div class="note-card-preview">${note.content}</div>
      <div class="note-card-date">${dateStr}</div>`;
    grid.appendChild(card);
  });
}
function openNoteEditor(id){
  if(!currentUser || currentUser.role !== 'siswa') return;
  const sk   = `${currentUser.kelas}-${currentUser.absen}`;
  const note = id ? (notes[sk] || []).find(n => n.id === id) : null;
  document.getElementById('noteModalTitle').textContent = note ? t('editNote') : t('addNote');
  document.getElementById('noteId').value      = id || '';
  document.getElementById('noteTitle').value   = note ? note.title   : '';
  document.getElementById('noteSubject').value = note ? (note.subject||'') : '';
  document.getElementById('noteContent').value = note ? note.content : '';
  document.getElementById('noteOverlay').classList.remove('hidden');
  document.getElementById('noteModal').classList.remove('hidden');
}
function closeNoteEditor(){
  document.getElementById('noteOverlay').classList.add('hidden');
  document.getElementById('noteModal').classList.add('hidden');
}
function saveNote(){
  if(!currentUser || currentUser.role !== 'siswa') return;
  const sk    = `${currentUser.kelas}-${currentUser.absen}`;
  const id    = document.getElementById('noteId').value;
  const title = document.getElementById('noteTitle').value.trim();
  const subj  = document.getElementById('noteSubject').value.trim();
  const cont  = document.getElementById('noteContent').value.trim();
  if(!title) return;
  if(!notes[sk]) notes[sk] = [];
  if(id){
    const idx = notes[sk].findIndex(n => n.id === id);
    if(idx !== -1) notes[sk][idx] = {...notes[sk][idx], title, subject:subj, content:cont, date:new Date().toISOString()};
  } else {
    notes[sk].push({ id: Date.now().toString(36), title, subject:subj, content:cont, date:new Date().toISOString() });
  }
  localStorage.setItem('remindNotes', JSON.stringify(notes));
  closeNoteEditor();
  renderNotes();
}
function deleteNote(){
  if(!currentUser || currentUser.role !== 'siswa') return;
  const sk = `${currentUser.kelas}-${currentUser.absen}`;
  const id = document.getElementById('noteId').value;
  if(!id || !confirm('Hapus catatan ini?')) return;
  notes[sk] = (notes[sk] || []).filter(n => n.id !== id);
  localStorage.setItem('remindNotes', JSON.stringify(notes));
  closeNoteEditor();
  renderNotes();
}

/* ── Submission History ── */
function renderSubmissionHistory(){
  const sec  = document.getElementById('historySection');
  const list = document.getElementById('historyList');
  if(!sec || !list || !currentUser || currentUser.role !== 'siswa'){ if(sec) sec.classList.add('hidden'); return; }
  const kelas  = currentUser.kelas;
  const sk     = `${kelas}-${currentUser.absen}`;
  const subs   = homeworkSubmissions[kelas] || {};
  const hw     = homeworks[kelas] || [];
  const history = [];
  hw.forEach(item => {
    const s = subs[item.id] && subs[item.id][sk];
    if(s){
      history.push({ title: item.title, status: s.status, date: s.submittedAt || s.completedAt || '—' });
    }
  });
  if(history.length === 0){ sec.classList.add('hidden'); return; }
  sec.classList.remove('hidden');
  const title = document.getElementById('historyTitle');
  if(title) title.textContent = t('historyTitle');
  list.innerHTML = '';
  history.reverse().forEach(h => {
    const cls  = h.status === 'approved' ? 'hi-approved' : h.status === 'declined' ? 'hi-declined' : 'hi-pending';
    const icon = h.status === 'approved' ? '✓' : h.status === 'declined' ? '✕' : '⏳';
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <span class="hi-status ${cls}">${icon} ${h.status}</span>
      <span style="flex:1;font-weight:600;">${h.title}</span>
      <span style="font-size:11px;color:var(--text3);">${h.date}</span>`;
    list.appendChild(item);
  });
}

/* ── Pomodoro Timer ── */
const pomoState = { mode:'work', remaining:25*60, running:false, sessions:0, timer:null };

function togglePomoPanel(){
  const panel = document.getElementById('pomoPanel');
  if(panel) panel.classList.toggle('hidden');
}
function pomoToggle(){
  if(pomoState.running){
    clearInterval(pomoState.timer);
    pomoState.running = false;
  } else {
    pomoState.running = true;
    pomoState.timer   = setInterval(() => {
      pomoState.remaining--;
      if(pomoState.remaining <= 0){
        clearInterval(pomoState.timer);
        pomoState.running = false;
        if(pomoState.mode === 'work'){
          pomoState.sessions++;
          // Award XP for completing a pomodoro
          if(currentUser && currentUser.role === 'siswa'){
            const sk = `${currentUser.kelas}-${currentUser.absen}`;
            const p  = ensureStudentProgress(sk);
            p.xp    += 5;
            trackXpGain(sk, 5);
            progress[sk] = p;
            localStorage.setItem('progress', JSON.stringify(progress));
            renderProgress();
            renderXpChart();
          }
          pomoState.mode      = 'break';
          pomoState.remaining = 5 * 60;
        } else {
          pomoState.mode      = 'work';
          pomoState.remaining = 25 * 60;
        }
      }
      pomoRender();
    }, 1000);
  }
  pomoRender();
}
function pomoReset(){
  clearInterval(pomoState.timer);
  pomoState.running   = false;
  pomoState.mode      = 'work';
  pomoState.remaining = 25 * 60;
  pomoRender();
}
function pomoRender(){
  const m     = String(Math.floor(pomoState.remaining / 60)).padStart(2,'0');
  const s     = String(pomoState.remaining % 60).padStart(2,'0');
  const total = pomoState.mode === 'work' ? 25 * 60 : 5 * 60;
  const pct   = Math.round((1 - pomoState.remaining / total) * 100);
  const te = document.getElementById('pomoTime');
  const le = document.getElementById('pomoLabel');
  const re = document.getElementById('pomoRing');
  const ce = document.getElementById('pomoCount');
  const se = document.getElementById('pomoStart');
  if(te) te.textContent = `${m}:${s}`;
  if(le) le.textContent = pomoState.mode === 'work' ? t('pomoFocus') : t('pomoBreak');
  if(re) re.style.setProperty('--pct', pct);
  if(ce) ce.textContent = `${t('pomoSessions')}: ${pomoState.sessions} 🍅`;
  if(se) se.textContent = pomoState.running ? `⏸ ${t('pomoBtnPause')}` : `▶ ${t('pomoBtnStart')}`;
}

/* ── Accent Color Picker ── */
const ACCENT_COLORS = [
  { id:'indigo',  hex:'#6366f1', h2:'#818cf8' },
  { id:'violet',  hex:'#8b5cf6', h2:'#a78bfa' },
  { id:'blue',    hex:'#3b82f6', h2:'#60a5fa' },
  { id:'cyan',    hex:'#06b6d4', h2:'#22d3ee' },
  { id:'emerald', hex:'#10b981', h2:'#34d399' },
  { id:'rose',    hex:'#f43f5e', h2:'#fb7185' },
  { id:'amber',   hex:'#f59e0b', h2:'#fbbf24' },
];
let appAccent = localStorage.getItem('remindAccent') || 'indigo';

function buildColorPicker(){
  const cp = document.getElementById('colorPicker');
  if(!cp) return;
  cp.innerHTML = '';
  ACCENT_COLORS.forEach(c => {
    const sw = document.createElement('button');
    sw.className     = 'color-swatch' + (appAccent === c.id ? ' active' : '');
    sw.style.background = c.hex;
    sw.title         = c.id;
    sw.onclick       = () => setAccent(c.id);
    cp.appendChild(sw);
  });
}
function setAccent(id){
  const color = ACCENT_COLORS.find(c => c.id === id);
  if(!color) return;
  appAccent = id;
  localStorage.setItem('remindAccent', id);
  const r = document.documentElement;
  r.style.setProperty('--accent',  color.hex);
  r.style.setProperty('--accent2', color.h2);
  r.style.setProperty('--a-glow',  color.hex + '38');
  buildColorPicker();
  renderXpChart();
}
function applyAccent(){
  const color = ACCENT_COLORS.find(c => c.id === appAccent);
  if(color) setAccent(color.id);
}

/* ── Admin CSV Export ── */
function adminExportCSV(){
  const rows = [['Kelas','No. Absen','Password','XP','Level','Streak']];
  classes.forEach(kelas => {
    for(let n = 1; n <= 40; n++){
      const sk = `${kelas}-${n}`;
      const p  = progress[sk];
      if(p){
        const pwd = studentPasswords[sk] || defaultPasswordSiswa;
        rows.push([kelas, n, pwd, p.xp||0, p.level||1, p.streak||0]);
      }
    }
  });
  const csv  = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv, ], {type:'text/csv;charset=utf-8;'});
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), {href:url, download:'remind_edu_students.csv'});
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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
applyTheme();
applyTranslations();
updateSettingsButtons();
applyAccent();
buildColorPicker();
pomoRender();

/* ── Init role UI ── */
selectRole("siswa");