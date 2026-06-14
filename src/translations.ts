export type LanguageCode = "en" | "ja" | "fr" | "es" | "de" | "id" | "sw" | "yo" | "zu";

export interface TranslationSet {
  headerTagline: string;
  notionConnected: string;
  localCache: string;
  twinHub: string;
  heroBadge: string;
  heroTitleLeading: string;
  heroTitleUnderline: string;
  heroTitleTrailing: string;
  heroDesc: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  bioCardTag: string;
  bioCardExp: string;
  bioCardStatus: string;
  bioCardDesc: string;
  simTitle: string;
  simScaleLabel: string;
  simLegacy: string;
  simGrowing: string;
  simEnterprise: string;
  simTargetLabel: string;
  simAutoSaaS: string;
  simSmartRAG: string;
  simAgents: string;
  simEfficiency: string;
  simSavedTime: string;
  simRoadmapHeader: string;
  simBadge: string;
  metric1Label: string;
  metric1Desc: string;
  metric2Label: string;
  metric2Desc: string;
  metric3Label: string;
  metric3Desc: string;
  metric4Label: string;
  metric4Desc: string;
  galleryPreTitle: string;
  galleryTitle: string;
  gallerySearchPlaceholder: string;
  catAll: string;
  noProjectsFound: string;
  noProjectsSub: string;
  contactPreTitle: string;
  contactTitle: string;
  contactSub: string;
  contactNameLabel: string;
  contactEmailLabel: string;
  contactSubjectLabel: string;
  contactMsgLabel: string;
  contactNamePlaceholder: string;
  contactEmailPlaceholder: string;
  contactSubjectPlaceholder: string;
  contactMsgPlaceholder: string;
  contactBtnSend: string;
  contactBtnSending: string;
  footerSpace: string;
  footerCopy: string;
  footerDesc: string;
  // Simulator roadmap translation maps
  simRoadmaps: {
    legacy: {
      automation: string[];
      rag: string[];
      agents: string[];
    };
    growing: {
      automation: string[];
      rag: string[];
      agents: string[];
    };
    enterprise: {
      automation: string[];
      rag: string[];
      agents: string[];
    };
  };
  simDifficultyMap: {
    legacy_automation: string;
    legacy_rag: string;
    legacy_agents: string;
    growing_automation: string;
    growing_rag: string;
    growing_agents: string;
    enterprise_automation: string;
    enterprise_rag: string;
    enterprise_agents: string;
  };
}

export const LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
  { code: "yo", label: "Yorùbá", flag: "🇳🇬" },
  { code: "zu", label: "isiZulu", flag: "🇿🇦" }
];

