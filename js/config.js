// --- config.js ---
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
let schedules          = {};
let homeworks          = {};
let homeworkSubmissions= {};
let homeworkDone       = {};
let announcements      = {};
let resources          = {};
let progress           = {};
let studentProfiles    = {};
let studentPasswords   = {};
let teacherPasswords   = {};

window.reloadState = function() {
  schedules          = JSON.parse(localStorage.getItem("schedules"))          || {};
  homeworks          = JSON.parse(localStorage.getItem("homeworks"))          || {};
  homeworkSubmissions= JSON.parse(localStorage.getItem("homeworkSubmissions"))|| {};
  homeworkDone       = JSON.parse(localStorage.getItem("homeworkDone"))       || {};
  announcements      = JSON.parse(localStorage.getItem("announcements"))      || {};
  resources          = JSON.parse(localStorage.getItem("resources"))          || {};
  progress           = JSON.parse(localStorage.getItem("progress"))           || {};
  studentProfiles    = JSON.parse(localStorage.getItem("studentProfiles"))    || {};
  studentPasswords   = JSON.parse(localStorage.getItem("studentPasswords"))   || {};
  teacherPasswords   = JSON.parse(localStorage.getItem("teacherPasswords"))   || {};
};
window.reloadState();

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

