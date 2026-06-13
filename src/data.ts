import { Project } from "./types";

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "aether-flow",
    title: "Aether Flow: WebGL Climate Intelligence",
    slug: "aether-flow",
    description: "A high-performance interactive monitoring console rendering micro-climate telemetry datasets in real-time.",
    category: "Creative Web",
    tags: ["React", "TypeScript", "WebGL", "Tailwind CSS", "D3.js"],
    techStack: ["React 19", "Three.js", "D3.js", "Vite", "Tailwind CSS v4"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600"
    ],
    achievement: "45% faster telemetry data parsing using custom binary float workers",
    client: "GeoSphere Lab",
    year: "2025",
    
    // Shokumurirekisho fields
    projectName: "WebGL型気候環境リアルタイム監視コンソール開発",
    period: "2024/09 ~ 2025/03",
    company: "GeoSphere Laboratory株式会社",
    role: "フロントエンドテックリード (設計・実装・最適化)",
    teamSize: "5名 (PM 1名、テックリード 1名、Frontend 2名、Backend 1名)",
    responsibilities: ["要件定義", "基本設計", "詳細設計", "WebGL描画最適化設計", "フロントエンドコーディング"],
    environment: ["React 19", "Three.js", "D3.js", "Vite", "Tailwind CSS v4", "Web Workers"],
    
    content: `
### The Vision
Climate telemetry dataset rendering has traditionally been constrained by heavy network payloads and slow desktop web render systems. Partnering with GeoSphere Lab, we created **Aether Flow**—a single-view environmental intelligence interface that streams live climate sensor payloads and processes them dynamically inside browser-native WebGL threads.

### Design Paradigm
We selected a "Nordic Scientific" aesthetic: heavy reliance on geometric tracking, hyper-thin custom grid structures, soft off-white workspaces, and high-contrast alert overlays. Typography is clean, utilizing custom sans heading paired with hyper-dense data lines representing the active telemetry stream.

### Key Engineering Feat
1. **Raw Web Worker Slicing**: Bypassed main thread UI stutter by shifting dynamic sensor unpacking to dedicated background web workers.
2. **Dynamic Canvas Bounds**: Engineered resizing canvas elements optimized for high-density Retina and Pro Display XDR screens.
3. **SVG Overlay Precision**: Layered crisp canvas grids with responsive D3 mathematical projection sheets, allowing for click-to-zoom interactive metrics.
    `
  },
  {
    id: "kroma-studio",
    title: "Kroma Studio: Creative Color Harmonizer",
    slug: "kroma-studio",
    description: "An advanced algorithmic playground enabling brand developers to compute, test, and export accessible color spaces.",
    category: "Interactive Tool",
    tags: ["TypeScript", "Algorithm", "CSS Variables", "Framer Motion"],
    techStack: ["TypeScript", "Oklch Color Spaces", "Tailwind v4", "React Spring"],
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&q=80&w=600"
    ],
    achievement: "Voted #2 Product of the Day on ProductHunt with 5,000+ active color exports",
    client: "Design System Alliance",
    year: "2025",
    
    // Shokumurirekisho fields
    projectName: "OKLCHカラーススペース変換・アクセシビリティ検証ツール構築",
    period: "2024/05 ~ 2024/08",
    company: "一般社団法人 Design System Alliance",
    role: "フロントエンド開発 / UIデザイナー",
    teamSize: "2名 (UIデザイナー兼開発 1名、シニアエンジニア 15名)",
    responsibilities: ["UI・UX設計", "色変形数理変換アルゴリズム実装", "TypeScriptコアモジュール開発とテスト"],
    environment: ["TypeScript", "Oklch Color Spaces", "Tailwind CSS v4", "React Spring", "Vite"],
    
    content: `
### The Vision
Translating visual system colors from designer palettes to bulletproof accessible CSS code is often flawed by RGB and Hex scaling issues. **Kroma Studio** utilizes device-independent OKLCH color algorithms to compute exact contrasting swatches that satisfy WCAG 3.0 accessibility requirements out-of-the-box.

### Visual Architecture
Structured around an ultra-minimal horizontal slider stack with immediate high-contrast readable tests. We avoided complex menus, delivering a fluid widescreen stage that adapts to tablet views and acts as a single cohesive focus canvas.

### Implementation Success
Algorithms were built directly in TypeScript, reducing reliance on third-party mathematical helper modules to keep the client bundle fully unburdened and lightweight.
    `
  },
  {
    id: "nordic-minimalist",
    title: "Nordic Living: Scandinavian Commerce",
    slug: "nordic-minimalist",
    description: "An immersive minimalist e-commerce digital experience with hyper-focused grid typography and fluid micro-transitions.",
    category: "Mobile Design",
    tags: ["Figma", "React Native", "UI/UX", "Micro-animations"],
    techStack: ["React Native", "Tailwind UI", "Reanimated", "Figma Mirror"],
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600"
    ],
    achievement: "+18% increase in customer checkout conversion in pilot testing",
    client: "Humble Home Stockholm",
    year: "2024",
    
    // Shokumurirekisho fields
    projectName: "北欧家具ECモバイルアプリケーション高速化フロントエンド刷新",
    period: "2023/10 ~ 2024/04",
    company: "Humble Home Stockholm AB (スウェーデン本社)",
    role: "モバイルフロントエンドエンジニア",
    teamSize: "6名 (PM 1名、UI/UX 1名、モバイル開発 3名、QA 1名)",
    responsibilities: ["基本設計", "詳細設計", "React Nativeレイアウト実装", "アニメーションパフォーマンスチューニング"],
    environment: ["React Native", "Tailwind UI", "Reanimated 3.0", "Figma Mirror"],
    
    content: `
### The Vision
In mobile commerce, clutter reduces focus and halts checkouts. Our design system for Nordic Living represents a radical return to basic grids, premium studio-lit product furniture photography, and frictionless gestural slide-outs that remove the traditional page-to-page loading lags.

### Physical Minimalism
To load at lighting speed on all hardware configurations, we optimized static imagery, removed all secondary script dependencies, and layered custom responsive SVGs for dynamic icons. All typography is mapped strictly to device-optimized system typefaces, boosting load speeds to the absolute maximum.
    `
  }
];
