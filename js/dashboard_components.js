// --- dashboard_components.js ---
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

