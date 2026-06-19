# 氣泡布製程介紹簡報

一份「**氣泡布（Bubble Wrap）製程介紹**」簡報專案，從採購人員的視角，帶非製造背景的聽眾在 10～15 分鐘內快速理解氣泡布如何製造。

內容以 **原料 → 製程 → 成品 → 品質 → 採購重點** 的脈絡編排，並用 [open-slide](https://github.com/1weiho/open-slide) 製作（每一頁都是一個 React 元件，渲染在固定的 1920×1080 畫布）。

## 🔗 線上預覽

**https://bryanhsiao.github.io/bubble-wrap-process-slides/**

開啟後即為展示首頁，點任一封面進入瀏覽（方向鍵翻頁、`F` 全螢幕）。三種風格：

- [鮮明編輯風（定案）](https://bryanhsiao.github.io/bubble-wrap-process-slides/s/bubble-wrap-editorial)
- [明亮簡潔風](https://bryanhsiao.github.io/bubble-wrap-process-slides/s/bubble-wrap-clean)
- [工業藍圖風](https://bryanhsiao.github.io/bubble-wrap-process-slides/s/bubble-wrap-blueprint)

> 想要可直接編輯的 PowerPoint？請見下方 [可編輯 PowerPoint](#可編輯-powerpoint)。

---

## 內容大綱（13 頁）

1. 封面
2. 氣泡布是什麼？（定義、用途、功能）
3. 氣泡布的原料（LDPE / LLDPE、添加材料、採購關注點）
4. 製造流程總覽（九階段流程圖）
5. 第一步：塑膠粒熔融擠出
6. 第二步：形成氣泡結構（核心製程）
7. 第三步：充氣與封合
8. 第四步：冷卻與定型
9. 第五步：收捲與分切
10. 品質檢驗項目
11. 氣泡布的規格差異
12. 採購人員應關注的重點
13. 結語

---

## 三種視覺風格

同一份內容做了三種風格，供挑選比較（最終定案為 **鮮明編輯風**）：

| 風格 | slide id | 特色 |
|------|----------|------|
| 工業藍圖風 | `bubble-wrap-blueprint` | 深藍底＋青色工程格線，製造業技術感 |
| 明亮簡潔風 | `bubble-wrap-clean` | 米白底＋teal 點綴、柔和卡片、大量留白 |
| **鮮明編輯風（定案）** | `bubble-wrap-editorial` | 暖色＋鮮橘、超大粗標題、雜誌編輯感 |

製程步驟頁搭配真實機台／材料照片，其餘以內建 SVG 示意圖呈現。

---

## 本機預覽

需要 Node.js 與 [pnpm](https://pnpm.io/)。

```bash
pnpm install
pnpm dev      # 開發伺服器，預設 http://localhost:5173
```

開啟首頁即可看到三種風格的封面縮圖，點入任一份瀏覽：

- `/s/bubble-wrap-editorial` — 鮮明編輯風（定案）
- `/s/bubble-wrap-clean` — 明亮簡潔風
- `/s/bubble-wrap-blueprint` — 工業藍圖風

> 小提醒：若瀏覽器顯示空白，多半是前一版的快取，強制重新整理（Ctrl/Cmd + Shift + R）或換一個 port（`pnpm dev --port 4321`）即可。

---

## 專案結構

```
slides/
  bubble-wrap-editorial/   # 鮮明編輯風（定案）
  bubble-wrap-clean/       # 明亮簡潔風
  bubble-wrap-blueprint/   # 工業藍圖風
themes/                    # open-slide 內建主題範例
assets/gpt-images/         # 製程／材料照片
pptx-build/                # 產生可編輯 PowerPoint 的腳本（pptxgenjs）
```

每一份簡報就是一個 `slides/<id>/index.tsx`，`export default` 一個 React 元件陣列，每個元件即一頁。

---

## 可編輯 PowerPoint

open-slide 的輸出為靜態 HTML／PDF（圖片型），**無法直接編輯**。因此另外用
[pptxgenjs](https://github.com/gitbrent/PptxGenJS) 將定案的「鮮明編輯風」重建為一份
**原生、可編輯的 `.pptx`**（文字、形狀、圖片皆可在 PowerPoint 中直接修改）。

- 下載：請見本專案的 **[Releases](../../releases)** 頁面。
- 重新產生：

  ```bash
  cd pptx-build
  npm install
  node build.js     # 於專案根目錄輸出 氣泡布製程介紹.pptx
  ```

---

## 致謝與說明

- 簡報框架：[open-slide](https://github.com/1weiho/open-slide)（作者 1weiho）
- 簡報內容大綱由 ChatGPT 協助發想，照片為其檢索之網路素材，僅供本簡報示意之用。
