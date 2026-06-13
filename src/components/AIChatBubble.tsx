import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Sparkles, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with a friendly welcome message on first mount
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "assistant",
        text: "Hi! I'm Budi's Digital twin. Ask me anything about his structural design work, coding experience, technology choices, or schedule availability. Let's build something beautiful!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Scroll to bottom on updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

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
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Floating Spark Launcher */}
      {!isOpen && (
        <button
          id="btn-open-assistant-bubble"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-full shadow-2xl hover:bg-neutral-850 hover:scale-105 active:scale-95 transition-all text-xs font-semibold group cursor-pointer"
        >
          <Sparkles size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Ask Digital Twin</span>
        </button>
      )}

      {/* Expanded Interactive Desk */}
      {isOpen && (
        <div 
          id="chat-desk-container"
          className="w-[340px] sm:w-[380px] h-[500px] bg-white border border-gray-150 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-200"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-neutral-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400" />
              <div>
                <p className="text-xs font-semibold">Budi's Copilot</p>
                <div className="flex items-center gap-1.5 lines-none mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-neutral-400 tracking-tight">Active Online</span>
                </div>
              </div>
            </div>
            <button
              id="btn-close-assistant"
              onClick={() => setIsOpen(false)}
              className="p-1 mr-[-4px] text-gray-400 hover:text-white rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Message Thread container */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50/50">
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
                  {m.text}
                </div>
                <span className="text-[9px] font-mono text-gray-450 mt-1 px-1">
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

          {/* Prompt Presets suggestions */}
          {messages.length === 1 && (
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto scroller-none">
              <button
                id="btn-preset-tech"
                onClick={() => loadPresetQuery("What technologies do you enjoy working with?")}
                className="shrink-0 text-[10px] font-medium bg-neutral-50 border border-gray-150 px-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-gray-700"
              >
                What tools do you use?
              </button>
              <button
                id="btn-preset-notion"
                onClick={() => loadPresetQuery("Can you explain how this Notion synchronization is structured?")}
                className="shrink-0 text-[10px] font-medium bg-neutral-50 border border-gray-150 px-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-gray-700"
              >
                Explain Notion Sync
              </button>
              <button
                id="btn-preset-contact"
                onClick={() => loadPresetQuery("Tell me Budi's LinkedIn and Github info.")}
                className="shrink-0 text-[10px] font-medium bg-neutral-50 border border-gray-150 px-2.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-gray-700"
              >
                Where is his LinkedIn?
              </button>
            </div>
          )}

          {/* Form message sender */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              id="assistant-textbox-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 font-sans text-xs px-3 py-2.5 rounded-xl border border-gray-200 bg-neutral-50 text-gray-850 placeholder-gray-400 focus:outline-none focus:border-neutral-900 transition-colors"
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
      )}
    </div>
  );
}
