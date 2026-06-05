// src/content.js — orchestrates highlighting + theming on Bitbucket PR diffs.
(function () {
  const SELECTORS_STYLE_ID = 'bdt-selectors-marker'; // CSS file already injected via manifest
  const VARS_STYLE_ID = 'bdt-vars';
  const cache = new WeakMap();
  let settings = null;
  let observer = null;

  function typographyOf(s) {
    return { fontSize: s.fontSize, lineHeight: s.lineHeight, fontFamily: s.fontFamily };
  }

  function applyVars() {
    let style = document.getElementById(VARS_STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = VARS_STYLE_ID;
      document.documentElement.appendChild(style);
    }
    const theme = THEMES[settings.theme] || THEMES.monokai;
    style.textContent = buildThemeVars(theme, typographyOf(settings));
  }

  function removeVars() {
    const style = document.getElementById(VARS_STYLE_ID);
    if (style) style.remove();
  }

  function langForLine(lineEl) {
    const article = lineEl.closest('[data-qa="branch-diff-file"]');
    if (!article) return null;
    const label = article.getAttribute('aria-label') || '';
    const path = label.replace(/^Diff of file\s+/, '').trim();
    return langForPath(path);
  }

  function highlightAll(root) {
    const lines = (root || document).querySelectorAll('.code-diff:not([data-bdt-done])');
    lines.forEach((el) => highlightElement(el, langForLine(el), Prism, cache));
  }

  function restoreAll() {
    document.querySelectorAll('.code-diff[data-bdt-done]').forEach((el) => restoreElement(el, cache));
  }

  function startObserver() {
    const region = document.querySelector('[role="region"][aria-label="Diff"]') || document.body;
    observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches && node.matches('.code-diff')) {
            highlightElement(node, langForLine(node), Prism, cache);
          } else if (node.querySelectorAll) {
            highlightAll(node);
          }
        }
      }
    });
    observer.observe(region, { childList: true, subtree: true });
  }

  function stopObserver() {
    if (observer) { observer.disconnect(); observer = null; }
  }

  function enable() {
    document.documentElement.setAttribute('data-bdt-on', '');
    applyVars();
    highlightAll(document);
    if (!observer) startObserver();
  }

  function disable() {
    document.documentElement.removeAttribute('data-bdt-on');
    stopObserver();
    removeVars();
    restoreAll();
  }

  function applyState() {
    if (settings.enabled) enable();
    else disable();
  }

  // Boot
  chrome.storage.sync.get(null, (stored) => {
    settings = withDefaults(stored);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyState, { once: true });
    } else {
      applyState();
    }
  });

  // React to popup changes
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync' || !settings) return;
    const next = withDefaults(Object.assign({}, settings, mapChanges(changes)));
    const wasEnabled = settings.enabled;
    settings = next;
    if (!settings.enabled) { disable(); return; }
    if (!wasEnabled) { enable(); return; }
    // Enabled before and after: just refresh vars (theme/typography may have changed).
    applyVars();
  });

  function mapChanges(changes) {
    const out = {};
    for (const key of Object.keys(changes)) out[key] = changes[key].newValue;
    return out;
  }
})();
