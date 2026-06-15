import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini SDK securely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

// Mock/Default projects in case Notion isn't connected
const LOCAL_MOCK_PROJECTS = [
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
    content: `
### The Vision
In mobile commerce, clutter reduces focus and halts checkouts. Our design system for Nordic Living represents a radical return to basic grids, premium studio-lit product furniture photography, and frictionless gestural slide-outs that remove the traditional page-to-page loading lags.

### Physical Minimalism
To load at lighting speed on all hardware configurations, we optimized static imagery, removed all secondary script dependencies, and layered custom responsive SVGs for dynamic icons. All typography is mapped strictly to device-optimized system typefaces, boosting load speeds to the absolute maximum.
    `
  }
];

// 1. Storage Helpers for Persistent Admin Operations
const CONFIG_FILE = path.join(process.cwd(), "notion_config.json");
const CUSTOM_PROJECTS_FILE = path.join(process.cwd(), "custom_projects.json");
const ANNOUNCEMENTS_FILE = path.join(process.cwd(), "announcements.json");

function getSavedNotionConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    } catch (e) {
      return null;
    }
  }
  return null;
}

function getCustomProjects() {
  if (fs.existsSync(CUSTOM_PROJECTS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CUSTOM_PROJECTS_FILE, "utf-8"));
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveCustomProject(project: any) {
  const current = getCustomProjects();
  // Assign a clean random ID if not present
  if (!project.id) {
    project.id = "custom-" + Math.random().toString(36).substring(2, 9);
    project.slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  current.unshift(project);
  fs.writeFileSync(CUSTOM_PROJECTS_FILE, JSON.stringify(current, null, 2));
}

function getRelatedProjectImage(title: string, category: string, tags: string[], description: string, index: number): string {
  const text = `${title} ${category} ${tags.join(" ")} ${description}`.toLowerCase();
  
  // Specific patterns for different domains
  if (text.includes("parking") || text.includes("car") || text.includes("traffic") || text.includes("vehicle") || text.includes("unair") || text.includes("スマートパーキング") || text.includes("駐車場")) {
    const options = [
      "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800", // smart traffic
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80&w=800", // creative parking slots lines
      "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=800"  // modern night street parking
    ];
    return options[index % options.length];
  }
  
  if (text.includes("color") || text.includes("harmonizer") || text.includes("palette") || text.includes("design system") || text.includes("kroma")) {
    return "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800"; // colorful dynamic abstract design
  }
  
  if (text.includes("climate") || text.includes("environmental") || text.includes("weather") || text.includes("aether") || text.includes("telemetry")) {
    return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"; // futuristic planet telemetry view
  }

  if (text.includes("nordic") || text.includes("furniture") || text.includes("living") || text.includes("scandinavian") || text.includes("interior")) {
    return "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800"; // minimalist scandinavian room view
  }

  if (text.includes("finance") || text.includes("bank") || text.includes("billing") || text.includes("invoice") || text.includes("payment") || text.includes("bussan") || text.includes("transaction") || text.includes("tax")) {
    const options = [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800", // ledger graphs financial figures
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800", // business team whiteboard graphs
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"  // charts and monitors
    ];
    return options[index % options.length];
  }

  if (text.includes("oracle") || text.includes("db") || text.includes("database") || text.includes("sql") || text.includes("migrate") || text.includes("ssis") || text.includes("ssrs") || text.includes("batch")) {
    const options = [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800", // digital server rack networking nodes
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800", // server processing server tower glowing
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800"  // modern infrastructure wiring
    ];
    return options[index % options.length];
  }

  if (text.includes("mobile") || text.includes("app") || text.includes("native") || text.includes("flutter") || text.includes("android") || text.includes("ios") || text.includes("phone")) {
    const options = [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800", // iPhone application layout grids
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", // colored design templates graph
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"  // workspace desk with device
    ];
    return options[index % options.length];
  }

  const defaults = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800", // clean high-contrast code snippet
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800", // vibrant syntax highlighter terminal environment
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", // minimalist developer laptop desk workspace
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800", // high-density product dashboard layout
    "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800", // developer dual monitors coding setup
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800", // network grids
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800", // team reviewing lines design
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"  // high-tech creative coding workspace
  ];

  return defaults[index % defaults.length];
}

function determineCategory(
  responsibilities: string[],
  title: string,
  techStack: string[]
): string {
  const allowedCategories = [
    "Frontend Development",
    "Backend Development",
    "Fullstack Development",
    "RESTful API Development",
    "New Feature Implementation",
    "Operational Improvement",
    "Quality Assurance",
    "360 AV Shooting",
    "Teaching",
    "Bug Fixing"
  ];

  if (!responsibilities || responsibilities.length === 0) {
    return "Uncategorized";
  }

  // 1. First, check if any of the project's responsibilities perfectly matches an allowed category
  for (const resp of responsibilities) {
    const trimmedResp = resp.trim();
    const matched = allowedCategories.find(c => c.toLowerCase() === trimmedResp.toLowerCase());
    if (matched) {
      return matched;
    }
  }

  // 2. Second, look for fuzzy matches within the project's responsibilities list
  for (const resp of responsibilities) {
    const text = resp.toLowerCase();
    
    // Exact word matching helpers
    const hasWord = (word: string) => {
      const escaped = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
    };

    if (text.includes("front") || hasWord("ui") || hasWord("ux") || text.includes("画面") || text.includes("フロント")) {
      return "Frontend Development";
    }
    if (hasWord("api") || text.includes("rest") || text.includes("endpoint") || text.includes("エンドポイント")) {
      return "RESTful API Development";
    }
    if (text.includes("back") || text.includes("server") || text.includes("サーバー") || text.includes("バックエンド")) {
      return "Backend Development";
    }
    if (text.includes("full") || text.includes("フルスタック") || text.includes("両方") || text.includes("全体")) {
      return "Fullstack Development";
    }
    if (text.includes("bug") || text.includes("fix") || text.includes("修正") || text.includes("バグ")) {
      return "Bug Fixing";
    }
    if (hasWord("qa") || text.includes("test") || text.includes("テスト") || text.includes("quality")) {
      return "Quality Assurance";
    }
    if (text.includes("operation") || text.includes("業務改善") || text.includes("効率化") || text.includes("improvement")) {
      return "Operational Improvement";
    }
    if (text.includes("new feature") || text.includes("新規") || text.includes("機能追加") || text.includes("追加実装")) {
      return "New Feature Implementation";
    }
    
    // Strict match for 360 AV Shooting:
    // Ensure "shooting" does not match "troubleshooting", and "av" is treated as a word (no java/laravel mismatch)
    const formsOf360 = text.includes("360") || text.includes("360度") || text.includes("全天球");
    const formsOfAv = hasWord("av") || text.includes("audio-visual") || text.includes("audio visual");
    const formsOfShooting = /(?<!trouble)shooting/i.test(text) || text.includes("撮影") || text.includes("録画") || text.includes("動画");
    
    if ((formsOf360 && formsOfShooting) || (formsOfAv && formsOfShooting) || (formsOf360 && formsOfAv) || text.includes("全天球") || text.includes("360度")) {
      return "360 AV Shooting";
    }
    
    if (text.includes("teach") || text.includes("講師") || text.includes("教育") || text.includes("指導")) {
      return "Teaching";
    }
  }

  // 3. Fallback to fuzzy match on project title and tech stack
  const textCombined = `${title} ${techStack.join(" ")}`.toLowerCase();
  
  if (textCombined.includes("react") || textCombined.includes("html") || textCombined.includes("css") || textCombined.includes("vue") || textCombined.includes("frontend")) {
    return "Frontend Development";
  }
  if (textCombined.includes("api") || textCombined.includes("endpoint") || textCombined.includes("rest")) {
    return "RESTful API Development";
  }
  if (textCombined.includes("node") || textCombined.includes("backend") || textCombined.includes("express") || textCombined.includes("database") || textCombined.includes("sql") || textCombined.includes("laravel") || textCombined.includes("php") || textCombined.includes("django") || textCombined.includes("oracle")) {
    return "Backend Development";
  }

  return "Uncategorized";
}

// Helper to parse dates/period and compute a comparable timestamp (latest first)
function getProjectTimestamp(p: any): number {
  const period = p.period || "";
  const yearStr = p.year || "";
  
  let endStr = "";
  let startStr = "";
  if (period && period.includes("~")) {
    const parts = period.split("~").map((s: any) => s.trim());
    startStr = parts[0] || "";
    endStr = parts[1] || "";
  } else {
    startStr = yearStr;
    endStr = yearStr;
  }

  const parseToDate = (str: string, isEnd: boolean) => {
    if (!str) return isEnd ? new Date(2025, 11, 31) : new Date(2025, 0, 1);
    const lower = str.toLowerCase();
    if (lower === "present" || lower === "現在" || lower === "now" || lower === "進行中") {
      return new Date(); // Current date (dynamic)
    }
    const clean = str.replace(/\//g, "-");
    const parts = clean.split("-");
    if (parts.length === 1) {
      const y = parseInt(parts[0], 10);
      if (isNaN(y)) return new Date(2025, 0, 1);
      return isEnd ? new Date(y, 11, 31) : new Date(y, 0, 1);
    } else if (parts.length === 2) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      if (isNaN(y) || isNaN(m)) return new Date(2025, 0, 1);
      return isEnd ? new Date(y, m - 1, 28) : new Date(y, m - 1, 1);
    } else if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      if (isNaN(y) || isNaN(m) || isNaN(d)) return new Date(2025, 0, 1);
      return new Date(y, m - 1, d);
    }
    return new Date(clean);
  };

  const endDate = parseToDate(endStr, true);
  const startDate = parseToDate(startStr, false);

  return endDate.getTime() * 1000 + (startDate.getTime() % 1000);
}

