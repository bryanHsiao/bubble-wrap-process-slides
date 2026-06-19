import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import imgWhatIs from '@assets/gpt-images/what-is-1.jpg';
import imgMaterial from '@assets/gpt-images/material-2.jpg';
import imgStep1 from '@assets/gpt-images/step1-extrude-1.jpg';
import imgStep2 from '@assets/gpt-images/step2-bubble-1.jpg';
import imgStep3 from '@assets/gpt-images/step3-seal-2.jpg';
import imgStep5 from '@assets/gpt-images/step5-rewind-2.jpg';
import imgSpec from '@assets/gpt-images/spec-1.jpg';

export const design: DesignSystem = {
  palette: { bg: '#F6F8FA', text: '#1B2733', accent: '#0E9F8E' },
  fonts: {
    display: '"PingFang TC","Microsoft JhengHei","Noto Sans TC",system-ui,-apple-system,sans-serif',
    body: '"PingFang TC","Microsoft JhengHei","Noto Sans TC",system-ui,-apple-system,sans-serif',
  },
  typeScale: { hero: 150, body: 36 },
  radius: 18,
};

/* ---- 補充色票（DesignSystem shape 之外，純常數） ---- */
const NAVY = '#1E5F8C';
const MUTED = '#6B7785';
const CARD = '#FFFFFF';
const HAIRLINE = '#E4E9EE';
const CARD_SHADOW = '0 8px 30px rgba(20,40,60,0.06)';
const TEAL_SOFT = 'rgba(14,159,142,0.10)';
const NAVY_SOFT = 'rgba(30,95,140,0.10)';

const DECK_NAME = '氣泡布製程介紹';

const fill = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  fontFamily: 'var(--osd-font-body)',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  position: 'relative',
  overflow: 'hidden',
} as const;

/* ============ 共用元件 ============ */

const Footer = () => {
  const { current, total } = useSlidePageNumber();
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
        fontSize: 22,
        color: MUTED,
        letterSpacing: '0.04em',
      }}
    >
      <span>{DECK_NAME}</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const TealBar = ({ width = 72 }: { width?: number }) => (
  <div
    style={{
      width,
      height: 8,
      borderRadius: 4,
      background: 'var(--osd-accent)',
      marginBottom: 28,
    }}
  />
);

const PageTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div style={{ marginBottom: 44 }}>
    <div
      style={{
        fontSize: 24,
        letterSpacing: '0.22em',
        color: 'var(--osd-accent)',
        fontWeight: 700,
        marginBottom: 18,
      }}
    >
      {eyebrow}
    </div>
    <TealBar />
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 68,
        fontWeight: 800,
        margin: 0,
        lineHeight: 1.2,
      }}
    >
      {title}
    </h2>
  </div>
);

const ContentRoot = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...fill, padding: '120px 120px 0' }}>
    {children}
    <Footer />
  </div>
);

/* ============ 小 SVG 圖示 ============ */

const IconBox = ({ children, bg = TEAL_SOFT }: { children: React.ReactNode; bg?: string }) => (
  <div
    style={{
      width: 84,
      height: 84,
      borderRadius: 20,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

const IconShield = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" fill="#0E9F8E" />
    <path d="M8.5 12.5l2.3 2.3 4.5-4.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBolt = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="#1E5F8C" />
  </svg>
);

const IconLayers = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
    <path d="M12 3l9 5-9 5-9-5 9-5z" fill="#0E9F8E" />
    <path d="M3 13l9 5 9-5" stroke="#1E5F8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const IconTruck = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
    <rect x="1" y="6" width="13" height="9" rx="2" fill="#1E5F8C" />
    <path d="M14 9h4l3 3v3h-7V9z" fill="#0E9F8E" />
    <circle cx="6" cy="17" r="2.4" fill="#1B2733" />
    <circle cx="17.5" cy="17" r="2.4" fill="#1B2733" />
  </svg>
);

const IconDrop = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
    <path d="M12 2.5C8 8 5.5 11 5.5 14.5a6.5 6.5 0 0013 0C18.5 11 16 8 12 2.5z" fill="#0E9F8E" />
    <path d="M9.5 14.5a2.5 2.5 0 002.5 2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  </svg>
);

