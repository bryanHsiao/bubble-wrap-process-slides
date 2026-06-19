import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import imgWhatIs from '@assets/gpt-images/what-is-1.jpg';
import imgMaterial from '@assets/gpt-images/material-2.jpg';
import imgStep1 from '@assets/gpt-images/step1-extrude-1.jpg';
import imgStep2 from '@assets/gpt-images/step2-bubble-1.jpg';
import imgStep3 from '@assets/gpt-images/step3-seal-2.jpg';
import imgStep5 from '@assets/gpt-images/step5-rewind-2.jpg';
import imgSpec from '@assets/gpt-images/spec-1.jpg';

// ─── open-slide meta ──────────────────────────────────────────────────────────
export const meta: SlideMeta = {
  title: '氣泡布製程介紹（鮮明編輯風）',
  createdAt: '2026-06-19T05:44:10.460Z',
};

// ─── Design tokens（純字面值，Design 面板可調） ────────────────────────────────
export const design: DesignSystem = {
  palette: {
    bg: '#FAF6EF',
    text: '#1A1714',
    accent: '#E8590C',
  },
  fonts: {
    display: '"PingFang TC","Microsoft JhengHei","Noto Sans TC",system-ui,-apple-system,sans-serif',
    body: '"PingFang TC","Microsoft JhengHei","Noto Sans TC",system-ui,-apple-system,sans-serif',
  },
  typeScale: {
    hero: 184,
    body: 36,
  },
  radius: 6,
};

// ─── 本地常數（template-string / 次要色票用） ────────────────────────────────
const C = {
  bg: '#FAF6EF',
  text: '#1A1714',
  accent: '#E8590C',
  brown: '#8A5A2B',
  muted: '#8C8275',
  ink: '#1A1714',
  cream: '#FAF6EF',
  line: 'rgba(26,23,20,0.14)',
};

const FONT =
  '"PingFang TC","Microsoft JhengHei","Noto Sans TC",system-ui,-apple-system,sans-serif';

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
  letterSpacing: '-0.01em',
};

// ─── 共用裝飾元件 ──────────────────────────────────────────────────────────────
const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: light ? C.cream : C.accent,
    }}
  >
    <span style={{ width: 56, height: 6, background: 'var(--osd-accent)', display: 'inline-block' }} />
    {children}
  </div>
);

// 章節頁標籤：橘色橫條 + 標籤（不再用大號碼，避免與流程圖 01–09、步驟 01–05 編號打架）
const Kicker = ({ label }: { n?: string; label: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      fontSize: 28,
      fontWeight: 800,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: 'var(--osd-accent)',
    }}
  >
    <span style={{ width: 64, height: 6, background: 'var(--osd-accent)', display: 'inline-block', flexShrink: 0 }} />
    {label}
  </div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  const pad = (x: number) => String(x).padStart(2, '0');
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: '0.14em',
        color: C.muted,
      }}
    >
      <span>BUBBLE WRAP · 氣泡布製程</span>
      <span>
        <span style={{ color: 'var(--osd-accent)', fontSize: 30 }}>{pad(current)}</span>
        <span style={{ margin: '0 10px' }}>—</span>
        {pad(total)}
      </span>
    </div>
  );
};

const FooterLight = () => {
  const { current, total } = useSlidePageNumber();
  const pad = (x: number) => String(x).padStart(2, '0');
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: '0.14em',
        color: 'rgba(250,246,239,0.55)',
      }}
    >
      <span>BUBBLE WRAP · 氣泡布製程</span>
      <span>
        <span style={{ color: 'var(--osd-accent)', fontSize: 30 }}>{pad(current)}</span>
        <span style={{ margin: '0 10px' }}>—</span>
        {pad(total)}
      </span>
    </div>
  );
};

// 條列項（單行、橘色方塊前綴）
const Bullet = ({ children, size = 36 }: { children: React.ReactNode; size?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: size, lineHeight: 1.5 }}>
    <span
      style={{
        width: 16,
        height: 16,
        background: 'var(--osd-accent)',
        flexShrink: 0,
        borderRadius: 2,
      }}
    />
    <span style={{ color: C.text }}>{children}</span>
  </div>
);

// 編輯式資訊欄（標題 + 條列）
const InfoCol = ({
  head,
  children,
}: {
  head: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
    <div
      style={{
        fontSize: 30,
        fontWeight: 900,
        color: C.brown,
        letterSpacing: '0.04em',
        paddingBottom: 16,
        borderBottom: `4px solid ${C.accent}`,
      }}
    >
      {head}
    </div>
    {children}
  </div>
);

// 四象限卡片
const QuadCard = ({
  no,
  head,
  items,
}: {
  no: string;
  head: string;
  items: string[];
}) => (
  <div
    style={{
      background: '#fff',
      border: `3px solid ${C.ink}`,
      borderRadius: 'var(--osd-radius)',
      padding: '38px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          fontWeight: 900,
          color: 'var(--osd-accent)',
          lineHeight: 1,
        }}
      >
        {no}
      </span>
      <span style={{ fontSize: 38, fontWeight: 900, color: C.ink }}>{head}</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {items.map((t) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30 }}>
          <span style={{ width: 12, height: 12, background: C.accent, flexShrink: 0 }} />
          <span style={{ color: C.text, lineHeight: 1.4 }}>{t}</span>
        </div>
      ))}
    </div>
  </div>
);

