const pptxgen = require("pptxgenjs");
const path = require("path");

const A = "C:/Users/siaob/code/20260619-amy-bubble-wrap-process-ppt/assets/gpt-images/";
const IMG = {
  whatis: A + "what-is-1.jpg",
  material: A + "material-2.jpg",
  step1: A + "step1-extrude-1.jpg",
  step2: A + "step2-bubble-1.jpg",
  step3: A + "step3-seal-2.jpg",
  step5: A + "step5-rewind-2.jpg",
  spec: A + "spec-1.jpg",
};

// ── 鮮明編輯風 色票 ──
const INK = "1A1714";       // 暖黑
const CREAM = "FAF6EF";     // 暖米白底
const CREAMTX = "F5EFE6";   // 深色頁文字
const ACCENT = "E8590C";    // 鮮橘
const BROWN = "8A5A2B";     // 暖棕（小標）
const MUTED = "8C8275";     // 次要灰
const BODY = "433B31";      // 內文
const CARDLINE = "E6DDCC";  // 米白卡片邊
const FONT = "Microsoft JhengHei";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "氣泡布製程簡報";
pres.title = "氣泡布製程介紹";
const PW = 13.333, PH = 7.5;

const shadow = () => ({ type: "outer", color: "1A1714", blur: 7, offset: 3, angle: 135, opacity: 0.16 });
const hardShadow = () => ({ type: "outer", color: "1A1714", blur: 0, offset: 5, angle: 135, opacity: 0.18 });

function eyebrow(slide, label, x, y, color = ACCENT) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y: y + 0.14, w: 0.42, h: 0.055, fill: { color } });
  slide.addText(label, { x: x + 0.56, y: y - 0.04, w: 8, h: 0.4, fontSize: 13, bold: true, color, charSpacing: 3, fontFace: FONT, margin: 0, valign: "middle" });
}

function footer(slide, n, dark) {
  const col = dark ? "A89B88" : MUTED;
  slide.addText("BUBBLE WRAP · 氣泡布製程", { x: 0.85, y: 6.98, w: 6, h: 0.34, fontSize: 10, bold: true, color: col, charSpacing: 2, fontFace: FONT, margin: 0, valign: "middle" });
  slide.addText([{ text: String(n).padStart(2, "0"), options: { color: ACCENT, bold: true } }, { text: "  —  13", options: { color: col, bold: true } }], { x: 9.4, y: 6.98, w: 3.08, h: 0.34, fontSize: 12, align: "right", fontFace: FONT, margin: 0, valign: "middle" });
}

function framedPhoto(slide, p, x, y, w, h, light) {
  const b = 0.05;
  slide.addShape(pres.shapes.RECTANGLE, { x: x - b, y: y - b, w: w + 2 * b, h: h + 2 * b, fill: { color: light ? CREAMTX : INK } });
  slide.addImage({ path: p, x, y, w, h, sizing: { type: "cover", w, h } });
  const c = 0.5, t = 0.08;
  // 右上 L
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - c, y: y - b - t, w: c + b, h: t, fill: { color: ACCENT } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w + b - t + t, y: y - b - t, w: t, h: c + b, fill: { color: ACCENT } });
  // 左下 L
  slide.addShape(pres.shapes.RECTANGLE, { x: x - b, y: y + h + b, w: c + b, h: t, fill: { color: ACCENT } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x - b, y: y + h - c, w: t, h: c + b, fill: { color: ACCENT } });
}

function arrowR(slide, x, y, w) { slide.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: ACCENT, width: 3.5, endArrowType: "triangle" } }); }
function arrowL(slide, x, y, w) { slide.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: ACCENT, width: 3.5, beginArrowType: "triangle" } }); }
function arrowD(slide, x, y, h) { slide.addShape(pres.shapes.LINE, { x, y, w: 0, h, line: { color: ACCENT, width: 3.5, endArrowType: "triangle" } }); }