const IconSun = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" fill="#0E9F8E" />
    <g stroke="#1E5F8C" strokeWidth="2" strokeLinecap="round">
      <path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M20 4l-2 2M6 18l-2 2" />
    </g>
  </svg>
);

const IconCheck = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#0E9F8E" />
    <path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRuler = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="8" width="20" height="8" rx="2" fill="#1E5F8C" />
    <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 8v3M10 8v4M14 8v3M18 8v4" />
    </g>
  </svg>
);

const IconGauge = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <path d="M3 18a9 9 0 0118 0" stroke="#0E9F8E" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <path d="M12 18l5-5" stroke="#1E5F8C" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="12" cy="18" r="2" fill="#1B2733" />
  </svg>
);

const IconWarn = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <path d="M12 3l9 16H3L12 3z" fill="#1E5F8C" />
    <path d="M12 9v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="1.2" fill="#fff" />
  </svg>
);

/* ============ 1. 封面 ============ */

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
    {/* 右上柔和裝飾氣泡 */}
    <svg
      width="520"
      height="520"
      viewBox="0 0 520 520"
      style={{ position: 'absolute', top: -60, right: -40, opacity: 0.5 }}
    >
      <g fill="none" stroke="rgba(14,159,142,0.18)" strokeWidth="2">
        <circle cx="120" cy="120" r="52" />
        <circle cx="240" cy="120" r="52" />
        <circle cx="360" cy="120" r="52" />
        <circle cx="120" cy="240" r="52" />
        <circle cx="240" cy="240" r="52" />
        <circle cx="360" cy="240" r="52" />
      </g>
      <g fill="rgba(14,159,142,0.10)">
        <circle cx="120" cy="120" r="22" />
        <circle cx="240" cy="120" r="22" />
        <circle cx="360" cy="120" r="22" />
        <circle cx="120" cy="240" r="22" />
        <circle cx="240" cy="240" r="22" />
        <circle cx="360" cy="240" r="22" />
      </g>
    </svg>

    <div
      style={{
        fontSize: 26,
        letterSpacing: '0.32em',
        color: 'var(--osd-accent)',
        fontWeight: 700,
      }}
    >
      製程介紹 · PROCESS GUIDE
    </div>
    <TealBar width={96} />
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 132,
        fontWeight: 900,
        margin: '8px 0 0',
        lineHeight: 1.12,
        letterSpacing: '-0.01em',
      }}
    >
      氣泡布<span style={{ color: 'var(--osd-accent)' }}>製程</span>介紹
    </h1>
    <div style={{ fontSize: 40, color: MUTED, marginTop: 16, fontWeight: 500 }}>
      Bubble Wrap
    </div>
    <p style={{ fontSize: 40, color: 'var(--osd-text)', marginTop: 40, maxWidth: 1100 }}>
      從塑膠粒到緩衝包材的製造流程
    </p>

    <div
      style={{
        position: 'absolute',
        left: 160,
        bottom: 88,
        fontSize: 24,
        color: MUTED,
        letterSpacing: '0.06em',
      }}
    >
      採購專業人士簡報
    </div>
  </div>
);

/* ============ 2. 氣泡布是什麼 ============ */