function sortProjects(list: any[]): any[] {
  return [...list].sort((a, b) => getProjectTimestamp(b) - getProjectTimestamp(a));
}

// 2. Notion API Dynamic Gateway Endpoint
app.post("/api/projects", async (req, res) => {
  // Use saved server-side credentials if available to protect Budi's keys from public visitors,
  // falling back to request-body token or env parameters.
  const savedConfig = getSavedNotionConfig();
  const token = req.body.token || savedConfig?.token || process.env.NOTION_TOKEN;
  const databaseId = req.body.databaseId || savedConfig?.databaseId || process.env.NOTION_DATABASE_ID;

  const customProjects = getCustomProjects();

  if (!token || !databaseId) {
    // If Notion isn't connected yet, gracefully return our mock projects combined with Budi's custom uploads!
    return res.json({ 
      notionConnected: false,
      projects: sortProjects([...customProjects, ...LOCAL_MOCK_PROJECTS])
    });
  }

  try {
    const notionRes = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        page_size: 50
      })
    });

    if (!notionRes.ok) {
      const errDetails = await notionRes.text();
      console.error("Notion API Error reply:", errDetails);
      // Fallback to local mocks + custom projects
      return res.json({ 
        notionConnected: false,
        error: `Could not connect to Notion. Using offline fallback portfolio projects.`,
        projects: sortProjects([...customProjects, ...LOCAL_MOCK_PROJECTS])
      });
    }

    const data = await notionRes.json();
    const results = data.results || [];

    // Save database properties snapshot to help diagnose actual column structure
    if (results.length > 0) {
      try {
        const rawProperties = results[0].properties || {};
        const discovered = Object.keys(rawProperties).reduce((acc: any, key: string) => {
          acc[key] = {
            id: rawProperties[key].id,
            type: rawProperties[key].type
          };
          return acc;
        }, {});
        fs.writeFileSync(
          path.join(process.cwd(), "notion_schema_debug.json"),
          JSON.stringify({
            total_elements_fetched: results.length,
            discovered_columns: discovered,
            last_queried_at: new Date().toISOString()
          }, null, 2)
        );
        console.log("NOTION DIAGNOSTICS: Successfully updated notion_schema_debug.json with discovered schema properties.");
      } catch (logErr) {
        console.error("Could not write Notion schema snapshot:", logErr);
      }
    }

    // Adaptive mapping helper to look up columns with multi-language and styling variations
    const matchProp = (properties: any, ...aliases: string[]): any => {
      const keys = Object.keys(properties);
      for (const alias of aliases) {
        const cleanAlias = alias.toLowerCase().replace(/[\s_-]+/g, "");
        const matchedKey = keys.find(k => {
          const cleanKey = k.toLowerCase().replace(/[\s_-]+/g, "");
          return cleanKey === cleanAlias;
        });
        if (matchedKey) return properties[matchedKey];
      }
      return null;
    };

    // Helper text extraction
    const getTextProp = (prop: any) => {
      if (!prop) return "";
      if (prop.type === "title") return prop.title?.[0]?.plain_text || "";
      if (prop.type === "rich_text") return prop.rich_text?.[0]?.plain_text || "";
      if (prop.type === "url") return prop.url || "";
      if (prop.type === "select") return prop.select?.name || "";
      if (prop.type === "status") return prop.status?.name || "";
      if (prop.type === "number") return String(prop.number || "");
      return "";
    };

    const getMultiProp = (prop: any): string[] => {
      if (!prop) return [];
      if (prop.type === "multi_select") {
        return prop.multi_select?.map((x: any) => x.name) || [];
      }
      if (prop.type === "rich_text") {
        const text = prop.rich_text?.[0]?.plain_text || "";
        return text ? text.split(",").map((s: string) => s.trim()) : [];
      }
      return [];
    };

    // In-memory cache of resolved page titles (e.g. related Company names) to avoid redundant requests
    const pageTitleCache: Record<string, string> = {};

    const getPageTitle = async (pageId: string, apiToken: string) => {
      if (pageTitleCache[pageId]) return pageTitleCache[pageId];
      try {
        const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Notion-Version": "2022-06-28"
          }
        });
        if (res.ok) {
          const pageData = await res.json();
          const pageProps = pageData.properties || {};
          const titleKey = Object.keys(pageProps).find(k => pageProps[k].type === "title");
          if (titleKey) {
            const titleText = pageProps[titleKey].title?.[0]?.plain_text || "";
            if (titleText) {
              pageTitleCache[pageId] = titleText;
              return titleText;
            }
          }
        }
      } catch (e) {
        console.error("Failed to query related page title for card:", pageId, e);
      }
      return "";
    };

    // Robust mapping from Notion JSON schemas
    const parsedProjects = await Promise.all(results.map(async (page: any, idx: number) => {
      const props = page.properties || {};

      // 1. Resolve Project Title / Name
      // Specifically target "Project_Title" as shown in the discovered schemas, fallback to "Num"
      const projectTitleProp = props["Project_Title"] || props["project_title"] || props["Project Title"] || props["title"] || props["Title"] || props["Name"] || props["name"];
      let title = getTextProp(projectTitleProp);
      if (!title) {
        const titlePropCol = Object.keys(props).find(k => props[k].type === "title");
        title = titlePropCol ? getTextProp(props[titlePropCol]) : "";
      }
      if (!title) title = "Case Study " + (getTextProp(props["Num"]) || "");

      // 2. Resolve Description / Overview
      const descProp = props["Project Overview"] || props["project_overview"] || props["Project_Overview"] || props["Description"] || props["description"];
      const description = getTextProp(descProp) || "No preview description was provided in Notion.";

      // 3. Resolve Company/Client Name (with relation page resolution support)
      let company = "";
      const companyProp = props["Company"] || props["company"] || props["Client"] || props["client"];
      if (companyProp) {
        if (companyProp.type === "relation" && companyProp.relation && companyProp.relation.length > 0) {
          const pageId = companyProp.relation[0].id;
          company = await getPageTitle(pageId, token);
        } else {
          company = getTextProp(companyProp);
        }
      }
      if (!company) company = "自主制作 (Self-Directed)";

      // 4. Resolve Date/Period Duration
      let period = "";
      const dateStartProp = props["Date Start"] || props["date_start"] || props["Date_Start"];
      const dateEndProp = props["Date End"] || props["date_end"] || props["Date_End"];
      
      const getJustDate = (prop: any) => {
        if (!prop) return "";
        if (prop.type === "date" && prop.date) return prop.date.start || "";
        if (prop.type === "rich_text") return getTextProp(prop);
        return "";
      };
      
      const start = getJustDate(dateStartProp);
      const end = getJustDate(dateEndProp);
      if (start && end) {
        period = `${start.replace(/-/g, "/")} ~ ${end.replace(/-/g, "/")}`;
      } else if (start) {
        period = `${start.replace(/-/g, "/")} ~ Present`;
      } else {
        period = getTextProp(props["Year"] || props["year"]) || "2025";
      }

      // 5. Gather All Technical Properties Dynamically
      const languages = getMultiProp(props["Language"] || props["language"]);
      const frameworks = getMultiProp(props["Framework"] || props["framework"]);
      const dbs = getMultiProp(props["DB"] || props["db"]);
      const osList = getMultiProp(props["OS"] || props["os"]);
      const infra = getMultiProp(props["Infrastructure"] || props["infrastructure"]);
      const tools = getMultiProp(props["Tools"] || props["tools"]);
      const webServers = getMultiProp(props["Web Server"] || props["web_server"] || props["webserver"]);
      
      const cleanTechStack = [
        ...languages,
        ...frameworks,
        ...dbs,
        ...osList,
        ...infra,
        ...tools,
        ...webServers
      ].filter(Boolean);

      const finalTechStack = cleanTechStack.length > 0 ? cleanTechStack : ["React", "TypeScript", "Tailwind CSS"];

      // 7. Resolve Duties/Responsibilities and Dynamic Category
      let responsibilities: string[] = [];
      const jobRespProp = props["Job Responsibilities"] || props["job_responsibilities"] || props["Job_Responsibilities"];
      const respProp = props["Responsibilities"] || props["responsibilities"];
      
      let notionCategoryTags: string[] = [];
      if (jobRespProp && jobRespProp.type === "multi_select") {
        notionCategoryTags = getMultiProp(jobRespProp);
      }
      
      if (respProp) {
        const rawResp = getTextProp(respProp);
        if (rawResp) {
          responsibilities = rawResp.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
        }
      }
      
      // Fallback for responsibilities if rich text was empty
      if (responsibilities.length === 0 && notionCategoryTags.length > 0) {
        responsibilities = notionCategoryTags;
      }
      
      if (responsibilities.length === 0) {
        responsibilities = [description];
      }

      // 8. Resolve Key Project Achievements / Metrics
      let achievement = "";
      const achvProp = props["Achievement and Initiatives"] || props["achievement_and_initiatives"] || props["Achievement_and_Initiatives"] || props["Achievement"] || props["achievement"];
      if (achvProp) {
        if (achvProp.type === "multi_select") {
          achievement = getMultiProp(achvProp).join(", ");
        } else {
          achievement = getTextProp(achvProp);
        }
      }
      if (!achievement) achievement = "Successfully launched feature sets";

      // 9. Resolve team size scaling
      const memberQtyProp = props["Member Qty"] || props["member_qty"] || props["MemberQty"] || props["team_size"] || props["TeamSize"];
      let teamSize = "1名";
      if (memberQtyProp) {
        if (memberQtyProp.type === "number" && memberQtyProp.number !== null) {
          teamSize = `${memberQtyProp.number}名`;
        } else if (memberQtyProp.type === "rich_text") {
          teamSize = getTextProp(memberQtyProp);
        }
      }

      // 10. Core URLs
      const urlProp = matchProp(props, "url", "Url", "URL", "link", "Link", "デモ", "Demo");
      const url = getTextProp(urlProp) || undefined;

      const gitProp = matchProp(props, "githubUrl", "github_url", "githuburl", "GitHub", "github", "リポジトリ", "Repository");
      const githubUrl = getTextProp(gitProp) || undefined;

      // 11. Image banner URL fallback selector
      const imgProp = matchProp(props, "image", "Image", "画像", "添付画像", "アイキャッチ", "カバー画像");
      const rawImage = getTextProp(imgProp);
      const isPlaceholder = !rawImage || rawImage.trim() === "" || rawImage === "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
      
      // Compute the category dynamically. If Notion's "Job Responsibilities" multi-select has tags, 
      // use the first tag as the true dynamic category of the project. Otherwise, fall back to our enhanced guessing.
      let category = "Uncategorized";
      if (notionCategoryTags.length > 0) {
        category = notionCategoryTags[0];
      } else {
        category = determineCategory(responsibilities, title, finalTechStack);
      }
      const image = isPlaceholder 
        ? getRelatedProjectImage(title, category, finalTechStack, description, idx)
        : rawImage;

      // Assemble a fully loaded Markdown body automatically representing the rich schema blocks!
      const content = `
### プロジェクト概要 (Project Overview)
${description}

### 主な実績・取り組み (Achievement & Initiatives)
${achievement ? achievement.split(", ").map(act => `- **${act}**`).join("\n") : "- 継続的な品質改善と安定稼働の実現"}

### 担当業務 (Core Responsibilities)
${responsibilities.length > 0 ? responsibilities.map(task => `- **${task}**`).join("\n") : "- システム基本設計、詳細設計、及びコーディング実装"}

### 技術詳細 (Tech Stack Details)
${languages.length > 0 ? `- **使用言語**: ${languages.join(", ")}` : ""}
${frameworks.length > 0 ? `- **フレームワーク**: ${frameworks.join(", ")}` : ""}
${dbs.length > 0 ? `- **データベース**: ${dbs.join(", ")}` : ""}
${infra.length > 0 ? `- **インフラ**: ${infra.join(", ")}` : ""}
${tools.length > 0 ? `- **各種ツール**: ${tools.join(", ")}` : ""}
${osList.length > 0 ? `- **OS環境**: ${osList.join(", ")}` : ""}
`;

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      // Gather Key Highlighting Tags for Card Badges
      const finalTags = [
        ...languages,
        ...frameworks
      ].slice(0, 4);
      if (finalTags.length === 0) {
        finalTags.push("Software Engineering");
      }

      return {
        id: page.id,
        title,
        slug,
        description,
        content,
        category,
        tags: finalTags,
        techStack: finalTechStack,
        image,
        gallery: [],
        achievement,
        client: company,
        year: period.split("~")[0]?.trim() || "2025",
        url,
        githubUrl,
        
        // Match Japan Shokumurirekisho fields for direct integration
        projectName: title,
        period,
        company,
        role: "エンジニア",
        teamSize,
        responsibilities,
        environment: finalTechStack
      };
    }));

    // Combine Notion fetched projects with Budi's locally parsed AI custom projects!
    return res.json({ 
      notionConnected: true,
      projects: sortProjects([...customProjects, ...parsedProjects])
    });

  } catch (err: any) {
    console.error("Notion catch exception:", err);
    return res.json({ 
      notionConnected: false,
      error: "Exception communicating with Notion. Loaded offline portfolio assets.",
      projects: sortProjects([...customProjects, ...LOCAL_MOCK_PROJECTS])
    });
  }
});

