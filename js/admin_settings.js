// --- admin_settings.js ---
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
  
  const nn=document.getElementById("newProfileName") ? document.getElementById("newProfileName").value.trim() : "";
  const np=document.getElementById("newPassword").value;
  const cp=document.getElementById("confirmPassword").value;
  const pi=document.getElementById("profilePhoto");

  if(nn) {
    if(!studentProfiles[sk]) studentProfiles[sk]={};
    studentProfiles[sk].name = nn;
    localStorage.setItem("studentProfiles",JSON.stringify(studentProfiles));
  }

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
      updateNavUser();
    };
    reader.readAsDataURL(pi.files[0]);
  } else {
    renderProgress();
    updateNavUser();
  }
  
  if(document.getElementById("newProfileName")) document.getElementById("newProfileName").value="";
  document.getElementById("newPassword").value="";
  document.getElementById("confirmPassword").value="";
  if(pi) pi.value="";

  alert("Profil berhasil diperbarui!");
  toggleAccountSettings();
}

function removeProfilePhoto(){
  if(!currentUser||currentUser.role!=="siswa") return;
  const sk=getStudentKey(); if(!sk) return;
  if(!studentProfiles[sk]) studentProfiles[sk]={};
  delete studentProfiles[sk].photo;
  localStorage.setItem("studentProfiles",JSON.stringify(studentProfiles));
  const pi=document.getElementById("profilePhoto"); if(pi) pi.value="";
  renderProgress();
  updateNavUser();
}

function saveTeacherSettings(){
  if(!currentUser||currentUser.role!=="guru") return;
  
  const nn=document.getElementById("newTeacherName") ? document.getElementById("newTeacherName").value.trim() : "";
  const np=document.getElementById("newTeacherPassword").value;
  const cp=document.getElementById("confirmTeacherPassword").value;
  
  if(nn) {
    // We can store teacher names in studentProfiles using the class name as the key
    if(!studentProfiles[currentUser.kelas]) studentProfiles[currentUser.kelas]={};
    studentProfiles[currentUser.kelas].name = nn;
    localStorage.setItem("studentProfiles",JSON.stringify(studentProfiles));
    updateNavUser();
  }

  if(np || cp){
    if(np.length<4) return showAuthMessage(t('pwdMinLength'));
    if(np!==cp)     return showAuthMessage(t('pwdNotMatch'));
    teacherPasswords[currentUser.kelas]=np;
    localStorage.setItem("teacherPasswords",JSON.stringify(teacherPasswords));
  }

  if(document.getElementById("newTeacherName")) document.getElementById("newTeacherName").value="";
  if(document.getElementById("newTeacherPassword")) document.getElementById("newTeacherPassword").value="";
  if(document.getElementById("confirmTeacherPassword")) document.getElementById("confirmTeacherPassword").value="";
  
  alert("Akun Guru berhasil diperbarui!");
  toggleAccountSettings();
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
function logout(){ 
  localStorage.removeItem('currentUser');
  location.reload(); 
}