export const TRANSLATIONS: Record<LanguageCode, TranslationSet> = {
  en: {
    headerTagline: "AI-DX Transformation Specialist",
    notionConnected: "Notion Live Connected",
    localCache: "Local Portfolio Cache",
    twinHub: "Twin Knowledge Hub",
    heroBadge: "AI-DX Transformation Specialist",
    heroTitleLeading: "Driving ",
    heroTitleUnderline: "business value",
    heroTitleTrailing: " through artificial intelligence & digital transformation.",
    heroDesc: "With 13+ years of dual-domain expertise bridging business leadership and core IT infrastructure, I lead high-impact AI-DX initiatives. As a Computer Science graduate, former business owner, and current MBA candidate, I engineer dynamic full-stack systems and data strategies that capitalize on complex technological developments.",
    heroCtaPrimary: "Explore Visual Case Studies",
    heroCtaSecondary: "Initialize Consultation",
    bioCardTag: "CS Grad & MBA",
    bioCardExp: "13+ Yrs Exp",
    bioCardStatus: "Expert Active",
    bioCardDesc: "Harmonizing advanced Artificial Intelligence workflows with scalable enterprise solutions to accelerate organizational maturity.",
    simTitle: "AI-DX Strategy Simulator",
    simScaleLabel: "Business Scale",
    simLegacy: "Legacy",
    simGrowing: "Growing",
    simEnterprise: "Enterprise",
    simTargetLabel: "Transformation Target",
    simAutoSaaS: "Auto-SaaS",
    simSmartRAG: "Smart RAG",
    simAgents: "Agents",
    simEfficiency: "Est. Efficiency Boost",
    simSavedTime: "Saved Time Velocity",
    simRoadmapHeader: "Direct Action Roadmap:",
    simBadge: "13+ Yrs Dual Scope",
    metric1Label: "Years of Business & IT",
    metric1Desc: "Bridging Computer Science foundations, venture startup leadership, and MBA-level strategy.",
    metric2Label: "Projects Synced",
    metric2Desc: "Dynamic real cases fetched automatically from live Notion database workspace.",
    metric3Label: "Client Deployments",
    metric3Desc: "Managed end-to-end custom web, mobile, and API delivery for diverse cross-functional systems.",
    metric4Label: "Regions Scaled",
    metric4Desc: "Built and scaled core operations and scheduling tools across 10+ regions under strict compliance.",
    galleryPreTitle: "Curated Artifacts",
    galleryTitle: "Visual Case Studies",
    gallerySearchPlaceholder: "Search tools, stacks, tags...",
    catAll: "All",
    noProjectsFound: "No matching projects located",
    noProjectsSub: "Try widening your key filters or search fields.",
    contactPreTitle: "Gateway consultation",
    contactTitle: "Start a Case Project",
    contactSub: "Ready to construct a tailored dynamic dashboard or high-fidelity visual design client interface? Leave Budi a message.",
    contactNameLabel: "Your Full Name",
    contactEmailLabel: "Email Address",
    contactSubjectLabel: "Communication Subject",
    contactMsgLabel: "Brief Project Narrative",
    contactNamePlaceholder: "e.g., Jane Doe",
    contactEmailPlaceholder: "e.g., jane@domain.com",
    contactSubjectPlaceholder: "e.g., Dynamic Portal consultation",
    contactMsgPlaceholder: "Outline details or timeline requirements...",
    contactBtnSend: "Send Consultation Draft",
    contactBtnSending: "Dispatching message payload...",
    footerSpace: "Budi Prst creative space.",
    footerCopy: "© 2026 Budi Prst. All rights reserved.",
    footerDesc: "Designed with Nordic spatial grids and dynamic Notion integration pipelines.",
    simRoadmaps: {
      legacy: {
        automation: [
          "Convert complex spreadsheets to automated databases",
          "Deploy webhook-triggered auto-email responders",
          "Automate high-frequency routine manual tasks"
        ],
        rag: [
          "Index scattered corporate PDFs, notes, & templates",
          "Configure secure vector matching search database",
          "Build intuitive chat search interface for business docs"
        ],
        agents: [
          "Identify core operations friction clusters",
          "Deploy custom server-side automated middleware",
          "Launch autonomous Gemini agents for process scaling"
        ]
      },
      growing: {
        automation: [
          "Audit API integrations & software endpoints",
          "Streamline user/metadata synchronization models",
          "Configure live real-time webhook event handlers"
        ],
        rag: [
          "Sync live Slack, Drive & Notion graphs securely",
          "Setup memory buffers & smart cache to cut token costs",
          "Insert cognitive semantic search tools on the dashboard"
        ],
        agents: [
          "Architect robust, self-healing multi-agent states",
          "Deploy human-in-the-loop task audit panels",
          "Create autonomous backend event schedulers"
        ]
      },
      enterprise: {
        automation: [
          "Refactor legacy databases into secure, clean APIs",
          "Enforce modern role-based auth & access scopes",
          "Run modular microservices via containerized backends"
        ],
        rag: [
          "Federate private cloud data connections securely",
          "Implement fine-grained enterprise access permissions",
          "Deploy high-fidelity text retrieval with full PII privacy"
        ],
        agents: [
          "Build distributed enterprise multi-agent workflows",
          "Introduce automatic recovery and retry safety nets",
          "Establish high-reliability LLM gateways with SLAs"
        ]
      }
    },
    simDifficultyMap: {
      legacy_automation: "2-Week Sprint — Low Complexity",
      legacy_rag: "3-Week Phase — Medium Complexity",
      legacy_agents: "4-Week Cycle — Strategic Automation",
      growing_automation: "5-Day Deployment — Highly Modular",
      growing_rag: "2-Week Sprint — High-Velocity RAG",
      growing_agents: "4-Week Shift — Comprehensive AI",
      enterprise_automation: "3-Week Phase — Robust Architecture",
      enterprise_rag: "4-Week Cycle — Corporate Alignment",
      enterprise_agents: "6-8 Weeks — Custom Enterprise DX"
    }
  },
  ja: {
    headerTagline: "AI-DX 変革スペシャリスト",
    notionConnected: "Notion リアルタイム同期中",
    localCache: "ローカル・ポートフォリオ・キャッシュ",
    twinHub: "ツイン・ナレッジハブ",
    heroBadge: "AI-DX 変革スペシャリスト",
    heroTitleLeading: "人工知能とデジタルトランスフォーメーションを通じて ",
    heroTitleUnderline: "ビジネス価値",
    heroTitleTrailing: " を推進する。",
    heroDesc: "ビジネスリーダーシップとITインフラ基盤を繋ぐ13年以上の複合格差経験を活かし、影響力の高いAI-DXイニシアチブを牽引しています。コンピュータサイエンス学位を持ち、事業主としての経験、さらにはMBA候補生として、複雑な技術革新を捉えたダイナミックなフルスタックシステムとデータ戦略を構築します。",
    heroCtaPrimary: "ビジュアルケーススタディを探索する",
    heroCtaSecondary: "個別相談を開始する",
    bioCardTag: "CS学士 & MBA候補",
    bioCardExp: "実績 13年以上",
    bioCardStatus: "スペシャリスト常駐中",
    bioCardDesc: "最先端のAIワークフローとスケール可能なエンタープライズソリューションを調和させ、組織の成熟を加速します。",
    simTitle: "AI-DX 戦略シミュレーター",
    simScaleLabel: "ビジネス規模",
    simLegacy: "レガシー",
    simGrowing: "急成長期",
    simEnterprise: "大企業",
    simTargetLabel: "変革のターゲット",
    simAutoSaaS: "自動化SaaS",
    simSmartRAG: "高度なRAG",
    simAgents: "AIエージェント",
    simEfficiency: "推定効率向上率",
    simSavedTime: "削減時間ペース",
    simRoadmapHeader: "即時アクション計画：",
    simBadge: "13年超ビジネス設計",
    metric1Label: "ビジネスと自己IT経験",
    metric1Desc: "コンピュータサイエンスの基礎、ベンチャー企業の経営、MBAクラスの戦略フレームワークの統合。",
    metric2Label: "同期プロジェクト数",
    metric2Desc: "Notionデータベースの作業スペースから自動更新される動的ポートフォリオ事例。",
    metric3Label: "構築システム実績",
    metric3Desc: "多種多様な社内業務や基底システムのフロント、モバイル、API等のエンドツーエンド構築開発設計。",
    metric4Label: "スケール対象の地域",
    metric4Desc: "厳密なコンプライアンス要件下で、10以上の地域を横断する重要運用スケジューリングシステムの配置構築。",
    galleryPreTitle: "厳選実績アーカイブ",
    galleryTitle: "ビジュアルケーススタディ",
    gallerySearchPlaceholder: "技術、タグ、キーワードで検索...",
    catAll: "すべて",
    noProjectsFound: "該当するプロジェクトは見つかりませんでした",
    noProjectsSub: "検索キーワードや絞り込みフィルタを広げて再試行してください。",
    contactPreTitle: "相談窓口ゲートウェイ",
    contactTitle: "案件の相談を開始する",
    contactSub: "業務ニーズに合わせたカスタムダッシュボードや、高品質なビジュアルデザインのクライアント画面を構築しませんか？メッセージをお寄せください。",
    contactNameLabel: "お名前",
    contactEmailLabel: "メールアドレス",
    contactSubjectLabel: "ご相談件名",
    contactMsgLabel: "ご相談内容（要件・スケジュールなど）",
    contactNamePlaceholder: "例：山田 太郎",
    contactEmailPlaceholder: "例：yamada@domain.com",
    contactSubjectPlaceholder: "例：DXプロジェクト推進の件",
    contactMsgPlaceholder: "開発の背景や期待する納期などをご記入ください...",
    contactBtnSend: "相談ドラフトを送信する",
    contactBtnSending: "メッセージペイロードを送信中...",
    footerSpace: "Budi Prst 製造クリエイティブ空間",
    footerCopy: "© 2026 Budi Prst. 無断複写・転載を禁じます。",
    footerDesc: "北欧調ミニマリズム・グリッドとNotion動的同期パイプラインによる設計・開発。",
    simRoadmaps: {
      legacy: {
        automation: [
          "複雑なスプレッドシートを自動集計データベースに移行",
          "Webhook起動対応の自動返信メールシステムの構築",
          "発生頻度の高いルーチンな手作業を完全自動化"
        ],
        rag: [
          "分散された自社PDF、メモ書き、テンプレートをインデックス化",
          "セキュアなベクトル追従マッチング検索エンジンの設定",
          "ビジネス文書専用のインテリジェントなチャット検索画面"
        ],
        agents: [
          "重要業務フェーズのボトルネックを検出し解消モデルに設計",
          "サーバーサイドのカスタム自動実行ミドルウェアの導入",
          "業務を自動スケールする自立型Geminiエージェントを立ち上げ"
        ]
      },
      growing: {
        automation: [
          "API連携経路とソフトウェアのエンドポイントを総合審査",
          "ユーザーおよび属性データの連携同期モデルをスムーズ化",
          "リアルタイムWebhook駆動イベントハンドラの設定"
        ],
        rag: [
          "Slack、Google Drive、Notionをセキュアに横断接続・同期",
          "トークン消費を抑えるスマートキャッシュと記憶バッファの実装",
          "ダッシュボード上に文脈解釈型セマンティック検索を搭載"
        ],
        agents: [
          "エラー自動復旧機能を持つ強固なマルチエージェント構造の開発",
          "人間による確認がいつでも可能な監査コントロールパネルの展開",
          "自立動作するバックエンドイベント自動実行システムの導入"
        ]
      },
      enterprise: {
        automation: [
          "旧式データベースをセキュアでクリーンな構造のAPIに転換",
          "堅牢なロール別アクセス認証とセキュリティスコープの適用",
          "コンテナ化されたバックエンド配下でのマイクロサービス構築"
        ],
        rag: [
          "プライベートクラウド接続による安全なデータ連動の実現",
          "エンタープライズに適合する厳格な閲覧許可認証の埋め込み",
          "徹底した個人情報漏洩対策を施して高度なインデックス検索を実現"
        ],
        agents: [
          "複数部門にわたるエンタープライズ対応の分散型協調エージェント開発",
          "例外発生時に自己再試行を行う自動修復セーフティネットの搭載",
          "SLA保障付きの高信頼性大規模言語モデル対応ゲートウェイ確立"
        ]
      }
    },
    simDifficultyMap: {
      legacy_automation: "2週間スプリント — 低開発負荷",
      legacy_rag: "3週間フェーズ — 中程度の複雑さ",
      legacy_agents: "4週間サイクル — 戦略的な業務自動化",
      growing_automation: "5日間スピード導入 — 高モジュール設計",
      growing_rag: "2週間スプリント — 快速RAG構築",
      growing_agents: "4週間トランスフォーメーション — 統合AI支援",
      enterprise_automation: "3週間開発フェーズ — 高耐久インフラ",
      enterprise_rag: "4週間サイクル — 全社的アライメント調整",
      enterprise_agents: "6〜8週間 — オーダーメイド・エンタープライズDX"
    }
  },
  fr: {
    headerTagline: "Spécialiste de la Transformation IA-DX",
    notionConnected: "Notion synchronisé en direct",
    localCache: "Cache local du portefeuille",
    twinHub: "Hub de connaissances virtuel",
    heroBadge: "Spécialiste de la Transformation IA-DX",
    heroTitleLeading: "Propulser la ",
    heroTitleUnderline: "valeur commerciale",
    heroTitleTrailing: " grâce à l'intelligence artificielle et à la transformation digitale.",
    heroDesc: "Avec plus de 13 ans d'expertise transversale reliant le leadership d'entreprise et l'infrastructure informatique de pointe, je pilote des initiatives IA-DX à fort impact. Diplômé en informatique, ancien chef d'entreprise et candidat actuel au MBA, je conçois des systèmes complets et des stratégies de données dynamiques pour valoriser les évolutions technologiques complexes.",
    heroCtaPrimary: "Explorer les Études de Cas",
    heroCtaSecondary: "Démarrer une Consultation",
    bioCardTag: "Diplômé Info & MBA",
    bioCardExp: "Plus de 13 Ans d'Exp",
    bioCardStatus: "Expert En Ligne",
    bioCardDesc: "Harmoniser les flux d'intelligence artificielle avancés avec des solutions d'entreprise évolutives pour accélérer la maturité organisationnelle.",
    simTitle: "Simulateur de Stratégie IA-DX",
    simScaleLabel: "Échelle de l'Entreprise",
    simLegacy: "Héritée",
    simGrowing: "En Croissance",
    simEnterprise: "Grand Groupe",
    simTargetLabel: "Cible de Transformation",
    simAutoSaaS: "Auto-SaaS",
    simSmartRAG: "RAG Intelligent",
    simAgents: "Agents",
    simEfficiency: "Gain d'Efficacité Est.",
    simSavedTime: "Temps Mensuel Épargné",
    simRoadmapHeader: "Plan d'Action Direct :",
    simBadge: "Double Expertise 13+ Ans",
    metric1Label: "Années Business & Tech",
    metric1Desc: "Fusionner les fondations de l'informatique, la direction de start-up et la stratégie de niveau MBA.",
    metric2Label: "Projets Synchronisés",
    metric2Desc: "Cas réels dynamiques importés automatiquement de l'espace de travail Notion.",
    metric3Label: "Déploiements Clients",
    metric3Desc: "Gestion de bout en bout d'applications web, mobiles et d'API robustes.",
    metric4Label: "Régions Déployées",
    metric4Desc: "Déploiement mondial d'outils opérationnels dans 10+ régions sous conformité réglementaire stricte.",
    galleryPreTitle: "Réalisations Sélectionnées",
    galleryTitle: "Études de Cas Visuelles",
    gallerySearchPlaceholder: "Rechercher outils, langages, tags...",
    catAll: "Tous",
    noProjectsFound: "Aucun projet trouvé",
    noProjectsSub: "Veuillez élargir vos critères de recherche ou de filtre.",
    contactPreTitle: "Formulaire de Consultation",
    contactTitle: "Initier un Projet",
    contactSub: "Prêt à concevoir un tableau de bord sur mesure ou une interface client haute fidélité ? Laissez un message à Budi.",
    contactNameLabel: "Votre Nom Complet",
    contactEmailLabel: "Adresse Email",
    contactSubjectLabel: "Sujet de Communication",
    contactMsgLabel: "Brève Description du Projet",
    contactNamePlaceholder: "Ex: Jeanne Dupont",
    contactEmailPlaceholder: "Ex: jeanne@domain.com",
    contactSubjectPlaceholder: "Ex: Consultation Portail Dynamique",
    contactMsgPlaceholder: "Détails du projet ou contraintes de calendrier...",
    contactBtnSend: "Envoyer le Projet",
    contactBtnSending: "Envoi en cours...",
    footerSpace: "Espace Créatif Budi Prst.",
    footerCopy: "© 2026 Budi Prst. Tous droits réservés.",
    footerDesc: "Développé avec une grille spatiale scandinave et des flux d'intégration Notion dynamiques.",
    simRoadmaps: {
      legacy: {
        automation: [
          "Convertir les feuilles de calcul complexes en bases de données",
          "Déployer des réponses automatisées par emails via Webhooks",
          "Automatiser des tâches manuelles répétitives à haute fréquence"
        ],
        rag: [
          "Indexer les PDF, notes et modèles d'entreprise dispersés",
          "Configurer une base de données vectorielle sécurisée",
          "Créer une interface de recherche documentaire par IA en langage naturel"
        ],
        agents: [
          "Identifier les goulots d'étranglement opérationnels",
          "Déployer un middleware serveur d'automatisation personnalisé",
          "Lancer des agents autonomes sous Gemini pour mise à l'échelle"
        ]
      },
      growing: {
        automation: [
          "Auditer les intégrations d'API et les points de connexion logiciels",
          "Fluidifier le modèle de synchronisation des comptes utilisateurs",
          "Configurer des gestionnaires d'événements par Webhook en temps réel"
        ],
        rag: [
          "Synchroniser de manière sécurisée Slack, Drive et Notion",
          "Installer des caches et tampons mémoires pour optimiser les coûts",
          "Ajouter des fonctionnalités de recherche sémantique au tableau de bord"
        ],
        agents: [
          "Créer un système multi-agent robuste et résilient aux pannes",
          "Mettre en place des panels de contrôle avec validation par l'humain",
          "Automatiser les planifications de tâches sur le backend"
        ]
      },
      enterprise: {
        automation: [
          "Refactoriser les bases de données héritées en API propres",
          "Appliquer une authentification moderne basée sur les rôles",
          "Déployer des microservices modulaires supervisés par conteneur"
        ],
        rag: [
          "Fédérer l'accès aux clouds privés de manière sécurisée",
          "Déployer un contrôle des accès haut de gamme et granulaire",
          "Assurer la recherche sémantique à haute fidélité sans fuite PII"
        ],
        agents: [
          "Bâtir des workflows collaboratifs multi-agents à l'échelle",
          "Introduire des filets de sécurité avec reprise automatique sur panne",
          "Établir des passerelles LLM haute disponibilité avec SLAs"
        ]
      }
    },
    simDifficultyMap: {
      legacy_automation: "Sprint de 2 semaines — Faible Compléxité",
      legacy_rag: "Phase de 3 semaines — Complexité Moyenne",
      legacy_agents: "Cycle de 4 semaines — Automatisation Stratégique",
      growing_automation: "Déploiement en 5 jours — Ultra Modulaire",
      growing_rag: "Sprint de 2 semaines — RAG Haute Performance",
      growing_agents: "Transition de 4 semaines — Solution Globale d'IA",
      enterprise_automation: "Phase de 3 semaines — Architecture Robuste",
      enterprise_rag: "Cycle de 4 semaines — Alignement Corporatif",
      enterprise_agents: "6 à 8 Semaines — Transformation DX Entreprise"
    }
  },
  es: {
    headerTagline: "Especialista en Transformación IA-DX",
    notionConnected: "Conectado a Notion en vivo",
    localCache: "Caché de portafolio local",
    twinHub: "Hub de Conocimiento Virtual",
    heroBadge: "Especialista en Transformación IA-DX",
    heroTitleLeading: "Impulsando el ",
    heroTitleUnderline: "valor de negocio",
    heroTitleTrailing: " a través de inteligencia artificial y transformación digital.",
    heroDesc: "Con más de 13 años de experiencia en doble dominio que une el liderazgo empresarial y la infraestructura de TI primaria, lidero iniciativas de IA-DX de alto impacto. Como graduado en Ciencias de la Computación, ex-empresario y actual candidato a MBA, diseño sistemas dinámicos robustos y estrategias de datos para capitalizar las complejidades tecnológicas.",
    heroCtaPrimary: "Explorar Casos de Estudio",
    heroCtaSecondary: "Iniciar Consulta",
    bioCardTag: "Grado en CS & MBA",
    bioCardExp: "13+ Años Exp",
    bioCardStatus: "Experto en Línea",
    bioCardDesc: "Armonizando flujos de inteligencia artificial avanzada con soluciones empresariales escalables para acelerar la madurez organizacional.",
    simTitle: "Simulador de Estrategia IA-DX",
    simScaleLabel: "Escala del Negocio",
    simLegacy: "Heredada",
    simGrowing: "En Crecimiento",
    simEnterprise: "Gran Empresa",
    simTargetLabel: "Objetivo de Transformación",
    simAutoSaaS: "Auto-SaaS",
    simSmartRAG: "RAG Inteligente",
    simAgents: "Agentes AI",
    simEfficiency: "Incremento Eficiencia Est.",
    simSavedTime: "Tiempo Ahorrado Mensual",
    simRoadmapHeader: "Plan de Acción Directo:",
    simBadge: "Doble Dominio 13+ Años",
    metric1Label: "Años Negocio y Tech",
    metric1Desc: "Fusión de bases de ciencias de computación, liderazgo de startups y estrategia de MBA.",
    metric2Label: "Casos Sincronizados",
    metric2Desc: "Casos reales dinámicos traídos de manera automática desde el espacio de trabajo en Notion.",
    metric3Label: "Sistemas Desplegados",
    metric3Desc: "Estructuración y despliegue integral de plataformas web, móviles y API personalizadas.",
    metric4Label: "Regiones Globals",
    metric4Desc: "Construcción y escalado de herramientas operativas en más de 10 regiones con alta conformidad reguladora.",
    galleryPreTitle: "Proyectos Seleccionados",
    galleryTitle: "Casos de Estudio Visuales",
    gallerySearchPlaceholder: "Buscar herramientas, tecnologías, etiquetas...",
    catAll: "Todos",
    noProjectsFound: "No se encontraron proyectos",
    noProjectsSub: "Intente ampliar sus criterios de búsqueda o filtros.",
    contactPreTitle: "Formulario de Consulta",
    contactTitle: "Iniciar un Caso de Proyecto",
    contactSub: "¿Listo para diseñar un tablero adaptado o una interfaz para clientes de alta gama? Deje un mensaje a Budi.",
    contactNameLabel: "Su Nombre Completo",
    contactEmailLabel: "Dirección de Correo",
    contactSubjectLabel: "Asunto del Mensaje",
    contactMsgLabel: "Descripción Corta del Proyecto",
    contactNamePlaceholder: "Ej: Juana De Arco",
    contactEmailPlaceholder: "Ej: juana@domain.com",
    contactSubjectPlaceholder: "Ej: Consulta de Portal Dinámico",
    contactMsgPlaceholder: "Detalles del proyecto o plazos requeridos...",
    contactBtnSend: "Enviar Solicitud de Consulta",
    contactBtnSending: "Enviando paquete de mensaje...",
    footerSpace: "Espacio Creativo Budi Prst.",
    footerCopy: "© 2026 Budi Prst. Todos los derechos reservados.",
    footerDesc: "Diseñado con cuadrícula nórdica estricta y canalizaciones dinámicas de Notion.",
    simRoadmaps: {
      legacy: {
        automation: [
          "Convertir hojas de cálculo complejas en bases de datos",
          "Desplegar autorepuestas de correos activados por Webhooks",
          "Automatizar tareas manuales de alta frecuencia"
        ],
        rag: [
          "Indexar PDF, notas de reuniones y plantillas",
          "Configurar base de datos vectorial de búsqueda semántica",
          "Construir panel de chat inteligente para consultar documentos"
        ],
        agents: [
          "Identificar cuellos de botella de fricción operacional",
          "Desplegar servidor middleware automatizado y flexible",
          "Lanzar agentes autónomos con Gemini para acelerar ritmos"
        ]
      },
      growing: {
        automation: [
          "Auditar integraciones de APIs y conexiones del sistema",
          "Agilizar la sincronización de metadatos de usuarios",
          "Configure controladores de webhook interactivos en tiempo real"
        ],
        rag: [
          "Sincronizar de forma segura Slack, Drive y portales de Notion",
          "Configurar memoria caché para reducir consumo de tokens",
          "Insertar asistente semántico directamente en la interfaz principal"
        ],
        agents: [
          "Diseñar arquitectura sólida de agentes con recuperación ante fallas",
          "Construir un panel de control con auditoría humana interactiva",
          "Automatizar flujos de eventos usando programadores backend"
        ]
      },
      enterprise: {
        automation: [
          "Refactorizar bases tradicionales en microservicios con APIs limpias",
          "Imponer control de seguridad basado en roles específicos",
          "Desplegar contenedores automatizados en la nube"
        ],
        rag: [
          "Federar infraestructuras privadas con altos estándares de seguridad",
          "Establecer reglas detalladas de permisos y accesos cruzados",
          "Implementar recuperación semántica sin vulnerar la privacidad PII"
        ],
        agents: [
          "Crear flujos colaborativos de agentes distribuidos empresariales",
          "Introducir sistemas de respaldo y autorrecuperación robustos",
          "Implementar pasarela corporativa de LLMs regulada con acuerdos SLA"
        ]
      }
    },
    simDifficultyMap: {
      legacy_automation: "Sprint de 2 Semanas — Baja Complejidad",
      legacy_rag: "Fase de 3 Semanas — Complejidad Media",
      legacy_agents: "Ciclo de 4 Semanas — Automatización Estratégica",
      growing_automation: "Implementación en 5 Días — Modular y Ágil",
      growing_rag: "Sprint de 2 Semanas — RAG de Alta Velocidad",
      growing_agents: "Transición de 4 Semanas — IA Integral",
      enterprise_automation: "Fase de 3 Semanas — Arquitectura Robusta",
      enterprise_rag: "Ciclo de 4 Semanas — Alineación Corporativa",
      enterprise_agents: "6 a 8 Semanas — Solución Enterprise a Medida"
    }
  },
  de: {
    headerTagline: "Spezialist für AI-DX Business-Transformation",
    notionConnected: "Notion Live-Verbindung aktiv",
    localCache: "Lokaler Portfolio-Cache",
    twinHub: "Wissensdatenbank-Hub",
    heroBadge: "Spezialist für AI-DX Business-Transformation",
    heroTitleLeading: "Steigerung des ",
    heroTitleUnderline: "Unternehmenswertes",
    heroTitleTrailing: " durch künstliche Intelligenz & digitale Transformation.",
    heroDesc: "Mit über 13 Jahren branchenübergreifender Erfahrung an der Schnittstelle von Unternehmensführung und moderner IT-Infrastruktur leite ich wegweisende AI-DX-Initiativen. Als Informatiker, ehemaliger Unternehmer und MBA-Kandidat konzipiere ich dynamische Full-Stack-Lösungen und Datenstrategien für den bestmöglichen Einsatz bahnbrechender Technologien.",
    heroCtaPrimary: "Fallstudien auswerten",
    heroCtaSecondary: "Anfrage starten",
    bioCardTag: "CS-Absolvent & MBA",
    bioCardExp: "13+ Jahre Erfahrung",
    bioCardStatus: "Spezialist Aktiv",
    bioCardDesc: "Integration hochentwickelter KI-Workflows in skalierbare Unternehmensstrukturen zur Beschleunigung der organisatorischen Reife.",
    simTitle: "AI-DX-Strategiesimulator",
    simScaleLabel: "Unternehmensgröße",
    simLegacy: "Bestandssystem",
    simGrowing: "Im Wachstum",
    simEnterprise: "Großkonzern",
    simTargetLabel: "Transformationsziel",
    simAutoSaaS: "Auto-SaaS",
    simSmartRAG: "Smart RAG",
    simAgents: "KI-Agenten",
    simEfficiency: "Geschätzter Effizienzzuwachs",
    simSavedTime: "Monatlich gesparte Arbeitszeit",
    simRoadmapHeader: "Direkter Maßnahmenplan:",
    simBadge: "13+ Jahre Doppel-Expertise",
    metric1Label: "Jahre Business & Tech",
    metric1Desc: "Brücke zwischen solider Informatik-Ausbildung, Startup-Führung und MBA-Strategie.",
    metric2Label: "Sychronisierte Fälle",
    metric2Desc: "Echtzeit-Anwendungsfälle, die automatisch aus dem Notion-Workspace aktualisiert werden.",
    metric3Label: "Kundenprojekte",
    metric3Desc: "Hervorragende Implementierung von Full-Stack Web-, Mobil- und API-Architekturen.",
    metric4Label: "Skalierte Regionen",
    metric4Desc: "Aufbau und Skalierung kritischer Workflow-Software in über 10 Regionen unter strengen Compliance-Standards.",
    galleryPreTitle: "Ausgewählte Arbeiten",
    galleryTitle: "Visuelle Fallstudien",
    gallerySearchPlaceholder: "Suche nach Technologien, Tags, Code...",
    catAll: "Alle",
    noProjectsFound: "Keine übereinstimmenden Projekte gefunden",
    noProjectsSub: "Erweitern Sie die Suche oder passen Sie die Filter an.",
    contactPreTitle: "Strategie-Beratung",
    contactTitle: "Gemeinsames Projekt starten",
    contactSub: "Möchten Sie ein maßgeschneidertes Dashboard oder eine anspruchsvolle Benutzeroberfläche entwickeln? Senden Sie Budi eine Nachricht.",
    contactNameLabel: "Ihr vollständiger Name",
    contactEmailLabel: "E-Mail-Adresse",
    contactSubjectLabel: "Betreff",
    contactMsgLabel: "Kurze Beschreibung des Projekts",
    contactNamePlaceholder: "z.B. Johanna Schmidt",
    contactEmailPlaceholder: "z.B. johanna@domain.de",
    contactSubjectPlaceholder: "z.B. Anfrage Portal-Optimierung",
    contactMsgPlaceholder: "Hintergründe, Anforderungen oder gewünschte Liefertermine eingeben...",
    contactBtnSend: "Beratungsanfrage senden",
    contactBtnSending: "Datenpaket wird übertragen...",
    footerSpace: "Budi Prst Kreativstudio.",
    footerCopy: "© 2026 Budi Prst. Alle Rechte vorbehalten.",
    footerDesc: "Konzipiert mit nordischem Minimalismus und automatischen Notion-Datenpipelines.",
    simRoadmaps: {
      legacy: {
        automation: [
          "Überführung komplexer Tabellen in relationale Datenbanken",
          "Bereitstellung automatischer Mailer auf Webhook-Basis",
          "Systematische Reduzierung fehleranfälliger Handgriffe"
        ],
        rag: [
          "Zentrale Indexierung von PDF-Berichten, Notizen und Vorlagen",
          "Einrichtung einer vollverschlüsselten Vektordatenbank",
          "Intuitive Chat-Oberfläche für geschäftliche Dokumente"
        ],
        agents: [
          "Lokalisierung struktureller Reibungsverluste",
          "Aufbau einer flexiblen serverseitigen Middleware-Verbindung",
          "Einsatz autonomer Gemini-Agenten zur Systemskalierung"
        ]
      },
      growing: {
        automation: [
          "Technische Evaluierung bestehender API-Schnittstellen",
          "Harmonisierung von Nutzer- und Metadatenströmen",
          "Echtzeit-Webhook-Verarbeitung für automatisierte Ereignisse"
        ],
        rag: [
          "Sichere Anbindung von Live-Daten aus Slack, Drive & Notion",
          "Caching-Strukturen zur signifikanten Senkung von Tokenkosten",
          "Integration kontextbasierter Semantiksuche auf der Benutzeroberfläche"
        ],
        agents: [
          "Konzeption robuster, fehlertoleranter Multi-Agenten-Netzwerke",
          "Einrichtung interaktiver Kontrollzentren zur menschlichen Freigabe",
          "Einsatz automatischer Scheduler für komplexe Aufgaben im Hintergrund"
        ]
      },
      enterprise: {
        automation: [
          "Transformation historisch gewachsener SQL-Datenbanken in saubere APIs",
          "Einführung zeitgemäßer rollenbasierter Zugriffskontrollen",
          "Entwicklung modularer Microservices"
        ],
        rag: [
          "Sichere Föderation privater Cloud-Bestände",
          "Implementierung feingranularer Zugriffsrechte auf Konzernebene",
          "Semantische Suche ohne Verletzung von PII-Schutzrichtlinien"
        ],
        agents: [
          "Verteiltes Multi-Agenten-Ökosystem für globale Abteilungen",
          "Ausfallsichere Wiederherstellungsmechanismen mit Auto-Retry",
          "Großkundentaugliche LLM-Gateways mit verbindlichen Service-SLAs"
        ]
      }
    },
    simDifficultyMap: {
      legacy_automation: "2-Wochen-Sprint — Einfache Implementierung",
      legacy_rag: "3-Wochen-Phase — Mittlere Komplexität",
      legacy_agents: "4-Wochen-Zyklus — Strategische Automatisierung",
      growing_automation: "5 Tage Umsetzung — Hochgradig Modular",
      growing_rag: "2-Wochen-Sprint — Hochleistungs-RAG",
      growing_agents: "4-Wochen-Zyklus — Umfassendes KI-Ökosystem",
      enterprise_automation: "3-Wochen-Entwicklung — Robuste Architektur",
      enterprise_rag: "4-Wochen-Zyklus — Strategischer Unternehmensabgleich",
      enterprise_agents: "6-8 Wochen — Maßgeschneiderte Enterprise-Lösung"
    }
  },
  id: {
    headerTagline: "Spesialis Transformasi AI-DX",
    notionConnected: "Terhubung Langsung dengan Notion",
    localCache: "Penyimpanan Portofolio Lokal",
    twinHub: "Hub Pengetahuan Kembar",
    heroBadge: "Spesialis Transformasi AI-DX",
    heroTitleLeading: "Mendongkrak ",
    heroTitleUnderline: "nilai bisnis",
    heroTitleTrailing: " melalui kecerdasan buatan & transformasi digital.",
    heroDesc: "Berbekal lebih dari 13 tahun keahlian lintas bidang yang menjembatani kepemimpinan bisnis serta infrastruktur TI utama, saya memimpin inisiatif AI-DX berdampak tinggi. Sebagai lulusan Ilmu Komputer, mantan pemilik bisnis, dan kandidat MBA saat ini, saya merancang sistem full-stack dinamis dan strategi data yang memanfaatkan dinamika teknologi modern.",
    heroCtaPrimary: "Pelajari Studi Kasus Visual",
    heroCtaSecondary: "Mulai Konsultasi",
    bioCardTag: "Lulusan S1 Komputer & MBA",
    bioCardExp: "13+ Tahun Pengalaman",
    bioCardStatus: "Spesialis Aktif",
    bioCardDesc: "Menyelaraskan alur kerja Kecerdasan Buatan tingkat lanjut dengan solusi korporat yang skalabel untuk mempercepat kematangan organisasi.",
    simTitle: "Simulator Strategi AI-DX",
    simScaleLabel: "Skala Bisnis",
    simLegacy: "Legacy",
    simGrowing: "Berkembang",
    simEnterprise: "Enterprise",
    simTargetLabel: "Target Transformasi",
    simAutoSaaS: "Auto-SaaS",
    simSmartRAG: "Smart RAG",
    simAgents: "Agen AI",
    simEfficiency: "Est. Lonjakan Efisiensi",
    simSavedTime: "Waktu Terhemat Bulanan",
    simRoadmapHeader: "Rencana Tindakan Langsung:",
    simBadge: "Kombinasi Keahlian 13+ Tahun",
    metric1Label: "Tahun Pengalaman Bisnis & TI",
    metric1Desc: "Menyatukan fondasi Ilmu Komputer, kepemimpinan modal modal ventura, dan strategi bisnis MBA.",
    metric2Label: "Portofolio Sinkron",
    metric2Desc: "Kasus-kasus nyata yang diperbarui secara otomatis dari ruang kerja Notion langsung.",
    metric3Label: "Penerapan Klien",
    metric3Desc: "Mengelola pengiriman penuh dari aplikasi web, mobile, dan API kustom lintas platform.",
    metric4Label: "Wilayah Berskala",
    metric4Desc: "Membangun dan mengembangkan alat operasional penting di 10+ kawasan di bawah kepatuhan ketat.",
    galleryPreTitle: "Karya Terkurasi",
    galleryTitle: "Studi Kasus Visual",
    gallerySearchPlaceholder: "Cari teknologi, pustaka, tag...",
    catAll: "Semua",
    noProjectsFound: "Tidak ada proyek yang sesuai",
    noProjectsSub: "Coba perluas kata kunci pencarian atau filter Anda.",
    contactPreTitle: "Konsultasi Strategis",
    contactTitle: "Mulai Proyek Bersama",
    contactSub: "Siap membangun dasbor kustom dinamis atau antarmuka klien berkualitas tinggi? Tinggalkan pesan untuk Budi.",
    contactNameLabel: "Nama Lengkap Anda",
    contactEmailLabel: "Alamat Email",
    contactSubjectLabel: "Subjek Komunikasi",
    contactMsgLabel: "Deskripsi Singkat Proyek",
    contactNamePlaceholder: "Misal: Jane Doe",
    contactEmailPlaceholder: "Misal: jane@domain.com",
    contactSubjectPlaceholder: "Misal: Konsultasi Portal Dinamis",
    contactMsgPlaceholder: "Uraikan detail atau tenggat waktu pengerjaan...",
    contactBtnSend: "Kirim Draf Konsultasi",
    contactBtnSending: "Mengirim data pesan...",
    footerSpace: "Ruang Kreatif Budi Prst.",
    footerCopy: "© 2026 Budi Prst. Hak cipta dilindungi undang-undang.",
    footerDesc: "Dirancang dengan tata letak minimalis Nordik dan integrasi dinamis data Notion.",
    simRoadmaps: {
      legacy: {
        automation: [
          "Konversi lembar sebar (spreadsheet) rumit menjadi database",
          "Terapkan pembalas email otomatis berbasis pemicu Webhook",
          "Otomatisasi tugas manual rutin yang sangat sering berulang"
        ],
        rag: [
          "Indeks berkas PDF korporat, catatan rapat, & templat acak",
          "Konfigurasikan database pencarian vektor yang aman",
          "Bangun antarmuka obrolan pintar untuk menanyai dokumen bisnis"
        ],
        agents: [
          "Identifikasi hambatan atau friksi operasional utama",
          "Terapkan middleware server otomatisasi kustom backend",
          "Luncurkan agen Gemini otonom untuk perluasan kerja"
        ]
      },
      growing: {
        automation: [
          "Audit integrasi sistem API dan titik koneksi peranti lunak",
          "Singkronkan model sinkronisasi pengguna & data profil",
          "Tentukan penanganan kejadian live Webhook waktu nyata"
        ],
        rag: [
          "Singkronkan saluran Slack, Drive, & Notion secara aman",
          "Pasang memory cache pintar untuk menghemat biaya token LLM",
          "Tambahkan kolom pencarian semantik kontekstual pada dasbor"
        ],
        agents: [
          "Rancang struktur multi-agen yang kokoh dan tahan gangguan",
          "Gelar panel audit tugas dengan persetujuan manual (human-in-the-loop)",
          "Integrasikan penjadwal kejadian otomatis di server belakang"
        ]
      },
      enterprise: {
        automation: [
          "Rekonstruksi database tradisional lama menjadi API yang bersih",
          "Terapkan autentikasi modern berbasis peran pengguna",
          "Jalankan layanan mikro modular di dalam lingkungan kontainer"
        ],
        rag: [
          "Integrasikan data cloud privat dengan tingkat keamanan tingkat tinggi",
          "Terapkan aturan perizinan akses enterprise yang mendetail",
          "Hadirkan pencarian semantik bernilai tinggi tanpa kebocoran data PII"
        ],
        agents: [
          "Bangun alur kerja kolaborasi multi-agen skala korporat global",
          "Sertakan jaringan pemulihan otomatis jika terjadi anomali",
          "Tentukan gerbang LLM dengan keandalan tinggi dan jaminan SLA"
        ]
      }
    },
    simDifficultyMap: {
      legacy_automation: "Sprint 2 Minggu — Kompleksitas Rendah",
      legacy_rag: "Fase 3 Minggu — Kompleksitas Sedang",
      legacy_agents: "Siklus 4 Minggu — Otomatisasi Strategis",
      growing_automation: "Penerapan 5 Hari — Sangat Modular",
      growing_rag: "Sprint 2 Minggu — RAG Berkecepatan Tinggi",
      growing_agents: "Transisi 4 Minggu — Solusi AI Terpadu",
      enterprise_automation: "Fase 3 Minggu — Arsitektur Kokoh",
      enterprise_rag: "Siklus 4 Minggu — Keselarasan Korporat",
      enterprise_agents: "6-8 Minggu — Transformasi DX Enterprise Kustom"
    }
  },
  sw: {
    headerTagline: "Mtaalamu wa Mabadiliko ya AI-DX",
    notionConnected: "Imounganishwa na Notion Papo Hapo",
    localCache: "Hifadhi ya Ndani ya Kazi",
    twinHub: "Kituo cha Maarifa Pembe",
    heroBadge: "Mtaalamu wa Mabadiliko ya AI-DX",
    heroTitleLeading: "Kuongeza ",
    heroTitleUnderline: "thamani ya biashara",
    heroTitleTrailing: " kupitia akili mnemba & mabadiliko ya kidijitali.",
    heroDesc: "Nikiwa na uzoefu wa zaidi ya miaka 13 unaounganisha uongozi wa biashara na miundombinu kuu ya teknolojia, ninaongoza miradi mikubwa ya AI-DX. Kama mhitimu wa Sayansi ya Kompyuta, mjasiriamali wa zamani, na mgombea wa sasa wa MBA, ninatengeneza mifumo thabiti na mikakati ya data inayofaidika na maendeleo changamano ya kiteknolojia.",
    heroCtaPrimary: "Chunguza Miradi yetu",
    heroCtaSecondary: "Anza Ushauri",
    bioCardTag: "Shahada ya CS & MBA",
    bioCardExp: "Miaka 13+ Kazini",
    bioCardStatus: "Mtaalamu Yupo",
    bioCardDesc: "Kupatanisha mifumo ya kisasa ya Akili Mnemba (AI) na suluhisho thabiti za ushirika ili kuharakisha ukomavu wa shirika.",
    simTitle: "Kiigizaji cha Mkakati wa AI-DX",
    simScaleLabel: "Kiwango cha Biashara",
    simLegacy: "Zamani",
    simGrowing: "Inayokua",
    simEnterprise: "Kampuni Kubwa",
    simTargetLabel: "Lengo la Mabadiliko",
    simAutoSaaS: "SaaS ya Otomatiki",
    simSmartRAG: "RAG Mahiri",
    simAgents: "Mawakala wa AI",
    simEfficiency: "Makadirio ya Ongezeko la Ufanisi",
    simSavedTime: "Saa Zilizookolewa kwa Mwezi",
    simRoadmapHeader: "Mpango wa Hatua za Moja kwa Moja:",
    simBadge: "Utaalamu wa Miaka 13+",
    metric1Label: "Miaka ya Biashara na TI",
    metric1Desc: "Kuunganisha misingi ya Sayansi ya Kompyuta, uongozi wa kampuni changanga, na mikakati ya MBA.",
    metric2Label: "Miradi Iliyosawazishwa",
    metric2Desc: "Kesi halisi za biashara zinazochukuliwa moja kwa moja kutoka kwenye Notion database.",
    metric3Label: "Mifumo Iliyowekwa",
    metric3Desc: "Usimamizi kamili wa ujenzi wa mifumo ya wavuti, programu za simu na API za kisasa.",
    metric4Label: "Kanda Zinazosimamiwa",
    metric4Desc: "Kujenga na kukuza mifumo ya uendeshaji katika zaidi ya kanda 10 chini ya uzingatiaji mkali wa sheria.",
    galleryPreTitle: "Kazi Zilizochaguliwa",
    galleryTitle: "Uchunguzi wa Kina wa Miradi",
    gallerySearchPlaceholder: "Tafuta teknolojia, lebo, maneno...",
    catAll: "Yote",
    noProjectsFound: "Hakuna mradi uliopatikana",
    noProjectsSub: "Jaribu kubadilisha maneno ya utafutaji au vichungi vyako.",
    contactPreTitle: "Ushauri wa Kimkakati",
    contactTitle: "Anza Mradi Mpya",
    contactSub: "Uko tayari kujenga dashibodi maalum au mfumo wenye muundo wa hali ya juu? Mwachie Budi ujumbe hapa.",
    contactNameLabel: "Majina Yako Kamili",
    contactEmailLabel: "Anwani ya Barua Pepe",
    contactSubjectLabel: "Mada ya Ujumbe",
    contactMsgLabel: "Maelezo Mafupi ya Mradi",
    contactNamePlaceholder: "mf. Jane Doe",
    contactEmailPlaceholder: "mf. jane@domain.com",
    contactSubjectPlaceholder: "mf. Ushauri wa Dashibodi",
    contactMsgPlaceholder: "Andika maelezo ya mradi au tarehe unayotarajia...",
    contactBtnSend: "Tuma Ombi la Ushauri",
    contactBtnSending: "Inatuma ujumbe...",
    footerSpace: "Eneo la Ubunifu la Budi Prst.",
    footerCopy: "© 2026 Budi Prst. Haki zote zimehifadhiwa.",
    footerDesc: "Imeundwa kwa mitindo ya kisasa ya Nordic na mifumo ya Notion.",
    simRoadmaps: {
      legacy: {
        automation: [
          "Kubadilisha lahajakazi thabiti kuwa hifadhidata bora",
          "Kuweka mifumo ya kujibu barua pepe otomatiki kupitia Webhooks",
          "Kufanya otomatiki kazi za kila siku za mikono"
        ],
        rag: [
          "Kuweka faharasa faili za kampuni (PDF), madokezo na violezo",
          "Kusanidi hifadhidata salama ya utafutaji wa kisemantiki",
          "Kujenga jukwaa la gumzo kuuliza maswali kuhusu nyaraka za biashara"
        ],
        agents: [
          "Kutambua maeneo yenye vikwazo vya uendeshaji",
          "Kuweka mifumo ya seva ya otomatiki ya upande wa seva",
          "Kuzindua mawakala wa otonomia wa Gemini ili kuongeza ufanisi"
        ]
      },
      growing: {
        automation: [
          "Kukagua miunganisho ya mifumo ya API na programu",
          "Kuboresha mifumo ya usawazishaji wa data ya watumiaji",
          "Kusanidi vidhibiti vya webhook vya wakati halisi"
        ],
        rag: [
          "Kusawazisha kwa usalama njia za Slack, Drive na kurasa za Notion",
          "Kuweka kumbukumbu ya cache ili kupunguza gharama za tokeni",
          "Kuingiza kisanduku cha utafutaji wa kisemantiki kwenye dashibodi"
        ],
        agents: [
          "Kusanifu mifumo thabiti ya mawakala inayojirekebisha inapofeli",
          "Kujenga paneli ya ukaguzi yenye idhini ya kibinadamu",
          "Kuweka mifano ya kuratibu matukio ya otomatiki kwenye seva"
        ]
      },
      enterprise: {
        automation: [
          "Kuboresha hifadhidata za zamani kuwa API safi na thabiti",
          "Kuweka mifumo thabiti ya idhini kulingana na majukumu ya mtumiaji",
          "Kuweka mifumo ya huduma ndogo (microservices) kwenye vyombo (containers)"
        ],
        rag: [
          "Kusawazisha rasilimali za wingu la faragha kwa usalama wa hali ya juu",
          "Kuweka sheria za kina za idhini ya ufikiaji kwenye kampuni",
          "Kuhakikisha utafutaji wa kisemantiki bila kuvuja kwa data ya PII"
        ],
        agents: [
          "Kujenga mifumo ya mawakala wa AI wanaoshirikiana kwa miradi mikubwa",
          "Kuingiza mifumo ya dharura ya kujaribu tena kiotomatiki inapofeli",
          "Kuanzisha mageti thabiti ya LLM yenye makubaliano ya kiwango cha huduma (SLA)"
        ]
      }
    },
    simDifficultyMap: {
      legacy_automation: "Mbio za Wiki 2 — Ugumu Mdogo",
      legacy_rag: "Awamu ya Wiki 3 — Ugumu wa Kati",
      legacy_agents: "Mzunguko wa Wiki 4 — Otomatiki ya Kimkakati",
      growing_automation: "Uwekaji wa Siku 5 — Rahisi Kubadilika",
      growing_rag: "Mbio za Wiki 2 — RAG yenye Kasi ya Juu",
      growing_agents: "Mabadiliko ya Wiki 4 — Suluhisho la AI Kamili",
      enterprise_automation: "Awamu ya Wiki 3 — Miundo Imara",
      enterprise_rag: "Mzunguko wa Wiki 4 — Uwiano wa Kampuni",
      enterprise_agents: "Wiki 6-8 — Suluhisho Maalum la DX kwa Makampuni"
    }
  },
  yo: {
    headerTagline: "Amọja lori Iyipada AI-DX",
    notionConnected: "Isopọ Notion Ti Wa lori Laini",
    localCache: "Ibbi ipamọ Portfolio Agbegbe",
    twinHub: "Ibudo Imọ ti Virtual",
    heroBadge: "Amọja lori Iyipada AI-DX",
    heroTitleLeading: "Gbigbega ",
    heroTitleUnderline: "iye iṣowo",
    heroTitleTrailing: " nipasẹ oye mnemba (AI) & iyipada kọnputa.",
    heroDesc: "Pẹlu diẹ sii ju ọdun 13 ti imọye sọ́tọ̀ọ̀tọ̀ abẹ́ ruju ti o so olori iṣowo pọ mọ miṣiri kọnputa ati IT, Mo nṣakoso awọn iṣẹ nla AI-DX. Gẹgẹbi ọmọ ile-iwe Sayansi Kọnputa ti o kẹkọ yege, oniwun iṣowo tẹlẹ, ati oludije si MBA lọwọlọwọ, Mo kọ awọn eto full-stack to lagbara ati igbero data lati mu ilọsiwaju imọ-ẹrọ to munadoko.",
    heroCtaPrimary: "Wo awọn Iṣẹ wa",
    heroCtaSecondary: "Bẹrẹ Ibaraẹnisọrọ",
    bioCardTag: "Kẹkọ CS & MBA",
    bioCardExp: "Ọdun 13+ Ibẹrẹ",
    bioCardStatus: "Amọja lori laini",
    bioCardDesc: "Ṣiṣepọ awọn ilana Akili Mnemba (AI) to ti ni ilọsiwaju pẹlu awọn ojuutu ile-iṣẹ nla lati yara isọdọtun eto.",
    simTitle: "Olufarawé Ilana AI-DX",
    simScaleLabel: "Iwọn Iṣowo",
    simLegacy: "Agbalagba",
    simGrowing: "Idagbasoke",
    simEnterprise: "Ile-iṣẹ Nla",
    simTargetLabel: "Ibi-afẹde Iyipada",
    simAutoSaaS: "SaaS Otomatiki",
    simSmartRAG: "RAG Olóye",
    simAgents: "Aṣoju AI",
    simEfficiency: "Agbara Imudara ti o fẹrẹ to",
    simSavedTime: "Saa ti a fipamọ fun oṣu kan",
    simRoadmapHeader: "Ilana Igbesẹ Taara:",
    simBadge: "Ọdun 13+ Imọ Meji",
    metric1Label: "Ọdun ti Iṣowo ati IT",
    metric1Desc: "Siso ipilẹ ti Sayansi Kọnputa pọ mọ oye iṣakoso ati MBA.",
    metric2Label: "Sychronized Portfolio",
    metric2Desc: "Awọn iṣẹ gidi ti a mu jade taara lati inu aaye iṣẹ Notion.",
    metric3Label: "Sustemu Iṣowo",
    metric3Desc: "Uṣakoso kikun ti kikọ oju-iwe ayelujara, ohun elo alagbeka ati awọn API ti ode oni.",
    metric4Label: "Awọn Agbegbe ti a Ṣatunṣe",
    metric4Desc: "Kíkọ́ ati fifi sii awọn irinṣẹ iṣakoso ni diẹ sii ju awọn agbegbe mẹwa lọ labẹ awọn ofin to muna.",
    galleryPreTitle: "Aṣayan iṣẹ to daraju",
    galleryTitle: "Uṣayẹwo Awọn Iṣẹ wa",
    gallerySearchPlaceholder: "Wa awọn imọ-ẹrọ, akole...",
    catAll: "Gbogbo rẹ",
    noProjectsFound: "Ko si awọn iṣẹ kankan ti a ri",
    noProjectsSub: "Gbiyanju lati yipada tabi faagun awọn ọrọ ti o n wa.",
    contactPreTitle: "Ijumọsọrọ Ilana",
    contactTitle: "Bẹrẹ Iṣẹ Tuntun",
    contactSub: "Ṣe o ṣetan lati kọ didan, rọrùn ati oju-iwe pataki? Fi ifiranṣẹ ranṣẹ si Budi ni ibi.",
    contactNameLabel: "Orukọ rẹ Kikun",
    contactEmailLabel: "Adirẹsi Imeeli",
    contactSubjectLabel: "Koko Ifiranṣẹ",
    contactMsgLabel: "Apejuwe Kukuru ti Iṣẹ rẹ",
    contactNamePlaceholder: "apẹrẹ: Jane Doe",
    contactEmailPlaceholder: "apẹrẹ: jane@domain.com",
    contactSubjectPlaceholder: "apẹrẹ: Ijumọsọrọ lori Iṣẹ rẹ",
    contactMsgPlaceholder: "Han gbangba awọn pataki tabi akoko ti o nireti...",
    contactBtnSend: "Tuma Drafa Ijumọsọrọ",
    contactBtnSending: "Ifiranṣẹ n lọ...",
    footerSpace: "Aaye Ṣiṣẹpọ ti Budi Prst.",
    footerCopy: "© 2026 Budi Prst. Gbogbo ẹtọ wa ni ipamọ.",
    footerDesc: "Ti a ṣe apẹrẹ pẹlu awọn ilana Nordic ati awọn lila Notion.",
    simRoadmaps: {
      legacy: {
        automation: [
          "Yiyipada awọn iwe data idiju si awọn apoti data didara",
          "Fifi eto idahun imeeli otomatiki nipasẹ Webhooks",
          "Mimu awọn iṣẹ afọwọṣe ojoojumọ wa sinu otomatiki"
        ],
        rag: [
          "Fifi iwe ile-iṣẹ sii sinu atọka eto (PDF), awọn akọsilẹ",
          "Kikọ apoti data ti o se aabo fun wiwa semanti",
          "Kikọ pẹpẹ ijiroro lati beere ibeere lori awọn iwe iṣowo"
        ],
        agents: [
          "Wiwa awọn aaye to n fa idaduro ninu iṣẹ",
          "Fifi sustemu middleware otomatiki sori seva",
          "Ṣiṣii aṣoju Gemini ominira lati mu ilọsiwaju iṣẹ daju"
        ]
      },
      growing: {
        automation: [
          "Ṣayẹwo bi asopọ sustemu API ati awọn eto ṣe n ṣiṣẹ pọ",
          "Mimu ilọsiwaju wa si eto isọdọkan data olumulo",
          "Kikọ eto iṣakoso webhook wakati gidi"
        ],
        rag: [
          "Siso awọn ikanni Slack, Drive, ati Notion pọ mọra ni aabo",
          "Fifi ibi ipamọ cache sori eto lati dinku iye owo tokeni",
          "Fifi apoti wiwa semanti sori oju-iwe dasibodi rẹ"
        ],
        agents: [
          "Ṣiṣe apẹrẹ sustemu aṣoju pupọ ti o le tun ara rẹ ṣe",
          "Kikọ paneli ukaguzi pẹlu ifọwọsi eniyan",
          "Mimu sustemu iseto iṣẹ otomatiki sori seva"
        ]
      },
      enterprise: {
        automation: [
          "Ṣiṣatunṣe apoti data agbalagba si API ti o mọ",
          "Fifi eto idanimọ to lagbara sori awọn ipo olumulo",
          "Fifi eto kekere (microservices) sori container"
        ],
        rag: [
          "Mimu data awọsanma pọ mọra ni aabo to gaju",
          "Fifi awọn ofin lile sori iraye si data ile-iṣẹ nla",
          "Gbigbe wiwa semanti ti o se aabo fun data PII"
        ],
        agents: [
          "Kikọ sustemu aṣoju pupọ ti o le ṣiṣẹ papọ fun ile-iṣẹ",
          "Ṣiṣeto eto dandan lati tun igbiyanju ṣe ti sustaining ba kuna",
          "Fifi ẹnu-bode LLM to lagbara pẹlu adehun iṣẹ (SLA)"
        ]
      }
    },
    simDifficultyMap: {
      legacy_automation: "Iṣẹ ti Wiki Meji — Ko nira",
      legacy_rag: "Ipele ti Wiki Mẹta — Agbedemeji",
      legacy_agents: "Ipele ti Wiki Mẹrin — Otomatiki Ilana",
      growing_automation: "Eto Ọjọ Marun — Rọrun lati Yipada",
      growing_rag: "Iṣẹ ti Wiki Meji — RAG to yara gidi",
      growing_agents: "Iyipada ti Wiki Mẹrin — Ojutu AI Kikun",
      enterprise_automation: "Ipele ti Wiki Mẹta — Sutemu to se fojusi",
      enterprise_rag: "Iyipada ti Wiki Mẹrin — Ibamu Ile-iṣẹ",
      enterprise_agents: "Nnkan bi Wiki 6 de 8 — Ojutu pataki fun Enterprise"
    }
  },
  zu: {
    headerTagline: "Uchwepheshe Wezinguquko ze-AI-DX",
    notionConnected: "Kuxhunywe ne-Notion Manje",
    localCache: "Inqolobane Yendawo Yephothifoliyo",
    twinHub: "Isizinda Solwazi Esibonakalayo",
    heroBadge: "Uchwepheshe Wezinguquko ze-AI-DX",
    heroTitleLeading: "Ukushayela ",
    heroTitleUnderline: "inani lebhizinisi",
    heroTitleTrailing: " ngokusebenzisa i-artificial intelligence nezinguquko zedijithali.",
    heroDesc: "Nginomlando weminyaka engaphezu kwengu-13 ehlanganisa ubuholi bebhizinisi nengqalasizinda eyisisekelo ye-IT, ngihola imizamo emikhulu ye-AI-DX. Ngineziqu ze-Computer Science, ngingusomabhizinisi wangaphambilini, futhi ngifundela i-MBA manje, ngakha izinhlelo ze-full-stack ezinamandla namasu edatha asebenzisa intuthuko yezobuchwepheshe ehambisana nesikhathi.",
    heroCtaPrimary: "Hlola Imisebenzi Yethu",
    heroCtaSecondary: "Qala Ukubonisana",
    bioCardTag: "Iziqu ze-CS & MBA",
    bioCardExp: "Yeminyaka engu-13+ Exp",
    bioCardStatus: "Uchwepheshe Ukhona",
    bioCardDesc: "Ukuvumelanisa izinhlelo ze-AI ezithuthukile nezixazululo zebhizinisi ezinkulu ukusheshisa ukuvuthwa kwenhlangano.",
    simTitle: "Isilingisi Sezicwangciso ze-AI-DX",
    simScaleLabel: "Isilinganiso Sebhizinisi",
    simLegacy: "Okudala",
    simGrowing: "Okukhulayo",
    simEnterprise: "Inkampani Enkulu",
    simTargetLabel: "Inhloso Yezinguquko",
    simAutoSaaS: "I-SaaS Ezihambelayo",
    simSmartRAG: "I-RAG Greb",
    simAgents: "Ama-Agent we-AI",
    simEfficiency: "Isilinganiso Sokuthuthuka Kwekusetshenzwa",
    simSavedTime: "Amahora Agciniwe Ngenyanga",
    simRoadmapHeader: "Inqubo Sezinyathelo Ezisheshayo:",
    simBadge: "Uchwepheshe Weminyaka engu-13+",
    metric1Label: "Iminyaka Yebhizinisi ne-IT",
    metric1Desc: "Ukuhlanganisa izisekelo ze-Computer Science, ubuholi bebhizinisi be-startup, namasu e-MBA.",
    metric2Label: "Ipothifoliyo Evumelanisiwe",
    metric2Desc: "Izimo zangempela zebhizinisi ezivuselelwa ngokuzenzakalelayo ezivela ku-Notion database.",
    metric3Label: "Amasistimu Afakiwe",
    metric3Desc: "Ukuphathwa okugcwele kokwakhiwa kwewebhu, amaselula nama-API anamuhla.",
    metric4Label: "Izifunda Ezilawulwayo",
    metric4Desc: "Ukwakha nokuthuthukisa amathuluzi okusebenza ezifundeni ezingaphezu kweziyishiye kugalari ngaphansi kwezinkambiso eziqinile.",
    galleryPreTitle: "Imisebenzi Ekhethiwe",
    galleryTitle: "Izifundo ze-Case Ezibonakalayo",
    gallerySearchPlaceholder: "Funa ubuchwepheshe, amalebula...",
    catAll: "Kokonke",
    noProjectsFound: "Alikho iphrojekthi elifunyenweyo",
    noProjectsSub: "Zama ukushintsha amagama okufuna noma amasefa wakho.",
    contactPreTitle: "Ukubonisana Ngesicwangciso",
    contactTitle: "Qala Iphrojekthi Entsha",
    contactSub: "Ufuna ukwakha idashibhodi eyenziwe ngezifiso noma isizinda sabasebenzisi sezinga eliphezulu? Shiya umlayezo ku-Budi lapha.",
    contactNameLabel: "Amagama Wakho Aphelele",
    contactEmailLabel: "Ikheli Le-imeyili",
    contactSubjectLabel: "Isihloko Somlayezo",
    contactMsgLabel: "Incazelo Encamane Yephrojekthi",
    contactNamePlaceholder: "isb. Jane Doe",
    contactEmailPlaceholder: "isb. jane@domain.com",
    contactSubjectPlaceholder: "isb. Ukubonisana Ngedashibhodi",
    contactMsgPlaceholder: "Bhala imininingwane yephrojekthi noma idethi oyilindele...",
    contactBtnSend: "Thumela Umlayezo Wakho",
    contactBtnSending: "Umlayezo uyathunyelwa...",
    footerSpace: "Indawo Yokudala KaBudi Prst.",
    footerCopy: "© 2026 Budi Prst. Wonke amalungelo agrikiwe.",
    footerDesc: "Idizayinelwe ngezindlela zesimanje ze-Nordic kanye nezinhlelo ze-Notion.",
    simRoadmaps: {
      legacy: {
        automation: [
          "Ukuguqula amaspredishithi ayinkimbinkimbi abe datha enhle",
          "Ukusungula izinhlelo zokuphendula i-imeyili ngokuzenzakalelayo ngama-Webhooks",
          "Ukwenza imisebenzi yezandla yansuku zonke izihambele ngokwayo"
        ],
        rag: [
          "Ukuhlanganisa amafayela enkampani (PDF), amanothi namathempulethi",
          "Ukumisa indawo yedatha ye-semantic search evikelekile",
          "Ukwakha inkundla yokuxoxa ubuze imibuzo emayelana nemibhalo yebhizinisi"
        ],
        agents: [
          "Ukuhlonza izindawo ngezinkinga zokusebenza",
          "Ukubeka amasistimu we-middleware yezandla ohlangothini lweseva",
          "Ukuvula ama-agent azihambelayo we-Gemini ukwandisa ukusebenza"
        ]
      },
      growing: {
        automation: [
          "Ukuhlola ukuxhumana kwamasistimu we-API nezinhlelo",
          "Ukuthuthukisa izinhlelo zokuvumelanisa idatha yabasebenzisi",
          "Ukumisa izilawuli ze-webhook zesikhathi sangempela"
        ],
        rag: [
          "Ukuvumelanisa ngendlela evikelekile iziteshi ze-Slack, Drive kanye ne-Notion",
          "Ukubeka inkumbulo ye-cache ukunciphisa izindleko zama-token",
          "Ukufaka ibhokisi lokusesha elivamile kudeshibhodi yakho"
        ],
        agents: [
          "Ukwenza amapulani ama-agent azilungisayo uma ehluleka",
          "Ukwakha iphaneli yocwaningo ngokugunyazwa ngabantu",
          "Ukubeka amasistimu ezandla ohlangothini lweseva"
        ]
      },
      enterprise: {
        automation: [
          "Ukuthuthukisa i datha yakudala ibe nama-API acacile navikelekile",
          "Ukubeka izinhlobo zeziqinisekiso zabasebenzisi ngezindima",
          "Ukufaka ukuhlinzeka kwamasistimu amancane amancane kuma-containers"
        ],
        rag: [
          "Ukuvumelanisa izinsiza zamafu eziyimfihlo ngezindlela zokuphepha eziphezulu",
          "Ukubeka imithetho eningilizayo yekhwalithi yofinyelelo enkampanini",
          "Ukuletha ukusesha ngaphandle kokuvuza idatha ye-PII"
        ],
        agents: [
          "Ukwakha amasistimu we-multi-agent asebenzisana enkampanini enkulu",
          "Fakela amasistimu anqumayo okuzama futhi ngokuzenzakalelayo uma idatha yehluleka",
          "Ukusungula ama-LLM gateways anamandla nezivumelwano ze-service (SLA)"
        ]
      }
    },
    simDifficultyMap: {
      legacy_automation: "Umkhankaso Wezinsuku eziyi-14 — Kulula kakhulu",
      legacy_rag: "Isigaba Sezinsuku eziyi-21 — Kulula ngesilinganiso",
      legacy_agents: "Isikhathi Sezinsuku eziyi-28 — Isu Elihle kakhulu",
      growing_automation: "Isikhathi Sezinsuku ezi-5 — Kulula ukushintsha",
      growing_rag: "Umkhankaso Wezinsuku eziyi-14 — I-RAG Enesivinini Esikhulu",
      growing_agents: "Isigaba Sezinsuku eziyi-28 — Isixazululo Se-AI Esigcwele",
      enterprise_automation: "Isigaba Sezinsuku eziyi-21 — Ingqalasizinda Eqinile",
      enterprise_rag: "Isikhathi Sezinsuku eziyi-28 — Isivumelwano Senkampani",
      enterprise_agents: "Wiki ezi-6 kuya kwezi-8 — Uhlelo Olukhethekile Lwezinkampani Ezinkulu"
    }
  }
};

