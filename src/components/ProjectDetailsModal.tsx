import { Project } from "../types";
import { X, ExternalLink, Github, Calendar, Briefcase, Cpu, Award } from "lucide-react";
import { useEffect } from "react";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
  activeLang?: string;
}

const MODAL_LOCALES: Record<string, {
  visualCaseStudy: string;
  executiveNarrative: string;
  creativeMockups: string;
  projectOutcome: string;
  projectSpecs: string;
  shokumurirekisho: string;
  projectName: string;
  period: string;
  teamSize: string;
  clientCompany: string;
  role: string;
  coreDuties: string;
  techEnv: string;
  launchLive: string;
  viewRepo: string;
  unassigned: string;
  teamSizeOne: string;
}> = {
  en: {
    visualCaseStudy: "Visual Case Study",
    executiveNarrative: "Executive Narrative",
    creativeMockups: "Creative Mockups & Proofs",
    projectOutcome: "Project Outcome",
    projectSpecs: "Project Specs",
    shokumurirekisho: "職務経歴仕様 (Japan Standard)",
    projectName: "【案件名】Project Name",
    period: "【期間】Period",
    teamSize: "【規模】Team Size",
    clientCompany: "【所属 / 顧客】Client / Company",
    role: "【役割】Position / Role",
    coreDuties: "【担当業務】Core Duties",
    techEnv: "【開発環境】Tech Environment",
    launchLive: "Launch Live Artifact",
    viewRepo: "View Repository Source",
    unassigned: "Autonomous Study",
    teamSizeOne: "1 Member"
  },
  ja: {
    visualCaseStudy: "ビジュアルケーススタディ",
    executiveNarrative: "プロジェクト詳細概要 / 成果",
    creativeMockups: "クリエイティブモックアップ & 実証",
    projectOutcome: "プロジェクト成果・達成事項",
    projectSpecs: "職務経歴仕様",
    shokumurirekisho: "日本標準プロジェクトスペック",
    projectName: "【案件名】",
    period: "【期間】",
    teamSize: "【規模】",
    clientCompany: "【所属 / 顧客】",
    role: "【役割】",
    coreDuties: "【担当業務】",
    techEnv: "【開発環境】",
    launchLive: "成果物をライブ起動",
    viewRepo: "レポジトリソースを閲覧",
    unassigned: "自主制作",
    teamSizeOne: "1名"
  },
  fr: {
    visualCaseStudy: "Étude de Cas Visuelle",
    executiveNarrative: "Récit Exécutif",
    creativeMockups: "Mockups Créatifs & Preuves",
    projectOutcome: "Résultat du Projet",
    projectSpecs: "Spécifications du Projet",
    shokumurirekisho: "Spécifications standard japonaises",
    projectName: "【Nom du Projet】Project Name",
    period: "【Période】Period",
    teamSize: "【Taille de l'équipe】Team Size",
    clientCompany: "【Client / Entreprise】Client / Company",
    role: "【Rôle / Poste】Position / Role",
    coreDuties: "【Tâches Principales】Core Duties",
    techEnv: "【Environnement Tech】Tech Environment",
    launchLive: "Lancer le Projet",
    viewRepo: "Voir le code source",
    unassigned: "Projet Autonome",
    teamSizeOne: "1 Membre"
  },
  es: {
    visualCaseStudy: "Caso de Estudio Visual",
    executiveNarrative: "Narrativa Ejecutiva",
    creativeMockups: "Maquetas Creativas y Pruebas",
    projectOutcome: "Resultado del Proyecto",
    projectSpecs: "Especificaciones",
    shokumurirekisho: "Especificación estándar de Japón",
    projectName: "【Nombre del Proyecto】Project Name",
    period: "【Período】Period",
    teamSize: "【Equipo】Team Size",
    clientCompany: "【Cliente / Empresa】Client / Company",
    role: "【Rol / Cargo】Position / Role",
    coreDuties: "【Tareas Principales】Core Duties",
    techEnv: "【Entorno Tecnológico】Tech Environment",
    launchLive: "Lanzar Proyecto",
    viewRepo: "Ver Código Fuente",
    unassigned: "Proyecto Autónomo",
    teamSizeOne: "1 Miembro"
  },
  de: {
    visualCaseStudy: "Visuelle Fallstudie",
    executiveNarrative: "Projektbeschreibung / Ergebnisse",
    creativeMockups: "Kreative Entwürfe & Belege",
    projectOutcome: "Projektergebnis",
    projectSpecs: "Projekt-Spezifikationen",
    shokumurirekisho: "Japanischer Standard-Steckbrief",
    projectName: "【Projektname】Project Name",
    period: "【Zeitraum】Period",
    teamSize: "【Teamgröße】Team Size",
    clientCompany: "【Auftraggeber】Client / Company",
    role: "【Rolle】Position / Role",
    coreDuties: "【Hauptaufgaben】Core Duties",
    techEnv: "【Technologie-Stack】Tech Environment",
    launchLive: "Live-Projekt starten",
    viewRepo: "Quellcode anzeigen",
    unassigned: "Eigenes Projekt",
    teamSizeOne: "1 Person"
  },
  id: {
    visualCaseStudy: "Studi Kasus Visual",
    executiveNarrative: "Naratif Eksekutif",
    creativeMockups: "Tata Letak Kreatif & Bukti",
    projectOutcome: "Hasil Akhir Proyek",
    projectSpecs: "Spesifikasi Proyek",
    shokumurirekisho: "Format Standar Karir Jepang",
    projectName: "【Nama Proyek】Project Name",
    period: "【Periode】Period",
    teamSize: "【Ukuran Tim】Team Size",
    clientCompany: "【Perusahaan / Klien】Client / Company",
    role: "【Peran / Posisi】Position / Role",
    coreDuties: "【Tanggung Jawab】Core Duties",
    techEnv: "【Lingkungan Teknis】Tech Environment",
    launchLive: "Luncurkan Hasil Live",
    viewRepo: "Lihat Kode Sumber",
    unassigned: "Proyek Mandiri",
    teamSizeOne: "1 Anggota"
  },
  sw: {
    visualCaseStudy: "Uchunguzi wa Miradi",
    executiveNarrative: "Maelezo ya Kina ya Mradi",
    creativeMockups: "Mifano ya Ubunifu & Ushahidi",
    projectOutcome: "Matokeo ya Mradi",
    projectSpecs: "Vipimo vya Mradi",
    shokumurirekisho: "Kiwango cha Sifa cha Kijapani",
    projectName: "【Jina la Mradi】Project Name",
    period: "【Kipindi】Period",
    teamSize: "【Ukubwa wa Timu】Team Size",
    clientCompany: "【Mteja / Kampuni】Client / Company",
    role: "【Nafasi / Jukumu】Position / Role",
    coreDuties: "【Majukumu Makubwa】Core Duties",
    techEnv: "【Mazingira ya Teknolojia】Tech Environment",
    launchLive: "Zindua Mradi Moja kwa Moja",
    viewRepo: "Angalia Chanzo cha Kanuni",
    unassigned: "Mradi wa Kujitegemea",
    teamSizeOne: "Mwanachama 1"
  },
  yo: {
    visualCaseStudy: "Uṣayẹwo Awọn Iṣẹ wa",
    executiveNarrative: "Apejuwe Kikun",
    creativeMockups: "Awọn Àwòrán & Idanwo",
    projectOutcome: "Atunṣe Iṣẹ",
    projectSpecs: "Awọn Pataki Iṣẹ",
    shokumurirekisho: "Kiwango Sifa ti Kijapani",
    projectName: "【Orukọ Iṣẹ】Project Name",
    period: "【Koko Akoko】Period",
    teamSize: "【Iwọn Ẹgbẹ】Team Size",
    clientCompany: "【Onibara / Ile-iṣẹ】Client / Company",
    role: "【Ipo rẹ】Position / Role",
    coreDuties: "【Iṣẹ rẹ gangan】Core Duties",
    techEnv: "【Afikun Imọ-ẹrọ】Tech Environment",
    launchLive: "Wo Iṣẹ naa ni Laini",
    viewRepo: "Wo Code rẹ",
    unassigned: "Iṣẹ Ominira",
    teamSizeOne: "Eeyan 1"
  },
  zu: {
    visualCaseStudy: "Izifundo ze-Case Ezibonakalayo",
    executiveNarrative: "Incazelo Yesicwangciso",
    creativeMockups: "Maqhinga Nezinkomba",
    projectOutcome: "Matokeo Wephrojekthi",
    projectSpecs: "Imininingwane Yephrojekthi",
    shokumurirekisho: "Japan Standard Shokumurirekisho",
    projectName: "【Igama Lephrojekthi】Project Name",
    period: "【Isikhathi】Period",
    teamSize: "【Ukubwa WeThimba】Team Size",
    clientCompany: "【Mteja / Inkampani】Client / Company",
    role: "【Indima Yakho】Position / Role",
    coreDuties: "【Core Duties】Core Duties",
    techEnv: "【Tech Environment】Tech Environment",
    launchLive: "Zindua Iphrojekthi",
    viewRepo: "Bona Ikhodi Yomthombo",
    unassigned: "Iphrojekthi Ezimele",
    teamSizeOne: "Ilungu elingu-1"
  }
};

