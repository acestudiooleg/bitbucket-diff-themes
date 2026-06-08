#!/usr/bin/env python3
"""Generate docs/preview.svg + docs/preview.png for the README (no real user code)."""
import os, cairosvg

MONO = "Noto Sans Mono, monospace"
# Monokai roles
KW="#f92672"; STR="#e6db74"; FN="#a6e22e"; CLS="#66d9ef"; NUM="#ae81ff"; CMT="#75715e"; FG="#f8f8f2"
BG="#272822"; GUT="#21211c"; ADD="rgba(166,226,46,0.16)"; DEL="rgba(249,38,114,0.16)"
ADDG="#a6e22e"; DELG="#f92672"

def esc(s): return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")

# (type, number, sign, tokens[(text,color[,italic])])
LINES = [
  ("ctx", 12, " ", [("import ",KW),("{ ",FG),("CircleROITool",CLS,1),(" }",FG),(" from ",KW),("'@cs/tools'",STR),(";",FG)]),
  ("ctx", 13, " ", []),
  ("ctx", 14, " ", [("class ",KW),("DynamikaCircleROI",CLS,1),(" extends ",KW),("CircleROITool",CLS,1),(" {",FG)]),
  ("del", 15, "-", [("  ",FG),("return",KW),(" sum;",FG)]),
  ("add", 15, "+", [("  ",FG),("return",KW),(" ",FG),("Math",CLS,1),(".",FG),("round",FN),("(",FG),("sum ",FG),("*",KW),(" ",FG),("100",NUM),(")",FG),(" / ",FG),("100",NUM),(";",FG)]),
  ("add", 16, "+", [("  ",FG),("// rounded to 2 decimals",CMT,1)]),
  ("ctx", 17, " ", [("}",FG)]),
]

X0, Y0, W = 20, 20, 840
TITLE_H = 36
LH = 26
GUT_R = 64          # gutter right edge (numbers right-aligned here)
SIGN_X = 74
CODE_X = 92
diff_top = Y0 + TITLE_H
diff_h = len(LINES) * LH
CARD_H = TITLE_H + diff_h + 14

s = []
def add(x): s.append(x)

# ---- diff card ----
add(f'<rect x="{X0}" y="{Y0}" width="{W}" height="{CARD_H}" rx="12" fill="{BG}"/>')
# title bar
add(f'<rect x="{X0}" y="{Y0}" width="{W}" height="{TITLE_H}" rx="12" fill="#1f1f1a"/>')
add(f'<rect x="{X0}" y="{Y0+TITLE_H-12}" width="{W}" height="12" fill="#1f1f1a"/>')
for i,c in enumerate(["#ff5f57","#febc2e","#28c840"]):
    add(f'<circle cx="{X0+20+i*20}" cy="{Y0+TITLE_H/2}" r="6" fill="{c}"/>')
add(f'<text x="{X0+W/2}" y="{Y0+TITLE_H/2+5}" text-anchor="middle" font-family="{MONO}" '
    f'font-size="14" fill="#9b9b8f">PR diff &#183; Monokai</text>')
# gutter strip
add(f'<rect x="{X0}" y="{diff_top}" width="{GUT_R-X0+4}" height="{diff_h}" fill="{GUT}"/>')

# rows
for i,(typ,num,sign,toks) in enumerate(LINES):
    ry = diff_top + i*LH
    base = ry + LH - 8  # text baseline
    if typ == "add": add(f'<rect x="{GUT_R+6}" y="{ry}" width="{X0+W-(GUT_R+6)}" height="{LH}" fill="{ADD}"/>')
    if typ == "del": add(f'<rect x="{GUT_R+6}" y="{ry}" width="{X0+W-(GUT_R+6)}" height="{LH}" fill="{DEL}"/>')
    # line number
    numcol = DELG if typ=="del" else (ADDG if typ=="add" else "#6b6b5e")
    add(f'<text x="{GUT_R-6}" y="{base}" text-anchor="end" font-family="{MONO}" font-size="14" '
        f'fill="{numcol}">{num}</text>')
    # sign
    if sign != " ":
        add(f'<text x="{SIGN_X}" y="{base}" font-family="{MONO}" font-size="15" fill="{numcol}">{sign}</text>')
    # code tokens (flowing tspans)
    spans = []
    for t in toks:
        text = esc(t[0]); color = t[1]; ital = len(t) > 2 and t[2]
        st = f' font-style="italic"' if ital else ""
        spans.append(f'<tspan fill="{color}"{st}>{text}</tspan>')
    add(f'<text x="{CODE_X}" y="{base}" xml:space="preserve" font-family="{MONO}" '
        f'font-size="15">{"".join(spans)}</text>')

# ---- theme swatches ----
THEMES = [
  ("Monokai","#272822","#f92672","#e6db74","#a6e22e"),
  ("Monokai Pro","#2d2a2e","#ff6188","#ffd866","#a9dc76"),
  ("GitHub Light","#ffffff","#cf222e","#0a3069","#8250df"),
  ("One Dark","#282c34","#c678dd","#98c379","#61afef"),
  ("Dracula","#282a36","#ff79c6","#f1fa8c","#50fa7b"),
  ("Nord","#2e3440","#81a1c1","#a3be8c","#88c0d0"),
  ("Tokyo Night","#1a1b26","#bb9af7","#9ece6a","#7aa2f7"),
  ("Gruvbox","#282828","#fb4934","#b8bb26","#fabd2f"),
  ("GitHub Dark","#0d1117","#ff7b72","#a5d6ff","#d2a8ff"),
  ("Solarized","#002b36","#859900","#2aa198","#268bd2"),
  ("Night Owl","#011627","#c792ea","#ecc48d","#82aaff"),
]
sw_y = Y0 + CARD_H + 22
n = len(THEMES); gap = 8
cw = (W - gap*(n-1)) / n
for i,(name,bg,a,b,c) in enumerate(THEMES):
    cx = X0 + i*(cw+gap)
    add(f'<rect x="{cx}" y="{sw_y}" width="{cw}" height="44" rx="7" fill="{bg}" stroke="#3a3a32" stroke-width="1"/>')
    for j,col in enumerate((a,b,c)):
        add(f'<rect x="{cx+8}" y="{sw_y+10+j*9}" width="{cw-16-(j*6)}" height="4.5" rx="2.25" fill="{col}"/>')

cap_y = sw_y + 44 + 20
names = "  ·  ".join(t[0] for t in THEMES)
add(f'<text x="{X0+W/2}" y="{cap_y}" text-anchor="middle" font-family="{MONO}" font-size="11" '
    f'fill="#8a8a7e">{esc(names)}</text>')

TOTAL_H = cap_y + 16
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{X0*2+W}" height="{TOTAL_H}" '
       f'viewBox="0 0 {X0*2+W} {TOTAL_H}">'
       f'<rect width="{X0*2+W}" height="{TOTAL_H}" rx="16" fill="#16160f"/>'
       + "".join(s) + '</svg>')

os.makedirs("docs", exist_ok=True)
open("docs/preview.svg","w").write(svg)
cairosvg.svg2png(bytestring=svg.encode(), write_to="docs/preview.png", output_width=(X0*2+W)*2, output_height=TOTAL_H*2)
print("wrote docs/preview.svg and docs/preview.png", X0*2+W, "x", TOTAL_H)
