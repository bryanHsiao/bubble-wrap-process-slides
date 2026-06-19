import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import imgWhatIs from '@assets/gpt-images/what-is-1.jpg';
import imgMaterial from '@assets/gpt-images/material-2.jpg';
import imgStep1 from '@assets/gpt-images/step1-extrude-1.jpg';
import imgStep2 from '@assets/gpt-images/step2-bubble-1.jpg';
import imgStep3 from '@assets/gpt-images/step3-seal-2.jpg';
import imgStep5 from '@assets/gpt-images/step5-rewind-2.jpg';
import imgSpec from '@assets/gpt-images/spec-1.jpg';

// ─── Panel-tweakable design tokens ────────────────────────────────────────────
export const design: DesignSystem = {
  palette: {
    bg: '#0B1B2B',
    text: '#E8F1F8',
    accent: '#38BDF8',
  },
  fonts: {
    display:
      '"PingFang TC","Microsoft JhengHei","Noto Sans TC",system-ui,-apple-system,sans-serif',
    body: '"PingFang TC","Microsoft JhengHei","Noto Sans TC",system-ui,-apple-system,sans-serif',
  },
  typeScale: {
    hero: 150,
    body: 36,
  },
  radius: 8,
};

// ─── Local constants (outside DesignSystem shape) ─────────────────────────────
const MONO = '"SFMono-Regular",Consolas,"Liberation Mono",monospace';
const MUTED = '#7C99B5';
const CARD = '#102A40';
const CARD_BORDER = 'rgba(56,189,248,0.28)';
const GRID_LINE = 'rgba(56,189,248,0.08)';
const ACCENT = '#38BDF8';
const TEXT = '#E8F1F8';

const fill = {
  width: '100%',
  height: '100%',
  position: 'relative',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  overflow: 'hidden',
} as const;