// ════════════════ 1. 封面 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: INK };
  // 橘色右上角三角
  s.addShape(pres.shapes.RIGHT_TRIANGLE, { x: 10.93, y: 0, w: 2.4, h: 2.4, fill: { color: ACCENT }, flipH: true });
  eyebrow(s, "BUBBLE WRAP / 製程介紹", 0.95, 1.15, CREAMTX);
  s.addText(
    [
      { text: "氣泡布", options: { color: CREAMTX } },
      { text: "製程", options: { color: ACCENT } },
      { text: "介紹", options: { color: CREAMTX } },
    ],
    { x: 0.9, y: 2.0, w: 11, h: 2.0, fontSize: 78, bold: true, fontFace: FONT, margin: 0, valign: "middle", charSpacing: 1 }
  );
  s.addText("從塑膠粒到緩衝包材的製造流程", { x: 0.95, y: 4.35, w: 10, h: 0.6, fontSize: 22, color: "C9BEB0", fontFace: FONT, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.95, y: 5.75, w: 0.42, h: 0.055, fill: { color: ACCENT } });
  s.addText("採購專業人士簡報", { x: 1.5, y: 5.55, w: 6, h: 0.4, fontSize: 15, bold: true, color: "C9BEB0", charSpacing: 2, fontFace: FONT, margin: 0, valign: "middle" });
}

// ════════════════ 2. 氣泡布是什麼 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  eyebrow(s, "WHAT IS BUBBLE WRAP", 0.85, 0.7);
  s.addText("氣泡布是什麼？", { x: 0.85, y: 1.12, w: 8, h: 0.9, fontSize: 42, bold: true, color: INK, fontFace: FONT, margin: 0 });
  // 左：定義 + 用途/功能
  s.addText(
    [
      { text: "氣泡布是一種利用", options: {} },
      { text: "封閉空氣層", options: { color: ACCENT, bold: true } },
      { text: "提供緩衝保護的塑膠包裝材料。", options: {} },
    ],
    { x: 0.85, y: 2.35, w: 6.7, h: 0.9, fontSize: 20, color: INK, fontFace: FONT, margin: 0, lineSpacingMultiple: 1.2 }
  );
  s.addText("主要用途", { x: 0.85, y: 3.55, w: 6.7, h: 0.35, fontSize: 15, bold: true, color: BROWN, charSpacing: 1, fontFace: FONT, margin: 0 });
  s.addText("電子產品、精密零件、家具家電、電商物流、易碎品運輸", { x: 0.85, y: 3.92, w: 6.7, h: 0.6, fontSize: 17, color: BODY, fontFace: FONT, margin: 0, lineSpacingMultiple: 1.2 });
  s.addText("主要功能", { x: 0.85, y: 4.85, w: 6.7, h: 0.35, fontSize: 15, bold: true, color: BROWN, charSpacing: 1, fontFace: FONT, margin: 0 });
  s.addText("緩衝防震、吸收衝擊、防刮傷，有效降低運輸損壞率", { x: 0.85, y: 5.22, w: 6.7, h: 0.6, fontSize: 17, color: BODY, fontFace: FONT, margin: 0, lineSpacingMultiple: 1.2 });
  // 右：圖
  framedPhoto(s, IMG.whatis, 8.45, 1.95, 3.95, 3.95);
  footer(s, 2, false);
}

