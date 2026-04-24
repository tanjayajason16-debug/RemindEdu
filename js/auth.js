// --- auth.js ---
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