// 3. Admin APIs to read & write Budi's exclusive settings
const ADMIN_PASSWORD = "19Delapan9-";
// Stable administrative session token derived deterministically to survive server restarts during builds
const ADMIN_SESSION_TOKEN = "session_budi_secure_" + Buffer.from(ADMIN_PASSWORD).toString("hex").substring(0, 16);

function requireAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  const tokenHeader = req.headers["x-admin-token"];
  const token = authHeader ? authHeader.replace("Bearer ", "").trim() : (Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader);

  if (token && token === ADMIN_SESSION_TOKEN) {
    return next();
  }
  return res.status(401).json({ error: "Access denied. Invalid or expired administrative session." });
}

// Admin login gateway
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: ADMIN_SESSION_TOKEN });
  }
  return res.status(401).json({ error: "Incorrect password. Access denied to Twin Knowledge." });
} );

app.get("/api/admin/config", requireAdmin, (req, res) => {
  const savedConfig = getSavedNotionConfig();
  // Safe return: do not send raw secret token to the browser, just confirm status
  res.json({
    hasNotionToken: !!(savedConfig?.token || process.env.NOTION_TOKEN),
    databaseId: savedConfig?.databaseId || process.env.NOTION_DATABASE_ID || "",
    calendarDatabaseId: savedConfig?.calendarDatabaseId || process.env.NOTION_CALENDAR_DATABASE_ID || ""
  });
});

