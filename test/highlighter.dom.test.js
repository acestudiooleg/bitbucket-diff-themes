const { test, before } = require('node:test');
const assert = require('node:assert');
const { JSDOM } = require('jsdom');
const { highlightElement, restoreElement } = require('../src/highlighter.js');

let document;
before(() => { document = new JSDOM('<!DOCTYPE html><body></body>').window.document; });

const Prism = {
  languages: { javascript: {} },
  highlight: (raw) => `<span class="token keyword">${raw}</span>`,
};

function makeLine(text) {
  const el = document.createElement('span');
  el.className = 'code-diff';
  el.textContent = text;
  return el;
}

test('highlightElement tokenizes, marks done, caches original', () => {
  const cache = new WeakMap();
  const el = makeLine('const x = 1;');
  highlightElement(el, 'javascript', Prism, cache);
  assert.ok(el.innerHTML.includes('token keyword'));
  assert.ok(el.hasAttribute('data-bdt-done'));
  assert.strictEqual(cache.get(el), 'const x = 1;');
});

test('highlightElement is idempotent (skips when already done)', () => {
  const cache = new WeakMap();
  const el = makeLine('a');
  highlightElement(el, 'javascript', Prism, cache);
  const first = el.innerHTML;
  highlightElement(el, 'javascript', Prism, cache);
  assert.strictEqual(el.innerHTML, first);
});

test('unknown language leaves text but still marks done', () => {
  const cache = new WeakMap();
  const el = makeLine('plain text');
  highlightElement(el, null, Prism, cache);
  assert.strictEqual(el.textContent, 'plain text');
  assert.ok(el.hasAttribute('data-bdt-done'));
});

test('restoreElement puts back the original and clears the marker', () => {
  const cache = new WeakMap();
  const el = makeLine('const y = 2;');
  highlightElement(el, 'javascript', Prism, cache);
  restoreElement(el, cache);
  assert.strictEqual(el.innerHTML, 'const y = 2;');
  assert.ok(!el.hasAttribute('data-bdt-done'));
});
