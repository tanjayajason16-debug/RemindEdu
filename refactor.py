import sys, re, os

print('Starting refactor...')
html_path = r'c:\Users\User\Downloads\sc project\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Extract CSS
print('Extracting CSS...')
style_match = re.search(r'<style>(.*?)</style>', text, flags=re.DOTALL)
if style_match:
    css_content = style_match.group(1).strip()
    with open(r'c:\Users\User\Downloads\sc project\style.css', 'w', encoding='utf-8') as f:
        f.write(css_content)
    text = text.replace(style_match.group(0), '<link rel="stylesheet" href="style.css">')

# 2. Extract JS
print('Extracting JS...')
script_match = re.search(r'<script>(.*?)</script>', text, flags=re.DOTALL)
if script_match:
    js_content = script_match.group(1).strip()
    with open(r'c:\Users\User\Downloads\sc project\app_temp.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    text = text.replace(script_match.group(0), '<script type="module" src="app.js"></script>')

# 3. Write back HTML
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(text)

print('Done HTML splitting.')