app.post("/api/admin/config", requireAdmin, (req, res) => {
  const { token, databaseId, calendarDatabaseId } = req.body;
  if (!databaseId) {
    return res.status(400).json({ error: "Database ID is mandatory." });
  }

  const savedConfig = getSavedNotionConfig();
  let finalToken = token;

  // Let client pass empty/blank or placeholder to preserve currently saved token!
  if (!finalToken || finalToken.trim() === "" || finalToken === "__PRESERVED__" || finalToken.includes("••")) {
    finalToken = savedConfig?.token || process.env.NOTION_TOKEN;
  }

  if (!finalToken) {
    return res.status(400).json({ error: "Notion Secret Token is required but was not found." });
  }

  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ 
      token: finalToken, 
      databaseId,
      calendarDatabaseId: calendarDatabaseId || savedConfig?.calendarDatabaseId || ""
    }, null, 2));
    return res.json({ success: true, message: "Server-side Notion configurations permanently registered." });
  } catch (e: any) {
    return res.status(500).json({ error: "Failed to persist setting profile on storage sandbox." });
  }
});

app.get("/api/admin/announcements", (req, res) => {
  if (fs.existsSync(ANNOUNCEMENTS_FILE)) {
    try {
      const list = JSON.parse(fs.readFileSync(ANNOUNCEMENTS_FILE, "utf-8"));
      return res.json(list);
    } catch (e) {
      return res.json([]);
    }
  }
  return res.json([]);
});