const FeatureCard = ({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) => (
  <div
    style={{
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      padding: '22px 36px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}
  >
    <IconBox>{icon}</IconBox>
    <div style={{ fontSize: 32, fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 28, color: MUTED, lineHeight: 1.55 }}>{body}</div>
  </div>
);

const WhatIs: Page = () => (
  <ContentRoot>
    <PageTitle eyebrow="WHAT IS BUBBLE WRAP" title="氣泡布是什麼？" />

    <div style={{ display: 'flex', gap: 56, alignItems: 'stretch' }}>
      {/* 左欄 內容 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            background: CARD,
            borderRadius: 'var(--osd-radius)',
            boxShadow: CARD_SHADOW,
            padding: '28px 40px',
            fontSize: 34,
            lineHeight: 1.55,
          }}
        >
          氣泡布是一種利用<span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>封閉空氣層</span>
          提供緩衝保護的塑膠包裝材料。
        </div>

        <FeatureCard
          icon={<IconTruck />}
          title="主要用途"
          body="電子產品、精密零件、家具家電、電商物流、易碎品運輸。"
        />
        <FeatureCard
          icon={<IconShield />}
          title="主要功能"
          body="緩衝防震、吸收衝擊、防刮傷，有效降低運輸損壞率。"
        />
      </div>

      {/* 右欄 圖片 */}
      <div style={{ width: 560, flexShrink: 0, display: 'flex' }}>
        <div
          style={{
            background: CARD,
            borderRadius: 'var(--osd-radius)',
            boxShadow: CARD_SHADOW,
            padding: 18,
            width: '100%',
          }}
        >
          <div style={{ width: '100%', height: 560, borderRadius: 18, overflow: 'hidden' }}>
            <img
              src={imgWhatIs}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18, display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  </ContentRoot>
);

/* ============ 3. 原料 ============ */

const MaterialRow = ({
  label,
  items,
  tone = 'teal',
}: {
  label: string;
  items: string;
  tone?: 'teal' | 'navy';
}) => (
  <div
    style={{
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      padding: '32px 40px',
      display: 'flex',
      alignItems: 'center',
      gap: 36,
    }}
  >
    <div
      style={{
        fontSize: 27,
        fontWeight: 700,
        color: tone === 'teal' ? 'var(--osd-accent)' : NAVY,
        background: tone === 'teal' ? TEAL_SOFT : NAVY_SOFT,
        padding: '12px 26px',
        borderRadius: 999,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 32, lineHeight: 1.5 }}>{items}</div>
  </div>
);

const Materials: Page = () => (
  <ContentRoot>
    <PageTitle eyebrow="RAW MATERIALS" title="氣泡布的原料" />
    <div style={{ display: 'flex', gap: 56, alignItems: 'stretch' }}>
      {/* 左欄 內容 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28, justifyContent: 'center' }}>
        <MaterialRow label="主要原料" items="LDPE（低密度聚乙烯）、LLDPE（線性低密度聚乙烯）" />
        <MaterialRow label="添加材料" items="抗靜電劑、色母粒、抗UV添加劑、再生料（部分產品）" />
        <MaterialRow
          label="採購關注"
          tone="navy"
          items="原料價格波動、再生料比例、RoHS／REACH 合規性、食品接觸認證需求"
        />
      </div>

      {/* 右欄 圖片 */}
      <div style={{ width: 520, flexShrink: 0, display: 'flex' }}>
        <div
          style={{
            background: CARD,
            borderRadius: 'var(--osd-radius)',
            boxShadow: CARD_SHADOW,
            padding: 18,
            width: '100%',
          }}
        >
          <div style={{ width: '100%', height: 560, borderRadius: 18, overflow: 'hidden' }}>
            <img
              src={imgMaterial}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18, display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  </ContentRoot>
);

/* ============ 4. 製造流程總覽 ============ */

// 流程節點：純文字卡（順序由箭頭表達，不用編號，避免與步驟編號重複）
const FlowNode = ({ label }: { n?: number; label: string }) => (
  <div
    style={{
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      width: 268,
      height: 132,
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 31, fontWeight: 700, lineHeight: 1.3, color: '#1B2733' }}>{label}</div>
  </div>
);

const Arrow = ({ dir = 'right' }: { dir?: 'right' | 'left' | 'down' }) =>
  dir === 'down' ? (
    <svg width="24" height="40" viewBox="0 0 24 40" style={{ flexShrink: 0 }}>
      <path d="M12 2v34M5 28l7 9 7-9" stroke="#0E9F8E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ) : (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      style={{ flexShrink: 0, transform: dir === 'left' ? 'scaleX(-1)' : 'none' }}
    >
      <path d="M2 12h40M34 5l9 7-9 7" stroke="#0E9F8E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );

const FlowOverview: Page = () => (
  <ContentRoot>
    <PageTitle eyebrow="PROCESS OVERVIEW" title="製造流程總覽" />

    {/* Row 1 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
      <FlowNode n={1} label="塑膠粒" />
      <Arrow />
      <FlowNode n={2} label="擠出熔融" />
      <Arrow />
      <FlowNode n={3} label="形成薄膜" />
      <Arrow />
      <FlowNode n={4} label="真空吸塑形成氣泡" />
    </div>

    {/* connector down on the right */}
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 130, marginBottom: 24 }}>
      <Arrow dir="down" />
    </div>

    {/* Row 2 (reversed visual flow, right to left) */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
        flexDirection: 'row-reverse',
      }}
    >
      <FlowNode n={5} label="覆合封口" />
      <Arrow dir="left" />
      <FlowNode n={6} label="冷卻定型" />
      <Arrow dir="left" />
      <FlowNode n={7} label="收捲" />
      <Arrow dir="left" />
      <FlowNode n={8} label="分條裁切" />
    </div>

    {/* connector down on the left (分條裁切 → 成品包裝) */}
    <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 122, marginBottom: 24 }}>
      <Arrow dir="down" />
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
      <FlowNode n={9} label="成品包裝" />
      <div style={{ fontSize: 28, color: MUTED, marginLeft: 24 }}>
        後續逐步拆解<span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>五大關鍵製程</span>。
      </div>
    </div>
  </ContentRoot>
);