export const CATEGORY_TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    "All": "All",
    "Frontend Development": "Frontend Development",
    "Backend Development": "Backend Development",
    "Fullstack Development": "Fullstack Development",
    "RESTful API Development": "RESTful API Development",
    "New Feature Implementation": "New Feature Implementation",
    "Operational Improvement": "Operational Improvement",
    "Quality Assurance": "Quality Assurance",
    "360 AV Shooting": "360 AV Shooting",
    "Teaching": "Teaching",
    "Bug Fixing": "Bug Fixing",
    "Uncategorized": "Uncategorized"
  },
  ja: {
    "All": "すべて",
    "Frontend Development": "フロントエンド開発",
    "Backend Development": "バックエンド開発",
    "Fullstack Development": "フルスタック開発",
    "RESTful API Development": "RESTful API開発",
    "New Feature Implementation": "新機能実装",
    "Operational Improvement": "業務改善効率化",
    "Quality Assurance": "品質保証 & テスト",
    "360 AV Shooting": "360度全天球撮影",
    "Teaching": "技術指導教育",
    "Bug Fixing": "バグ修正",
    "Uncategorized": "未分類"
  },
  fr: {
    "All": "Tous",
    "Frontend Development": "Développement Frontend",
    "Backend Development": "Développement Backend",
    "Fullstack Development": "Développement Fullstack",
    "RESTful API Development": "Développement d'API RESTful",
    "New Feature Implementation": "Nouvelles Fonctionnalités",
    "Operational Improvement": "Amélioration Opérationnelle",
    "Quality Assurance": "Assurance Qualité",
    "360 AV Shooting": "Tournage Vidéo 360 AV",
    "Teaching": "Enseignement & Formation",
    "Bug Fixing": "Correction de Bugs",
    "Uncategorized": "Non Catégorisé"
  },
  es: {
    "All": "Todos",
    "Frontend Development": "Desarrollo Frontend",
    "Backend Development": "Desarrollo Backend",
    "Fullstack Development": "Desarrollo Fullstack",
    "RESTful API Development": "Desarrollo de API RESTful",
    "New Feature Implementation": "Implementación de Funcionalidades",
    "Operational Improvement": "Mejora Operativa",
    "Quality Assurance": "Control de Calidad",
    "360 AV Shooting": "Grabación de Video 360 AV",
    "Teaching": "Enseñanza",
    "Bug Fixing": "Resolución de Errores",
    "Uncategorized": "Sin Categorizar"
  },
  de: {
    "All": "Alle",
    "Frontend Development": "Frontend-Entwicklung",
    "Backend Development": "Backend-Entwicklung",
    "Fullstack Development": "Fullstack-Entwicklung",
    "RESTful API Development": "RESTful-API-Entwicklung",
    "New Feature Implementation": "Neue Feature-Implementierung",
    "Operational Improvement": "Prozessoptimierung",
    "Quality Assurance": "Qualitätssicherung",
    "360 AV Shooting": "360-Grad-AV-Aufnahmen",
    "Teaching": "Schulung & Lehre",
    "Bug Fixing": "Fehlerbehebung",
    "Uncategorized": "Nicht Kategorisiert"
  },
  id: {
    "All": "Semua",
    "Frontend Development": "Pengembangan Frontend",
    "Backend Development": "Pengembangan Backend",
    "Fullstack Development": "Pengembangan Fullstack",
    "RESTful API Development": "Pengembangan API RESTful",
    "New Feature Implementation": "Implementasi Fitur Baru",
    "Operational Improvement": "Peningkatan Operasional",
    "Quality Assurance": "Pencegahan Kualitas / QA",
    "360 AV Shooting": "Suting Video 360 AV",
    "Teaching": "Pendidikan / Pengajaran",
    "Bug Fixing": "Perbaikan Bug",
    "Uncategorized": "Tanpa Kategori"
  },
  sw: {
    "All": "Yote",
    "Frontend Development": "Ujenzi wa Frontend",
    "Backend Development": "Ujenzi wa Backend",
    "Fullstack Development": "Ujenzi wa Fullstack",
    "RESTful API Development": "Ujenzi wa API za RESTful",
    "New Feature Implementation": "Utekelezaji wa Vipengele Mapya",
    "Operational Improvement": "Uboreshaji wa Uendeshaji",
    "Quality Assurance": "Uthibitisho wa Ubora",
    "360 AV Shooting": "Ufyatuaji wa Video ya 360",
    "Teaching": "Kufundisha",
    "Bug Fixing": "Kurekebisha Hitilafu",
    "Uncategorized": "Bila Kategoria"
  },
  yo: {
    "All": "Gbogbo rẹ",
    "Frontend Development": "Idagbasoke Frontend",
    "Backend Development": "Idagbasoke Backend",
    "Fullstack Development": "Idagbasoke Fullstack",
    "RESTful API Development": "Idagbasoke API RESTful",
    "New Feature Implementation": "Fifi Awọn Ohun Tuntun Sinu Eto",
    "Operational Improvement": "Imudara Iṣẹ",
    "Quality Assurance": "Idaniloju Didara",
    "360 AV Shooting": "Yiya Fidio 360 AV",
    "Teaching": "Kikọni ni Imọ",
    "Bug Fixing": "Atunṣe Kokoro Eto",
    "Uncategorized": "Laisi Ẹka"
  },
  zu: {
    "All": "Kokonke",
    "Frontend Development": "Ukwakhiwa Kwe-Frontend",
    "Backend Development": "Ukwakhiwa Kwe-Backend",
    "Fullstack Development": "Ukwakhiwa Kwe-Fullstack",
    "RESTful API Development": "Ukwakhiwa Kwe-RESTful API",
    "New Feature Implementation": "Ukufeza Izici Ezintsha",
    "Operational Improvement": "Ukuthuthukisa Ukusebenza",
    "Quality Assurance": "Ukukhonjiswa Kwekhwalithi",
    "360 AV Shooting": "Ukudutshulwa Kwevidiyo engu-360 AV",
    "Teaching": "Ukufundisa",
    "Bug Fixing": "Ukulungisa Amaphutha",
    "Uncategorized": "Ngaphandle Kwesigaba"
  }
};