app.post("/api/admin/announcements", requireAdmin, (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Content field is required." });
  }

  const announcement = {
    id: "ann-" + Math.random().toString(36).substring(2, 9),
    content,
    timestamp: new Date().toISOString()
  };

  try {
    let current = [];
    if (fs.existsSync(ANNOUNCEMENTS_FILE)) {
      try {
        current = JSON.parse(fs.readFileSync(ANNOUNCEMENTS_FILE, "utf-8"));
      } catch (e) {}
    }
    current.unshift(announcement);
    // Keep last 5 announcements
    current = current.slice(0, 5);
    fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(current, null, 2));
    return res.json({ success: true, announcement });
  } catch (e) {
    return res.status(500).json({ error: "Failed to post announcement on server." });
  }
});

// 4. import/upload and use Gemini for unstructured document transformation
app.post("/api/admin/ai-parse", requireAdmin, async (req, res) => {
  const { rawText, sourceName } = req.body;
  if (!rawText) {
    return res.status(400).json({ error: "No text or document contents to parse." });
  }

  try {
    const prompt = `
Please parse this unstructured professional text or document (sourced from: "${sourceName || "Unspecified Document"}") and transform it into a highly detailed, clean, structured JSON project case study.
Analyze the experience, project description, tech stacks, and outcome metrics.

Document Text Content:
---
${rawText}
---

Format your output STRICTLY as a single JSON object matching this schema. Do not output any markdown wrapper syntax like \`\`\`json outside, just return raw JSON:
{
  "title": "A short, elegant and professional name of the project",
  "description": "Engaging, high-contrast 1-sentence summary hook showing the focus",
  "category": "One of: 'Creative Web', 'Interactive Tool', 'Infrastructure', or 'Mobile Design'",
  "achievement": "A premium quantifiable technical outcome or result (e.g., 'Optimized canvas bundle sizing by 30%')",
  "client": "Name of the partner, company, or 'Open Source'",
  "year": "Approximate year of completion, e.g. '2025'",
  "content": "A detailed multi-line Markdown-formatted project narrative. Include sections: '### The Vision', '### Architectural Strategy', and '### Core Implementations'. Craft the text to match a crisp, high-end Scandinavian portfolio voice.",
  "tags": ["Array of index tags, e.g. React, Three.js, etc., max 4"],
  "techStack": ["Array of detailed layers, e.g. Vite, TypeScript, D3, OKLCH, etc., max 5"],
  "image": "An elegant free Unsplash abstract art image url that matches the mood (e.g. technology, minimal, geometry, black/white abstract)"
}
`;

    const aiRes = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const parsedData = JSON.parse(aiRes.text || "{}");
    // Secure image fallback if Unsplash link broke or empty
    if (!parsedData.image || !parsedData.image.startsWith("http")) {
      parsedData.image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";
    }

    saveCustomProject(parsedData);

    return res.json({
      success: true,
      message: "Gemini successfully structured work telemetry into your portfolio.",
      project: parsedData
    });

  } catch (err: any) {
    console.error("AI Parser crash:", err);
    return res.status(500).json({ error: "Failed to parse document with Gemini model: " + err.message });
  }
});


// 1.5. Knowledge base folder setup & API endpoints for Budi's Digital Twin RAG
const KNOWLEDGE_DIR = path.join(process.cwd(), "digital_twin_knowledge");

// Ensure the digital twin knowledge base folder exists
if (!fs.existsSync(KNOWLEDGE_DIR)) {
  fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });
}

// Get all knowledge base files
app.get("/api/knowledge-files", requireAdmin, (req, res) => {
  try {
    if (!fs.existsSync(KNOWLEDGE_DIR)) {
      return res.json([]);
    }
    const files = fs.readdirSync(KNOWLEDGE_DIR);
    const fileDetails = files.map(file => {
      const filePath = path.join(KNOWLEDGE_DIR, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        updatedAt: stats.mtime.toISOString(),
        extension: path.extname(file).toLowerCase()
      };
    });
    return res.json(fileDetails);
  } catch (err: any) {
    console.error("Failed to list knowledge files:", err);
    return res.status(500).json({ error: "Failed to list knowledge documents: " + err.message });
  }
});

// View a knowledge base file content
app.get("/api/knowledge-files/:name", requireAdmin, (req, res) => {
  const fileName = req.params.name;
  // Basic security path traversal check
  if (fileName.includes("..") || fileName.includes("/") || fileName.includes("\\")) {
    return res.status(400).json({ error: "Invalid file name selector." });
  }
  const filePath = path.join(KNOWLEDGE_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Knowledge document not found." });
  }
  try {
    const ext = path.extname(fileName).toLowerCase();
    const isBinary = [".pdf", ".docx", ".pptx", ".xlsx"].includes(ext);
    if (isBinary) {
      return res.json({ name: fileName, content: "", isBinary: true });
    }
    const rawContent = fs.readFileSync(filePath, "utf-8");
    return res.json({ name: fileName, content: rawContent, isBinary: false });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to read knowledge file: " + err.message });
  }
});

// Create or overwrite a knowledge base file
app.post("/api/knowledge-files", requireAdmin, (req, res) => {
  const { name, content, encoding } = req.body;
  if (!name || content === undefined) {
    return res.status(400).json({ error: "Missing file name or content body parameter." });
  }
  // Sanitize name to prevent path traversals
  const cleanName = path.basename(name).replace(/[^a-zA-Z0-9_\-\.]/g, "_");
  if (!cleanName) {
    return res.status(400).json({ error: "Invalid filename structure." });
  }
  try {
    const filePath = path.join(KNOWLEDGE_DIR, cleanName);
    if (encoding === "base64") {
      fs.writeFileSync(filePath, Buffer.from(content, "base64"));
    } else {
      fs.writeFileSync(filePath, content, "utf-8");
    }
    return res.json({ success: true, name: cleanName, message: "File synchronised successfully under digital twin folder." });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to save knowledge document: " + err.message });
  }
});

// Delete a knowledge base file
app.delete("/api/knowledge-files/:name", requireAdmin, (req, res) => {
  const fileName = req.params.name;
  if (fileName.includes("..") || fileName.includes("/") || fileName.includes("\\")) {
    return res.status(400).json({ error: "Invalid file name selector." });
  }
  try {
    const filePath = path.join(KNOWLEDGE_DIR, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ success: true, message: "File removed successfully from digital twin folder." });
    }
    return res.status(404).json({ error: "File not found." });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to delete knowledge document: " + err.message });
  }
});