/* ============ 製程步驟頁通用版型 ============ */

const StepLayout = ({
  stepLabel,
  title,
  children,
  placeholderHint = '',
  imageSrc,
  visual,
}: {
  stepLabel: string;
  title: string;
  children: React.ReactNode;
  placeholderHint?: string;
  imageSrc?: string;
  visual?: React.ReactNode;
}) => (
  <div style={{ ...fill, padding: '120px 120px 0', display: 'flex', gap: 72 }}>
    {/* 左欄 */}
    <div style={{ width: 880, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          fontSize: 24,
          letterSpacing: '0.22em',
          color: 'var(--osd-accent)',
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        {stepLabel}
      </div>
      <TealBar />
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 60,
          fontWeight: 800,
          margin: '0 0 44px',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      {children}
    </div>

    {/* 右欄 圖片 / 自訂視覺 */}
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {visual ? (
        visual
      ) : (
        <div
          style={{
            background: CARD,
            borderRadius: 'var(--osd-radius)',
            boxShadow: CARD_SHADOW,
            padding: 20,
          }}
        >
          {imageSrc ? (
            <div
              style={{
                width: 680,
                height: 680,
                borderRadius: 18,
                overflow: 'hidden',
              }}
            >
              <img
                src={imageSrc}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 18,
                  display: 'block',
                }}
              />
            </div>
          ) : (
            <ImagePlaceholder hint={placeholderHint} width={680} height={680} />
          )}
        </div>
      )}
    </div>

    <Footer />
  </div>
);

const ProcessLine = ({ text }: { text: string }) => (
  <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 22 }}>
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: 999,
        background: 'var(--osd-accent)',
        marginTop: 16,
        flexShrink: 0,
      }}
    />
    <div style={{ fontSize: 33, lineHeight: 1.5 }}>{text}</div>
  </div>
);

const InfoCard = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      padding: '28px 34px',
      marginTop: 8,
    }}
  >
    <div style={{ fontSize: 24, fontWeight: 700, color: NAVY, marginBottom: 14 }}>{label}</div>
    {children}
  </div>
);

/* ============ 5. 第一步 熔融擠出 ============ */

const Step1: Page = () => (
  <StepLayout
    stepLabel="STEP 01 / 五大製程"
    title="第一步：塑膠粒熔融擠出"
    placeholderHint="擠出機與模頭實機照片（塑膠粒熔融擠出）"
    imageSrc={imgStep1}
  >
    <div style={{ marginBottom: 8 }}>
      <ProcessLine text="塑膠粒投入擠出機後加熱" />
      <ProcessLine text="加熱至約 180~250°C，熔融成塑膠流體" />
      <ProcessLine text="熔體經模頭均勻擠出成型" />
    </div>
    <InfoCard label="產出">
      <div style={{ fontSize: 30, lineHeight: 1.5 }}>
        形成兩層薄膜：<span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>氣泡層薄膜</span> 與{' '}
        <span style={{ color: NAVY, fontWeight: 700 }}>平面封口薄膜</span>。
      </div>
    </InfoCard>
  </StepLayout>
);