// ════════════════ 3. 原料 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  eyebrow(s, "RAW MATERIALS", 0.85, 0.7);
  s.addText("氣泡布的原料", { x: 0.85, y: 1.12, w: 8, h: 0.9, fontSize: 42, bold: true, color: INK, fontFace: FONT, margin: 0 });
  const groups = [
    ["主要原料", "LDPE（低密度聚乙烯）、LLDPE（線性低密度聚乙烯）"],
    ["添加材料", "抗靜電劑、色母粒、抗UV添加劑、再生料（部分產品）"],
    ["採購關注", "原料價格波動、再生料比例、RoHS／REACH 合規性、食品接觸認證需求"],
  ];
  let y = 2.45;
  groups.forEach(([label, body]) => {
    s.addText(label, { x: 0.85, y, w: 6.7, h: 0.35, fontSize: 15, bold: true, color: BROWN, charSpacing: 1, fontFace: FONT, margin: 0 });
    s.addText(body, { x: 0.85, y: y + 0.37, w: 6.7, h: 0.75, fontSize: 17, color: BODY, fontFace: FONT, margin: 0, lineSpacingMultiple: 1.2 });
    y += 1.45;
  });
  framedPhoto(s, IMG.material, 8.55, 2.1, 3.85, 3.85);
  footer(s, 3, false);
}

// ════════════════ 4. 製造流程總覽 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  eyebrow(s, "PROCESS OVERVIEW", 0.85, 0.62);
  s.addText("製造流程總覽", { x: 0.85, y: 1.0, w: 8, h: 0.95, fontSize: 44, bold: true, color: INK, fontFace: FONT, margin: 0 });
  s.addText(
    [
      { text: "後續逐步拆解", options: { color: MUTED } },
      { text: "五大關鍵製程", options: { color: ACCENT, bold: true } },
    ],
    { x: 7.0, y: 1.35, w: 5.45, h: 0.5, fontSize: 18, bold: true, align: "right", fontFace: FONT, margin: 0, valign: "middle" }
  );
  const BW = 2.9, BH = 1.05;
  const col = [1.0, 4.55, 8.1];
  const ry = [2.55, 4.0, 5.45];
  function box(x, y, label) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: BW, h: BH, rectRadius: 0.07, fill: { color: "FFFFFF" }, line: { color: INK, width: 3 }, shadow: hardShadow() });
    s.addText(label, { x: x + 0.1, y, w: BW - 0.2, h: BH, fontSize: label.length > 5 ? 18 : 21, bold: true, color: INK, align: "center", valign: "middle", fontFace: FONT, margin: 2 });
  }
  // row1 →
  box(col[0], ry[0], "塑膠粒");
  box(col[1], ry[0], "擠出熔融");
  box(col[2], ry[0], "形成薄膜");
  arrowR(s, col[0] + BW + 0.06, ry[0] + BH / 2, 0.53);
  arrowR(s, col[1] + BW + 0.06, ry[0] + BH / 2, 0.53);
  // down (right, under box3)
  arrowD(s, col[2] + BW / 2, ry[0] + BH + 0.04, ry[1] - (ry[0] + BH) - 0.08);
  // row2 ← : 真空吸塑(col2) 覆合封口(col1) 冷卻定型(col0)
  box(col[2], ry[1], "真空吸塑形成氣泡");
  box(col[1], ry[1], "覆合封口");
  box(col[0], ry[1], "冷卻定型");
  arrowL(s, col[1] + BW + 0.06, ry[1] + BH / 2, 0.53);
  arrowL(s, col[0] + BW + 0.06, ry[1] + BH / 2, 0.53);
  // down (left, under col0)
  arrowD(s, col[0] + BW / 2, ry[1] + BH + 0.04, ry[2] - (ry[1] + BH) - 0.08);
  // row3 →
  box(col[0], ry[2], "收捲");
  box(col[1], ry[2], "分條裁切");
  box(col[2], ry[2], "成品包裝");
  arrowR(s, col[0] + BW + 0.06, ry[2] + BH / 2, 0.53);
  arrowR(s, col[1] + BW + 0.06, ry[2] + BH / 2, 0.53);
  footer(s, 4, false);
}