// 2. Chatbot proxy with Gemini 3.5 Flash
const BASE_SYSTEM_INSTRUCTION = `
You are Budi Prst's Digital Twin - a highly polished, helpful, and creative portfolio agent.
Your priority is keeping Budi's professional footprint crisp, clear, and highly performant.

Core facts about Budi Prst:
- Role: AI-DX Transformation Specialist (bridging business governance, startup leadership, and enterprise IT infrastructure)
- Experience: 13+ years of seasoned experience in business & IT. He graduated from Computer Science, successfully launched and managed his own business, and is currently pursuing his MBA.
- Github: https://github.com/budiprst/
- LinkedIn: https://www.linkedin.com/in/budi-prst/
- Instagram: https://instagram.com/budi_prst
- Facebook: https://www.facebook.com/cygnuslife/
- Key technologies Budi excels in: React, TypeScript, WebGL (Three.js), D3.js, Tailwind CSS v4, and Node.js.
- Location/Vibe: Clear Nordic minimalism. High-contrast aesthetics, elegant design grids, maximum rendering speed.
- Double Google Calendar Accounts: Budi syncs schedules from both his personal account and his official workspace/academic Google account: budi.prasetyo.2025@globis.ac.jp. If visitors inquire about his Globis calendar blocks or professional availability, reassure them that they are fully integrated, and explain that he can sync multiple accounts dynamically via the "Google Calendar" tab in the Config Admin Panel.

Guidelines for your responses:
- Tone: Highly professional, humble, objective, and polite. Avoid sales-y corporate slang or ungrounded claims.
- Keep responses extremely compact (ideally 1 to 3 short sentences max) because clients read these primarily on mobile screens. We aim for extreme readability.
- If they ask how to contact Budi or view more of his life/work/updates, actively guide them to his 4 key platform sources based on their query:
  * For professional updates, enterprise AI-DX consulting, or business/MBA insights, suggest his LinkedIn: https://www.linkedin.com/in/budi-prst/
  * For repositories, dev architectures, open source projects, or full-stack codebases, suggest his GitHub: https://github.com/budiprst/
  * For creative visuals, media highlights, student/travel life in Tokyo, suggest his Instagram: https://instagram.com/budi_prst
  * For older or personal network updates, suggest his Facebook: https://www.facebook.com/cygnuslife/
- Reassure the user that these 4 platforms constitute your dynamic network sources for his digital twin persona.
- Notion Status Response: If the user asks about your connection status to his Notion calendar, task boards, or database projects: Inform them that you are currently connected and loading from Budi's high-performance "Local Portal Vault & Cache" (Local database file backups) because no external Notion API integration keys are saved in active cloud runtime variables right now. Reassure them that they can pair a live Notion integration (via Token & Database ID) dynamically directly in the Config Admin Panel to pull and sync real-time live page blocks instantly.
- INTERACTIVE WIDGET TRIGGERS (CRITICAL):
  * When the visitor asks about scheduling, checking slots, meetings, booking, or availability, ALWAYS include this exact token on its own line at the end of your response so the client launcher panel slides open dynamically:
    [ACTION: Open Booking Scheduler]
  * When the visitor asks about Budi's workspace, setup, code, files, designs, or requests visual illustration materials, provide a brief description and ALWAYS include an image token on its own line:
    [IMAGE: https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80]
`;

function getFileMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case ".pdf":
      return "application/pdf";
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case ".pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    case ".xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case ".txt":
      return "text/plain";
    case ".csv":
      return "text/csv";
    case ".json":
      return "application/json";
    case ".faq":
      return "text/plain";
    case ".md":
      return "text/markdown";
    default:
      return "application/octet-stream";
  }
}

// 1.5. Local Calendar Operations & Dynamic Booking Integration
const CALENDAR_FILE = path.join(process.cwd(), "calendar_events.json");
function getLocalCalendarEvents() {
  if (fs.existsSync(CALENDAR_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CALENDAR_FILE, "utf-8"));
    } catch (e) {
      return [];
    }
  }
  return [];
}

// 1.6. Fetch integrated Google or Local Calendar events
app.get("/api/calendar", async (req, res) => {
  let localEvents = getLocalCalendarEvents();
  return res.json({ notionConnected: false, events: localEvents });
});