/* ============ 6. 第二步 形成氣泡結構 ============ */

const BubbleSizeChip = ({
  name,
  size,
  d,
}: {
  name: string;
  size: string;
  d: number;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      marginBottom: 16,
    }}
  >
    <div style={{ width: 64, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
      <div
        style={{
          width: d,
          height: d,
          borderRadius: 999,
          background: TEAL_SOFT,
          border: '2px solid #0E9F8E',
        }}
      />
    </div>
    <div style={{ fontSize: 29, fontWeight: 700, width: 96, flexShrink: 0 }}>{name}</div>
    <div style={{ fontSize: 29, color: MUTED }}>{size}</div>
  </div>
);

const Step2: Page = () => (
  <StepLayout
    stepLabel="STEP 02 / 核心製程 ★"
    title="第二步：形成氣泡結構"
    placeholderHint="真空成型滾輪（半球孔洞）特寫照片"
    imageSrc={imgStep2}
  >
    <div style={{ marginBottom: 24 }}>
      <ProcessLine text="熔融薄膜經過特殊滾輪" />
      <ProcessLine text="滾輪表面有半球型孔洞" />
      <ProcessLine text="真空吸附將薄膜拉入孔洞，形成規則氣泡" />
    </div>
    <InfoCard label="氣泡尺寸範例">
      <BubbleSizeChip name="小泡" size="6 ~ 10 mm" d={28} />
      <BubbleSizeChip name="中泡" size="10 ~ 20 mm" d={40} />
      <div style={{ marginBottom: 0 }}>
        <BubbleSizeChip name="大泡" size="20 ~ 30 mm" d={54} />
      </div>
    </InfoCard>
  </StepLayout>
);

/* ============ 7. 第三步 充氣與封合 ============ */

const CrossSection = () => (
  <div
    style={{
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      padding: '28px 34px',
      marginTop: 8,
    }}
  >
    <div style={{ fontSize: 24, fontWeight: 700, color: NAVY, marginBottom: 18 }}>剖面結構</div>
    <svg width="780" height="190" viewBox="0 0 780 190">
      {/* 上層平面膜 */}
      <rect x="20" y="34" width="740" height="14" rx="6" fill="#1E5F8C" />
      <text x="20" y="24" fill="#6B7785" fontSize="20">
        上層平面膜
      </text>
      {/* 氣泡 */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={92 + i * 120} cy={100} r={40} fill="rgba(14,159,142,0.14)" stroke="#0E9F8E" strokeWidth="3" />
      ))}
      <text x="20" y="100" fill="#6B7785" fontSize="20">
        氣泡
      </text>
      {/* 下層氣泡膜 */}
      <path
        d="M20 150 q24 -16 48 0 q24 16 48 0 q24 -16 48 0 q24 16 48 0 q24 -16 48 0 q24 16 48 0 q24 -16 48 0 q24 16 48 0 q24 -16 48 0 q24 16 48 0 q24 -16 48 0 q24 16 48 0 q24 -16 48 0"
        fill="none"
        stroke="#0E9F8E"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <text x="20" y="180" fill="#6B7785" fontSize="20">
        下層氣泡膜
      </text>
    </svg>
    <div style={{ fontSize: 26, color: MUTED, marginTop: 12, lineHeight: 1.5 }}>
      每顆氣泡成為<span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>獨立封閉空間</span>。
    </div>
  </div>
);

const Step3: Page = () => (
  <StepLayout
    stepLabel="STEP 03 / 五大製程"
    title="第三步：充氣與封合"
    placeholderHint="充氣熱封覆合段實機照片"
    imageSrc={imgStep3}
  >
    <div style={{ marginBottom: 16 }}>
      <ProcessLine text="形成氣泡後導入空氣" />
      <ProcessLine text="覆蓋第二層平面薄膜後熱封結合" />
    </div>
    <CrossSection />
  </StepLayout>
);

/* ============ 8. 第四步 冷卻與定型 ============ */

