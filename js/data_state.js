// --- data_state.js ---
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