// 1.6b. Sync Google Calendar events to local server cache with dual-account/multi-calendar merging capability
app.post("/api/admin/gcal/sync", requireAdmin, (req, res) => {
  const { calendarId, events } = req.body;
  if (!calendarId || !Array.isArray(events)) {
    return res.status(400).json({ error: "Missing calendarId or events list in request body." });
  }

  let localEvents = getLocalCalendarEvents();
  
  // Filter out any prior synced events for this specific calendarId, while preserving
  // other calendars/accounts, and preserving all local bookings (which start with 'booked_').
  const preservedEvents = localEvents.filter((ev: any) => {
    if (ev.id && ev.id.startsWith("booked_")) return true;
    if (ev.sourceCalendarId && ev.sourceCalendarId !== calendarId) return true;
    return false;
  });

  // Map and append the newly synced events
  const newSyncedEvents = events.map((ev: any) => ({
    id: ev.id?.startsWith("gcal_") ? ev.id : `gcal_${calendarId}_${ev.id || Math.random().toString(36).substring(2, 9)}`,
    title: ev.summary || ev.title || "Busy Slot (Google Calendar Synced)",
    start: ev.start?.dateTime || ev.start || "",
    end: ev.end?.dateTime || ev.end || "",
    type: "busy",
    sourceCalendarId: calendarId,
    description: ev.description || `Reserved block synced from Google Calendar (${calendarId}).`
  })).filter((e: any) => e.start !== "");

  const combined = [...preservedEvents, ...newSyncedEvents];

  try {
    fs.writeFileSync(CALENDAR_FILE, JSON.stringify(combined, null, 2));
    return res.json({ 
      success: true, 
      message: `Successfully synchronized ${newSyncedEvents.length} busy periods from calendar: ${calendarId}.`, 
      events: combined 
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to persist synced events profile step: " + err.message });
  }
});

// 1.7. Direct Booking Form Submission Endpoint
app.post("/api/calendar/book", async (req, res) => {
  const { name, email, topic, date, timeSlot, type, description } = req.body;
  if (!name || !email || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required booking details (Name, Email, Date, or TimeSlot)." });
  }

  // Combine date and timeSlot (e.g. "14:00") into JST ISO start/end
  // Assuming 1 hour standard meeting slot
  const startIso = `${date}T${timeSlot}:00+09:00`;
  const [hours, minutes] = timeSlot.split(":").map((v: string) => parseInt(v, 10));
  const endMinutes = (minutes + 60) % 60;
  const endHours = hours + Math.floor((minutes + 60) / 60);
  const endHrsStr = String(endHours).padStart(2, "0");
  const endMinsStr = String(endMinutes).padStart(2, "0");
  const endIso = `${date}T${endHrsStr}:${endMinsStr}:00+09:00`;

  const newEvent = {
    id: "booked_" + Math.random().toString(36).substring(2, 11),
    title: `${topic || "Business Alignment Consultation"}`,
    start: startIso,
    end: endIso,
    name,
    email,
    type: type || "online",
    description: description || `Scheduled consultation with ${name}`
  };

  // Save to local cache
  const localEvents = getLocalCalendarEvents();
  localEvents.push(newEvent);
  fs.writeFileSync(CALENDAR_FILE, JSON.stringify(localEvents, null, 2));

  // Push to Live Notion calendar database if configured
  const savedConfig = getSavedNotionConfig();
  const token = savedConfig?.token || process.env.NOTION_TOKEN;
  const calendarDatabaseId = savedConfig?.calendarDatabaseId || process.env.NOTION_CALENDAR_DATABASE_ID;

  let notionSynced = false;
  let notionError = null;

  if (token && calendarDatabaseId) {
    try {
      const notionRes = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          parent: { database_id: calendarDatabaseId },
          properties: {
            Name: {
              title: [
                { text: { content: `${newEvent.title} [Booking: ${newEvent.name}]` } }
              ]
            },
            Date: {
              date: {
                start: startIso,
                end: endIso
              }
            },
            Description: {
              rich_text: [
                { text: { content: `Visitor: ${newEvent.name} (${newEvent.email}). Meeting type: ${newEvent.type}. Prompt Details: ${newEvent.description}` } }
              ]
            }
          }
        })
      });

      if (notionRes.ok) {
        notionSynced = true;
      } else {
        const errText = await notionRes.text();
        console.error("Notion page creation failed:", errText);
        notionError = errText;
      }
    } catch (err: any) {
      console.error("Notion page integration exception:", err);
      notionError = err.message;
    }
  }

  return res.json({
    success: true,
    event: newEvent,
    notionSynced,
    notionError,
    message: notionSynced 
      ? "Meeting successfully registered and synced with Budi's Notion calendar database."
      : "Meeting saved successfully in portfolio's local database cache."
  });
});

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No input message provided." });
  }

  try {
    // RAG METHODOLOGY: Precursor scanning and search
    // Automatically read and compile all files in the './digital_twin_knowledge' folder to inject context
    let knowledgeBaseContext = "";
    const inlineParts: any[] = [];

    if (fs.existsSync(KNOWLEDGE_DIR)) {
      try {
        const files = fs.readdirSync(KNOWLEDGE_DIR);
        // Load text and markdown files as context resources
        const textFiles = files.filter(f => 
          f.endsWith(".txt") || 
          f.endsWith(".md") || 
          f.endsWith(".json") || 
          f.endsWith(".csv") || 
          f.endsWith(".faq")
        );
        
        const sourceBlocks: string[] = [];
        for (const file of textFiles) {
          const filePath = path.join(KNOWLEDGE_DIR, file);
          const rawContent = fs.readFileSync(filePath, "utf-8");
          sourceBlocks.push(`SOURCE FILE: ${file}\n=== CONTENT START ===\n${rawContent}\n=== CONTENT END ===`);
        }

        if (sourceBlocks.length > 0) {
          knowledgeBaseContext = `
[DIGITAL TWIN RAG KNOWLEDGE BASE - TEXT SOURCES]
You are equipped with a personal database of files uploaded by Budi himself. 
Search this corpus carefully to answer queries. ALWAYS prioritize the facts and answers inside these source files.
If information is retrieved from here, construct a friendly reply referencing these uploaded sources where appropriate.

${sourceBlocks.join("\n\n")}
`;
        }

        // Load binary documents (.pdf, .docx, .pptx, .xlsx) as multimodal inline parts for Gemini
        const binaryFiles = files.filter(f => 
          f.endsWith(".pdf") || 
          f.endsWith(".docx") || 
          f.endsWith(".pptx") || 
          f.endsWith(".xlsx")
        );

        for (const file of binaryFiles) {
          try {
            const filePath = path.join(KNOWLEDGE_DIR, file);
            if (fs.existsSync(filePath)) {
              const fileBuffer = fs.readFileSync(filePath);
              const mimeType = getFileMimeType(file);
              inlineParts.push({
                inlineData: {
                  data: fileBuffer.toString("base64"),
                  mimeType: mimeType
                }
              });
            }
          } catch (binaryErr) {
            console.error(`Error loading file: ${file} for inline RAG:`, binaryErr);
          }
        }
      } catch (err) {
        console.error("Error reading knowledge folder for RAG:", err);
      }
    }

    // Injects current schedule context so Gemini can answer about free slots or schedule alignment
    let calendarContext = "\n[BUDI'S STANDARD CALENDAR WORKING HOURS]\nMonday to Friday: 9:00 AM to 6:00 PM Tokyo Time (09:00 to 18:00 JST). Outside these hours, as well as Saturday & Sunday, Budi is resting and unavailable for bookings.\n\n[CURRENT BOOKED SLOTS & KEY CONSTRAINTS FROM HOST]\n";
    try {
      const savedConfig = getSavedNotionConfig();
      const token = savedConfig?.token || process.env.NOTION_TOKEN;
      const calendarDatabaseId = savedConfig?.calendarDatabaseId || process.env.NOTION_CALENDAR_DATABASE_ID;
      
      let events: any[] = [];
      const localEvents = getLocalCalendarEvents();
      events = [...localEvents];

      if (token && calendarDatabaseId) {
        const notionRes = await fetch(`https://api.notion.com/v1/databases/${calendarDatabaseId}/query`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ page_size: 20 })
        });
        if (notionRes.ok) {
          const data: any = await notionRes.json();
          const results = data.results || [];
          results.forEach((page: any) => {
            const props = page.properties || {};
            const titleProp = props.Name || props.Title || {};
            const titleText = titleProp.title?.[0]?.plain_text || "Busy Slot";
            const dateProp = props.Date || props.date || {};
            const start = dateProp.date?.start || "";
            const end = dateProp.date?.end || "";
            if (start) {
              events.push({ title: titleText, start, end });
            }
          });
        }
      }

      if (events.length > 0) {
        events.forEach((ev: any) => {
          const dateStr = ev.start.substring(0, 10);
          const timeStart = ev.start.includes("T") ? ev.start.split("T")[1].substring(0, 5) : "All Day";
          const timeEnd = ev.end && ev.end.includes("T") ? ev.end.split("T")[1].substring(0, 5) : "End";
          const timeRange = timeEnd ? `${timeStart} to ${timeEnd}` : timeStart;
          calendarContext += `- BUSY SLOT: "${ev.title}" on ${dateStr} from ${timeRange} Tokyo Time\n`;
        });
      } else {
        calendarContext += "No bookings registered. Budi is fully open during his working hours!\n";
      }
    } catch (e) {
      console.error("Error building calendar context for LLM:", e);
    }

    // Blend base instructions with dynamic RAG context & calendar data
    const finalSystemInstruction = `${BASE_SYSTEM_INSTRUCTION}
${knowledgeBaseContext}

${calendarContext}

Instructions on RAG Matching:
- Prioritize facts in the [DIGITAL TWIN RAG KNOWLEDGE BASE] over general info.
- If they ask about Budi's schedule, free slots, or calendar: summarize his schedule using the [BUDI'S STANDARD CALENDAR WORKING HOURS] and the list of busy slots. Explicitly describe which blocks are taken, and invite them to book an offline/online meeting with Budi!
- If the user asks general questions about Budi that are solved in files, reference the facts accurately.
- Keep output extremely clear, helpful, professional, and compact (1-3 lines).
- Note: You can natively read and parse through any attached PDF/Office document contents passed as inlineParts in the user's turn. Use them to provide precise answers about Budi's background.
`;

    // Format incoming chat log into standard SDK conversational array
    const conversationHistory = (history || []).map((h: any) => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: [{ text: h.parts?.[0]?.text || "" }]
    }));

    // Package final user message with any available binary inlineData parts (multimodal in-context learning)
    const activeUserParts = [
      ...inlineParts,
      { text: message }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...conversationHistory,
        { role: "user", parts: activeUserParts }
      ],
      config: {
        systemInstruction: finalSystemInstruction,
        temperature: 0.7
      }
    });

    const reply = response.text || "I apologize, Budi's digital module is undergoing transient sync parameters. Please try in a moment.";
    return res.json({ text: reply });

  } catch (err: any) {
    console.error("Gemini server error:", err);
    return res.status(500).json({ error: "Internal AI connection latency or config mismatch." });
  }
});