const CoolingCard = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div
    style={{
      flex: 1,
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      padding: '64px 0',
      textAlign: 'center',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
      <IconBox>{icon}</IconBox>
    </div>
    <div style={{ fontSize: 36, fontWeight: 700 }}>{label}</div>
  </div>
);

const Step4: Page = () => (
  <StepLayout
    stepLabel="STEP 04 / 五大製程"
    title="第四步：冷卻與定型"
    visual={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, width: '100%' }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: NAVY }}>常見冷卻方式</div>
        <div style={{ display: 'flex', gap: 28 }}>
          <CoolingCard icon={<IconBolt />} label="冷卻風扇" />
          <CoolingCard icon={<IconDrop />} label="冷卻滾輪" />
        </div>
      </div>
    }
  >
    <InfoCard label="製程目的">
      <ProcessLine text="使材料尺寸穩定、強度提升" />
      <ProcessLine text="避免氣泡受熱變形" />
    </InfoCard>
  </StepLayout>
);

/* ============ 9. 第五步 收捲與分切 ============ */

const SizeChip = ({ text }: { text: string }) => (
  <span
    style={{
      fontSize: 28,
      fontWeight: 700,
      color: 'var(--osd-accent)',
      background: TEAL_SOFT,
      padding: '12px 26px',
      borderRadius: 999,
    }}
  >
    {text}
  </span>
);

const Step5: Page = () => (
  <StepLayout
    stepLabel="STEP 05 / 五大製程"
    title="第五步：收捲與分切"
    placeholderHint="母卷收捲與分條裁切機台照片"
    imageSrc={imgStep5}
  >
    <div style={{ marginBottom: 8 }}>
      <ProcessLine text="收捲：形成大型母卷（Jumbo Roll）" />
      <ProcessLine text="分切：依客戶需求製作各種寬度" />
    </div>
    <InfoCard label="常見分切尺寸">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
        <SizeChip text="30 cm" />
        <SizeChip text="50 cm" />
        <SizeChip text="100 cm" />
        <SizeChip text="客製尺寸" />
      </div>
    </InfoCard>
  </StepLayout>
);

/* ============ 10. 品質檢驗 ============ */

const QCCard = ({
  icon,
  title,
  body,
  tone = 'teal',
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tone?: 'teal' | 'navy';
}) => (
  <div
    style={{
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      padding: '34px 38px',
      display: 'flex',
      gap: 24,
      alignItems: 'flex-start',
    }}
  >
    <IconBox bg={tone === 'teal' ? TEAL_SOFT : NAVY_SOFT}>{icon}</IconBox>
    <div>
      <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>{title}</div>
      <div style={{ fontSize: 27, color: MUTED, lineHeight: 1.5 }}>{body}</div>
    </div>
  </div>
);

const QualityCheck: Page = () => (
  <ContentRoot>
    <PageTitle eyebrow="QUALITY CONTROL" title="品質檢驗項目" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <QCCard icon={<IconCheck />} title="外觀檢查" body="氣泡完整性、表面平整度、無破洞。" />
      <QCCard icon={<IconRuler />} title="尺寸檢驗" tone="navy" body="厚度、寬度、長度量測。" />
      <QCCard icon={<IconGauge />} title="功能檢驗" body="氣泡保氣性、抗壓能力、緩衝性能。" />
      <QCCard
        icon={<IconWarn />}
        title="常見不良"
        tone="navy"
        body="漏氣、氣泡大小不均、熱封不良、厚度不足。"
      />
    </div>
  </ContentRoot>
);

/* ============ 11. 規格差異 ============ */

const SpecChip = ({ text }: { text: string }) => (
  <div
    style={{
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      padding: '34px 36px',
      display: 'flex',
      alignItems: 'center',
      gap: 22,
    }}
  >
    <div
      style={{
        width: 16,
        height: 56,
        borderRadius: 8,
        background: 'var(--osd-accent)',
        flexShrink: 0,
      }}
    />
    <div style={{ fontSize: 34, fontWeight: 600 }}>{text}</div>
  </div>
);