// ── 步驟頁共用 ──
function stepLeft(s, num, title, blocks, dark) {
  const tx = dark ? CREAMTX : INK;
  eyebrow(s, `STEP ${num} / 製程拆解`, 0.85, 0.78, ACCENT);
  s.addText(
    [
      { text: num, options: { fontSize: 92, bold: true, color: ACCENT } },
      { text: " / 05", options: { fontSize: 32, bold: true, color: dark ? "A89B88" : MUTED } },
    ],
    { x: 0.8, y: 1.2, w: 6, h: 1.55, fontFace: FONT, align: "left", valign: "bottom", margin: 0 }
  );
  s.addText(title, { x: 0.85, y: 2.95, w: 6.3, h: 0.85, fontSize: 33, bold: true, color: tx, fontFace: FONT, margin: 0, valign: "top" });
  let y = 4.0;
  blocks.forEach((b) => {
    s.addText(b.label, { x: 0.85, y, w: 6.3, h: 0.34, fontSize: 14, bold: true, color: dark ? "E8A06B" : BROWN, charSpacing: 1, fontFace: FONT, margin: 0 });
    s.addText(b.body, { x: 0.85, y: y + 0.35, w: 6.3, h: b.h || 0.7, fontSize: 17, color: dark ? "EDE3D4" : BODY, fontFace: FONT, margin: 0, lineSpacingMultiple: 1.18 });
    y += 0.35 + (b.h || 0.7) + 0.25;
  });
}

// ════════════════ 5. 第一步 熔融擠出 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  stepLeft(s, "01", "第一步：塑膠粒熔融擠出", [
    { label: "製程說明", body: "塑膠粒投入擠出機 → 加熱至約 180~250°C → 熔融成塑膠流體 → 經模頭均勻擠出。", h: 0.95 },
    { label: "產出", body: "形成兩層薄膜：氣泡層薄膜、平面封口薄膜。", h: 0.7 },
  ], false);
  framedPhoto(s, IMG.step1, 8.2, 1.95, 4.0, 4.0);
  footer(s, 5, false);
}

// ════════════════ 6. 第二步 形成氣泡結構（核心，深色）════════════════
{
  const s = pres.addSlide();
  s.background = { color: INK };
  // CORE 徽章
  s.addShape(pres.shapes.RECTANGLE, { x: 3.35, y: 0.72, w: 2.05, h: 0.42, fill: { color: ACCENT } });
  s.addText("CORE 核心製程", { x: 3.35, y: 0.72, w: 2.05, h: 0.42, fontSize: 12, bold: true, color: INK, align: "center", valign: "middle", charSpacing: 1, fontFace: FONT, margin: 0 });
  stepLeft(s, "02", "第二步：形成氣泡結構", [
    { label: "製程原理", body: "熔融薄膜經過特殊滾輪 → 滾輪表面半球型孔洞 → 真空吸附拉入孔洞 → 形成規則氣泡。", h: 0.95 },
    { label: "氣泡尺寸", body: "小泡 6~10 mm　·　中泡 10~20 mm　·　大泡 20~30 mm", h: 0.55 },
  ], true);
  framedPhoto(s, IMG.step2, 7.7, 2.6, 4.7, 2.55, true);
  footer(s, 6, true);
}

// ════════════════ 7. 第三步 充氣與封合 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  stepLeft(s, "03", "第三步：充氣與封合", [
    { label: "製程說明", body: "形成氣泡後 → 導入空氣 → 覆蓋第二層平面薄膜 → 熱封結合。", h: 0.9 },
    { label: "結構", body: "上層平面膜＋下層氣泡膜，每顆氣泡成為獨立封閉空間。", h: 0.7 },
  ], false);
  framedPhoto(s, IMG.step3, 8.2, 1.95, 4.0, 4.0);
  footer(s, 7, false);
}

