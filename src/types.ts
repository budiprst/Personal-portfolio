export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string; // Dynamic case study markdown/text content
  category: string; // e.g., 'Creative Web', 'Mobile Interfaces', 'Brand Design'
  tags: string[];
  image: string; // Main visual preview
  gallery: string[]; // Mockup visual references
  techStack: string[];
  url?: string;
  githubUrl?: string;
  achievement?: string; // Highlighting a business or creative outcome
  client?: string;
  year: string;
  
  // Japan Standard Shokumurirekisho Alignment Fields
  projectName?: string;      // 案件名・プロジェクト名
  period?: string;           // 期間 (e.g. "2024/04 ~ 2025/03")
  company?: string;          // 企業名・所属
  role?: string;             // 役割・ポジション
  teamSize?: string;         // チーム人数・規模
  responsibilities?: string[]; // 担当業務・対応フェーズ
  environment?: string[];     // 開発環境・技術詳細 (Languages, Frameworks, DBs)
}

export interface NotionConfig {
  token: string;
  databaseId: string;
  isConnected: boolean;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