// 製程步驟頁的左右分欄殼
const StepShell = ({
  no,
  tag,
  title,
  children,
  image,
  dark = false,
  coreBadge = false,
}: {
  no: string;
  tag: string;
  title: React.ReactNode;
  children: React.ReactNode;
  image: React.ReactNode;
  dark?: boolean;
  coreBadge?: boolean;
}) => (
  <div style={{ ...fill, background: dark ? C.ink : 'var(--osd-bg)', color: dark ? C.cream : C.text }}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '110px 120px 150px',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: 80,
      }}
    >
      {/* 左欄：文字 */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <span
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '0.22em',
              color: 'var(--osd-accent)',
            }}
          >
            {tag}
          </span>
          {coreBadge && (
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: '0.18em',
                color: C.ink,
                background: 'var(--osd-accent)',
                padding: '6px 16px',
                borderRadius: 4,
              }}
            >
              CORE 核心製程
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 8 }}>
          <span
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 200,
              fontWeight: 900,
              lineHeight: 0.92,
              color: 'var(--osd-accent)',
              letterSpacing: '-0.05em',
            }}
          >
            {no}
          </span>
          <span
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1,
              color: dark ? 'rgba(250,246,239,0.5)' : C.muted,
              letterSpacing: '-0.03em',
            }}
          >
            / 05
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 1.12,
            margin: '12px 0 0',
            letterSpacing: '-0.02em',
            color: dark ? C.cream : C.ink,
          }}
        >
          {title}
        </h2>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 26 }}>
          {children}
        </div>
      </div>

      {/* 右欄：照片 placeholder + SVG 示意 */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 36 }}>
        {image}
      </div>
    </div>
  </div>
);

// 步驟頁文字段落（小標 + 內文）
const StepBlock = ({
  label,
  children,
  dark = false,
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div
      style={{
        fontSize: 26,
        fontWeight: 900,
        letterSpacing: '0.06em',
        color: dark ? '#E8A06B' : C.brown,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 34, lineHeight: 1.55, color: dark ? '#EFE6D8' : C.text }}>
      {children}
    </div>
  </div>
);

// ─── 第1頁 封面 ────────────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={{ ...fill, background: C.ink, color: C.cream }}>
    {/* 角落橘色塊裝飾 */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 360,
        height: 360,
        background: 'var(--osd-accent)',
        clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '150px 120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Eyebrow light>BUBBLE WRAP / 製程介紹</Eyebrow>

      <div>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 900,
            lineHeight: 0.94,
            margin: 0,
            letterSpacing: '-0.05em',
            color: C.cream,
          }}
        >
          氣泡布
          <br />
          <span style={{ color: 'var(--osd-accent)' }}>製程</span>介紹
        </h1>
        <p
          style={{
            marginTop: 48,
            fontSize: 44,
            lineHeight: 1.5,
            color: 'rgba(250,246,239,0.82)',
            fontWeight: 500,
            maxWidth: 1300,
          }}
        >
          從塑膠粒到緩衝包材的製造流程
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: '0.2em',
          color: 'rgba(250,246,239,0.6)',
        }}
      >
        <span style={{ width: 48, height: 6, background: 'var(--osd-accent)' }} />
        採購專業人士簡報
      </div>
    </div>
  </div>
);

