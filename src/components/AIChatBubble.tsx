import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  Calendar, 
  MapPin, 
  Video, 
  Briefcase, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { ChatMessage } from "../types";
import { DEFAULT_PROJECTS } from "../data";

export default function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'projects' | 'status'>('schedule');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Interactive booking states
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [fetchingCalendar, setFetchingCalendar] = useState(false);
  const [bookingDate, setBookingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [bookingTimeSlot, setBookingTimeSlot] = useState("10:00");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingTopic, setBookingTopic] = useState("");
  const [bookingType, setBookingType] = useState<'online' | 'offline'>('online');
  const [bookingDesc, setBookingDesc] = useState("");
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [bookingFeedback, setBookingFeedback] = useState("");
  const [notionConnected, setNotionConnected] = useState(false);

  // Initialize with a friendly welcome message on first mount
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "assistant",
        text: "Welcome to Budi's Interactive Portfolio Assistant! I am directly integrated with Budi's dynamic project vaults, professional schedule logs, and technical design documents to help go beyond a standard chatbot. Ask me anything about his business strategy & IT architecture work, custom AI automation, or schedule direct syncs!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Fetch calendar events
  const fetchCalendar = async () => {
    setFetchingCalendar(true);
    try {
      const res = await fetch("/api/calendar");
      if (res.ok) {
        const data = await res.json();
        setCalendarEvents(data.events || []);
        setNotionConnected(!!data.notionConnected);
      }
    } catch (err) {
      console.error("Error fetching calendar data:", err);
    } finally {
      setFetchingCalendar(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCalendar();
    }
  }, [isOpen]);

  // Scroll to bottom on updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const autoExpandQuery = (text: string) => {
    const lower = text.toLowerCase();
    if (
      lower.includes("schedule") || 
      lower.includes("meet") || 
      lower.includes("avail") || 
      lower.includes("free") || 
      lower.includes("calendar") || 
      lower.includes("book") ||
      lower.includes("reservation") ||
      lower.includes("slot") ||
      lower.includes("time")
    ) {
      setIsExpanded(true);
    }
  };

  const renderMessageContent = (text: string) => {
    const lines = text.split("\n");
    return (
      <div className="space-y-1.5 font-sans">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith("[IMAGE:") && trimmed.endsWith("]")) {
            const url = trimmed.substring(7, trimmed.length - 1).trim();
            return (
              <div key={idx} className="mt-2.5 overflow-hidden rounded-xl border border-gray-150 shadow-xs max-w-full bg-neutral-25">
                <img 
                  src={url} 
                  alt="Showcase Media" 
                  referrerPolicy="no-referrer" 
                  className="w-full h-auto max-h-[220px] object-cover hover:scale-[1.02] transition-transform duration-300" 
                />
              </div>
            );
          }
          if (trimmed.startsWith("[ACTION:") && trimmed.endsWith("]")) {
            const label = trimmed.substring(8, trimmed.length - 1).trim();
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setIsExpanded(true)}
                className="mt-2 flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-neutral-900 text-white rounded-lg text-[10px] font-mono font-bold shadow-sm transition-all cursor-pointer inline-flex"
              >
                <Calendar size={11} className="animate-pulse" />
                <span>{label}</span>
              </button>
            );
          }
          return (
            <p key={idx} className="leading-relaxed whitespace-pre-wrap">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    autoExpandQuery(query);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await response.json();
      const replyText = data.text || "I apologize, but my core was temporarily disconnected from our server gateway. Please try asking again.";
      
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: "assistant",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      autoExpandQuery(replyText);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: "assistant",
        text: "I experienced a network disruption connecting with Budi's twin module. Please ensure the local gateway server of this portfolio is operating.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const loadPresetQuery = (text: string) => {
    setInput(text);
    autoExpandQuery(text);
  };

  const handleBookMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate || !bookingTimeSlot) {
      setBookingStatus('error');
      setBookingFeedback("Please fill in Name, Email, Topic, and choose a time.");
      return;
    }

    setBookingStatus('sending');
    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingName,
          email: bookingEmail,
          topic: bookingTopic || "Business consulting",
          date: bookingDate,
          timeSlot: bookingTimeSlot,
          type: bookingType,
          description: bookingDesc
        })
      });

      if (res.ok) {
        setBookingStatus('success');
        setBookingFeedback("Meeting scheduled and synced directly with Budi's schedule!");
        setBookingName("");
        setBookingEmail("");
        setBookingTopic("");
        setBookingDesc("");
        fetchCalendar();
      } else {
        const errData = await res.json();
        setBookingStatus('error');
        setBookingFeedback(errData.error || "Failed to schedule appointment.");
      }
    } catch (err: any) {
      setBookingStatus('error');
      setBookingFeedback(err.message || "Network failure connecting to scheduler.");
    }
  };

  const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  
  const isTimeSlotBooked = (dateStr: string, slotStr: string) => {
    return calendarEvents.some((ev: any) => {
      const evDate = ev.start.substring(0, 10);
      const evTime = ev.start.includes("T") ? ev.start.split("T")[1].substring(0, 5) : "";
      return evDate === dateStr && evTime === slotStr;
    });
  };

  const isWeekendString = (dateStr: string) => {
    if (!dateStr) return false;
    const day = new Date(dateStr).getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className="font-sans">
      {/* Floating Spark Launcher */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            id="btn-open-assistant-bubble"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border border-neutral-850 text-white rounded-full shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all text-xs font-semibold group cursor-pointer"
          >
            <Sparkles size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Ask more</span>
          </button>
        </div>
      )}

      {/* Centered Modal Backdrop & Panel Container (Digital Twin Hub Style) */}
      {isOpen && (
        <div 
          id="chat-modal-backdrop"
          className="fixed inset-0 bg-[#0c0d0e]/85 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4 transition-all"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div 
            id="chat-desk-container"
            className="bg-white border border-gray-150 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-all w-full max-w-[92%] sm:max-w-lg h-[80vh] max-h-[610px]"
          >
          {/* Header */}
          <div className="px-4 py-3 bg-neutral-900 text-white flex items-center justify-between shrink-0 font-sans">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <div>
                <p className="text-xs font-semibold">Budi's Portfolio Support Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-neutral-400 tracking-tight">Active Support Assistant</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button
                id="btn-close-assistant"
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-neutral-850 rounded transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Core Body Section split */}
          <div className="flex-1 flex overflow-hidden min-h-0">
            {/* Left Column: Chat Conversation Thread */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50/30">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[85%] ${
                      m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2.5 rounded-2xl text-xs leading-normal font-sans shadow-sm ${
                        m.sender === "user"
                          ? "bg-neutral-900 text-white rounded-tr-none"
                          : "bg-white border border-gray-150 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      {renderMessageContent(m.text)}
                    </div>
                    <span className="text-[9px] font-mono text-gray-400 mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 bg-white border border-gray-150 rounded-2xl rounded-tl-none px-3.5 py-3 max-w-[60px] shadow-sm ml-1">
                    <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>

              {/* Suggestions Presets list */}
              {messages.length === 1 && (
                <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto scroller-none shrink-0 min-h-[48px] items-center">
                  <button
                    id="btn-preset-problem"
                    onClick={() => loadPresetQuery("I am facing an operational bottleneck. What details do you need about my problem to design a custom automation workflow or database structure for me?")}
                    className="shrink-0 text-[10px] font-medium bg-neutral-50 border border-gray-150 px-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-gray-700"
                  >
                    🔧 Propose custom solutions for my operational problems
                  </button>
                  <button
                    id="btn-preset-details"
                    onClick={() => loadPresetQuery("I have a technical or business workflow bottleneck. What details do you need to design or automate a solution for me?")}
                    className="shrink-0 text-[10px] font-medium bg-neutral-50 border border-gray-150 px-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-gray-700"
                  >
                    💡 Help clarify my workflow problem and define the scope
                  </button>
                </div>
              )}

              {/* Chat Textbox Form */}
              <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
                <input
                  id="assistant-textbox-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about Budi's experience..."
                  className="flex-1 font-sans text-xs px-3 py-2.5 rounded-xl border border-gray-200 bg-neutral-50 text-gray-855 placeholder-gray-400 focus:outline-none focus:border-neutral-900 transition-colors"
                />
                <button
                  id="btn-send-message-assistant"
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 bg-neutral-900 text-white rounded-xl active:scale-95 disabled:scale-100 disabled:bg-neutral-100 disabled:pointer-events-none disabled:text-neutral-300 transition-all cursor-pointer shrink-0"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>

            {/* Right Column: Intelligent Companion Workspace (Visible when maximized on sm+ view screens) */}
            {false && isExpanded && (
              <div id="companion-workspace-pane" className="hidden sm:flex w-[380px] md:w-[480px] border-l border-gray-150 bg-neutral-50/40 flex-col overflow-hidden animate-in fade-in duration-200">
                {/* Horizontal Tab Selections */}
                <div className="px-4 py-2.5 border-b border-gray-150 bg-white flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 uppercase">
                    ⚡ DIRECT GOOGLE SYNC RESERVATION
                  </span>
                  
                  <span className={`text-[8.5px] font-mono font-bold px-2 py-0.5 rounded ${
                    calendarEvents.some((ev: any) => ev.id && ev.id.startsWith("gcal_"))
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                      : "bg-blue-50 text-blue-700 border border-blue-100"
                  }`}>
                    {calendarEvents.some((ev: any) => ev.id && ev.id.startsWith("gcal_"))
                      ? "● GOOGLE CALENDAR SYNCED" 
                      : "● LOCAL ACTIVE SLOT ENGINE"}
                  </span>
                </div>

                {/* Direct Calendar booking form only */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="bg-white border border-gray-150 rounded-xl p-3.5 shadow-sm space-y-3">
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                      Coordinate a 60-minute business or academic session directly below. Already locked events from Budi's connected Google accounts will block slots live.
                    </p>
                    
                    <form onSubmit={handleBookMeeting} className="space-y-3 pt-1">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-gray-450 mb-0.5">Date</label>
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split("T")[0]}
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full text-xs font-mono border border-gray-200 px-2 py-1.5 rounded bg-neutral-25/50 text-gray-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-gray-450 mb-0.5 font-bold">Meeting Style</label>
                          <div className="grid grid-cols-2 gap-1">
                            <button
                              type="button"
                              onClick={() => setBookingType('online')}
                              className={`text-[9px] font-mono font-bold py-1.5 rounded border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
                                bookingType === 'online'
                                  ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                                  : 'bg-white border-gray-200 text-gray-500 hover:bg-neutral-50'
                              }`}
                            >
                              Online
                            </button>
                            <button
                              type="button"
                              onClick={() => setBookingType('offline')}
                              className={`text-[9px] font-mono font-bold py-1.5 rounded border flex items-center justify-center gap-0.5 cursor-pointer transition-colors ${
                                bookingType === 'offline'
                                  ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                                  : 'bg-white border-gray-200 text-gray-500 hover:bg-neutral-50'
                              }`}
                            >
                              Tokyo
                            </button>
                          </div>
                        </div>
                      </div>

                      {isWeekendString(bookingDate) ? (
                        <div className="p-2 bg-amber-55/10 rounded text-[10px] font-mono text-center text-amber-700 border border-amber-500/20">
                          ⚠️ Weekend selected. Please select a weekday slot.
                        </div>
                      ) : (
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-gray-450 mb-1 flex items-center justify-between">
                            <span>Tokyo Working Slots (JST)</span>
                            {fetchingCalendar && <span className="text-[7px] animate-pulse text-indigo-600 font-bold">RELOADING...</span>}
                          </label>
                          <div className="grid grid-cols-3 gap-1">
                            {TIME_SLOTS.map((slot) => {
                              const isBooked = isTimeSlotBooked(bookingDate, slot);
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  disabled={isBooked}
                                  onClick={() => setBookingTimeSlot(slot)}
                                  className={`text-[9px] font-mono py-1 rounded border transition-colors disabled:opacity-40 disabled:line-through cursor-pointer ${
                                    bookingTimeSlot === slot && !isBooked
                                      ? 'bg-indigo-600 border-indigo-600 text-white font-bold'
                                      : isBooked
                                      ? 'bg-neutral-100 text-gray-400 border-gray-150'
                                      : 'bg-white border-gray-200 text-gray-650 hover:bg-neutral-50'
                                  }`}
                                >
                                  {slot} {isBooked && "🚫"}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 font-sans text-xs">
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-gray-450 mb-0.5 font-bold">Name *</label>
                          <input
                            type="text"
                            required
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            placeholder="Satoshi N."
                            className="w-full text-xs font-sans border border-gray-200 px-2 py-1.5 bg-neutral-25/50 text-gray-808 rounded focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono uppercase text-gray-450 mb-0.5 font-bold">Email *</label>
                          <input
                            type="email"
                            required
                            value={bookingEmail}
                            onChange={(e) => setBookingEmail(e.target.value)}
                            placeholder="satoshi@bitcoin.org"
                            className="w-full text-xs font-sans border border-gray-200 px-2 py-1.5 bg-neutral-25/50 text-gray-808 rounded focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="font-sans text-xs">
                        <label className="block text-[8px] font-mono uppercase text-[#6b7280] mb-0.5 font-bold">Topic / Subject *</label>
                        <input
                          type="text"
                          required
                          value={bookingTopic}
                          onChange={(e) => setBookingTopic(e.target.value)}
                          placeholder="e.g. AI-DX Consulting or MBA Mentoring"
                          className="w-full text-xs font-sans border border-gray-200 px-2.5 py-1.5 bg-neutral-25/50 text-gray-805 rounded focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={bookingStatus === 'sending' || isWeekendString(bookingDate)}
                        className="w-full bg-[#111317] hover:bg-black text-white rounded font-sans text-[10px] font-bold py-2 transition-transform cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        {bookingStatus === 'sending' ? (
                          <RefreshCw size={10} className="animate-spin" />
                        ) : (
                          <>
                            <Calendar size={11} />
                            <span>Schedule Slot Now</span>
                          </>
                        )}
                      </button>

                      {bookingStatus === 'success' && (
                        <div className="p-2 bg-emerald-50 border border-emerald-150 rounded text-[10px] text-emerald-800 flex items-start gap-1.5">
                          <CheckCircle2 size={12} className="shrink-0 mt-0.5 text-emerald-600" />
                          <p className="font-sans leading-relaxed">{bookingFeedback}</p>
                        </div>
                      )}

                      {bookingStatus === 'error' && (
                        <div className="p-2 bg-rose-50 border border-rose-150 rounded text-[10px] text-rose-850 flex items-start gap-1.5">
                          <AlertCircle size={12} className="shrink-0 mt-0.5 text-rose-600" />
                          <p className="font-sans leading-relaxed">{bookingFeedback}</p>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

