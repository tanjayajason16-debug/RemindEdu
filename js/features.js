// --- features.js ---
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

