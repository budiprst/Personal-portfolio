import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Lock, 
  Unlock, 
  Database, 
  Megaphone, 
  FileText, 
  Upload, 
  Calendar, 
  FileEdit, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  RefreshCw,
  LogOut,
  Sparkles
} from "lucide-react";
import { 
  googleSignIn, 
  logOutOwner, 
  getCachedToken, 
  initAuth 
} from "../firebase";

interface AdminPanelProps {
  onClose: () => void;
  onRefreshProjects: () => void;
}

export default function AdminPanel({ onClose, onRefreshProjects }: AdminPanelProps) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Announcement State
  const [announcementText, setAnnouncementText] = useState("");
  const [postingAnnouncement, setPostingAnnouncement] = useState(false);
  const [recentAnnouncements, setRecentAnnouncements] = useState<any[]>([]);

  // Notion Settings State
  const [notionToken, setNotionToken] = useState("");
  const [notionDatabaseId, setNotionDatabaseId] = useState("");
  const [notionStatus, setNotionStatus] = useState<any>(null);
  const [savingNotion, setSavingNotion] = useState(false);

  // Text/File Import State
  const [unstructuredText, setUnstructuredText] = useState("");
  const [customProjectTitle, setCustomProjectTitle] = useState("");
  const [uploadingFile, setUploadingFile] = useState(false);
  const [parsedProject, setParsedProject] = useState<any>(null);

  // Google Calendar View State
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [fetchingCalendar, setFetchingCalendar] = useState(false);

  // Google Doc Import State
  const [googleDocId, setGoogleDocId] = useState("");
  const [fetchingGoogleDoc, setFetchingGoogleDoc] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setLoading(false);
        fetchConfig();
        fetchAnnouncements();
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/admin/config");
      if (res.ok) {
        const data = await res.json();
        setNotionStatus(data);
        if (data.databaseId) {
          setNotionDatabaseId(data.databaseId);
        }
      }
    } catch (e) {
      console.error("Config fetch exception:", e);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/admin/announcements");
      if (res.ok) {
        const data = await res.json();
        setRecentAnnouncements(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setStatusMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        fetchConfig();
        fetchAnnouncements();
        showStatus("success", `Authenticated as ${result.user.displayName || "Owner"}`);
      }
    } catch (err: any) {
      showStatus("error", err.message || "Failed to authenticating session.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notionToken || !notionDatabaseId) {
      showStatus("error", "Please provide both the Notion secret token and Database ID.");
      return;
    }
    setSavingNotion(true);
    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: notionToken, databaseId: notionDatabaseId })
      });
      if (res.ok) {
        showStatus("success", "Notion portfolio integration registered securely on server.");
        setNotionToken("");
        fetchConfig();
        onRefreshProjects();
      } else {
        const err = await res.json();
        showStatus("error", err.error || "Failed to update configuration.");
      }
    } catch (err: any) {
      showStatus("error", err.message);
    } finally {
      setSavingNotion(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logOutOwner();
      setUser(null);
      setToken(null);
      setCalendarEvents([]);
      showStatus("success", "Session cleared safely.");
    } catch (e: any) {
      showStatus("error", "Logout failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => {
      setStatusMsg(null);
    }, 6000);
  };



  // 2. Post News Announcement
  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setPostingAnnouncement(true);
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: announcementText })
      });
      if (res.ok) {
        showStatus("success", "Announcement published successfully to public portfolio.");
        setAnnouncementText("");
        fetchAnnouncements();
      } else {
        showStatus("error", "Failed to publish announcement.");
      }
    } catch (e: any) {
      showStatus("error", e.message);
    } finally {
      setPostingAnnouncement(false);
    }
  };

  // 3. AI Parsing Ingestion (Text/File payload handler)
  const handleTextImport = async (textToParse: string, source: string) => {
    if (!textToParse.trim()) {
      showStatus("error", "Text content is empty.");
      return;
    }
    setUploadingFile(true);
    setParsedProject(null);
    try {
      const res = await fetch("/api/admin/ai-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: textToParse, sourceName: source })
      });
      if (res.ok) {
        const data = await res.json();
        setParsedProject(data.project);
        showStatus("success", "Gemini parsed and appended case study into your portfolio!");
        onRefreshProjects();
        setUnstructuredText("");
      } else {
        const err = await res.json();
        showStatus("error", err.error || "AI could not partition your text.");
      }
    } catch (err: any) {
      showStatus("error", err.message);
    } finally {
      setUploadingFile(false);
    }
  };

  // Drag and Drop File Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleTextImport(content, `Uploaded File: ${file.name}`);
    };
    reader.readAsText(file);
  };

  // 4. Integrated Google Calendar Fetcher
  const handleFetchCalendar = async () => {
    if (!token) {
      showStatus("error", "No Google access token. Please log in again.");
      return;
    }
    setFetchingCalendar(true);
    try {
      const timeMin = new Date().toISOString();
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true&timeMin=${timeMin}&maxResults=10`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (res.ok) {
        const data = await res.json();
        setCalendarEvents(data.items || []);
        showStatus("success", `Retrieved ${data.items?.length || 0} calendar events.`);
      } else {
        showStatus("error", "Error requesting Google Calendar. Scopes might be unauthorized.");
      }
    } catch (err: any) {
      showStatus("error", "Calendar fetch exception: " + err.message);
    } finally {
      setFetchingCalendar(false);
    }
  };

  // 5. Integrated Google Docs Fetcher and Case Ingestion
  const handleImportGoogleDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleDocId) {
      showStatus("error", "Please provide a valid Google Doc ID.");
      return;
    }
    if (!token) {
      showStatus("error", "Requires active Google Sign-In profile.");
      return;
    }
    setFetchingGoogleDoc(true);
    try {
      const docRes = await fetch(`https://docs.googleapis.com/v1/documents/${googleDocId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!docRes.ok) {
        showStatus("error", `Failed checking document content. Confirm permission access for doc ID.`);
        setFetchingGoogleDoc(false);
        return;
      }
      const docData = await docRes.json();
      
      // Extract texts using Google Doc schema helpers
      let parsedText = "";
      if (docData.body && docData.body.content) {
        for (const element of docData.body.content) {
          if (element.paragraph && element.paragraph.elements) {
            for (const el of element.paragraph.elements) {
              if (el.textRun && el.textRun.content) {
                parsedText += el.textRun.content;
              }
            }
          }
        }
      }

      if (!parsedText.trim()) {
        showStatus("error", "Document appears to have no text elements.");
        setFetchingGoogleDoc(false);
        return;
      }

      showStatus("success", "Successfully parsed Doc! Invoking Gemini analysis model...");
      await handleTextImport(parsedText, `Google Doc: ${docData.title || "Untitled Document"}`);
      setGoogleDocId("");

    } catch (err: any) {
      showStatus("error", "Docs API connection exception: " + err.message);
    } finally {
      setFetchingGoogleDoc(false);
    }
  };

  return (
    <div id="admin-panel" className="fixed inset-0 bg-[#0c0d0e]/95 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#121417] border border-[#2d3139] rounded-xl max-w-4xl w-full text-[#e3e6eb] shadow-2xl p-6 sm:p-8 relative"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#2d3139] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#2d3139] text-[#b8c2cc] rounded-lg">
              {user ? <Unlock className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5" />}
            </span>
            <div>
              <h2 className="font-mono text-lg font-medium tracking-tight text-white flex items-center gap-2">
                Budi's Owner Portal
                {user && <span className="text-xs bg-emerald-500/10 text-emerald-400 font-normal px-2 py-0.5 rounded border border-emerald-500/20">Authenticated Owner</span>}
              </h2>
              <p className="text-xs text-[#a0aab4] font-sans">
                Setup persistent database pipelines, edit alerts, and utilize Gemini to ingest telemetry documents.
              </p>
            </div>
          </div>
          <button 
            id="close-admin-btn"
            onClick={onClose}
            className="text-[#a0aab4] hover:text-white transition-colors p-2 font-mono text-sm border border-[#2d3139] rounded-lg hover:bg-[#1a1d23]"
          >
            Esc ✕
          </button>
        </div>

        {/* Global Status messages feedback */}
        <AnimatePresence>
          {statusMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-3 rounded-lg mb-6 flex items-start gap-2 border text-sm font-sans ${
                statusMsg.type === "success" 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              {statusMsg.type === "success" ? <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
              <span>{statusMsg.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guest Lock view */}
        {!user ? (
          <div className="py-12 flex flex-col items-center text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#1c1f26] border border-[#2d3139] flex items-center justify-center text-white mb-4 shadow-inner">
              <Lock className="w-7 h-7 text-[#8c9ba5]" />
            </div>
            <h3 className="font-mono text-md text-white mb-2 font-medium">Budi's Exclusive Owner Authorization</h3>
            <p className="text-sm text-[#a0aab4] font-sans mb-6 leading-relaxed">
              Sign in with Google using Budi's administrator credentials to enable write states, sync Google Docs, read Google Calendar meetings, and maintain database mappings.
            </p>
            {loading ? (
              <div className="flex items-center gap-2 text-sm font-mono text-[#a0aab4]">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                Validating identity layers...
              </div>
            ) : (
              <button
                id="google-owner-signin"
                onClick={handleLogin}
                className="gsi-material-button text-black w-full"
              >
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents font-sans">Authorize Administrator session</span>
                </div>
              </button>
            )}
          </div>
        ) : (
          /* Authenticated Dashboard Panel */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1 max-h-[70vh] overflow-y-auto">
            
            {/* LEFT COLUMN: Broadcast alerts & scheduling */}
            <div className="space-y-6">

              {/* 1. NOTION GATEWAY BLOCK */}
              <div className="p-4 border border-[#2d3139] bg-[#1a1d23]/50 rounded-lg">
                <div className="flex items-center justify-between mb-3 text-white">
                  <h4 className="font-mono text-sm font-semibold flex items-center gap-2">
                    <Database className="w-4 h-4 text-sky-400" />
                    1. Notion Database Source
                  </h4>
                  {notionStatus?.hasNotionToken ? (
                    <span className="text-[10px] uppercase font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Linked
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-mono bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded">
                      Local Mocks Only
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-[#a0aab4] font-sans mb-4 leading-relaxed">
                  Provide your master Notion Integration secret token and database UUID.
                  Once synced, visitors will view real case studies pulled directly from your Notion workspace dynamically instead of having to input their credentials.
                </p>

                <form onSubmit={handleSaveNotion} className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Integration Token</label>
                    <input 
                      type="password"
                      placeholder="secret_..."
                      value={notionToken}
                      onChange={(e) => setNotionToken(e.target.value)}
                      className="w-full text-xs font-mono bg-[#111317] border border-[#2d3139] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Database ID</label>
                    <input 
                      type="text"
                      placeholder="e.g. 1a2b3c4d5e..."
                      value={notionDatabaseId}
                      onChange={(e) => setNotionDatabaseId(e.target.value)}
                      className="w-full text-xs font-mono bg-[#111317] border border-[#2d3139] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={savingNotion}
                    className="w-full text-xs font-mono font-medium hover:text-white bg-[#1c1f26] hover:bg-[#252a35] text-white border border-[#2d3139] rounded py-2 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {savingNotion ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Bind Master Notion Pipeline"}
                  </button>
                </form>
              </div>

              {/* 2. ANNOUNCEMENTS EDITOR */}
              <div className="p-4 border border-[#2d3139] bg-[#1a1d23]/50 rounded-lg">
                <h4 className="font-mono text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <Megaphone className="w-4 h-4 text-purple-400" />
                  2. Broadcast Alerts & Status
                </h4>
                <p className="text-xs text-[#a0aab4] font-sans mb-3">
                  Post high-contrast news or status milestones that pop up on your global index header.
                </p>
                <form onSubmit={handlePostAnnouncement} className="space-y-3">
                  <textarea
                    rows={2}
                    placeholder="e.g., 'Currently taking select React / ThreeJS visual architecture engagements for Q3 2026!'"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full text-xs font-sans bg-[#111317] border border-[#2d3139] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={postingAnnouncement || !announcementText.trim()}
                    className="w-full text-xs font-mono font-medium hover:text-white bg-[#1c1f26] hover:bg-[#252a35] text-white border border-[#2d3139] rounded py-1.5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {postingAnnouncement ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Publish Broadcast Card"}
                  </button>
                </form>

                {recentAnnouncements.length > 0 && (
                  <div className="mt-3 border-t border-[#2d3139]/40 pt-3">
                    <h5 className="text-[10px] uppercase font-mono text-gray-400 mb-2">Published:</h5>
                    <div className="space-y-2 max-h-[100px] overflow-y-auto">
                      {recentAnnouncements.map((ann, i) => (
                        <div key={i} className="text-[11px] bg-[#121417] p-2 rounded border border-[#2d3139]/30 font-sans flex justify-between items-start">
                          <span className="text-gray-300 line-clamp-2">{ann.content}</span>
                          <span className="text-[9px] font-mono text-gray-500 shrink-0 ml-1">
                            {new Date(ann.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* LOGOUT */}
              <div className="flex items-center justify-between p-3 border border-red-500/10 rounded-lg bg-red-500/5">
                <div className="text-xs font-sans text-gray-400">
                  Logged in as <span className="font-mono text-white">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: AI Ingest, Google Docs, Google Calendar */}
            <div className="space-y-6">

              {/* 3. GEMINI DRAFT INGESTER */}
              <div className="p-4 border border-[#2d3139] bg-[#1a1d23]/50 rounded-lg">
                <h4 className="font-mono text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  3. Ingest via Gemini
                </h4>
                <p className="text-xs text-[#a0aab4] font-sans mb-3">
                  Upload raw resume content, copy-pasted bio paragraphs, list of coordinates, or even select a `.txt/.md/.json` file.
                  Gemini will analyze, structure, and stitch it into a beautiful case study!
                </p>

                <div className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Paste unformatted project notes, list of technologies used, or client feedback here..."
                    value={unstructuredText}
                    onChange={(e) => setUnstructuredText(e.target.value)}
                    className="w-full text-xs font-mono bg-[#111317] border border-[#2d3139] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleTextImport(unstructuredText, "Manually Pasted Raw Data")}
                      disabled={uploadingFile || !unstructuredText.trim()}
                      className="flex-1 text-xs font-mono font-medium hover:text-white bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded py-2 transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      {uploadingFile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      AI Parse Text
                    </button>

                    <label className="flex-1 text-xs font-mono font-medium text-gray-300 hover:text-white bg-[#1c1f26] hover:bg-[#252a35] border border-[#2d3139] rounded py-2 transition-all flex items-center justify-center gap-1 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      Upload .MD/.TXT file
                      <input 
                        type="file"
                        accept=".txt,.md,.json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {parsedProject && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-emerald-500/5 border border-emerald-500/15 rounded text-xs font-sans"
                  >
                    <div className="font-semibold text-emerald-400 flex items-center gap-1 mb-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Gemini structured: "{parsedProject?.title}"
                    </div>
                    <p className="text-gray-400 italic line-clamp-1">"{parsedProject?.description}"</p>
                  </motion.div>
                )}
              </div>

              {/* 4. GOOGLE DOCS CASE GENERATOR */}
              <div className="p-4 border border-[#2d3139] bg-[#1a1d23]/50 rounded-lg">
                <h4 className="font-mono text-sm font-semibold text-white flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  4. Google Docs Import pipeline
                </h4>
                <p className="text-xs text-[#a0aab4] font-sans mb-3">
                  Fetch from your personal Google Docs library. Type in the Document ID to fetch its raw text and transform it into a gorgeous case study with Gemini.
                </p>
                <form onSubmit={handleImportGoogleDoc} className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-gray-400 mb-1">Google Doc UUID / ID</label>
                    <input 
                      type="text"
                      placeholder="e.g. 1uK98u9p8V_K2Rqp-q2J_x..."
                      value={googleDocId}
                      onChange={(e) => setGoogleDocId(e.target.value)}
                      className="w-full text-xs font-mono bg-[#111317] border border-[#2d3139] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={fetchingGoogleDoc || !googleDocId}
                    className="w-full text-xs font-mono font-medium hover:text-white bg-[#1c1f26] hover:bg-[#252a35] text-[#8ab4f8] border border-[#2d3139] rounded py-2 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {fetchingGoogleDoc ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    Ingest Doc Draft with Gemini
                  </button>
                </form>
              </div>

              {/* 5. GOOGLE CALENDAR TRACKER */}
              <div className="p-4 border border-[#2d3139] bg-[#1a1d23]/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-mono text-sm font-semibold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    5. Real-time Office Schedule
                  </h4>
                  <button
                    onClick={handleFetchCalendar}
                    disabled={fetchingCalendar}
                    className="p-1 px-2 text-[10px] uppercase font-mono text-sky-400 hover:text-sky-300 border border-[#2d3139] bg-[#15171c] hover:bg-[#1f232a] rounded flex items-center gap-1 transition-all"
                  >
                    {fetchingCalendar ? <RefreshCw className="w-3 h-3 animate-spin" /> : "Query Google Cal"}
                  </button>
                </div>
                <p className="text-xs text-[#a0aab4] font-sans mb-3 font-normal leading-relaxed">
                  Query Budi's schedule blocks directly from Google Calendar to keep clients informed on live availability slot metrics.
                </p>

                {calendarEvents.length > 0 ? (
                  <div className="space-y-2 max-h-[140px] overflow-y-auto">
                    {calendarEvents.map((evt: any, i: number) => {
                      const eventTime = evt.start?.dateTime ? new Date(evt.start.dateTime) : (evt.start?.date ? new Date(evt.start.date) : null);
                      return (
                        <div key={i} className="bg-[#121417] p-2 border border-[#2d3139]/40 rounded font-sans text-[11px] flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="font-medium text-white block truncate max-w-[200px]">{evt.summary || "Secured Appointment Block"}</span>
                            <span className="text-[10px] text-[#8c9ba5]">
                              {evt.status === "confirmed" ? "● Active Scheduled Event" : "○ Dynamic Status"}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-gray-500 shrink-0">
                            {eventTime ? eventTime.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "All-day Focus Block"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-[11px] border border-dashed border-[#2d3139] p-3 text-[#798590] text-center font-mono">
                    Google Calendar data not fetched yet. Click "Query Google Cal" to retrieve live schedule data.
                  </div>
                )}
              </div>

            </div>

          </div>
        )}
      </motion.div>
    </div>
  );
}