// ════════════════ 8. 第四步 冷卻與定型（無圖，自然呈現）════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  stepLeft(s, "04", "第四步：冷卻與定型", [
    { label: "製程目的", body: "使材料尺寸穩定、強度提升，並避免氣泡受熱變形。", h: 0.95 },
  ], false);
  // 右：常見冷卻方式 兩張卡
  s.addText("常見冷卻方式", { x: 7.7, y: 1.95, w: 4.7, h: 0.4, fontSize: 15, bold: true, color: BROWN, charSpacing: 1, fontFace: FONT, margin: 0 });
  function coolCard(x, label) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.55, w: 2.25, h: 2.7, rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: CARDLINE, width: 1.25 }, shadow: shadow() });
    s.addShape(pres.shapes.OVAL, { x: x + 0.78, y: 3.0, w: 0.7, h: 0.7, fill: { color: "FBE7DA" } });
    s.addText(label, { x, y: 4.1, w: 2.25, h: 0.6, fontSize: 22, bold: true, color: INK, align: "center", valign: "middle", fontFace: FONT, margin: 0 });
  }
  coolCard(7.7, "冷卻風扇");
  coolCard(10.15, "冷卻滾輪");
  footer(s, 8, false);
}

// ════════════════ 9. 第五步 收捲與分切 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  stepLeft(s, "05", "第五步：收捲與分切", [
    { label: "收捲", body: "形成大型母卷（Jumbo Roll）。", h: 0.55 },
    { label: "分切", body: "依客戶需求製作：30cm / 50cm / 100cm / 客製尺寸。", h: 0.7 },
  ], false);
  framedPhoto(s, IMG.step5, 7.7, 2.6, 4.7, 2.65);
  footer(s, 9, false);
}

// ── 2x2 卡片頁共用 ──
function quadCard(s, x, y, w, h, title, items) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: "FFFFFF" }, line: { color: CARDLINE, width: 1.25 }, shadow: shadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: x + 0.4, y: y + 0.46, w: 0.17, h: 0.17, fill: { color: ACCENT } });
  s.addText(title, { x: x + 0.68, y: y + 0.32, w: w - 1, h: 0.45, fontSize: 20, bold: true, color: INK, fontFace: FONT, margin: 0, valign: "middle" });
  s.addText(items.map((t) => ({ text: t, options: { bullet: { code: "2022" }, breakLine: true } })), { x: x + 0.45, y: y + 1.0, w: w - 0.85, h: h - 1.25, fontSize: 15.5, color: BODY, fontFace: FONT, valign: "top", paraSpaceAfter: 7, lineSpacingMultiple: 1.05 });
}

// ════════════════ 10. 品質檢驗項目 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  eyebrow(s, "QUALITY INSPECTION", 0.85, 0.62);
  s.addText("品質檢驗項目", { x: 0.85, y: 1.0, w: 8, h: 0.9, fontSize: 42, bold: true, color: INK, fontFace: FONT, margin: 0 });
  const cw = 5.55, ch = 2.05, gx = 0.85, gx2 = 6.95, gy = 2.25, gy2 = 4.55;
  quadCard(s, gx, gy, cw, ch, "外觀檢查", ["氣泡完整性", "表面平整度", "無破洞"]);
  quadCard(s, gx2, gy, cw, ch, "尺寸檢驗", ["厚度", "寬度", "長度"]);
  quadCard(s, gx, gy2, cw, ch, "功能檢驗", ["氣泡保氣性", "抗壓能力", "緩衝性能"]);
  quadCard(s, gx2, gy2, cw, ch, "常見不良", ["漏氣", "氣泡大小不均", "熱封不良", "薄膜厚度不足"]);
  footer(s, 10, false);
}