const Specs: Page = () => (
  <ContentRoot>
    <PageTitle eyebrow="SPECIFICATIONS" title="氣泡布的規格差異" />
    <div style={{ fontSize: 30, color: MUTED, marginTop: -20, marginBottom: 40 }}>
      影響價格的主要因素
    </div>
    <div style={{ display: 'flex', gap: 48, alignItems: 'stretch' }}>
      {/* 左欄 圖片 */}
      <div style={{ width: 480, flexShrink: 0, display: 'flex' }}>
        <div
          style={{
            background: CARD,
            borderRadius: 'var(--osd-radius)',
            boxShadow: CARD_SHADOW,
            padding: 18,
            width: '100%',
          }}
        >
          <div style={{ width: '100%', height: '100%', minHeight: 460, borderRadius: 18, overflow: 'hidden' }}>
            <img
              src={imgSpec}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18, display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* 右欄 規格 */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignContent: 'center' }}>
        <SpecChip text="厚度（μm）" />
        <SpecChip text="氣泡尺寸" />
        <SpecChip text="原料等級" />
        <SpecChip text="再生料比例" />
        <SpecChip text="抗靜電需求" />
        <SpecChip text="客製印刷需求" />
      </div>
    </div>
  </ContentRoot>
);

/* ============ 12. 採購重點 ============ */

const BulletRow = ({ text, tone = 'teal' }: { text: string; tone?: 'teal' | 'navy' }) => (
  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
    <div style={{ width: 8, height: 8, borderRadius: 999, background: tone === 'teal' ? '#0E9F8E' : NAVY, flexShrink: 0 }} />
    <span style={{ fontSize: 27, color: '#33414E' }}>{text}</span>
  </div>
);

const ProcurementCard = ({
  icon,
  title,
  tone = 'teal',
  children,
}: {
  icon: React.ReactNode;
  title: string;
  tone?: 'teal' | 'navy';
  children: React.ReactNode;
}) => (
  <div
    style={{
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      padding: '32px 36px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 22 }}>
      <IconBox bg={tone === 'teal' ? TEAL_SOFT : NAVY_SOFT}>{icon}</IconBox>
      <div style={{ fontSize: 34, fontWeight: 800 }}>{title}</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
  </div>
);

const Procurement: Page = () => (
  <ContentRoot>
    <PageTitle eyebrow="FOR BUYERS" title="採購人員應關注的重點" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
      <ProcurementCard icon={<IconBolt />} title="成本面" tone="navy">
        <BulletRow text="樹脂原料價格" tone="navy" />
        <BulletRow text="運輸成本" tone="navy" />
        <BulletRow text="MOQ（最低訂購量）" tone="navy" />
      </ProcurementCard>
      <ProcurementCard icon={<IconShield />} title="品質面">
        <BulletRow text="保氣時間" />
        <BulletRow text="氣泡高度一致性" />
        <BulletRow text="厚度公差" />
      </ProcurementCard>
      <ProcurementCard icon={<IconDrop />} title="ESG 面">
        <BulletRow text="再生料比例" />
        <BulletRow text="可回收性" />
        <BulletRow text="環保法規符合性" />
      </ProcurementCard>
      <ProcurementCard icon={<IconTruck />} title="供應鏈面" tone="navy">
        <BulletRow text="交期穩定性" tone="navy" />
        <BulletRow text="備援供應商" tone="navy" />
        <BulletRow text="生產產能" tone="navy" />
      </ProcurementCard>
    </div>
  </ContentRoot>
);

/* ============ 13. 結語 ============ */

const SummaryNode = ({ main, sub }: { main: string; sub?: string }) => (
  <div
    style={{
      background: CARD,
      borderRadius: 16,
      boxShadow: CARD_SHADOW,
      padding: '20px 26px',
      textAlign: 'center',
      minWidth: 188,
    }}
  >
    <div style={{ fontSize: 28, fontWeight: 700 }}>{main}</div>
    {sub && <div style={{ fontSize: 21, color: 'var(--osd-accent)', marginTop: 6 }}>{sub}</div>}
  </div>
);

const Conclusion: Page = () => (
  <ContentRoot>
    <PageTitle eyebrow="SUMMARY" title="結語" />

    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: -16,
        marginBottom: 48,
        flexWrap: 'nowrap',
      }}
    >
      <SummaryNode main="塑膠粒" />
      <Arrow />
      <SummaryNode main="薄膜形成" sub="熔融擠出" />
      <Arrow />
      <SummaryNode main="氣泡形成" sub="真空成型" />
      <Arrow />
      <SummaryNode main="封閉氣泡" sub="熱封覆合" />
      <Arrow />
      <SummaryNode main="氣泡布成品" sub="冷卻／分切" />
    </div>

    <div
      style={{
        background: CARD,
        borderRadius: 'var(--osd-radius)',
        boxShadow: CARD_SHADOW,
        borderLeft: '10px solid #0E9F8E',
        padding: '44px 52px',
        fontSize: 40,
        lineHeight: 1.55,
        fontWeight: 600,
      }}
    >
      氣泡布的核心技術在於「利用<span style={{ color: 'var(--osd-accent)' }}>真空成型</span>產生規則氣泡，再透過
      <span style={{ color: NAVY }}>熱封</span>將空氣永久封存在薄膜之間」，藉由空氣層達到優異的緩衝保護效果。
    </div>
  </ContentRoot>
);