// ─── 第2頁 氣泡布是什麼？ ──────────────────────────────────────────────────────
const WhatIs: Page = () => (
  <div style={fill}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: '110px 120px 150px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 90,
        alignItems: 'start',
      }}
    >
      {/* 左欄：文字 */}
      <div>
        <Kicker n="01" label="WHAT IS BUBBLE WRAP" />
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 104,
            fontWeight: 900,
            margin: '28px 0 0',
            letterSpacing: '-0.03em',
            lineHeight: 1.04,
          }}
        >
          氣泡布是什麼？
        </h2>
        <p
          style={{
            marginTop: 30,
            fontSize: 40,
            lineHeight: 1.5,
            color: C.text,
            fontWeight: 500,
          }}
        >
          一種利用<span style={{ color: C.accent, fontWeight: 900 }}>封閉空氣層</span>提供緩衝保護的塑膠包裝材料。
        </p>

        <div
          style={{
            marginTop: 52,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
          }}
        >
          <InfoCol head="主要用途">
            <Bullet size={32}>電子產品、精密零件</Bullet>
            <Bullet size={32}>家具、家電</Bullet>
            <Bullet size={32}>電商物流、易碎品運輸</Bullet>
          </InfoCol>
          <InfoCol head="主要功能">
            <Bullet size={32}>緩衝防震、吸收衝擊</Bullet>
            <Bullet size={32}>防刮傷</Bullet>
            <Bullet size={32}>降低運輸損壞率</Bullet>
          </InfoCol>
        </div>
      </div>

      {/* 右欄：方形真實照片 */}
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <PhotoReal src={imgWhatIs} alt="黑底氣泡布卷" height={620} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 第3頁 氣泡布的原料 ────────────────────────────────────────────────────────
const Materials: Page = () => (
  <div style={fill}>
    <div style={{ position: 'absolute', inset: 0, padding: '110px 120px 150px' }}>
      <Kicker n="02" label="RAW MATERIALS" />
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 104,
          fontWeight: 900,
          margin: '28px 0 52px',
          letterSpacing: '-0.03em',
          lineHeight: 1.04,
        }}
      >
        氣泡布的原料
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 0.86fr',
          gap: 60,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
          <InfoCol head="主要原料">
            <Bullet size={30}>LDPE（低密度聚乙烯）</Bullet>
            <Bullet size={30}>LLDPE（線性低密度聚乙烯）</Bullet>
          </InfoCol>
          <InfoCol head="添加材料">
            <Bullet size={30}>抗靜電劑</Bullet>
            <Bullet size={30}>色母粒</Bullet>
            <Bullet size={30}>抗UV添加劑</Bullet>
            <Bullet size={30}>再生料（部分產品）</Bullet>
          </InfoCol>
        </div>
        <InfoCol head="採購關注點">
          <Bullet size={30}>原料價格波動</Bullet>
          <Bullet size={30}>再生料比例</Bullet>
          <Bullet size={30}>RoHS / REACH 合規性</Bullet>
          <Bullet size={30}>食品接觸認證需求</Bullet>
        </InfoCol>

        {/* 右欄：方形真實照片 */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <PhotoReal src={imgMaterial} alt="黑底透明塑膠粒原料" height={560} />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 第4頁 製造流程總覽（重點頁） ──────────────────────────────────────────────
// 流程節點：純文字方塊（順序由箭頭表達，不用編號，避免與步驟編號重複）
// ── 各製程階段的意象圖示（當作方塊底圖，強化記憶）──
const ICON = { width: 124, height: 124, viewBox: '0 0 64 64' } as const;
const IcPellet = () => (
  <svg {...ICON} fill="currentColor">
    <ellipse cx="20" cy="26" rx="7" ry="5" /><ellipse cx="38" cy="20" rx="7" ry="5" />
    <ellipse cx="30" cy="38" rx="7" ry="5" /><ellipse cx="47" cy="35" rx="7" ry="5" />
    <ellipse cx="23" cy="47" rx="7" ry="5" /><ellipse cx="44" cy="49" rx="7" ry="5" />
  </svg>
);
const IcExtrude = () => (
  <svg {...ICON} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 16 H52 L36 40 V52 H28 V40 Z" /><path d="M24 10 v4 M32 8 v4 M40 10 v4" />
  </svg>
);
const IcFilm = () => (
  <svg {...ICON} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 26 C16 18 24 18 32 26 C40 34 48 34 56 26" /><path d="M8 40 C16 32 24 32 32 40 C40 48 48 48 56 40" />
  </svg>
);
const IcBubble = () => (
  <svg {...ICON} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 46 H56" /><path d="M14 46 A7 7 0 0 1 28 46" /><path d="M30 46 A7 7 0 0 1 44 46" /><path d="M45 46 A6 6 0 0 1 57 46" />
  </svg>
);
const IcLaminate = () => (
  <svg {...ICON} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 22 H54" /><path d="M10 44 H54" /><circle cx="20" cy="33" r="4.5" /><circle cx="32" cy="33" r="4.5" /><circle cx="44" cy="33" r="4.5" />
  </svg>
);
const IcCool = () => (
  <svg {...ICON} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 10 V54 M14 22 L50 42 M50 22 L14 42" /><path d="M32 22 l-6 -4 M32 22 l6 -4 M32 42 l-6 4 M32 42 l6 4" />
  </svg>
);
const IcWind = () => (
  <svg {...ICON} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="34" cy="30" r="16" /><circle cx="34" cy="30" r="7" /><path d="M19 37 L6 44" />
  </svg>
);
const IcCut = () => (
  <svg {...ICON} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="44" r="6" /><circle cx="16" cy="22" r="6" /><path d="M21 41 L52 28 M21 25 L52 38" />
  </svg>
);
const IcBox = () => (
  <svg {...ICON} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 26 L32 18 L48 26 L48 44 L32 52 L16 44 Z" /><path d="M16 26 L32 34 L48 26 M32 34 V52" />
  </svg>
);

const FlowNode = ({ label, icon }: { n?: string; label: string; icon?: React.ReactNode }) => (
  <div
    style={{
      position: 'relative',
      width: 290,
      height: 150,
      background: '#fff',
      border: `4px solid ${C.ink}`,
      borderRadius: 6,
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '8px 8px 0 rgba(26,23,20,0.12)',
    }}
  >
    {icon && (
      <div style={{ position: 'absolute', right: -10, bottom: -14, color: C.ink, opacity: 0.16, pointerEvents: 'none' }}>
        {icon}
      </div>
    )}
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 24px' }}>
      <span style={{ fontSize: 37, fontWeight: 800, lineHeight: 1.18, color: C.ink }}>{label}</span>
    </div>
  </div>
);

const Arrow = ({ dir = 'right' }: { dir?: 'right' | 'down' | 'left' }) => {
  if (dir === 'down') {
    return (
      <div style={{ width: 290, display: 'flex', justifyContent: 'center' }}>
        <svg width="44" height="40" viewBox="0 0 48 56" aria-hidden>
          <path d="M24 4 V44 M10 32 L24 48 L38 32" fill="none" stroke={C.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  const flip = dir === 'left';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 56 }}>
      <svg width="52" height="40" viewBox="0 0 52 40" aria-hidden style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
        <path d="M4 20 H44 M30 6 L46 20 L30 34" fill="none" stroke={C.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const FlowOverview: Page = () => (
  <div style={fill}>
    <div style={{ position: 'absolute', inset: 0, padding: '90px 120px 130px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <Kicker n="03" label="PROCESS OVERVIEW" />
          <h2
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 96,
              fontWeight: 900,
              margin: '20px 0 0',
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
            }}
          >
            製造流程總覽
          </h2>
        </div>
        <p style={{ fontSize: 30, fontWeight: 700, color: C.muted, maxWidth: 560, lineHeight: 1.4, textAlign: 'right' }}>
          後續逐步拆解<span style={{ color: C.accent }}>五大關鍵製程</span>
        </p>
      </div>

      {/* 蛇形流程：3 列 × 3 */}
      <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* row 1 → */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <FlowNode n="01" label="塑膠粒" icon={<IcPellet />} />
          <Arrow />
          <FlowNode n="02" label="擠出熔融" icon={<IcExtrude />} />
          <Arrow />
          <FlowNode n="03" label="形成薄膜" icon={<IcFilm />} />
        </div>
        {/* connector down (右側對齊第3格) */}
        <div style={{ display: 'flex', gap: 0 }}>
          <div style={{ width: 290 }} />
          <div style={{ width: 56 }} />
          <div style={{ width: 290 }} />
          <div style={{ width: 56 }} />
          <Arrow dir="down" />
        </div>
        {/* row 2 ← */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <FlowNode n="06" label="冷卻定型" icon={<IcCool />} />
          <Arrow dir="left" />
          <FlowNode n="05" label="覆合封口" icon={<IcLaminate />} />
          <Arrow dir="left" />
          <FlowNode n="04" label="真空吸塑形成氣泡" icon={<IcBubble />} />
        </div>
        {/* connector down (左側對齊第1格) */}
        <div style={{ display: 'flex', gap: 56 }}>
          <Arrow dir="down" />
        </div>
        {/* row 3 → */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <FlowNode n="07" label="收捲" icon={<IcWind />} />
          <Arrow />
          <FlowNode n="08" label="分條裁切" icon={<IcCut />} />
          <Arrow />
          <FlowNode n="09" label="成品包裝" icon={<IcBox />} />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 步驟頁共用：機台照片 placeholder 殼（僅第8頁仍用） ───────────────────────
const PhotoBox = ({ hint }: { hint: string }) => (
  <ImagePlaceholder
    hint={hint}
    width={760}
    height={520}
    style={{
      width: '100%',
      borderRadius: 6,
      border: `4px solid ${C.ink}`,
    }}
  />
);

// ─── 步驟頁共用：真實照片框（方正粗框＋橘色邊角，編輯式裝飾） ─────────────────
const PhotoReal = ({
  src,
  alt,
  height = 420,
  dark = false,
}: {
  src: string;
  alt: string;
  height?: number;
  dark?: boolean;
}) => (
  <div style={{ position: 'relative', width: '100%' }}>
    {/* 右上橘色邊角裝飾 */}
    <div
      style={{
        position: 'absolute',
        top: -10,
        right: -10,
        width: 56,
        height: 56,
        borderTop: `8px solid ${C.accent}`,
        borderRight: `8px solid ${C.accent}`,
        zIndex: 2,
      }}
    />
    {/* 左下橘色邊角裝飾 */}
    <div
      style={{
        position: 'absolute',
        bottom: -10,
        left: -10,
        width: 56,
        height: 56,
        borderBottom: `8px solid ${C.accent}`,
        borderLeft: `8px solid ${C.accent}`,
        zIndex: 2,
      }}
    />
    <div
      style={{
        width: '100%',
        height,
        border: `4px solid ${dark ? C.cream : C.ink}`,
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: dark ? 'none' : '10px 10px 0 rgba(26,23,20,0.12)',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 6,
          display: 'block',
        }}
      />
    </div>
  </div>
);

// ─── 第5頁 第一步：塑膠粒熔融擠出 ─────────────────────────────────────────────
const Step1: Page = () => (
  <>
    <StepShell
      no="01"
      tag="STEP 01 / 製程拆解"
      title={
        <>
          塑膠粒
          <br />
          熔融擠出
        </>
      }
      image={
        <>
          <PhotoReal src={imgStep1} alt="塑膠粒熔融擠出的吹膜擠出整機" height={440} />
          <svg width="100%" height="120" viewBox="0 0 760 120" aria-hidden>
            <rect x="20" y="40" width="180" height="60" fill="none" stroke={C.ink} strokeWidth={4} />
            <text x="110" y="78" fontSize="26" fontWeight="900" fill={C.ink} textAnchor="middle">擠出機</text>
            <path d="M200 70 H300" stroke={C.accent} strokeWidth={4} />
            <polygon points="300,70 540,52 540,88" fill={C.accent} />
            <path d="M540 70 H720" stroke={C.accent} strokeWidth={6} />
            <text x="630" y="50" fontSize="24" fontWeight="800" fill={C.brown} textAnchor="middle">薄膜</text>
          </svg>
        </>
      }
    >
      <StepBlock label="製程說明">
        塑膠粒投入擠出機 → 加熱至約 <b style={{ color: C.accent }}>180~250°C</b> → 熔融成塑膠流體 → 經模頭均勻擠出。
      </StepBlock>
      <StepBlock label="產出">
        形成兩層薄膜：<b>氣泡層薄膜</b>與<b>平面封口薄膜</b>。
      </StepBlock>
    </StepShell>
    <Footer />
  </>
);

// ─── 第6頁 第二步：形成氣泡結構（核心、反白） ─────────────────────────────────
const Step2: Page = () => (
  <>
    <StepShell
      dark
      coreBadge
      no="02"
      tag="STEP 02 / 製程拆解"
      title={
        <>
          形成
          <br />
          氣泡結構
        </>
      }
      image={
        <>
          <PhotoReal src={imgStep2} alt="真空成型滾輪特寫" height={360} dark />
          <div style={{ display: 'flex', gap: 22 }}>
            {[
              { t: '小泡', s: '6~10 mm', d: 18 },
              { t: '中泡', s: '10~20 mm', d: 26 },
              { t: '大泡', s: '20~30 mm', d: 36 },
            ].map((b) => (
              <div
                key={b.t}
                style={{
                  flex: 1,
                  border: `3px solid ${C.accent}`,
                  borderRadius: 6,
                  padding: '20px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 14,
                  background: 'rgba(232,89,12,0.10)',
                }}
              >
                <span
                  style={{
                    width: b.d,
                    height: b.d,
                    borderRadius: '50%',
                    background: C.accent,
                  }}
                />
                <span style={{ fontSize: 28, fontWeight: 900, color: C.cream }}>{b.t}</span>
                <span style={{ fontSize: 24, color: '#E8A06B', fontWeight: 700 }}>{b.s}</span>
              </div>
            ))}
          </div>
        </>
      }
    >
      <StepBlock dark label="製程原理">
        熔融薄膜經過特殊滾輪 → 滾輪表面有<b style={{ color: '#E8A06B' }}>半球型孔洞</b> → 真空吸附將薄膜拉入孔洞 → 形成規則氣泡。
      </StepBlock>
      <StepBlock dark label="氣泡尺寸範例">
        小泡 6~10 mm ／ 中泡 10~20 mm ／ 大泡 20~30 mm
      </StepBlock>
    </StepShell>
    <FooterLight />
  </>
);

// ─── 第7頁 第三步：充氣與封合 ─────────────────────────────────────────────────
const SectionDiagram = () => (
  <svg width="100%" height="280" viewBox="0 0 760 280" aria-hidden>
    {/* 上層平面膜 */}
    <rect x="40" y="40" width="680" height="22" fill="none" stroke={C.ink} strokeWidth={4} />
    {/* 氣泡 */}
    {[120, 240, 360, 480, 600].map((cx) => (
      <circle key={cx} cx={cx} cy={150} r={56} fill="rgba(232,89,12,0.16)" stroke={C.accent} strokeWidth={4} />
    ))}
    {/* 下層氣泡膜 */}
    <rect x="40" y="220" width="680" height="22" fill="none" stroke={C.ink} strokeWidth={4} />
    {/* 標籤 */}
    <text x="40" y="30" fontSize="22" fontWeight="800" fill={C.brown}>上層平面膜</text>
    <text x="40" y="266" fontSize="22" fontWeight="800" fill={C.brown}>下層氣泡膜</text>
  </svg>
);

const Step3: Page = () => (
  <>
    <StepShell
      no="03"
      tag="STEP 03 / 製程拆解"
      title={
        <>
          充氣
          <br />
          與封合
        </>
      }
      image={
        <>
          <PhotoReal src={imgStep3} alt="充氣與封合覆合整機" height={360} />
          <div
            style={{
              border: `3px solid ${C.ink}`,
              borderRadius: 6,
              padding: '24px 28px 12px',
              background: '#fff',
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 900, color: C.brown, marginBottom: 6 }}>
              剖面結構示意
            </div>
            <SectionDiagram />
          </div>
        </>
      }
    >
      <StepBlock label="製程說明">
        形成氣泡後 → 導入空氣 → 覆蓋第二層平面薄膜 → <b style={{ color: C.accent }}>熱封結合</b>。
      </StepBlock>
      <StepBlock label="結構">
        上層平面膜 ／ 中間一排封閉氣泡 ○○○○ ／ 下層氣泡膜；每顆氣泡成為獨立封閉空間。
      </StepBlock>
    </StepShell>
    <Footer />
  </>
);

// ─── 第8頁 第四步：冷卻與定型 ─────────────────────────────────────────────────
const Step4: Page = () => (
  <>
    <StepShell
      no="04"
      tag="STEP 04 / 製程拆解"
      title={
        <>
          冷卻
          <br />
          與定型
        </>
      }
      image={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '0.06em', color: C.brown }}>
            常見冷卻方式
          </div>
          <div style={{ display: 'flex', gap: 28 }}>
            <div
              style={{
                flex: 1,
                border: `4px solid ${C.ink}`,
                borderRadius: 6,
                padding: '84px 0',
                textAlign: 'center',
                background: '#fff',
                boxShadow: '10px 10px 0 rgba(26,23,20,0.12)',
              }}
            >
              <svg width="100" height="100" viewBox="0 0 64 64" aria-hidden>
                <circle cx="32" cy="32" r="8" fill={C.accent} />
                <g stroke={C.ink} strokeWidth={4} strokeLinecap="round">
                  <path d="M32 24 C20 8 8 14 32 32" fill="none" />
                  <path d="M40 32 C56 20 50 8 32 32" fill="none" />
                  <path d="M32 40 C44 56 56 50 32 32" fill="none" />
                  <path d="M24 32 C8 44 14 56 32 32" fill="none" />
                </g>
              </svg>
              <div style={{ fontSize: 38, fontWeight: 900, marginTop: 20 }}>冷卻風扇</div>
            </div>
            <div
              style={{
                flex: 1,
                border: `4px solid ${C.ink}`,
                borderRadius: 6,
                padding: '84px 0',
                textAlign: 'center',
                background: '#fff',
                boxShadow: '10px 10px 0 rgba(26,23,20,0.12)',
              }}
            >
              <svg width="100" height="100" viewBox="0 0 64 64" aria-hidden>
                <circle cx="22" cy="40" r="16" fill="none" stroke={C.ink} strokeWidth={4} />
                <circle cx="46" cy="40" r="16" fill="none" stroke={C.ink} strokeWidth={4} />
                <path d="M6 22 H58" stroke={C.accent} strokeWidth={5} strokeLinecap="round" />
              </svg>
              <div style={{ fontSize: 38, fontWeight: 900, marginTop: 20 }}>冷卻滾輪</div>
            </div>
          </div>
        </div>
      }
    >
      <StepBlock label="目的">
        使材料<b style={{ color: C.accent }}>尺寸穩定</b>、強度提升、氣泡不易變形。
      </StepBlock>
      <StepBlock label="常見方式">
        冷卻風扇、冷卻滾輪。
      </StepBlock>
    </StepShell>
    <Footer />
  </>
);

// ─── 第9頁 第五步：收捲與分切 ─────────────────────────────────────────────────
const Step5: Page = () => (
  <>
    <StepShell
      no="05"
      tag="STEP 05 / 製程拆解"
      title={
        <>
          收捲
          <br />
          與分切
        </>
      }
      image={
        <>
          <PhotoReal src={imgStep5} alt="母卷收捲機" height={420} />
          <div
            style={{
              display: 'flex',
              gap: 16,
              border: `3px solid ${C.ink}`,
              borderRadius: 6,
              padding: '22px 26px',
              background: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {['30cm', '50cm', '100cm', '客製'].map((w) => (
              <span
                key={w}
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: C.cream,
                  background: C.accent,
                  padding: '12px 20px',
                  borderRadius: 4,
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </>
      }
    >
      <StepBlock label="收捲">
        形成大型母卷 <b style={{ color: C.accent }}>Jumbo Roll</b>。
      </StepBlock>
      <StepBlock label="分切">
        依客戶需求製作 30cm / 50cm / 100cm / 客製尺寸。
      </StepBlock>
    </StepShell>
    <Footer />
  </>
);

// ─── 第10頁 品質檢驗項目（2×2） ───────────────────────────────────────────────
const Quality: Page = () => (
  <div style={fill}>
    <div style={{ position: 'absolute', inset: 0, padding: '96px 120px 130px' }}>
      <Kicker n="04" label="QUALITY INSPECTION" />
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 92,
          fontWeight: 900,
          margin: '20px 0 44px',
          letterSpacing: '-0.03em',
          lineHeight: 1.02,
        }}
      >
        品質檢驗項目
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 36 }}>
        <QuadCard no="01" head="外觀檢查" items={['氣泡完整性', '表面平整度', '無破洞']} />
        <QuadCard no="02" head="尺寸檢驗" items={['厚度', '寬度', '長度']} />
        <QuadCard no="03" head="功能檢驗" items={['氣泡保氣性', '抗壓能力', '緩衝性能']} />
        <QuadCard no="04" head="常見不良" items={['漏氣、氣泡大小不均', '熱封不良', '薄膜厚度不足']} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 第11頁 氣泡布的規格差異 ──────────────────────────────────────────────────
const SpecChip = ({ n, label }: { n: string; label: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      background: '#fff',
      border: `3px solid ${C.ink}`,
      borderRadius: 6,
      padding: '28px 36px',
    }}
  >
    <span
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 54,
        fontWeight: 900,
        color: C.accent,
        lineHeight: 1,
        width: 86,
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: 40, fontWeight: 800, color: C.ink }}>{label}</span>
  </div>
);

const Specs: Page = () => (
  <div style={fill}>
    <div style={{ position: 'absolute', inset: 0, padding: '96px 120px 130px' }}>
      <Kicker n="05" label="SPECIFICATIONS" />
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 92,
          fontWeight: 900,
          margin: '20px 0 16px',
          letterSpacing: '-0.03em',
          lineHeight: 1.02,
        }}
      >
        氣泡布的規格差異
      </h2>
      <p style={{ fontSize: 36, fontWeight: 700, color: C.brown, marginBottom: 44 }}>
        影響價格的主要因素
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr 0.75fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        {/* 左欄：規格 chips */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
          <SpecChip n="01" label="厚度（μm）" />
          <SpecChip n="02" label="氣泡尺寸" />
          <SpecChip n="03" label="原料等級" />
          <SpecChip n="04" label="再生料比例" />
          <SpecChip n="05" label="抗靜電需求" />
          <SpecChip n="06" label="客製印刷需求" />
        </div>

        {/* 右欄：方形真實照片 */}
        <div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
          <PhotoReal src={imgSpec} alt="氣泡布卷與氣泡放大" height={460} />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 第12頁 採購人員應關注的重點（2×2） ──────────────────────────────────────
const Procurement: Page = () => (
  <div style={fill}>
    <div style={{ position: 'absolute', inset: 0, padding: '90px 120px 130px' }}>
      <Kicker n="06" label="PROCUREMENT FOCUS" />
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 900,
          margin: '18px 0 40px',
          letterSpacing: '-0.03em',
          lineHeight: 1.02,
        }}
      >
        採購人員應關注的重點
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 32 }}>
        <QuadCard no="01" head="成本面" items={['樹脂原料價格', '運輸成本', 'MOQ（最低訂購量）']} />
        <QuadCard no="02" head="品質面" items={['保氣時間', '氣泡高度一致性', '厚度公差']} />
        <QuadCard no="03" head="ESG 面" items={['再生料比例', '可回收性', '環保法規符合性']} />
        <QuadCard no="04" head="供應鏈面" items={['交期穩定性', '備援供應商', '生產產能']} />
      </div>
    </div>
    <Footer />
  </div>
);