// ════════════════ 11. 規格差異 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  eyebrow(s, "SPECIFICATIONS", 0.85, 0.62);
  s.addText("氣泡布的規格差異", { x: 0.85, y: 1.0, w: 8, h: 0.9, fontSize: 42, bold: true, color: INK, fontFace: FONT, margin: 0 });
  s.addText("影響價格的主要因素", { x: 0.85, y: 1.95, w: 7, h: 0.4, fontSize: 17, color: MUTED, fontFace: FONT, margin: 0 });
  const chips = ["厚度（μm）", "氣泡尺寸", "原料等級", "再生料比例", "抗靜電需求", "客製印刷需求"];
  const cw = 3.35, chh = 0.95, cx = [0.85, 4.35], cy = [2.6, 3.75, 4.9];
  chips.forEach((t, i) => {
    const x = cx[i % 2], y = cy[Math.floor(i / 2)];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: chh, rectRadius: 0.06, fill: { color: "FFFFFF" }, line: { color: CARDLINE, width: 1.25 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.3, y: y + chh / 2 - 0.08, w: 0.16, h: 0.16, fill: { color: ACCENT } });
    s.addText(t, { x: x + 0.6, y, w: cw - 0.8, h: chh, fontSize: 18, bold: true, color: INK, valign: "middle", fontFace: FONT, margin: 0 });
  });
  framedPhoto(s, IMG.spec, 8.5, 2.7, 3.9, 3.9);
  footer(s, 11, false);
}

// ════════════════ 12. 採購重點 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: CREAM };
  eyebrow(s, "PROCUREMENT FOCUS", 0.85, 0.62);
  s.addText("採購人員應關注的重點", { x: 0.85, y: 1.0, w: 10, h: 0.9, fontSize: 42, bold: true, color: INK, fontFace: FONT, margin: 0 });
  const cw = 5.55, ch = 2.05, gx = 0.85, gx2 = 6.95, gy = 2.25, gy2 = 4.55;
  quadCard(s, gx, gy, cw, ch, "成本面", ["樹脂原料價格", "運輸成本", "MOQ（最低訂購量）"]);
  quadCard(s, gx2, gy, cw, ch, "品質面", ["保氣時間", "氣泡高度一致性", "厚度公差"]);
  quadCard(s, gx, gy2, cw, ch, "ESG 面", ["再生料比例", "可回收性", "環保法規符合性"]);
  quadCard(s, gx2, gy2, cw, ch, "供應鏈面", ["交期穩定性", "備援供應商", "生產產能"]);
  footer(s, 12, false);
}

// ════════════════ 13. 結語 ════════════════
{
  const s = pres.addSlide();
  s.background = { color: INK };
  eyebrow(s, "SUMMARY / 結語", 0.9, 0.95, ACCENT);
  // 流程濃縮
  const stages = ["塑膠粒", "薄膜形成", "氣泡形成", "封閉氣泡", "氣泡布成品"];
  const sx = 0.95, gap = 2.45;
  stages.forEach((t, i) => {
    const x = sx + i * gap;
    s.addText(t, { x, y: 2.0, w: 2.0, h: 0.5, fontSize: 20, bold: true, color: CREAMTX, fontFace: FONT, margin: 0, valign: "middle" });
    if (i < stages.length - 1) {
      s.addShape(pres.shapes.LINE, { x: x + 1.55, y: 2.25, w: 0.75, h: 0, line: { color: ACCENT, width: 3, endArrowType: "triangle" } });
    }
  });
  s.addText(
    [
      { text: "氣泡布的核心，在於以", options: { color: CREAMTX } },
      { text: "真空成型", options: { color: ACCENT, bold: true } },
      { text: "產生規則氣泡，再透過", options: { color: CREAMTX } },
      { text: "熱封", options: { color: ACCENT, bold: true } },
      { text: "把空氣永久封存在薄膜之間，藉由空氣層達到優異的緩衝保護。", options: { color: CREAMTX } },
    ],
    { x: 0.95, y: 3.6, w: 11.0, h: 2.2, fontSize: 34, bold: true, fontFace: FONT, margin: 0, lineSpacingMultiple: 1.28, valign: "top" }
  );
  footer(s, 13, true);
}

const OUT = path.join(__dirname, "..", "氣泡布製程介紹.pptx");
pres.writeFile({ fileName: OUT }).then((f) => console.log("WROTE", f));
