import React, { useState, useEffect } from "react";
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Database,
  Search, 
  Layers, 
  Globe, 
  FolderOpen, 
  Mail, 
  User, 
  Sparkles, 
  ArrowRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Unlock,
  Lock,
  Megaphone,
  Cpu,
  GraduationCap,
  Briefcase,
  TrendingUp
} from "lucide-react";
import { Project } from "./types";
import { DEFAULT_PROJECTS } from "./data";
import ProjectDetailsModal from "./components/ProjectDetailsModal";
import AIChatBubble from "./components/AIChatBubble";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUsingNotion, setIsUsingNotion] = useState(false);
  
  // Announcements broadcast state
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState("");

  // Simple scroll parallax state
  const [scrollY, setScrollY] = useState(0);

  // Fetch the master dynamic feed on mount
  const refreshPortfolioData = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.projects) {
          setProjects(data.projects);
          setIsUsingNotion(!!data.notionConnected);
        }
      }
    } catch (err) {
      console.error("Mount portfolio mapping sync failed:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/admin/announcements");
      if (res.ok) {
        setAnnouncements(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    refreshPortfolioData();
    fetchAnnouncements();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      setFormStatus('error');
      setFormFeedback("Name, email, and description fields are strictly required.");
      return;
    }

    setFormStatus('sending');
    setFormFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          subject: formSubject,
          message: formMessage
        })
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormFeedback(data.message || "Thank you! Budi will reach back shortly.");
        // Clear forms
        setFormName("");
        setFormEmail("");
        setFormSubject("");
        setFormMessage("");
      } else {
        setFormStatus('error');
        setFormFeedback(data.error || "The routing engine experienced a delay. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setFormStatus('error');
      setFormFeedback("A communication anomaly occurred. Verify server state.");
    }
  };

  // Compute categories
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  // Filtering projects
  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
                          p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] selection:bg-neutral-900 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Dynamic News Alert / Announcements ticker */}
      {announcements.length > 0 && (
        <div id="announcement-bar" className="bg-[#121417] text-white text-xs py-2.5 px-6 border-b border-[#2d3139] relative z-40 flex items-center justify-center gap-2 font-sans tracking-wide">
          <Megaphone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="font-semibold text-purple-400 font-mono uppercase tracking-widest text-[9px] shrink-0">Broadcast:</span>
          <span className="font-medium text-gray-200 truncate">{announcements[0].content}</span>
          <span className="text-[9px] font-mono text-gray-500 hidden sm:inline shrink-0 ml-1">
            ({new Date(announcements[0].timestamp).toLocaleDateString()})
          </span>
        </div>
      )}

      {/* Absolute Geometric Floating Background Grids for Parallax Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Soft abstract graphic background - highly optimized vector elements */}
        <div 
          className="absolute top-20 right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-neutral-200/40 to-neutral-100/20 blur-3xl transition-transform duration-75"
          style={{ transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.02}deg)` }}
        />
        <div 
          className="absolute top-[800px] left-[-15%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-neutral-200/30 to-amber-100/15 blur-2xl transition-transform duration-75"
          style={{ transform: `translateY(${scrollY * 0.22}px) translateZ(0)` }}
        />
        <div 
          className="absolute top-10 left-[10%] w-full max-w-[1200px] h-[1000px] border-x border-[#f1f1f1] opacity-[0.8] mx-auto hidden md:flex items-start justify-between"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        >
          <div className="w-px h-full bg-[#f1f1f1]" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
          <div className="w-px h-full bg-[#f1f1f1]" style={{ transform: `translateY(${scrollY * 0.25}px)` }} />
          <div className="w-px h-full bg-[#f1f1f1]" style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
        </div>
      </div>

      {/* Floating Header */}
      <header className="sticky top-0 z-30 bg-[#fafafa]/80 backdrop-blur-md border-b border-[#f1f1f1] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-sans font-black text-lg tracking-widest text-neutral-900 bg-neutral-900 text-white px-2.5 py-1 rounded-lg">
              B.P
            </span>
            <div className="hidden sm:block">
              <span className="font-sans font-bold text-sm tracking-tight text-neutral-900 block leading-none">Budi Prst</span>
              <span className="font-mono text-[9px] text-gray-400 tracking-wider block mt-1 uppercase">AI-DX Transformation Specialist</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#f3f3f3] hover:bg-neutral-200 rounded-full text-[11px] font-medium font-mono text-gray-700 transition-colors cursor-pointer">
              <span className={`w-1.5 h-1.5 rounded-full ${isUsingNotion ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span>{isUsingNotion ? "Notion Live Connected" : "Local Portfolio Cache"}</span>
            </div>

            <button
              id="header-btn-toggle-owner-portal"
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-neutral-50 tracking-tight font-sans text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Lock size={13} className="text-gray-405 shrink-0" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Landing Section with Clean Parallax Visual depth */}
      <section className="relative z-10 px-6 pt-16 pb-24 sm:pt-24 sm:pb-36 max-w-7xl mx-auto flex flex-col items-start">
        <div 
          className="max-w-3xl transform transition-transform duration-75 ease-out select-none"
          style={{ transform: `translateY(${scrollY * -0.12}px)` }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg text-xs font-semibold text-gray-700 border border-neutral-250 mb-6 font-sans">
            <Sparkles size={13} className="text-amber-500" />
            <span>AI-DX Transformation Specialist</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.08] mb-6">
            Driving <span className="underline decoration-neutral-300 decoration-wavy underline-offset-8">business value</span> through artificial intelligence & digital transformation.
          </h1>

          <p className="font-sans text-base sm:text-lg text-gray-550 leading-relaxed max-w-2xl font-normal mb-8">
            With 13+ years of dual-domain expertise bridging business leadership and core IT infrastructure, I lead high-impact AI-DX initiatives. As a Computer Science graduate, former business owner, and current MBA candidate, I engineer dynamic full-stack systems and data strategies that capitalize on complex technological developments.
          </p>

          <div className="flex flex-wrap gap-3">
            <a 
              href="#case-studies-section" 
              className="px-6 py-3.5 bg-neutral-900 text-white font-sans text-sm font-semibold rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Visual Case Studies</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact-section" 
              className="px-6 py-3.5 bg-white border border-gray-200 text-neutral-900 font-sans text-sm font-semibold rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <span>Initialize Consultation</span>
            </a>
          </div>
        </div>

        {/* Elegant Parallax Dual-Card Stack representing Budi's Premium AI-DX Profile & Dual Competence */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[500px] hidden lg:block pointer-events-none select-none"
          style={{ transform: `translateY(${-50 + scrollY * 0.05}px)` }}
        >
          {/* Base Card 1: Executive portrait mockup */}
          <div 
            className="absolute inset-0 bg-white border border-neutral-200/80 shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-75"
            style={{ transform: `rotate(1deg) translateY(${scrollY * 0.02}px)` }}
          >
            <div className="relative h-[320px] bg-neutral-100 overflow-hidden">
              <img 
                src="/src/assets/images/budi_profile_portrait_1781328990996.jpg" 
                alt="Budi Prasetyo - AI-DX Transformation Specialist" 
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-750"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 text-white font-mono text-[9px] uppercase font-bold px-2 py-1 rounded">
                  <GraduationCap size={10} className="text-amber-400" />
                  CS Grad & MBA
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-500/95 text-white font-mono text-[9px] uppercase font-bold px-2 py-1 rounded">
                  <Briefcase size={9} />
                  13+ Yrs Exp
                </span>
              </div>
              <div className="absolute bottom-4 right-4 animate-bounce">
                <span className="bg-emerald-500 text-white font-mono text-[8px] uppercase tracking-wider px-2 py-1 rounded font-extrabold flex items-center gap-1 shadow-md">
                  <span className="w-1 to-1.5 h-1.5 rounded-full bg-white bg-opacity-95" />
                  Expert Active
                </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-sans font-extrabold text-[#111317] text-lg tracking-tight">Budi Prasetyo</h4>
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">AI-DX Transformation Partner</p>
                <p className="font-sans text-xs text-gray-550 leading-relaxed mt-2">
                  Harmonizing advanced Artificial Intelligence workflows with scalable enterprise solutions to accelerate organizational maturity.
                </p>
              </div>
            </div>
          </div>

          {/* Foreground Card 2: Floating Strategy Telemetry & Executive Scorecard */}
          <div 
            className="absolute left-[-45px] bottom-[-25px] w-[270px] bg-[#121417]/95 backdrop-blur-md border border-[#2d3139] shadow-2xl rounded-2xl p-4 transition-all duration-75 text-white"
            style={{ transform: `rotate(-3deg) translateY(${scrollY * -0.08}px)` }}
          >
            <div className="flex items-center justify-between border-b border-[#2d3139] pb-2.5 mb-3">
              <span className="font-mono text-[9px] uppercase text-[#a0aab4] font-bold tracking-widest flex items-center gap-1">
                <Cpu size={11} className="text-amber-400" />
                DX Execution Mapping
              </span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            <div className="space-y-2.5 font-sans">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-medium text-gray-300">
                  <span>Strategy & Venture Leadership</span>
                  <span className="font-mono font-bold text-emerald-400">98% Match</span>
                </div>
                <div className="h-1.5 bg-[#1e2229] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[98%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-medium text-gray-300">
                  <span>Computer Science Core IT</span>
                  <span className="font-mono font-bold text-sky-400">100% Core</span>
                </div>
                <div className="h-1.5 bg-[#1e2229] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-sky-300 w-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-medium text-gray-300">
                  <span>AI Workflows & Integration</span>
                  <span className="font-mono font-bold text-amber-400">Deployed</span>
                </div>
                <div className="h-1.5 bg-[#1e2229] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 w-[95%]" />
                </div>
              </div>
            </div>

            <div className="mt-4 p-2 px-3 bg-[#1a1d23] border border-[#2d3139] rounded-lg">
              <div className="flex justify-between items-center text-[9px] font-mono text-gray-400">
                <span>Notion Pipeline Status:</span>
                <span className="text-emerald-400">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience / Micro Metrics Showcase Grid */}
      <section className="bg-white border-y border-[#f1f1f1] py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1.5">
            <p className="font-mono text-[10px] text-gray-450 uppercase tracking-widest font-bold">Years of Business & IT</p>
            <p className="font-sans text-3xl sm:text-4xl font-black text-neutral-950">13+</p>
            <p className="font-sans text-xs text-gray-550 leading-relaxed">Bridging Computer Science foundations, venture startup leadership, and MBA-level strategy.</p>
          </div>
          <div className="space-y-1.5">
            <p className="font-mono text-[10px] text-gray-450 uppercase tracking-widest font-bold">Projects Synced</p>
            <p className="font-sans text-3xl sm:text-4xl font-black text-neutral-950">{projects.length}</p>
            <p className="font-sans text-xs text-gray-550 leading-relaxed">Dynamic real cases fetched automatically from live Notion database workspace.</p>
          </div>
          <div className="space-y-1.5">
            <p className="font-mono text-[10px] text-gray-450 uppercase tracking-widest font-bold">Core Load Time</p>
            <p className="font-sans text-3xl sm:text-4xl font-black text-neutral-950">240ms</p>
            <p className="font-sans text-xs text-gray-550 leading-relaxed">Extremely optimized bundles with zero render blocking scripts.</p>
          </div>
          <div className="space-y-1.5">
            <p className="font-mono text-[10px] text-gray-450 uppercase tracking-widest font-bold">Active SLA</p>
            <p className="font-sans text-3xl sm:text-4xl font-black text-neutral-950">99.9%</p>
            <p className="font-sans text-xs text-gray-550 leading-relaxed">Self-healing fullstack containers with direct asset pipelines.</p>
          </div>
        </div>
      </section>

      {/* Portfolios Gallery / Cases Area */}
      <section id="case-studies-section" className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Title and Controls Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase text-[#B2B2B2] font-semibold tracking-widest">
              Curated Artifacts
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Visual Case Studies
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search filter bar */}
            <div className="relative w-full max-w-xs">
              <Search size={14} className="absolute left-3.5 top-3.5 text-gray-450" />
              <input
                id="search-portfolio-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools, stacks, tags..."
                className="w-full font-sans text-xs pl-9 pr-3 py-3 rounded-xl border border-gray-200 bg-white placeholder-gray-450 text-gray-850 focus:outline-none focus:border-neutral-950"
              />
            </div>
          </div>
        </div>

        {/* Categories Tab pills */}
        <div className="flex flex-wrap gap-1.5 border-b border-gray-100 pb-4 mb-8">
          {categories.map((cat, i) => (
            <button
              id={`cat-filter-${i}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-neutral-900 border-neutral-900 text-white"
                  : "bg-white border-gray-200 text-gray-650 hover:bg-neutral-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              id={`project-card-${proj.id}`}
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="bg-white border border-gray-250 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Card visual showcase shot */}
              <div className="relative aspect-video bg-neutral-100 overflow-hidden shrink-0 border-b border-gray-150">
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Year tag */}
                <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-white tracking-widest font-bold">
                  {proj.year}
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Card textual details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-neutral-400">
                      {proj.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="font-sans text-[10px] font-medium text-gray-500">
                      {proj.client || "Creative Study"}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-gray-950 group-hover:text-black line-clamp-1 mb-2">
                    {proj.title}
                  </h3>

                  <p className="font-sans text-xs text-gray-550 line-clamp-2 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Highlight tag */}
                  {proj.achievement && (
                    <div className="p-2.5 bg-neutral-50 rounded-lg text-[10px] font-sans font-medium text-gray-700 border border-neutral-154 leading-tight flex items-start gap-1.5">
                      <Sparkles size={11} className="text-amber-500 shrink-0 mt-[1px]" />
                      <span>{proj.achievement}</span>
                    </div>
                  )}

                  {/* Badges row */}
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-neutral-50 text-[10px] font-mono text-gray-500 rounded border border-gray-154"
                      >
                        {tag}
                      </span>
                    ))}
                    {proj.tags.length > 3 && (
                      <span className="text-[10px] text-gray-400 font-mono px-1">
                        +{proj.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-3 py-16 text-center space-y-3 bg-white border border-dashed border-gray-200 rounded-2xl">
              <FolderOpen size={40} className="mx-auto text-gray-300" />
              <div>
                <p className="text-sm font-sans font-semibold text-gray-700">No matching projects located</p>
                <p className="text-xs text-gray-400 font-mono mt-1">Try widening your key filters or search fields.</p>
              </div>
            </div>
          )}
        </div>
      </section>



      {/* Owner Admin panel configuration wrapper */}
      {isAdminOpen && (
        <AdminPanel 
          onClose={() => setIsAdminOpen(false)}
          onRefreshProjects={refreshPortfolioData}
        />
      )}

      {/* Case studies detail overlays */}
      {selectedProject && (
        <ProjectDetailsModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Floating AI chatbot assistant thread */}
      <AIChatBubble />

      {/* Clean elegant Contact Form section */}
      <section id="contact-section" className="bg-[#f2f2f2] border-t border-[#e2e2e2] py-20 relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center space-y-2 mb-12">
            <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400 font-bold">
              Gateway consultation
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Start a Case Project
            </h2>
            <p className="font-sans text-xs text-gray-550 max-w-lg mx-auto">
              Ready to construct a tailored dynamic dashboard or high-fidelity visual design client interface? Leave Budi a message.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                  Your Full Name
                </label>
                <input
                  id="contact-name-input"
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Jane Doe"
                  className="w-full font-sans text-xs px-3.5 py-3 rounded-lg border border-gray-200 bg-neutral-50/50 text-gray-850 placeholder-gray-350 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email-input"
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g., jane@domain.com"
                  className="w-full font-sans text-xs px-3.5 py-3 rounded-lg border border-gray-200 bg-neutral-50/50 text-gray-850 placeholder-gray-350 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                Communication Subject
              </label>
              <input
                id="contact-subject-input"
                type="text"
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                placeholder="e.g., Dynamic Portal consultation"
                className="w-full font-sans text-xs px-3.5 py-3 rounded-lg border border-gray-200 bg-neutral-50/50 text-gray-850 placeholder-gray-350 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wide mb-1.5">
                Brief Project Narrative
              </label>
              <textarea
                id="contact-message-input"
                required
                rows={4}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Outline details or timeline requirements..."
                className="w-full font-sans text-xs px-3.5 py-3 rounded-lg border border-gray-200 bg-neutral-50/50 text-gray-850 placeholder-gray-350 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all resize-none"
              />
            </div>

            <button
              id="btn-submit-contact-form"
              type="submit"
              disabled={formStatus === 'sending'}
              className="w-full bg-neutral-900 text-white font-sans text-xs font-semibold py-3.5 px-4 rounded-xl hover:bg-neutral-850 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-neutral-300 disabled:pointer-events-none"
            >
              {formStatus === 'sending' ? (
                <span>Dispatching message payload...</span>
              ) : (
                <>
                  <Send size={12} />
                  <span>Send Consultation Draft</span>
                </>
              )}
            </button>

            {formStatus === 'success' && (
              <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-xl text-emerald-800 flex items-start gap-2">
                <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-emerald-600" />
                <p className="text-xs">{formFeedback}</p>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="p-3 bg-rose-50 border border-rose-150 rounded-xl text-rose-850 flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-600" />
                <p className="text-xs">{formFeedback}</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Elegant Minimal Footer incorporating the user's requested social links */}
      <footer className="bg-white border-t border-[#f1f1f1] px-6 py-12 relative z-10 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="font-sans font-black text-base text-neutral-900 border border-neutral-900 px-2 py-0.5 rounded">B.P</span>
            <span className="font-sans font-bold text-xs tracking-tight text-neutral-900">Budi Prst creative space.</span>
          </div>

          {/* User stated Links - Absolute requirement */}
          <div className="flex items-center gap-4">
            <a 
              id="footer-link-github"
              href="https://github.com/budiprst/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-[#f5f5f5] hover:bg-neutral-900 text-gray-500 hover:text-white rounded-full transition-all cursor-pointer"
              title="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a 
              id="footer-link-linkedin"
              href="https://www.linkedin.com/in/budi-prst/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-[#f5f5f5] hover:bg-neutral-900 text-gray-500 hover:text-white rounded-full transition-all cursor-pointer"
              title="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a 
              id="footer-link-instagram"
              href="https://instagram.com/budi_prst" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-[#f5f5f5] hover:bg-neutral-900 text-gray-500 hover:text-white rounded-full transition-all cursor-pointer"
              title="Instagram Profile"
            >
              <Instagram size={16} />
            </a>
            <a 
              id="footer-link-facebook"
              href="https://www.facebook.com/cygnuslife/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-[#f5f5f5] hover:bg-neutral-900 text-gray-500 hover:text-white rounded-full transition-all cursor-pointer"
              title="Facebook Profile"
            >
              <Facebook size={16} />
            </a>
          </div>

          <div className="space-y-1 text-[#a0a0a0] font-mono text-[10px] tracking-tight">
            <p>© 2026 Budi Prst. All rights reserved.</p>
            <p>Designed with Nordic spatial grids and dynamic Notion integration pipelines.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