// 3. Contact Form Submission Drafts Log & Direct Email Dispatcher
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Incomplete contact form details. Please fill in your name, email, and message." });
  }

  // Persist contact lead locally on the server for immediate client confirmation
  const leadEntry = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    subject: subject || "No Subject provided",
    message,
    timestamp: new Date().toISOString()
  };

  try {
    const leadsFile = path.join(process.cwd(), "contacts.json");
    let currentLeads = [];
    if (fs.existsSync(leadsFile)) {
      const fileData = fs.readFileSync(leadsFile, "utf-8");
      currentLeads = JSON.parse(fileData || "[]");
    }
    currentLeads.push(leadEntry);
    fs.writeFileSync(leadsFile, JSON.stringify(currentLeads, null, 2));

    console.log("New contact lead registered in contacts.json:", leadEntry);

    // Retrieve SMTP configs lazily
    const smtpHost = process.env.SMTP_HOST;
    const smtpPortVal = process.env.SMTP_PORT;
    const smtpPort = smtpPortVal ? parseInt(smtpPortVal, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
    const targetEmail = process.env.NOTIFICATION_EMAIL || "massivdev@gmail.com";

    let emailSent = false;
    let feedbackNote = "";

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // true if port is 465
          auth: {
            user: smtpUser,
            pass: smtpPass
          },
          tls: {
            rejectUnauthorized: false // Helps bypass draft/self-signed cert issues
          }
        });

        const mailOptions = {
          from: `"${name} Contact Form Inquiry" <${smtpUser}>`,
          to: targetEmail,
          replyTo: email,
          subject: `[Portfolio Inbox] ${subject || "New Inquiry from " + name}`,
          text: `You have received a new contact submission from your portfolio dashboard!

Sender Details:
- Name: ${name}
- Email: ${email}
- Subject: ${subject || "None Provided"}
- Timestamp: ${leadEntry.timestamp}

Message Contents:
---------------------------------------------
${message}
---------------------------------------------

Feel free to click reply to message the sender directly.`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; color: #111827;">
              <div style="display: flex; align-items: center; border-bottom: 2px solid #f3f4f6; padding-bottom: 16px; margin-bottom: 20px;">
                <h2 style="font-size: 20px; font-weight: 800; color: #111827; margin: 0;">Portfolio Inbox Node</h2>
              </div>
              <p style="font-size: 15px; color: #374151; margin-bottom: 16px;">You received a real-time lead request from your personal specialist portal:</p>
              
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
                <p style="margin: 4px 0; font-size: 14px; color: #4b5563;"><strong>Sender:</strong> ${name}</p>
                <p style="margin: 4px 0; font-size: 14px; color: #4b5563;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #f59e0b; text-decoration: none;">${email}</a></p>
                <p style="margin: 4px 0; font-size: 14px; color: #4b5563;"><strong>Subject:</strong> ${subject || "Not specified"}</p>
                <p style="margin: 4px 0; font-size: 14px; color: #4b5563;"><strong>Date:</strong> ${leadEntry.timestamp}</p>
              </div>

              <div style="background-color: #ffffff; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #1f2937; margin-bottom: 24px; white-space: pre-wrap;">${message}</div>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 12px; color: #6b7280; text-align: center;">
                <p style="margin: 0;">Inquiry dispatched dynamically by Nodemailer on your hosted full-stack container.</p>
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        feedbackNote = " A real-time email notification has also been sent to your inbox.";
      } catch (mailErr: any) {
        console.error("Mail dispatcher error:", mailErr);
        feedbackNote = ` (SMTP Attempt failed: ${mailErr.message || "Unknown error"}. Check credentials.)`;
      }
    } else {
      feedbackNote = " (Email dispatch pending: Configure your SMTP keys in the Secrets tab to receive direct mail notifications!)";
    }

    return res.json({ 
      success: true, 
      message: `Lead successfully recorded in Budi's workspace vault.${feedbackNote}` 
    });
  } catch (err: any) {
    console.error("Lead saving error:", err);
    return res.status(500).json({ 
      error: "An internal database anomaly occurred while saving your lead request." 
    });
  }
});

// Vite & Static file configurations
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Budi Prst full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
