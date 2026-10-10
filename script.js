const starter = `import 'package:flutter/material.dart';

void main() => runApp(const OneSpxcApp());

class OneSpxcApp extends StatelessWidget {
  const OneSpxcApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'OneSpxc Tools',
      theme: ThemeData.dark(),
      home: const DashboardPage(),
    );
  }
}

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF080808),
      appBar: AppBar(title: const Text('OneSpxc Tools')),
      body: const Center(
        child: Text('Build something extraordinary.'),
      ),
    );
  }
}`;

const $ = id => document.getElementById(id);
const source = $('source');
const gutter = $('gutter');
const fileInput = $('fileInput');
const toast = $('toast');
let loadedName = 'main.dart';
let savedSource = starter;

function syncEditor() {
  const lines = source.value.split('\n').length;
  gutter.textContent = Array.from({length: lines}, (_, i) => i + 1).join('\n');
  $('stats').textContent = `${lines} lines · ${source.value.length} chars`;
}
function say(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(say.timer);
  say.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}
function safeText(value) { return String(value).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
function applyPreview() {
  const appName = $('editAppName').value.trim() || 'OneSpxc Tools';
  const tagline = $('editTagline').value.trim();
  const headline = $('editHeadline').value.trim() || 'Build something extraordinary.';
  const subtitle = $('editSubtitle').value.trim();
  const cta = $('editCta').value.trim() || 'EXPLORE TOOLS';
  const section = $('editSection').value.trim() || 'Tool collection';
  const accent = $('editAccent').value;
  const bg = $('editBg').value;
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--bg', bg);
  $('appName').textContent = appName;
  $('appTagline').textContent = tagline;
  $('heroTitle').innerHTML = safeText(headline).replace(/\n/g, '<br>').replace(/(extraordinary\.|extraordinary|extraordinario)/i, '<em>$1</em>');
  $('heroSubtitle').textContent = subtitle;
  $('heroCta').textContent = cta.toUpperCase() + ' ↗';
  $('sectionTitle').textContent = section;
  const icons = ['✳','▧','⌘','▤','⌕','◇','↗','⌁'];
  const rows = $('editTools').value.split('\n').map(s => s.trim()).filter(Boolean).map(line => {
    const parts = line.split('|').map(s => s.trim());
    return {name:parts[0] || 'Tool', desc:parts[1] || 'Utility tool', status:parts[2] || 'COMING SOON'};
  });
  $('cards').innerHTML = rows.map((row, i) => `<article class="tool-card"><span class="tool-icon">${icons[i % icons.length]}</span><b>${safeText(row.name)}</b><p>${safeText(row.desc)}</p><small>${safeText(row.status.toUpperCase())}</small></article>`).join('');
  $('previewState').textContent = 'Preview updated from design controls';
  say('Preview berhasil diperbarui');
}
source.value = starter;
syncEditor();
applyPreview();
source.addEventListener('input', syncEditor);
source.addEventListener('scroll', () => { gutter.scrollTop = source.scrollTop; });
fileInput.addEventListener('change', async e => {
  const file = e.target.files?.[0];
  if (!file) return;
  loadedName = file.name;
  savedSource = await file.text();
  source.value = savedSource;
  $('currentFile').textContent = loadedName;
  $('crumbFile').textContent = loadedName;
  syncEditor();
  say(`${loadedName} loaded — edit bebas`);
});
$('downloadBtn').addEventListener('click', () => {
  const blob = new Blob([source.value], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = loadedName.endsWith('.dart') ? loadedName : 'main.dart';
  a.click();
  URL.revokeObjectURL(url);
  say('File Dart berhasil diunduh');
});
$('resetBtn').addEventListener('click', () => {
  source.value = savedSource;
  syncEditor();
  say('Source dikembalikan ke file yang dibuka');
});
$('sampleBtn').addEventListener('click', () => {
  loadedName = 'main.dart';
  savedSource = starter;
  source.value = starter;
  $('currentFile').textContent = loadedName;
  $('crumbFile').textContent = loadedName;
  syncEditor();
  say('Sample Dart dimuat');
});
$('applyBtn').addEventListener('click', applyPreview);
$('refreshBtn').addEventListener('click', applyPreview);