// ─── 第13頁 結語 ──────────────────────────────────────────────────────────────
const SummaryNode = ({ label, sub }: { label: string; sub?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 0 }}>
    <div
      style={{
        background: C.ink,
        color: C.cream,
        fontSize: 28,
        fontWeight: 900,
        padding: '18px 26px',
        borderRadius: 6,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
    {sub && <div style={{ fontSize: 20, fontWeight: 700, color: C.accent }}>{sub}</div>}
  </div>
);

const SummaryArrow = () => (
  <svg width="44" height="34" viewBox="0 0 44 34" aria-hidden style={{ flexShrink: 0 }}>
    <path d="M4 17 H36 M24 5 L38 17 L24 29" fill="none" stroke={C.accent} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Conclusion: Page = () => (
  <div style={{ ...fill, background: C.ink, color: C.cream }}>
    <div style={{ position: 'absolute', inset: 0, padding: '100px 120px 150px', display: 'flex', flexDirection: 'column' }}>
      <Eyebrow light>SUMMARY / 結語</Eyebrow>

      {/* 濃縮流程 */}
      <div
        style={{
          marginTop: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          flexWrap: 'nowrap',
        }}
      >
        <SummaryNode label="塑膠粒" />
        <SummaryArrow />
        <SummaryNode label="薄膜形成" sub="熔融擠出" />
        <SummaryArrow />
        <SummaryNode label="氣泡形成" sub="真空成型" />
        <SummaryArrow />
        <SummaryNode label="封閉氣泡" sub="熱封覆合" />
        <SummaryArrow />
        <SummaryNode label="氣泡布成品" sub="冷卻定型／收捲分切" />
      </div>

      {/* 金句 */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ width: 90, height: 8, background: 'var(--osd-accent)', marginBottom: 36 }} />
        <p
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 60,
            fontWeight: 900,
            lineHeight: 1.35,
            margin: 0,
            letterSpacing: '-0.02em',
            maxWidth: 1600,
          }}
        >
          氣泡布的核心，在於以
          <span style={{ color: 'var(--osd-accent)' }}>真空成型</span>產生規則氣泡，再透過
          <span style={{ color: 'var(--osd-accent)' }}>熱封</span>把空氣永久封存在薄膜之間，藉由空氣層達到優異的緩衝保護。
        </p>
      </div>
    </div>
    <FooterLight />
  </div>
);