/* ============ 14. 抗UV 補充 ============ */

const UVCard = ({
  label,
  children,
  tone = 'teal',
}: {
  label: string;
  children: React.ReactNode;
  tone?: 'teal' | 'navy';
}) => (
  <div
    style={{
      background: CARD,
      borderRadius: 'var(--osd-radius)',
      boxShadow: CARD_SHADOW,
      padding: '24px 30px',
    }}
  >
    <div
      style={{
        fontSize: 23,
        fontWeight: 700,
        color: tone === 'teal' ? 'var(--osd-accent)' : NAVY,
        marginBottom: 12,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 24, color: '#33414E', lineHeight: 1.5 }}>{children}</div>
  </div>
);

const UVSupplement: Page = () => (
  <div style={{ ...fill, padding: '96px 120px 0' }}>
    <div
      style={{
        fontSize: 22,
        letterSpacing: '0.22em',
        color: 'var(--osd-accent)',
        fontWeight: 700,
        marginBottom: 12,
      }}
    >
      補充說明 · UV STABILIZER
    </div>
    <TealBar />
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 54,
        fontWeight: 800,
        margin: '0 0 28px',
        lineHeight: 1.2,
      }}
    >
      為什麼需要抗UV添加劑？
    </h2>

    <div
      style={{
        background: 'rgba(14,159,142,0.08)',
        borderRadius: 'var(--osd-radius)',
        borderLeft: '8px solid #0E9F8E',
        padding: '20px 30px',
        fontSize: 28,
        lineHeight: 1.5,
        marginBottom: 28,
      }}
    >
      <span style={{ fontWeight: 700 }}>結論：</span>
      大部分一般包裝用氣泡布不一定需要添加抗UV劑，只有特定用途才會要求。
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22 }}>
      <UVCard label="不加會怎樣">
        聚乙烯遇紫外線 → 分子鏈斷裂、氧化、脆化；現象：泛黃、變硬、一拉就破、氣泡漏氣。
      </UVCard>
      <UVCard label="需要情境" tone="navy">
        戶外長期儲放、長途海運、溫室農業用途。
      </UVCard>
      <UVCard label="如何做到">
        加入 UV Absorber（紫外線吸收劑）＋ HALS（受阻胺光穩定劑），添加量約 0.1%~1%。
      </UVCard>
    </div>

    <div style={{ marginTop: 22, marginBottom: 28 }}>
      <UVCard label="採購怎麼問" tone="navy">
        是否添加 UV Stabilizer？保護壽命多久？是否有測試報告（QUV／ASTM G154）？
      </UVCard>
    </div>

    <div
      style={{
        fontSize: 30,
        fontWeight: 700,
        color: 'var(--osd-text)',
        lineHeight: 1.5,
      }}
    >
      <span style={{ color: 'var(--osd-accent)' }}>金句：</span>
      抗UV 不是標準配備，而是一種依使用情境增加成本的客製規格。
    </div>

    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: '氣泡布製程介紹（明亮簡潔風）',
  createdAt: '2026-06-19T05:44:10.460Z',
};

export default [
  Cover,
  WhatIs,
  Materials,
  FlowOverview,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  QualityCheck,
  Specs,
  Procurement,
  Conclusion,
] satisfies Page[];
