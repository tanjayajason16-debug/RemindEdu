import sys, os, re

bundle_path = r'c:\Users\User\Downloads\sc project\app_temp.js'
html_path = r'c:\Users\User\Downloads\sc project\index.html'
js_dir = r'c:\Users\User\Downloads\sc project\js'

os.makedirs(js_dir, exist_ok=True)

with open(bundle_path, 'r', encoding='utf-8') as f:
    js_text = f.read()

# Define split points using comments
# We will split based on the existing comments like "/* ── Auth helpers ── */"
chunks = {
    'config.js': (r'/\* ── Constants ── \*/', r'/\* ══ State ══ \*/'),
    'state.js': (r'/\* ══ State ══ \*/', r'/\* ── DOM refs ── \*/'),
    'ui.js': (r'/\* ── DOM refs ── \*/', r'/\* ── Auth helpers ── \*/'),
    'auth.js': (r'/\* ── Auth helpers ── \*/', r'/\* ── Utility ── \*/'),
    'utils.js': (r'/\* ── Utility ── \*/', r'/\* ── Student helpers ── \*/'),
    'student.js': (r'/\* ── Student helpers ── \*/', r'/\* ── Data helpers ── \*/'),
    'data.js': (r'/\* ── Data helpers ── \*/', r'/\* ── Schedule ── \*/'),
    'schedule.js': (r'/\* ── Schedule ── \*/', r'/\* ── Homework ── \*/'),
    'homework.js': (r'/\* ── Homework ── \*/', r'/\* ── Submissions ── \*/'),
    'submissions.js': (r'/\* ── Submissions ── \*/', r'/\* ── Streak / XP ── \*/'),
    'progress.js': (r'/\* ── Streak / XP ── \*/', r'/\* ── Approval panel ── \*/'),
    'approval.js': (r'/\* ── Approval panel ── \*/', r'/\* ── Progress \(SISWA ONLY — admin bug fixed here\) ── \*/'),
    'dashboard.js': (r'/\* ── Progress \(SISWA ONLY — admin bug fixed here\) ── \*/', r'/\* ── Classroom Pulse \(admin bug fixed\) ── \*/'),
    'pulse.js': (r'/\* ── Classroom Pulse \(admin bug fixed\) ── \*/', r'/\* ── Announcements ── \*/'),
    'announcements.js': (r'/\* ── Announcements ── \*/', r'/\* ── Resources ── \*/'),
    'resources.js': (r'/\* ── Resources ── \*/', r'/\* ── Admin panel ── \*/'),
    'admin.js': (r'/\* ── Admin panel ── \*/', r'/\* ── Admin view-as ── \*/'),
    'admin_view.js': (r'/\* ── Admin view-as ── \*/', r'/\* ── Account settings ── \*/'),
    'settings.js': (r'/\* ── Account settings ── \*/', r'/\* ── Modals ── \*/'),
    'modals.js': (r'/\* ── Modals ── \*/', r'/\* ════════════════════════════════════════════════════════'),
    'features.js': (r'/\* ════════════════════════════════════════════════════════', r'/\* Settings functions below — T/appLang/t\(\) declared at top of script \*/'),
    'app.js': (r'/\* Settings functions below — T/appLang/t\(\) declared at top of script \*/', None)
}

# Instead of brittle regexing, let me just split the text by "/* ──"
parts = re.split(r'(?=/\* ──)', js_text)

# We'll just define broad categories and group the parts
groups = {
    'config.js': [],
    'data_state.js': [],
    'ui_core.js': [],
    'auth.js': [],
    'dashboard_components.js': [],
    'features.js': [],
    'admin_settings.js': [],
    'app.js': []
}

# Manually group them by inspecting the text
# This script will extract them correctly into files.

groups['config.js'].append(js_text[:js_text.find('/* ── DOM refs ── */')])
js_text = js_text[js_text.find('/* ── DOM refs ── */'):]

groups['ui_core.js'].append(js_text[:js_text.find('/* ── Login ── */')])
js_text = js_text[js_text.find('/* ── Login ── */'):]

groups['auth.js'].append(js_text[:js_text.find('/* ── Utility ── */')])
js_text = js_text[js_text.find('/* ── Utility ── */'):]

groups['data_state.js'].append(js_text[:js_text.find('/* ── Schedule ── */')])
js_text = js_text[js_text.find('/* ── Schedule ── */'):]

groups['dashboard_components.js'].append(js_text[:js_text.find('/* ── Admin panel ── */')])
js_text = js_text[js_text.find('/* ── Admin panel ── */'):]

groups['admin_settings.js'].append(js_text[:js_text.find('/* ════════════════════════════════════════════════════════')])
js_text = js_text[js_text.find('/* ════════════════════════════════════════════════════════'):]

groups['features.js'].append(js_text[:js_text.find('/* Settings functions below')])
js_text = js_text[js_text.find('/* Settings functions below'):]

groups['app.js'].append(js_text)

script_tags = ""
for filename, contents in groups.items():
    content = "".join(contents)
    file_path = os.path.join(js_dir, filename)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write('// --- ' + filename + ' ---\n' + content)
    script_tags += f'<script src="js/{filename}"></script>\n'

# Add the script tags to index.html
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the module tag we added previously
html = html.replace('<script type="module" src="app.js"></script>', script_tags)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('JS successfully split into organized modules!')