// ─── 第14頁 補充：為什麼需要抗UV添加劑？ ─────────────────────────────────────
const UVCol = ({
  head,
  children,
}: {
  head: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      background: '#fff',
      border: `3px solid ${C.ink}`,
      borderRadius: 6,
      padding: '26px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}
  >
    <div
      style={{
        fontSize: 26,
        fontWeight: 900,
        color: C.accent,
        letterSpacing: '0.04em',
        paddingBottom: 12,
        borderBottom: `3px solid ${C.line}`,
      }}
    >
      {head}
    </div>
    {children}
  </div>
);

const UVLine = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 25, lineHeight: 1.4 }}>
    <span style={{ width: 10, height: 10, marginTop: 9, background: C.accent, flexShrink: 0 }} />
    <span style={{ color: C.text }}>{children}</span>
  </div>
);

const UVNote: Page = () => (
  <div style={fill}>
    <div style={{ position: 'absolute', inset: 0, padding: '70px 120px 120px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Kicker n="07" label="UV ADDITIVE · 補充" />
          <h2
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 72,
              fontWeight: 900,
              margin: '14px 0 0',
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
            }}
          >
            為什麼需要抗UV添加劑？
          </h2>
        </div>
        <div
          style={{
            maxWidth: 560,
            background: C.ink,
            color: C.cream,
            padding: '20px 26px',
            borderRadius: 6,
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          結論：一般包裝用氣泡布<b style={{ color: '#E8A06B' }}>不一定需要</b>抗UV劑，僅特定用途才要求。
        </div>
      </div>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <UVCol head="不加會怎樣">
          <UVLine>聚乙烯遇紫外線 → 分子鏈斷裂、氧化、脆化</UVLine>
          <UVLine>現象：泛黃、變硬、一拉就破、氣泡漏氣</UVLine>
        </UVCol>
        <UVCol head="需要情境">
          <UVLine>戶外長期儲放</UVLine>
          <UVLine>長途海運</UVLine>
          <UVLine>溫室農業用途</UVLine>
        </UVCol>
        <UVCol head="如何做到">
          <UVLine>UV Absorber（紫外線吸收劑）</UVLine>
          <UVLine>HALS（受阻胺光穩定劑）</UVLine>
          <UVLine>添加量約 0.1%~1%</UVLine>
        </UVCol>
        <UVCol head="採購怎麼問">
          <UVLine>是否添加 UV Stabilizer？</UVLine>
          <UVLine>保護壽命多久？</UVLine>
          <UVLine>是否有測試報告（QUV / ASTM G154）？</UVLine>
        </UVCol>
        <div
          style={{
            gridColumn: 'span 2',
            background: 'var(--osd-accent)',
            color: C.cream,
            borderRadius: 6,
            padding: '26px 34px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p style={{ margin: 0, fontSize: 36, fontWeight: 900, lineHeight: 1.4 }}>
            抗UV 不是標準配備，而是依使用情境增加成本的<span style={{ color: C.ink }}>客製規格</span>。
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ─── Deck 匯出 ─────────────────────────────────────────────────────────────────
const pages: Page[] = [
  Cover,
  WhatIs,
  Materials,
  FlowOverview,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Quality,
  Specs,
  Procurement,
  Conclusion,
];

export default pages;
