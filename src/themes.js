const THEME_ROLES = [
  'bg', 'fg', 'keyword', 'operator', 'string', 'comment', 'function',
  'number', 'class', 'punctuation', 'addBg', 'addGutter', 'delBg',
  'delGutter', 'hunkBg', 'hunkFg',
];

const THEMES = {
  monokai: {
    label: 'Monokai', bg: '#272822', fg: '#f8f8f2', keyword: '#f92672',
    operator: '#f92672', string: '#e6db74', comment: '#75715e',
    function: '#a6e22e', number: '#ae81ff', class: '#66d9ef',
    punctuation: '#f8f8f2', addBg: 'rgba(166,226,46,0.10)', addGutter: '#a6e22e',
    delBg: 'rgba(249,38,114,0.12)', delGutter: '#f92672', hunkBg: '#3e3d32', hunkFg: '#75715e',
  },
  monokaiPro: {
    label: 'Monokai Pro', bg: '#2d2a2e', fg: '#fcfcfa', keyword: '#ff6188',
    operator: '#ff6188', string: '#ffd866', comment: '#727072',
    function: '#a9dc76', number: '#ab9df2', class: '#78dce8',
    punctuation: '#939293', addBg: 'rgba(169,220,118,0.10)', addGutter: '#a9dc76',
    delBg: 'rgba(255,97,136,0.13)', delGutter: '#ff6188', hunkBg: '#403e41', hunkFg: '#727072',
  },
  onedark: {
    label: 'One Dark', bg: '#282c34', fg: '#abb2bf', keyword: '#c678dd',
    operator: '#56b6c2', string: '#98c379', comment: '#5c6370',
    function: '#61afef', number: '#d19a66', class: '#e5c07b',
    punctuation: '#abb2bf', addBg: 'rgba(152,195,121,0.10)', addGutter: '#98c379',
    delBg: 'rgba(224,108,117,0.12)', delGutter: '#e06c75', hunkBg: '#2f343e', hunkFg: '#5c6370',
  },
  dracula: {
    label: 'Dracula', bg: '#282a36', fg: '#f8f8f2', keyword: '#ff79c6',
    operator: '#ff79c6', string: '#f1fa8c', comment: '#6272a4',
    function: '#50fa7b', number: '#bd93f9', class: '#8be9fd',
    punctuation: '#f8f8f2', addBg: 'rgba(80,250,123,0.10)', addGutter: '#50fa7b',
    delBg: 'rgba(255,85,85,0.12)', delGutter: '#ff5555', hunkBg: '#343746', hunkFg: '#6272a4',
  },
  nord: {
    label: 'Nord', bg: '#2e3440', fg: '#d8dee9', keyword: '#81a1c1',
    operator: '#81a1c1', string: '#a3be8c', comment: '#616e88',
    function: '#88c0d0', number: '#b48ead', class: '#8fbcbb',
    punctuation: '#d8dee9', addBg: 'rgba(163,190,140,0.12)', addGutter: '#a3be8c',
    delBg: 'rgba(191,97,106,0.14)', delGutter: '#bf616a', hunkBg: '#3b4252', hunkFg: '#616e88',
  },
  tokyo: {
    label: 'Tokyo Night', bg: '#1a1b26', fg: '#a9b1d6', keyword: '#bb9af7',
    operator: '#89ddff', string: '#9ece6a', comment: '#565f89',
    function: '#7aa2f7', number: '#ff9e64', class: '#2ac3de',
    punctuation: '#a9b1d6', addBg: 'rgba(158,206,106,0.12)', addGutter: '#9ece6a',
    delBg: 'rgba(247,118,142,0.14)', delGutter: '#f7768e', hunkBg: '#24283b', hunkFg: '#565f89',
  },
  gruvbox: {
    label: 'Gruvbox Dark', bg: '#282828', fg: '#ebdbb2', keyword: '#fb4934',
    operator: '#fe8019', string: '#b8bb26', comment: '#928374',
    function: '#fabd2f', number: '#d3869b', class: '#fabd2f',
    punctuation: '#ebdbb2', addBg: 'rgba(184,187,38,0.12)', addGutter: '#b8bb26',
    delBg: 'rgba(251,73,52,0.14)', delGutter: '#fb4934', hunkBg: '#3c3836', hunkFg: '#928374',
  },
  github: {
    label: 'GitHub Dark', bg: '#0d1117', fg: '#c9d1d9', keyword: '#ff7b72',
    operator: '#ff7b72', string: '#a5d6ff', comment: '#8b949e',
    function: '#d2a8ff', number: '#79c0ff', class: '#ffa657',
    punctuation: '#c9d1d9', addBg: 'rgba(63,185,80,0.12)', addGutter: '#3fb950',
    delBg: 'rgba(248,81,73,0.12)', delGutter: '#f85149', hunkBg: '#161b22', hunkFg: '#8b949e',
  },
  solarized: {
    label: 'Solarized Dark', bg: '#002b36', fg: '#839496', keyword: '#859900',
    operator: '#859900', string: '#2aa198', comment: '#586e75',
    function: '#268bd2', number: '#d33682', class: '#b58900',
    punctuation: '#839496', addBg: 'rgba(133,153,0,0.14)', addGutter: '#859900',
    delBg: 'rgba(220,50,47,0.14)', delGutter: '#dc322f', hunkBg: '#073642', hunkFg: '#586e75',
  },
  nightowl: {
    label: 'Night Owl', bg: '#011627', fg: '#d6deeb', keyword: '#c792ea',
    operator: '#7fdbca', string: '#ecc48d', comment: '#637777',
    function: '#82aaff', number: '#f78c6c', class: '#ffcb8b',
    punctuation: '#d6deeb', addBg: 'rgba(173,219,103,0.10)', addGutter: '#addb67',
    delBg: 'rgba(239,83,80,0.14)', delGutter: '#ef5350', hunkBg: '#0b2942', hunkFg: '#637777',
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { THEMES, THEME_ROLES };
}
