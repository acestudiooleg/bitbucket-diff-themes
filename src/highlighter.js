const EXT_TO_LANG = {
  js: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'jsx',
  ts: 'typescript', tsx: 'tsx', json: 'json', py: 'python', java: 'java',
  c: 'c', h: 'c', cpp: 'cpp', cc: 'cpp', cxx: 'cpp', hpp: 'cpp',
  cs: 'csharp', go: 'go', rs: 'rust', rb: 'ruby', php: 'php',
  sh: 'bash', bash: 'bash', zsh: 'bash', yml: 'yaml', yaml: 'yaml',
  sql: 'sql', css: 'css', scss: 'scss', md: 'markdown', markdown: 'markdown',
  html: 'markup', htm: 'markup', xml: 'markup', vue: 'markup', svelte: 'markup',
};

function langForPath(path) {
  if (!path) return null;
  const base = path.split('/').pop();
  const dot = base.lastIndexOf('.');
  if (dot < 1) return null;
  const ext = base.slice(dot + 1).toLowerCase();
  return EXT_TO_LANG[ext] || null;
}

function highlightElement(el, lang, Prism, cache) {
  if (el.hasAttribute('data-bdt-done')) return;
  if (cache && !cache.has(el)) cache.set(el, el.innerHTML);
  if (lang && Prism && Prism.languages[lang]) {
    try {
      el.innerHTML = Prism.highlight(el.textContent, Prism.languages[lang], lang);
    } catch (e) {
      /* leave raw text on failure */
    }
  }
  el.setAttribute('data-bdt-done', '');
}

function restoreElement(el, cache) {
  if (cache && cache.has(el)) {
    el.innerHTML = cache.get(el);
    cache.delete(el);
  }
  el.removeAttribute('data-bdt-done');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXT_TO_LANG, langForPath, highlightElement, restoreElement };
}