export default function ProjectDetailsModal({ project, onClose, activeLang = "en" }: ProjectDetailsModalProps) {
  const lm = MODAL_LOCALES[activeLang] || MODAL_LOCALES.en;
  // Lock body scroll on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Helper to render structured/markdown-like contents elegantly
  const renderContentBlocks = (text: string) => {
    return text.split('\n\n').map((p, idx) => {
      const trimmed = p.trim();
      if (!trimmed) return null;

      // Check if subtitle
      if (trimmed.startsWith('###')) {
        return (
          <h4 key={idx} className="font-sans font-bold text-lg text-gray-900 mt-6 mb-2">
            {trimmed.replace(/^###\s*/, '')}
          </h4>
        );
      }

      // Check if list items
      if (trimmed.includes('\n*') || trimmed.includes('\n-') || trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const items = trimmed.split('\n').map(item => item.replace(/^[\*\-]\s*/, '').trim());
        return (
          <ul key={idx} className="list-disc pl-5 my-3 space-y-1.5 text-sm text-gray-650 font-sans leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        );
      }

      // Standard paragraph
      return (
        <p key={idx} className="text-sm text-gray-600 font-sans leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      {/* Background click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        id="case-study-modal-container"
        className="bg-white rounded-2xl w-full max-w-4xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#B3B3B3] font-bold">
              {lm.visualCaseStudy}
            </span>
            <h3 className="font-sans font-semibold text-gray-900 leading-none mt-1">
              {project.category}
            </h3>
          </div>
          <button 
            id="btn-close-case-study"
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-950 hover:bg-gray-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable area */}
        <div className="overflow-y-auto flex-1">
          {/* Main Hero Shot */}
          <div className="relative h-64 sm:h-96 w-full bg-neutral-900">
            <img 
              src={project.image} 
              alt={project.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight">
                {project.title}
              </h2>
              <p className="font-sans text-white/80 text-sm max-w-2xl mt-2 font-medium">
                {project.description}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left/Middle Column: Case study content */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="font-sans font-extrabold text-xl text-gray-905 border-b border-gray-100 pb-2">
                {lm.executiveNarrative}
              </h3>
              
              <div className="pr-2">
                {renderContentBlocks(project.content)}
              </div>

              {/* Gallery elements */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="pt-6">
                  <h4 className="font-sans font-bold text-sm text-gray-400 uppercase tracking-wider mb-3">
                    {lm.creativeMockups}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((imgUrl, i) => (
                      <div key={i} className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                        <img 
                          src={imgUrl} 
                          alt={`Gallery preview ${i + 1}`} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Case study specs metadata */}
            <div className="space-y-6">
              {/* Achievement Box */}
              {project.achievement && (
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold font-mono text-xs uppercase tracking-wide mb-1">
                    <Award size={14} className="text-emerald-600" />
                    <span>{lm.projectOutcome}</span>
                  </div>
                  <p className="font-sans font-medium text-sm text-emerald-950 leading-snug">
                    {project.achievement}
                  </p>
                </div>
              )}

              {/* Scope details (職務経歴書仕様 alignment) */}
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100 space-y-4">
                <div className="border-b border-gray-200 pb-2">
                  <h4 className="font-sans font-bold text-gray-900 text-sm">
                    {lm.projectSpecs}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-sans tracking-wide">{lm.shokumurirekisho}</p>
                </div>
                
                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <p className="text-[9px] font-mono text-gray-400 uppercase font-bold leading-none mb-1">{lm.projectName}</p>
                    <p className="text-gray-900 font-semibold leading-snug">{project.projectName || project.title}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[9px] font-mono text-gray-400 uppercase font-bold leading-none mb-1">{lm.period}</p>
                      <p className="text-gray-900 font-semibold">{project.period || project.year}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-gray-400 uppercase font-bold leading-none mb-1">{lm.teamSize}</p>
                      <p className="text-gray-950 font-semibold truncate">{project.teamSize === "1名" || !project.teamSize ? lm.teamSizeOne : project.teamSize}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[9px] font-mono text-gray-400 uppercase font-bold leading-none mb-1">{lm.clientCompany}</p>
                    <p className="text-gray-900 font-semibold leading-tight">{project.company || project.client || lm.unassigned}</p>
                  </div>

                  {project.role && (
                    <div>
                      <p className="text-[9px] font-mono text-gray-400 uppercase font-bold leading-none mb-1">{lm.role}</p>
                      <p className="text-gray-900 font-semibold leading-tight">{project.role}</p>
                    </div>
                  )}

                  {project.responsibilities && project.responsibilities.length > 0 && (
                    <div>
                      <p className="text-[9px] font-mono text-gray-400 uppercase font-bold leading-none mb-1.5">{lm.coreDuties}</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-gray-750 leading-normal text-[11px]">
                        {project.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="text-[9px] font-mono text-gray-400 uppercase font-bold leading-none mb-1.5">{lm.techEnv}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(project.environment || project.techStack).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-gray-150 rounded text-[10px] text-gray-650 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions/Outbounds */}
              <div className="flex flex-col gap-2 pt-2">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-neutral-900 text-white font-sans text-xs font-semibold py-3 px-4 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{lm.launchLive}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 font-sans text-xs font-semibold py-3 px-4 rounded-lg hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Github size={14} />
                    <span>{lm.viewRepo}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
