import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Sparkles,
  FolderOpen,
  FileText,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Eye,
  Send,
  BookOpen,
  X,
  PlusCircle,
  Clock,
  ArrowRight,
  Code,
  LogOut
} from "lucide-react";

interface KnowledgeFile {
  name: string;
  size: number;
  updatedAt: string;
  extension: string;
}

interface AdminPanelProps {
  onClose: () => void;
  onRefreshProjects: () => void;
}

export default function AdminPanel({ onClose, onRefreshProjects }: AdminPanelProps) {
  // Authentication & session variables
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [files, setFiles] = useState<KnowledgeFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string; isBinary?: boolean } | null>(null);
  const [fetchingFile, setFetchingFile] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New File Creator State
  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");
  const [savingFile, setSavingFile] = useState(false);

  // Drag-and-drop file upload state
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live Test Chat Sandbox in Gem panel
  const [sandboxQuery, setSandboxQuery] = useState("");
  const [sandboxMessages, setSandboxMessages] = useState<Array<{ id: string; sender: "user" | "assistant"; text: string }>>([]);
  const [sandboxTyping, setSandboxTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Notion Settings (Direct access - removed owner login)
  const [notionDatabaseId, setNotionDatabaseId] = useState("");
  const [notionToken, setNotionToken] = useState("");
  const [savingNotion, setSavingNotion] = useState(false);
  const [notionStatus, setNotionStatus] = useState<any>(null);

  // Announcements (Direct access)
  const [announcementText, setAnnouncementText] = useState("");
  const [postingAnnouncement, setPostingAnnouncement] = useState(false);
  const [recentAnnouncements, setRecentAnnouncements] = useState<any[]>([]);

  // Selection of creator tabs
  const [activeEditorTab, setActiveEditorTab] = useState<"create" | "notion" | "announcement">("create");

  // Load session token on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem("budi_admin_token");
    if (storedToken) {
      setAdminToken(storedToken);
      setIsAdminLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchFiles();
      fetchConfig();
      fetchAnnouncements();
    }

    // Default chat system message for twin sandbox
    setSandboxMessages([
      {
        id: "sandbox-w",
        sender: "assistant",
        text: "Hi! I'm Budi's Digital Twin sandbox. Ask me any specialized query! I will automatically retrieve background details from your uploaded files below using our RAG pipeline before responding."
      }
    ]);
  }, [isAdminLoggedIn]);

  // Scroll live chat sandbox
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [sandboxMessages, sandboxTyping]);

  // Helper auth fetch wrapper
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = adminToken || sessionStorage.getItem("budi_admin_token") || "";
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
      "Authorization": `Bearer ${token}`,
      "X-Admin-Token": token
    };

    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      sessionStorage.removeItem("budi_admin_token");
      setAdminToken("");
      setIsAdminLoggedIn(false);
      showStatus("error", "Your administrational session has expired or was refused.");
    }
    return res;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPasswordInput.trim()) {
      setLoginError("Password cannot be blank.");
      return;
    }
    setLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPasswordInput })
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("budi_admin_token", data.token);
        setAdminToken(data.token);
        setIsAdminLoggedIn(true);
        setAdminPasswordInput("");
      } else {
        const err = await res.json();
        setLoginError(err.error || "Incorrect password.");
      }
    } catch (err: any) {
      setLoginError("Unable to reach login service. " + err.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("budi_admin_token");
    setAdminToken("");
    setIsAdminLoggedIn(false);
    setSelectedFile(null);
    showStatus("success", "Administrational session closed successfully.");
  };

  const fetchFiles = async () => {
    setLoadingFiles(true);
    try {
      const res = await fetchWithAuth("/api/knowledge-files");
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      } else {
        showStatus("error", "Failed to retrieve twin knowledge base folder.");
      }
    } catch (err: any) {
      showStatus("error", "Connection exception retrieving file directory: " + err.message);
    } finally {
      setLoadingFiles(false);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetchWithAuth("/api/admin/config");
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

  const handleViewFile = async (fileName: string) => {
    setFetchingFile(true);
    try {
      const res = await fetchWithAuth(`/api/knowledge-files/${encodeURIComponent(fileName)}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedFile(data);
      } else {
        showStatus("error", "Failed to load content for: " + fileName);
      }
    } catch (err: any) {
      showStatus("error", "Error loading document: " + err.message);
    } finally {
      setFetchingFile(false);
    }
  };

  const handleSaveFile = async (nameToSave: string, contentToSave: string, isSilent: boolean = false, encoding: string = "utf-8") => {
    if (!nameToSave.trim() || contentToSave === undefined) {
      showStatus("error", "Please provide a valid file name and document content.");
      return;
    }

    // Auto-append .md if no extension exists
    let cleanName = nameToSave.includes(".") ? nameToSave : `${nameToSave}.md`;

    setSavingFile(true);
    try {
      const res = await fetchWithAuth("/api/knowledge-files", {
        method: "POST",
        body: JSON.stringify({ name: cleanName, content: contentToSave, encoding })
      });

      if (res.ok) {
        if (!isSilent) {
          showStatus("success", `Knowledge document "${cleanName}" written successfully into twin folder!`);
        }
        setNewFileName("");
        setNewFileContent("");
        fetchFiles();
        // Clear selected view if editing same file
        if (selectedFile?.name === cleanName) {
          setSelectedFile({ name: cleanName, content: contentToSave, isBinary: encoding === "base64" });
        }
      } else {
        const err = await res.json();
        showStatus("error", err.error || "Failed to commit knowledge file.");
      }
    } catch (err: any) {
      showStatus("error", "API Error: " + err.message);
    } finally {
      setSavingFile(false);
    }
  };

  const handleDeleteFile = async (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete "${fileName}"? This will vanish Budi's twin knowledge details stored here.`)) {
      return;
    }

    try {
      const res = await fetchWithAuth(`/api/knowledge-files/${encodeURIComponent(fileName)}`, {
        method: "DELETE"
      });
      if (res.ok) {
        showStatus("success", `Knowledge source "${fileName}" deleted.`);
        fetchFiles();
        if (selectedFile?.name === fileName) {
          setSelectedFile(null);
        }
      } else {
        showStatus("error", "Could not remove knowledge block.");
      }
    } catch (err: any) {
      showStatus("error", "Error requesting delete action: " + err.message);
    }
  };

  // Drag and drop text files utilities
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleParseUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleParseUpload(e.target.files[0]);
    }
  };

  const handleParseUpload = (file: File) => {
    const textExtensions = [".txt", ".md", ".json", ".csv", ".faq"];
    const binaryExtensions = [".pdf", ".docx", ".pptx", ".xlsx"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    
    if (!textExtensions.includes(ext) && !binaryExtensions.includes(ext)) {
      showStatus("error", "Unsupported format. Please upload PDF, Word (.docx), Slides (.pptx), Sheets (.xlsx), or UTF-8 Text files.");
      return;
    }

    if (binaryExtensions.includes(ext)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const base64Index = dataUrl.indexOf(";base64,");
        if (base64Index !== -1) {
          const base64 = dataUrl.substring(base64Index + 8);
          handleSaveFile(file.name, base64, false, "base64");
        } else {
          showStatus("error", "Failed to compile document to Base64 binary.");
        }
      };
      reader.onerror = () => {
        showStatus("error", "Failed to read binary file contents.");
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        handleSaveFile(file.name, content, false, "utf-8");
      };
      reader.onerror = () => {
        showStatus("error", "Failed to deserialize uploaded file contents.");
      };
      reader.readAsText(file);
    }
  };

  // Chat sandbox query handles
  const handleSandboxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = sandboxQuery.trim();
    if (!query || sandboxTyping) return;

    const userMsg = {
      id: Math.random().toString(),
      sender: "user" as const,
      text: query
    };

    setSandboxMessages(prev => [...prev, userMsg]);
    setSandboxQuery("");
    setSandboxTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: sandboxMessages.filter(m => m.id !== "sandbox-w").map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSandboxMessages(prev => [...prev, {
          id: Math.random().toString(),
          sender: "assistant" as const,
          text: data.text || "No reply processed by our digital twin pipeline."
        }]);
      } else {
        showStatus("error", "Error query chatbot API endpoint.");
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setSandboxTyping(false);
    }
  };

  // Notion credentials submission
  const handleSaveNotion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notionToken || !notionDatabaseId) {
      showStatus("error", "Secret Token & Database ID are required properties.");
      return;
    }
    setSavingNotion(true);
    try {
      const res = await fetchWithAuth("/api/admin/config", {
        method: "POST",
        body: JSON.stringify({ token: notionToken, databaseId: notionDatabaseId })
      });
      if (res.ok) {
        showStatus("success", "Notion portfolio links updated successfully.");
        setNotionToken("");
        fetchConfig();
        onRefreshProjects();
      } else {
        showStatus("error", "Failed to lock in portfolio config.");
      }
    } catch (err: any) {
      showStatus("error", err.message);
    } finally {
      setSavingNotion(false);
    }
  };

  // News broadcast submission
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setPostingAnnouncement(true);
    try {
      const res = await fetchWithAuth("/api/admin/announcements", {
        method: "POST",
        body: JSON.stringify({ content: announcementText })
      });
      if (res.ok) {
        showStatus("success", "Active news banner broadcasted.");
        setAnnouncementText("");
        fetchAnnouncements();
      } else {
        showStatus("error", "Failed to write announcement.");
      }
    } catch (err: any) {
      showStatus("error", err.message);
    } finally {
      setPostingAnnouncement(false);
    }
  };

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => {
      setStatusMsg(null);
    }, 6000);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  if (!isAdminLoggedIn) {
    return (
      <div id="admin-panel" className="fixed inset-0 bg-[#0c0d0e]/95 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-[#121417] border border-[#2d3139] rounded-2xl max-w-md w-full text-[#e3e6eb] shadow-2xl overflow-hidden flex flex-col p-6 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#2d3139]/80 rounded-xl text-amber-500">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </span>
              <h2 className="font-sans text-xs font-extrabold tracking-wider text-white uppercase">
                Twin Hub Security Gate
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[11px] text-[#a0aab4] hover:text-white border border-[#2d3139] hover:bg-[#1c1f24] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Prompt info */}
          <div className="space-y-2">
            <p className="text-xs text-[#a0aab4] font-sans leading-relaxed">
              Enter Budi's administrative master password to securely authenticate your session and manage the Digital Twin's files, news announcements, and Notion settings.
            </p>
          </div>

          {/* Password submission form */}
          <form id="admin-login-form" onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[9px] uppercase font-mono text-gray-400 mb-1.5 font-bold tracking-widest">Master Password</label>
              <input
                id="admin-password-input"
                type="password"
                placeholder="••••••••••••"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                autoFocus
                className="w-full text-xs font-mono bg-[#0c0d0e] border border-[#2d3139] rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-sans flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              id="admin-login-submit"
              type="submit"
              disabled={loggingIn || !adminPasswordInput.trim()}
              className="w-full text-xs font-mono font-bold text-black bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 rounded-xl py-3 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-amber-400/20"
            >
              {loggingIn ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Configuring Session...</span>
                </>
              ) : (
                <>
                  <span>Unlock Gateway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="admin-panel" className="fixed inset-0 bg-[#0c0d0e]/95 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-[#121417] border border-[#2d3139] rounded-2xl max-w-7xl w-full text-[#e3e6eb] shadow-2xl overflow-hidden flex flex-col h-[90vh]"
      >
        {/* Workspace Top Bar */}
        <div className="flex items-center justify-between border-b border-[#2d3139] px-6 py-4 bg-[#16191f] text-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#2d3139]/80 rounded-xl text-amber-500">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h2 className="font-sans text-base font-extrabold tracking-tight flex items-center gap-2">
                Digital Twin Gem Workspace
                <span className="text-[10px] bg-amber-500/10 text-amber-400 font-mono px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest font-bold">Active RAG Engine</span>
              </h2>
              <p className="text-xs text-[#a0aab4] font-sans">
                Customize your Digital Twin's brain by storing markdown or text documents in our searchable knowledge folder.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              id="admin-logout-btn"
              onClick={handleLogout}
              className="text-red-400 hover:text-red-350 hover:bg-red-500/10 transition-all p-2 font-mono text-xs border border-red-500/20 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log Out
            </button>
            <button 
              id="close-admin-btn"
              onClick={onClose}
              className="text-[#a0aab4] hover:text-white transition-all p-2 font-mono text-xs border border-[#2d3139] rounded-lg hover:bg-[#1f232b] flex items-center gap-1.5"
            >
              Esc ✕
            </button>
          </div>
        </div>

        {/* Global Floating Status banners */}
        <AnimatePresence>
          {statusMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`mx-6 mt-4 p-3 rounded-xl flex items-start gap-2 border text-xs font-sans shrink-0 ${
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

        {/* Main Workspace split panel grid */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* LEFT COLUMN (GRID 5): Knowledge Folder Inventory & Creation */}
          <div className="lg:col-span-5 border-r border-[#2d3139] flex flex-col min-h-0 bg-[#0c0d0e]/40 p-5 overflow-y-auto space-y-5">
            
            {/* Folder Dropzone */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                dragActive 
                  ? "border-amber-500 bg-amber-500/5 text-amber-400" 
                  : "border-[#2d3139] hover:border-[#3a3f4a] bg-[#15171d]/60 text-gray-450"
              }`}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-amber-500/80" />
              <p className="text-xs font-medium text-white mb-1">Drag knowledge files here, or browse files</p>
              <p className="text-[10.5px] text-gray-400 font-mono">Supports PDF, Word (.docx), Slides (.pptx), Sheets (.xlsx), and Text files</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileInputChange} 
                accept=".txt,.md,.json,.csv,.faq,.pdf,.docx,.pptx,.xlsx" 
                className="hidden" 
              />
            </div>

            {/* Folder Inventory List */}
            <div className="bg-[#15171c]/50 border border-[#2d3139] rounded-xl overflow-hidden flex flex-col flex-1 min-h-[220px]">
              <div className="px-4 py-3 bg-[#1a1d23] border-b border-[#2d3139] flex items-center justify-between shrink-0">
                <span className="text-xs font-mono font-bold text-gray-200 uppercase tracking-widest flex items-center gap-1.5">
                  <FolderOpen className="w-3.5 h-3.5 text-amber-500" />
                  Twin Knowledge Folder
                </span>
                <span className="text-[10px] font-mono bg-[#282d37] text-gray-450 px-2.5 py-0.5 rounded-full">
                  {files.length} Files
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {loadingFiles ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-gray-500 gap-1 text-xs">
                    <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                    <span>Indexing brain files...</span>
                  </div>
                ) : files.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center text-xs text-gray-500 space-y-1.5">
                    <BookOpen className="w-8 h-8 text-gray-600 mb-1" />
                    <p className="font-semibold text-gray-400">Knowledge folder is empty</p>
                    <p className="text-[10.5px] leading-relaxed max-w-[240px]">Upload professional profiles, experiences, or project text to seed your twin!</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {files.map((file) => (
                      <div
                        id={`twin-key-file-${file.name}`}
                        key={file.name}
                        onClick={() => handleViewFile(file.name)}
                        className={`group p-2.5 rounded-lg border text-left transition-colors cursor-pointer flex items-center justify-between ${
                          selectedFile?.name === file.name
                            ? "bg-amber-500/10 border-amber-500/30 text-white"
                            : "bg-[#101216]/60 border-transparent hover:border-[#2d3139] text-[#b8c2cc]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className={`w-3.5 h-3.5 shrink-0 ${selectedFile?.name === file.name ? 'text-amber-400' : 'text-gray-450'}`} />
                          <div className="min-w-0">
                            <h4 className="text-xs font-medium font-mono truncate text-white">{file.name}</h4>
                            <div className="flex items-center gap-1.5 text-[9.5px] text-gray-500 mt-0.5 font-mono">
                              <span>{formatSize(file.size)}</span>
                              <span>•</span>
                              <span>{new Date(file.updatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="p-1 text-gray-500 hover:text-white rounded transition-colors bg-[#191c22]">
                            <Eye className="w-3 h-3" />
                          </span>
                          <button
                            onClick={(e) => handleDeleteFile(e, file.name)}
                            className="p-1 text-gray-500 hover:text-red-400 rounded transition-colors bg-[#191c22]"
                            title="Delete file"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Ingest Tabs & Creators */}
            <div className="bg-[#15171c]/50 border border-[#2d3139] rounded-xl overflow-hidden shrink-0">
              <div className="grid grid-cols-3 border-b border-[#2d3139] bg-[#1a1d23] text-xs font-mono">
                <button
                  onClick={() => setActiveEditorTab("create")}
                  className={`py-2.5 border-r border-[#2d3139] font-semibold flex items-center justify-center gap-1.5 ${
                    activeEditorTab === "create" ? "text-amber-400 bg-[#121417]" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Add File
                </button>
                <button
                  onClick={() => setActiveEditorTab("notion")}
                  className={`py-2.5 border-r border-[#2d3139] font-semibold flex items-center justify-center gap-1.5 ${
                    activeEditorTab === "notion" ? "text-sky-400 bg-[#121417]" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  Notion
                </button>
                <button
                  onClick={() => setActiveEditorTab("announcement")}
                  className={`py-2.5 font-semibold flex items-center justify-center gap-1.5 ${
                    activeEditorTab === "announcement" ? "text-purple-400 bg-[#121417]" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Alert
                </button>
              </div>

              <div className="p-4">
                {activeEditorTab === "create" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9px] uppercase font-mono text-gray-400 mb-1">Document File Name</label>
                      <input 
                        type="text"
                        placeholder="e.g. bio_interests.md"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className="w-full text-xs font-mono bg-[#0c0d0e] border border-[#2d3139] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono text-gray-400 mb-1">Text-based Content</label>
                      <textarea
                        rows={3}
                        placeholder="Type bio facts, answers, or custom notes..."
                        value={newFileContent}
                        onChange={(e) => setNewFileContent(e.target.value)}
                        className="w-full text-xs font-sans bg-[#0c0d0e] border border-[#2d3139] rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      onClick={() => handleSaveFile(newFileName, newFileContent)}
                      disabled={savingFile || !newFileName.trim() || !newFileContent.trim()}
                      className="w-full text-xs font-mono font-semibold text-white bg-amber-500/15 border border-amber-500/25 rounded-lg py-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                    >
                      {savingFile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                      Sync Document to Brain
                    </button>
                  </div>
                )}

                {activeEditorTab === "notion" && (
                  <form onSubmit={handleSaveNotion} className="space-y-3">
                    <p className="text-[10.5px] text-[#a0aab4] font-sans leading-relaxed">
                      Sync projects from Notion to the portfolio gallery directly.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[8px] uppercase font-mono text-gray-400 mb-0.5">Notion Token</label>
                        <input 
                          type="password"
                          placeholder="secret_..."
                          value={notionToken}
                          onChange={(e) => setNotionToken(e.target.value)}
                          className="w-full text-xs font-mono bg-[#0c0d0e] border border-[#2d3139] rounded px-2.5 py-1.5 text-white placeholder-gray-750 focus:outline-none focus:border-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] uppercase font-mono text-gray-400 mb-0.5">Database UUID</label>
                        <input 
                          type="text"
                          placeholder="e.g. 1a2b..."
                          value={notionDatabaseId}
                          onChange={(e) => setNotionDatabaseId(e.target.value)}
                          className="w-full text-xs font-mono bg-[#0c0d0e] border border-[#2d3139] rounded px-2.5 py-1.5 text-white placeholder-gray-750 focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={savingNotion}
                      className="w-full text-xs font-mono font-semibold text-white bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/15 rounded-lg py-1.5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {savingNotion ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Link Notion Db"}
                    </button>
                  </form>
                )}

                {activeEditorTab === "announcement" && (
                  <form onSubmit={handleSaveAnnouncement} className="space-y-3">
                    <p className="text-[10.5px] text-[#a0aab4] font-sans">
                      Post status flashes that render in the page alert bar.
                    </p>
                    <textarea
                      rows={2}
                      placeholder="e.g., 'Currently taking select engagements for Q3 2026!'"
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full text-xs font-sans bg-[#0c0d0e] border border-[#2d3139] rounded px-3 py-1.5 text-white placeholder-gray-650 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="submit"
                      disabled={postingAnnouncement || !announcementText.trim()}
                      className="w-full text-xs font-mono font-semibold text-white bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/15 rounded-lg py-1.5 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {postingAnnouncement ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Broadcast Alert"}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (GRID 7): Inspector & Real-time RAG Chat Sandbox */}
          <div className="lg:col-span-7 bg-[#111317]/20 flex flex-col min-h-0 overflow-hidden h-full">
            
            {/* Top Workspace Splitting: View selected File vs Welcome Sandbox details */}
            <div className="flex-1 min-h-0 p-5 flex flex-col space-y-4">
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
                
                {/* Visualizer: Selected Knowledge File Content viewer */}
                <div className="border border-[#2d3139] bg-[#0c0d0e]/60 rounded-xl overflow-hidden flex flex-col min-h-0">
                  <div className="px-4 py-2.5 bg-[#171a20] border-b border-[#2d3139] flex items-center justify-between shrink-0 font-mono text-[10.5px] uppercase font-bold tracking-wider text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      File Inspector
                    </span>
                    {selectedFile && <span className="text-[9px] text-[#8c9ba5] lowercase">{selectedFile.name}</span>}
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] text-[#a9b2c3] leading-relaxed dark-scroll whitespace-pre-wrap">
                    {fetchingFile ? (
                      <div className="h-full flex items-center justify-center text-gray-500 gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Fetching content...
                      </div>
                    ) : selectedFile ? (
                      <div>
                        <div className="mb-3 pb-3 border-b border-[#2d3139]/40 flex items-center justify-between">
                          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase tracking-wide">Ready for Retrieval</span>
                          {!selectedFile.isBinary && <span className="text-[9px] text-gray-500">{selectedFile.content.length} characters</span>}
                        </div>
                        {selectedFile.isBinary ? (
                          <div id="multimodal-document-indicator" className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/15 text-center space-y-2 mt-2">
                            <span className="inline-block p-2.5 bg-amber-500/10 rounded-xl text-amber-500 mb-1">
                              <FileText className="w-5 h-5" />
                            </span>
                            <p className="text-xs font-semibold text-white">Office / PDF Data Fully Grounded</p>
                            <p className="text-[10px] text-[#a0aab4] leading-relaxed max-w-xs mx-auto">
                              This PDF, Word, PowerPoint, or Spreadsheet document is processed directly in Budi's Digital Twin semantic search. Gemini 3.5's native context window reads its elements during client chats. Plaintext preview is omitted.
                            </p>
                          </div>
                        ) : (
                          selectedFile.content
                        )}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-6 space-y-1">
                        <Eye className="w-6 h-6 text-gray-600 mb-1" />
                        <p className="font-semibold text-gray-400">No file selected</p>
                        <p className="text-[10.5px] leading-relaxed max-w-[180px]">Select any file on the left to inspect its active knowledge context.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Digital Twin sandbox interactive testing ground (Gems style preview) */}
                <div className="border border-[#2d3139] bg-[#0c0d0e]/60 rounded-xl overflow-hidden flex flex-col min-h-0">
                  <div className="px-4 py-2.5 bg-[#171a20] border-b border-[#2d3139] flex items-center justify-between shrink-0 font-mono text-[10.5px] uppercase font-bold tracking-wider text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: '3s' }} />
                      Sandbox Test-Drive
                    </span>
                  </div>

                  {/* Sandbox Chat Flow */}
                  <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#111317]/45 dark-scroll">
                    {sandboxMessages.map((m) => (
                      <div 
                        key={m.id}
                        className={`flex flex-col max-w-[90%] ${
                          m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                        }`}
                      >
                        <div className={`px-3 py-2 text-[11.5px] font-sans leading-relaxed rounded-xl shadow-sm ${
                          m.sender === "user"
                            ? "bg-amber-500 text-black font-semibold rounded-tr-none"
                            : "bg-[#1d212c]/80 border border-[#2d3139] text-[#e3e6eb] rounded-tl-none"
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {sandboxTyping && (
                      <div className="flex items-center gap-1.5 bg-[#1d212c]/80 border border-[#2d3139] rounded-xl rounded-tl-none px-3 py-2 max-w-[50px] ml-1">
                        <span className="w-1.5 h-1.5 bg-gray-450 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-450 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-450 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>

                  {/* Sandbox chat inputs */}
                  <form onSubmit={handleSandboxSubmit} className="p-2 border-t border-[#2d3139] bg-[#161920] flex items-center gap-1.5 shrink-0">
                    <input 
                      type="text"
                      placeholder="Ask twin and verify RAG answer..."
                      value={sandboxQuery}
                      onChange={(e) => setSandboxQuery(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 rounded-lg bg-[#0c0d0e] border border-[#2d3139] text-white focus:outline-none focus:border-amber-500 placeholder-gray-550"
                    />
                    <button 
                      type="submit"
                      disabled={!sandboxQuery.trim() || sandboxTyping}
                      className="p-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg active:scale-95 disabled:opacity-30 transition-all shrink-0 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
