// src/content.js — CSS-only theming for Bitbucket PR diffs.
//
// Bitbucket renders diffs with React. Mutating React-owned nodes (e.g. rewriting
// a line's innerHTML) corrupts the reconciler and crashes the page with
// "removeChild: node is not a child" errors. So this script performs ZERO
// per-node DOM mutation. It only:
//   1. injects a single <style id="bdt-vars"> holding the chosen palette's
//      CSS custom properties + typography, and
//   2. toggles a [data-bdt-on] attribute on <html> (which React does not own).
// selectors.css (injected by the manifest) recolors the diff's existing token
// spans + line backgrounds, gated on html[data-bdt-on]. CSS is declarative, so it
// styles current and future diff rows automatically — no MutationObserver needed.
(function () {
  const VARS_STYLE_ID = 'bdt-vars';
  let settings = null;

  function applyVars() {
    let style = document.getElementById(VARS_STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = VARS_STYLE_ID;
      (document.head || document.documentElement).appendChild(style);
    }
    const theme = THEMES[settings.theme] || THEMES.monokai;
    style.textContent = buildThemeVars(theme, {
      fontSize: settings.fontSize,
      lineHeight: settings.lineHeight,
      fontFamily: settings.fontFamily,
    });
  }

  function enable() {
    applyVars();
    document.documentElement.setAttribute('data-bdt-on', '');
  }

  function disable() {
    document.documentElement.removeAttribute('data-bdt-on');
    const style = document.getElementById(VARS_STYLE_ID);
    if (style) style.remove();
  }

  function applyState() {
    if (settings.enabled) enable();
    else disable();
  }

  // Boot: load settings, apply.
  chrome.storage.sync.get(null, (stored) => {
    settings = withDefaults(stored);
    applyState();
  });

  // React to popup changes (theme, typography, on/off) — live, no reload.
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync' || !settings) return;
    const patch = {};
    for (const key of Object.keys(changes)) patch[key] = changes[key].newValue;
    settings = withDefaults(Object.assign({}, settings, patch));
    applyState();
  });
})();
