const VAR_MAP = {
  bg: '--bdt-bg', fg: '--bdt-fg', keyword: '--bdt-keyword', operator: '--bdt-operator',
  string: '--bdt-string', comment: '--bdt-comment', function: '--bdt-function',
  number: '--bdt-number', class: '--bdt-class', punctuation: '--bdt-punctuation',
  addBg: '--bdt-add-bg', addGutter: '--bdt-add-gutter', delBg: '--bdt-del-bg',
  delGutter: '--bdt-del-gutter', hunkBg: '--bdt-hunk-bg', hunkFg: '--bdt-hunk-fg',
};

function buildThemeVars(theme, typography) {
  const decls = [];
  for (const role of Object.keys(VAR_MAP)) {
    decls.push(`${VAR_MAP[role]}:${theme[role]}`);
  }
  decls.push(`--bdt-font-size:${typography.fontSize}px`);
  decls.push(`--bdt-line-height:${typography.lineHeight}`);
  decls.push(`--bdt-font-family:${typography.fontFamily}`);
  return `:root {\n  ${decls.join(';\n  ')};\n}`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VAR_MAP, buildThemeVars };
}