// ─── Shared: blueprint engineering grid background ────────────────────────────
const GridBg = () => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `linear-gradient(${GRID_LINE} 1px, transparent 1px), linear-gradient(90deg, ${GRID_LINE} 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
      pointerEvents: 'none',
    }}
  />
);

// ─── Shared: eyebrow (mono, wide-tracked, accent) ─────────────────────────────
const Eyebrow = ({ children }: { children: string }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 24,
      letterSpacing: '0.34em',
      color: 'var(--osd-accent)',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </div>
);

// ─── Shared: footer page number ───────────────────────────────────────────────
const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        right: 100,
        bottom: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        fontFamily: MONO,
        fontSize: 24,
        letterSpacing: '0.2em',
        color: MUTED,
      }}
    >
      <span style={{ width: 120, height: 1, background: CARD_BORDER }} />
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

// ─── Shared: page heading with eyebrow ────────────────────────────────────────
const PageHead = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div style={{ marginBottom: 56 }}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 72,
        fontWeight: 800,
        lineHeight: 1.2,
        margin: '20px 0 0',
      }}
    >
      {title}
    </h2>
  </div>
);

// ─── Shared: hollow-circle bullet row (engineering dot) ───────────────────────
const Bullet = ({ children, last }: { children: React.ReactNode; last?: boolean }) => (
  <li
    style={{
      fontSize: 32,
      lineHeight: 1.55,
      marginBottom: last ? 0 : 14,
      paddingLeft: 28,
      position: 'relative',
      listStyle: 'none',
    }}
  >
    <span
      style={{
        position: 'absolute',
        left: 0,
        top: 18,
        width: 12,
        height: 12,
        border: `2px solid ${ACCENT}`,
        borderRadius: '50%',
      }}
    />
    {children}
  </li>
);

// ─── Shared: info card (children = explicit <Bullet/> instances) ──────────────
const Card = ({
  label,
  width,
  children,
}: {
  label: string;
  width?: number | string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      width: width ?? 'auto',
      background: CARD,
      border: `1px solid ${CARD_BORDER}`,
      borderRadius: 'var(--osd-radius)',
      padding: '36px 40px',
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        fontFamily: MONO,
        fontSize: 22,
        letterSpacing: '0.2em',
        color: ACCENT,
        marginBottom: 24,
      }}
    >
      {label}
    </div>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>{children}</ul>
  </div>
);

// ─── Shared: a small process-step node (SVG-style box) ────────────────────────
const FlowNode = ({ n, label }: { n: string; label: string }) => (
  <div
    style={{
      width: 230,
      height: 132,
      background: CARD,
      border: `2px solid ${ACCENT}`,
      borderRadius: 'var(--osd-radius)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      padding: '0 16px',
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 20, color: ACCENT, letterSpacing: '0.15em' }}>
      {n}
    </div>
    <div
      style={{
        fontSize: 28,
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: 1.25,
        marginTop: 8,
      }}
    >
      {label}
    </div>
  </div>
);

const Arrow = ({ dir = 'right' }: { dir?: 'right' | 'down' }) => (
  <svg
    width={dir === 'right' ? 56 : 132}
    height={dir === 'right' ? 132 : 56}
    viewBox={dir === 'right' ? '0 0 56 132' : '0 0 132 56'}
    fill="none"
  >
    {dir === 'right' ? (
      <>
        <line x1="6" y1="66" x2="44" y2="66" stroke={ACCENT} strokeWidth="2" />
        <path d="M40 58 L50 66 L40 74" stroke={ACCENT} strokeWidth="2" fill="none" />
      </>
    ) : (
      <>
        <line x1="66" y1="6" x2="66" y2="44" stroke={ACCENT} strokeWidth="2" />
        <path d="M58 40 L66 50 L74 40" stroke={ACCENT} strokeWidth="2" fill="none" />
      </>
    )}
  </svg>
);

// ─── Shared: left/right process-step layout for steps 1–5 ─────────────────────
const StepPage = ({
  eyebrow,
  title,
  core,
  body,
  diagram,
  imgHint,
  img,
}: {
  eyebrow: string;
  title: string;
  core?: boolean;
  body: React.ReactNode;
  diagram: React.ReactNode;
  imgHint: string;
  img?: string;
}) => (
  <div style={{ ...fill }}>
    <GridBg />
    <div
      style={{
        position: 'relative',
        height: '100%',
        boxSizing: 'border-box',
        padding: '120px 100px',
        display: 'flex',
        gap: 64,
      }}
    >
      {/* Left column: text + small diagram */}
      <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          {core && (
            <span
              style={{
                fontFamily: MONO,
                fontSize: 20,
                letterSpacing: '0.2em',
                color: '#0B1B2B',
                background: ACCENT,
                borderRadius: 4,
                padding: '4px 12px',
              }}
            >
              CORE
            </span>
          )}
        </div>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '20px 0 40px',
          }}
        >
          {title}
        </h2>
        <div style={{ fontSize: 34, lineHeight: 1.6 }}>{body}</div>
        <div style={{ marginTop: 'auto', paddingTop: 40 }}>{diagram}</div>
      </div>
      {/* Right column: real machine photo placeholder */}
      <div
        style={{
          flex: '0 0 720px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 720,
            height: 720,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 'var(--osd-radius)',
            overflow: 'hidden',
            background: CARD,
            boxSizing: 'border-box',
          }}
        >
          {img ? (
            <img
              src={img}
              alt={imgHint}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'var(--osd-radius)',
                display: 'block',
              }}
            />
          ) : (
            <ImagePlaceholder hint={imgHint} width={720} height={720} />
          )}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 1 — Cover
// ═══════════════════════════════════════════════════════════════════════════
const Cover: Page = () => (
  <div
    style={{
      ...fill,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 160px',
    }}
  >
    <GridBg />
    <div style={{ position: 'relative' }}>
      <Eyebrow>BUBBLE WRAP · PROCESS GUIDE</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 900,
          lineHeight: 1.12,
          margin: '40px 0 0',
        }}
      >
        氣泡布（Bubble Wrap）
        <br />
        製程介紹
      </h1>
      <p style={{ fontSize: 44, color: MUTED, margin: '44px 0 0', lineHeight: 1.5 }}>
        從塑膠粒到緩衝包材的製造流程
      </p>
      <div
        style={{
          marginTop: 56,
          display: 'inline-block',
          fontFamily: MONO,
          fontSize: 24,
          letterSpacing: '0.2em',
          color: ACCENT,
          borderTop: `1px solid ${CARD_BORDER}`,
          paddingTop: 24,
        }}
      >
        採購專業人士簡報
      </div>
    </div>
    <Footer />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 2 — What is bubble wrap
// ═══════════════════════════════════════════════════════════════════════════
const WhatIs: Page = () => (
  <div style={fill}>
    <GridBg />
    <div style={{ position: 'relative', boxSizing: 'border-box', padding: '120px 100px' }}>
      <PageHead eyebrow="OVERVIEW / DEFINITION" title="氣泡布是什麼？" />
      <div style={{ display: 'flex', gap: 56 }}>
        {/* Left: definition + cards */}
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <p style={{ fontSize: 40, lineHeight: 1.6, margin: '0 0 48px' }}>
            氣泡布是一種利用<span style={{ color: ACCENT }}>封閉空氣層</span>提供緩衝保護的塑膠包裝材料。
          </p>
          <div style={{ display: 'flex', gap: 36 }}>
            <Card label="主要用途" width={490}>
              <Bullet>電子產品、精密零件</Bullet>
              <Bullet>家具家電</Bullet>
              <Bullet>電商物流</Bullet>
              <Bullet last>易碎品運輸</Bullet>
            </Card>
            <Card label="主要功能" width={490}>
              <Bullet>緩衝防震、吸收衝擊</Bullet>
              <Bullet>防刮傷</Bullet>
              <Bullet last>降低運輸損壞率</Bullet>
            </Card>
          </div>
        </div>
        {/* Right: square photo */}
        <div
          style={{
            flex: '0 0 560px',
            width: 560,
            height: 560,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 'var(--osd-radius)',
            overflow: 'hidden',
            background: CARD,
            boxSizing: 'border-box',
          }}
        >
          <img
            src={imgWhatIs}
            alt="氣泡布卷實物照片"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'var(--osd-radius)',
              display: 'block',
            }}
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 3 — Raw materials
// ═══════════════════════════════════════════════════════════════════════════
const Materials: Page = () => (
  <div style={fill}>
    <GridBg />
    <div style={{ position: 'relative', boxSizing: 'border-box', padding: '120px 100px' }}>
      <PageHead eyebrow="OVERVIEW / MATERIALS" title="氣泡布的原料" />
      <div style={{ display: 'flex', gap: 52, alignItems: 'flex-start' }}>
        {/* Left: square photo of plastic pellets */}
        <div
          style={{
            flex: '0 0 480px',
            width: 480,
            height: 480,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 'var(--osd-radius)',
            overflow: 'hidden',
            background: CARD,
            boxSizing: 'border-box',
          }}
        >
          <img
            src={imgMaterial}
            alt="透明塑膠粒（PE）原料照片"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'var(--osd-radius)',
              display: 'block',
            }}
          />
        </div>
        {/* Right: material cards */}
        <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', gap: 24 }}>
          <Card label="主要原料" width={380}>
            <Bullet>LDPE 低密度聚乙烯</Bullet>
            <Bullet last>LLDPE 線性低密度聚乙烯</Bullet>
          </Card>
          <Card label="添加材料" width={380}>
            <Bullet>抗靜電劑</Bullet>
            <Bullet>色母粒</Bullet>
            <Bullet>抗UV添加劑</Bullet>
            <Bullet last>再生料（部分產品）</Bullet>
          </Card>
          <Card label="採購關注點" width={380}>
            <Bullet>原料價格波動</Bullet>
            <Bullet>再生料比例</Bullet>
            <Bullet>RoHS / REACH 合規性</Bullet>
            <Bullet last>食品接觸認證需求</Bullet>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 4 — Process overview (hero flow diagram, serpentine 5+4)
// ═══════════════════════════════════════════════════════════════════════════
const Overview: Page = () => (
  <div style={fill}>
    <GridBg />
    <div style={{ position: 'relative', boxSizing: 'border-box', padding: '100px 100px' }}>
      <div style={{ marginBottom: 40 }}>
        <Eyebrow>PROCESS / OVERVIEW</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '18px 0 0',
          }}
        >
          製造流程總覽
        </h2>
      </div>

      {/* Row 1: nodes 1-5 */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FlowNode n="01" label="塑膠粒" />
        <Arrow />
        <FlowNode n="02" label="擠出熔融" />
        <Arrow />
        <FlowNode n="03" label="形成薄膜" />
        <Arrow />
        <FlowNode n="04" label="真空吸塑形成氣泡" />
        <Arrow />
        <FlowNode n="05" label="覆合封口" />
      </div>

      {/* Down connector aligned under node 5 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 78 }}>
        <Arrow dir="down" />
      </div>

      {/* Row 2: nodes 9-6 (right to left) */}
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
        <FlowNode n="06" label="冷卻定型" />
        <Arrow />
        <FlowNode n="07" label="收捲" />
        <Arrow />
        <FlowNode n="08" label="分條裁切" />
        <Arrow />
        <FlowNode n="09" label="成品包裝" />
      </div>

      <p
        style={{
          fontSize: 30,
          color: MUTED,
          lineHeight: 1.5,
          margin: '44px 0 0',
          fontFamily: MONO,
          letterSpacing: '0.05em',
        }}
      >
        // 後續逐步拆解五大關鍵製程
      </p>
    </div>
    <Footer />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 5 — Step 1: melt extrusion
// ═══════════════════════════════════════════════════════════════════════════
const ExtruderSvg = () => (
  <svg width={520} height={150} viewBox="0 0 520 150" fill="none">
    {/* hopper */}
    <path d="M40 20 L120 20 L100 60 L60 60 Z" stroke={ACCENT} strokeWidth="2" />
    {/* barrel */}
    <rect x="60" y="60" width="320" height="56" stroke={ACCENT} strokeWidth="2" />
    {/* screw hint */}
    <path
      d="M80 88 q20 -16 40 0 t40 0 t40 0 t40 0 t40 0 t40 0"
      stroke={ACCENT}
      strokeWidth="2"
      fill="none"
      opacity="0.6"
    />
    {/* die head */}
    <rect x="380" y="50" width="40" height="76" stroke={ACCENT} strokeWidth="2" />
    {/* two films out */}
    <line x1="420" y1="74" x2="500" y2="64" stroke={ACCENT} strokeWidth="2" />
    <line x1="420" y1="102" x2="500" y2="112" stroke={ACCENT} strokeWidth="2" />
    <text x="78" y="44" fill={MUTED} fontFamily={MONO} fontSize="16">
      pellets
    </text>
    <text x="430" y="46" fill={MUTED} fontFamily={MONO} fontSize="16">
      die
    </text>
  </svg>
);

const Step1: Page = () => (
  <StepPage
    eyebrow="STEP 01 / EXTRUSION"
    title="第一步：塑膠粒熔融擠出"
    img={imgStep1}
    imgHint="擠出機與模頭實機照片（塑膠粒熔融擠出產線）"
    body={
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        <li style={{ marginBottom: 18, paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          塑膠粒投入擠出機，加熱至約 180~250°C
        </li>
        <li style={{ marginBottom: 18, paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          熔融成塑膠流體，經模頭均勻擠出
        </li>
        <li style={{ paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          產出兩層薄膜：氣泡層薄膜 + 平面封口薄膜
        </li>
      </ul>
    }
    diagram={<ExtruderSvg />}
  />
);

const dotStyle = {
  position: 'absolute',
  left: 0,
  top: 18,
  width: 12,
  height: 12,
  border: `2px solid ${ACCENT}`,
  borderRadius: '50%',
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 6 — Step 2: forming bubbles (CORE)
// ═══════════════════════════════════════════════════════════════════════════
const VacuumRollerSvg = () => (
  <svg width={520} height={150} viewBox="0 0 520 150" fill="none">
    {/* roller */}
    <circle cx="120" cy="80" r="58" stroke={ACCENT} strokeWidth="2" />
    {/* cavities */}
    <circle cx="120" cy="22" r="8" stroke={ACCENT} strokeWidth="2" />
    <circle cx="120" cy="138" r="8" stroke={ACCENT} strokeWidth="2" />
    <circle cx="178" cy="80" r="8" stroke={ACCENT} strokeWidth="2" />
    <circle cx="62" cy="80" r="8" stroke={ACCENT} strokeWidth="2" />
    {/* film entering */}
    <line x1="200" y1="60" x2="500" y2="60" stroke={ACCENT} strokeWidth="2" />
    {/* formed bubbles on film */}
    <path d="M250 60 a14 14 0 0 0 28 0" stroke={ACCENT} strokeWidth="2" fill="none" />
    <path d="M310 60 a14 14 0 0 0 28 0" stroke={ACCENT} strokeWidth="2" fill="none" />
    <path d="M370 60 a14 14 0 0 0 28 0" stroke={ACCENT} strokeWidth="2" fill="none" />
    <path d="M430 60 a14 14 0 0 0 28 0" stroke={ACCENT} strokeWidth="2" fill="none" />
    <text x="84" y="84" fill={MUTED} fontFamily={MONO} fontSize="15">
      vacuum
    </text>
  </svg>
);

const BubbleSize = ({ name, range }: { name: string; range: string }) => (
  <div
    style={{
      flex: 1,
      background: CARD,
      border: `1px solid ${CARD_BORDER}`,
      borderRadius: 'var(--osd-radius)',
      padding: '20px 24px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 30, fontWeight: 700 }}>{name}</div>
    <div style={{ fontFamily: MONO, fontSize: 26, color: ACCENT, marginTop: 8 }}>{range}</div>
  </div>
);

const Step2: Page = () => (
  <StepPage
    eyebrow="STEP 02 / FORMING"
    title="第二步：形成氣泡結構"
    core
    img={imgStep2}
    imgHint="真空成型滾輪（半球孔洞）特寫照片"
    body={
      <>
        <ul style={{ margin: '0 0 32px', padding: 0, listStyle: 'none' }}>
          <li style={{ marginBottom: 16, paddingLeft: 30, position: 'relative', fontSize: 32 }}>
            <span style={dotStyle} />
            熔融薄膜經過表面有半球型孔洞的特殊滾輪
          </li>
          <li style={{ paddingLeft: 30, position: 'relative', fontSize: 32 }}>
            <span style={dotStyle} />
            真空吸附將薄膜拉入孔洞，形成規則氣泡
          </li>
        </ul>
        <div style={{ display: 'flex', gap: 18 }}>
          <BubbleSize name="小泡" range="6~10 mm" />
          <BubbleSize name="中泡" range="10~20 mm" />
          <BubbleSize name="大泡" range="20~30 mm" />
        </div>
      </>
    }
    diagram={<VacuumRollerSvg />}
  />
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 7 — Step 3: inflate & seal (cross-section)
// ═══════════════════════════════════════════════════════════════════════════
const CrossSectionSvg = () => (
  <svg width={540} height="170" viewBox="0 0 540 170" fill="none">
    {/* top flat film */}
    <line x1="20" y1="36" x2="520" y2="36" stroke={ACCENT} strokeWidth="2" />
    <text x="20" y="26" fill={MUTED} fontFamily={MONO} fontSize="15">
      上層平面膜
    </text>
    {/* bubbles row */}
    <ellipse cx="90" cy="80" rx="34" ry="30" stroke={ACCENT} strokeWidth="2" />
    <ellipse cx="180" cy="80" rx="34" ry="30" stroke={ACCENT} strokeWidth="2" />
    <ellipse cx="270" cy="80" rx="34" ry="30" stroke={ACCENT} strokeWidth="2" />
    <ellipse cx="360" cy="80" rx="34" ry="30" stroke={ACCENT} strokeWidth="2" />
    <ellipse cx="450" cy="80" rx="34" ry="30" stroke={ACCENT} strokeWidth="2" />
    {/* bottom bubble film */}
    <path
      d="M20 120 Q90 156 124 120 Q180 156 214 120 Q270 156 304 120 Q360 156 394 120 Q450 156 484 120 L520 120"
      stroke={ACCENT}
      strokeWidth="2"
      fill="none"
    />
    <text x="20" y="158" fill={MUTED} fontFamily={MONO} fontSize="15">
      下層氣泡膜
    </text>
  </svg>
);

const Step3: Page = () => (
  <StepPage
    eyebrow="STEP 03 / SEALING"
    title="第三步：充氣與封合"
    img={imgStep3}
    imgHint="充氣熱封覆合段實機照片"
    body={
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        <li style={{ marginBottom: 18, paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          形成氣泡後導入空氣，覆蓋第二層平面薄膜
        </li>
        <li style={{ marginBottom: 18, paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          熱封結合：上層平面膜 ／ 中間封閉氣泡 ／ 下層氣泡膜
        </li>
        <li style={{ paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          每顆氣泡成為獨立封閉空間
        </li>
      </ul>
    }
    diagram={<CrossSectionSvg />}
  />
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 8 — Step 4: cooling & setting
// ═══════════════════════════════════════════════════════════════════════════
const CoolingSvg = () => (
  <svg width={500} height={150} viewBox="0 0 500 150" fill="none">
    {/* film line */}
    <line x1="20" y1="100" x2="480" y2="100" stroke={ACCENT} strokeWidth="2" />
    {/* cooling roller */}
    <circle cx="150" cy="100" r="40" stroke={ACCENT} strokeWidth="2" />
    <circle cx="150" cy="100" r="6" stroke={ACCENT} strokeWidth="2" />
    {/* fan */}
    <circle cx="350" cy="60" r="34" stroke={ACCENT} strokeWidth="2" />
    <path d="M350 60 L350 30 M350 60 L378 76 M350 60 L322 76" stroke={ACCENT} strokeWidth="2" />
    {/* airflow */}
    <path d="M350 96 q0 14 -10 24 M362 96 q0 14 -10 24" stroke={ACCENT} strokeWidth="2" opacity="0.6" />
    <text x="120" y="158" fill={MUTED} fontFamily={MONO} fontSize="15">
      cooling roller
    </text>
    <text x="320" y="158" fill={MUTED} fontFamily={MONO} fontSize="15">
      cooling fan
    </text>
  </svg>
);

const Step4: Page = () => (
  <StepPage
    eyebrow="STEP 04 / COOLING"
    title="第四步：冷卻與定型"
    imgHint="冷卻滾輪／冷卻風扇區段照片"
    body={
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        <li style={{ marginBottom: 18, paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          目的：尺寸穩定、強度提升、氣泡不易變形
        </li>
        <li style={{ paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          常見方式：冷卻風扇、冷卻滾輪
        </li>
      </ul>
    }
    diagram={<CoolingSvg />}
  />
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 9 — Step 5: winding & slitting
// ═══════════════════════════════════════════════════════════════════════════
const WindingSvg = () => (
  <svg width={500} height={150} viewBox="0 0 500 150" fill="none">
    {/* jumbo roll */}
    <circle cx="110" cy="80" r="56" stroke={ACCENT} strokeWidth="2" />
    <circle cx="110" cy="80" r="36" stroke={ACCENT} strokeWidth="2" opacity="0.6" />
    <circle cx="110" cy="80" r="14" stroke={ACCENT} strokeWidth="2" opacity="0.4" />
    <text x="78" y="148" fill={MUTED} fontFamily={MONO} fontSize="15">
      jumbo roll
    </text>
    {/* film to slitter */}
    <line x1="166" y1="80" x2="320" y2="80" stroke={ACCENT} strokeWidth="2" />
    {/* slitter blades */}
    <path d="M340 50 L340 110 M360 50 L360 110 M380 50 L380 110" stroke={ACCENT} strokeWidth="2" />
    {/* small rolls */}
    <circle cx="430" cy="56" r="20" stroke={ACCENT} strokeWidth="2" />
    <circle cx="430" cy="104" r="20" stroke={ACCENT} strokeWidth="2" />
    <text x="330" y="148" fill={MUTED} fontFamily={MONO} fontSize="15">
      slitting
    </text>
  </svg>
);

const Step5: Page = () => (
  <StepPage
    eyebrow="STEP 05 / WINDING"
    title="第五步：收捲與分切"
    img={imgStep5}
    imgHint="母卷收捲與分條裁切機台照片"
    body={
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        <li style={{ marginBottom: 18, paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          收捲：形成大型母卷（Jumbo Roll）
        </li>
        <li style={{ paddingLeft: 30, position: 'relative' }}>
          <span style={dotStyle} />
          分切：30cm ／ 50cm ／ 100cm ／ 客製尺寸
        </li>
      </ul>
    }
    diagram={<WindingSvg />}
  />
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 10 — Quality inspection (2×2)
// ═══════════════════════════════════════════════════════════════════════════
const Quality: Page = () => (
  <div style={fill}>
    <GridBg />
    <div style={{ position: 'relative', boxSizing: 'border-box', padding: '110px 100px' }}>
      <PageHead eyebrow="QUALITY / INSPECTION" title="品質檢驗項目" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        <div style={{ display: 'flex', gap: 36 }}>
          <Card label="外觀檢查" width={830}>
            <Bullet>氣泡完整性</Bullet>
            <Bullet>表面平整度</Bullet>
            <Bullet last>無破洞</Bullet>
          </Card>
          <Card label="尺寸檢驗" width={830}>
            <Bullet>厚度</Bullet>
            <Bullet>寬度</Bullet>
            <Bullet last>長度</Bullet>
          </Card>
        </div>
        <div style={{ display: 'flex', gap: 36 }}>
          <Card label="功能檢驗" width={830}>
            <Bullet>氣泡保氣性</Bullet>
            <Bullet>抗壓能力</Bullet>
            <Bullet last>緩衝性能</Bullet>
          </Card>
          <Card label="常見不良" width={830}>
            <Bullet>漏氣、氣泡大小不均</Bullet>
            <Bullet>熱封不良</Bullet>
            <Bullet last>薄膜厚度不足</Bullet>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 11 — Spec differences
// ═══════════════════════════════════════════════════════════════════════════
const SpecChip = ({ label }: { label: string }) => (
  <div
    style={{
      background: CARD,
      border: `1px solid ${CARD_BORDER}`,
      borderRadius: 'var(--osd-radius)',
      padding: '32px 36px',
      fontSize: 36,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }}
  >
    <span
      style={{
        width: 14,
        height: 14,
        border: `2px solid ${ACCENT}`,
        borderRadius: '50%',
        flex: '0 0 auto',
      }}
    />
    {label}
  </div>
);

const Specs: Page = () => (
  <div style={fill}>
    <GridBg />
    <div style={{ position: 'relative', boxSizing: 'border-box', padding: '120px 100px' }}>
      <PageHead eyebrow="SPEC / VARIATION" title="氣泡布的規格差異" />
      <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
        {/* Left: subtitle + spec chips */}
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <p style={{ fontSize: 36, color: MUTED, margin: '0 0 40px', lineHeight: 1.5 }}>
            影響價格的主要因素
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
            <SpecChip label="厚度（μm）" />
            <SpecChip label="氣泡尺寸" />
            <SpecChip label="原料等級" />
            <SpecChip label="再生料比例" />
            <SpecChip label="抗靜電需求" />
            <SpecChip label="客製印刷需求" />
          </div>
        </div>
        {/* Right: square photo of bubble wrap roll */}
        <div
          style={{
            flex: '0 0 470px',
            width: 470,
            height: 470,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 'var(--osd-radius)',
            overflow: 'hidden',
            background: CARD,
            boxSizing: 'border-box',
          }}
        >
          <img
            src={imgSpec}
            alt="氣泡布卷與氣泡放大照片"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'var(--osd-radius)',
              display: 'block',
            }}
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 12 — Procurement focus (2×2)
// ═══════════════════════════════════════════════════════════════════════════
const Procurement: Page = () => (
  <div style={fill}>
    <GridBg />
    <div style={{ position: 'relative', boxSizing: 'border-box', padding: '100px 100px' }}>
      <PageHead eyebrow="PROCUREMENT / FOCUS" title="採購人員應關注的重點" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', gap: 32 }}>
          <Card label="成本面" width={830}>
            <Bullet>樹脂原料價格</Bullet>
            <Bullet>運輸成本</Bullet>
            <Bullet last>MOQ 最低訂購量</Bullet>
          </Card>
          <Card label="品質面" width={830}>
            <Bullet>保氣時間</Bullet>
            <Bullet>氣泡高度一致性</Bullet>
            <Bullet last>厚度公差</Bullet>
          </Card>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          <Card label="ESG 面" width={830}>
            <Bullet>再生料比例</Bullet>
            <Bullet>可回收性</Bullet>
            <Bullet last>環保法規符合性</Bullet>
          </Card>
          <Card label="供應鏈面" width={830}>
            <Bullet>交期穩定性</Bullet>
            <Bullet>備援供應商</Bullet>
            <Bullet last>生產產能</Bullet>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 13 — Conclusion
// ═══════════════════════════════════════════════════════════════════════════
const FlowChip = ({ label }: { label: string }) => (
  <span
    style={{
      background: CARD,
      border: `1px solid ${CARD_BORDER}`,
      borderRadius: 6,
      padding: '14px 22px',
      fontSize: 28,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </span>
);

const MiniArrow = () => (
  <svg width={40} height={24} viewBox="0 0 40 24" fill="none" style={{ flex: '0 0 auto' }}>
    <line x1="4" y1="12" x2="30" y2="12" stroke={ACCENT} strokeWidth="2" />
    <path d="M26 6 L34 12 L26 18" stroke={ACCENT} strokeWidth="2" fill="none" />
  </svg>
);

const Conclusion: Page = () => (
  <div style={fill}>
    <GridBg />
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        padding: '120px 100px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Eyebrow>SUMMARY / CONCLUSION</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 72,
          fontWeight: 800,
          margin: '20px 0 48px',
        }}
      >
        結語
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', rowGap: 18 }}>
        <FlowChip label="塑膠粒" />
        <MiniArrow />
        <FlowChip label="熔融擠出 → 薄膜形成" />
        <MiniArrow />
        <FlowChip label="真空成型 → 氣泡形成" />
        <MiniArrow />
        <FlowChip label="熱封覆合 → 封閉氣泡" />
        <MiniArrow />
        <FlowChip label="冷卻定型 / 收捲分切" />
        <MiniArrow />
        <FlowChip label="氣泡布成品" />
      </div>
      <div
        style={{
          marginTop: 'auto',
          borderLeft: `4px solid ${ACCENT}`,
          paddingLeft: 40,
        }}
      >
        <p style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.5, margin: 0 }}>
          氣泡布的核心技術在於「利用真空成型產生規則氣泡，
          <br />
          再透過熱封將空氣永久封存在薄膜之間」，
          <br />
          藉由空氣層達到優異的緩衝保護效果。
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// PAGE 14 — Appendix: anti-UV additives
// ═══════════════════════════════════════════════════════════════════════════
const UvCard = ({
  label,
  body,
}: {
  label: string;
  body: React.ReactNode;
}) => (
  <div
    style={{
      background: CARD,
      border: `1px solid ${CARD_BORDER}`,
      borderRadius: 'var(--osd-radius)',
      padding: '24px 28px',
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        fontFamily: MONO,
        fontSize: 20,
        letterSpacing: '0.18em',
        color: ACCENT,
        marginBottom: 12,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 27, lineHeight: 1.5 }}>{body}</div>
  </div>
);

const UvAppendix: Page = () => (
  <div style={fill}>
    <GridBg />
    <div style={{ position: 'relative', boxSizing: 'border-box', padding: '80px 100px' }}>
      <div style={{ marginBottom: 32 }}>
        <Eyebrow>APPENDIX / ANTI-UV</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 60,
            fontWeight: 800,
            margin: '16px 0 0',
            lineHeight: 1.2,
          }}
        >
          補充：為什麼需要抗UV添加劑？
        </h2>
      </div>
      <p style={{ fontSize: 32, lineHeight: 1.5, margin: '0 0 32px', color: TEXT }}>
        結論：大部分一般包裝用氣泡布不一定需要抗UV劑，
        <span style={{ color: ACCENT }}>只有特定用途才會要求</span>。
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
        <UvCard
          label="不加會怎樣"
          body="PE 遇紫外線 → 分子鏈斷裂、氧化、脆化；泛黃、變硬、一拉就破、氣泡漏氣"
        />
        <UvCard label="需要情境" body="戶外長期儲放、長途海運、溫室農業用途" />
        <UvCard
          label="如何做到"
          body="UV Absorber 紫外線吸收劑 + HALS 受阻胺光穩定劑，添加量約 0.1%~1%"
        />
        <UvCard
          label="採購怎麼問"
          body="是否添加 UV Stabilizer？保護壽命多久？是否有測試報告（QUV / ASTM G154）？"
        />
        <div
          style={{
            gridColumn: 'span 2',
            borderLeft: `4px solid ${ACCENT}`,
            paddingLeft: 32,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.5, margin: 0 }}>
            抗UV 不是標準配備，而是一種依使用情境增加成本的客製規格。
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: '氣泡布製程介紹（工業藍圖風）',
  createdAt: '2026-06-19T05:44:10.460Z',
};

export default [
  Cover,
  WhatIs,
  Materials,
  Overview,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Quality,
  Specs,
  Procurement,
  Conclusion,
  UvAppendix,
] satisfies Page[];
