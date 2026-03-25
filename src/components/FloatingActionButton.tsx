"use client";

import * as React from "react";
import { MessageCircle, Send, X } from "lucide-react";

const FAB_GRADIENT = "linear-gradient(135deg, #88b8cc 0%, #72a4b8 50%, #5e94a8 100%)";
const FAB_GRADIENT_HOVER = "linear-gradient(135deg, #78b0c4 0%, #6298ac 100%)";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function FloatingActionButton() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text:
        "您好！我是 Smart Standing Desk 智能客服，可以帮您了解产品、订单与售后。有什么问题尽管问～",
    },
  ]);

  const panelRef = React.useRef<HTMLDivElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || btnRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  React.useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { id: createId(), role: "user", text }]);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: "感谢您的留言。当前为演示环境，消息不会发往真实客服；正式接入后可在此对接工单或在线人工。",
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-0">
      {/* 聊天面板：高度与透明度过渡，自底部向上展开感 */}
      <div
        ref={panelRef}
        className={`mb-3 flex w-[min(calc(100vw-3rem),380px)] flex-col overflow-hidden rounded-2xl border border-warm-gray/25 bg-white shadow-2xl shadow-warm-gray/20 transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "max-h-[min(72vh,520px)] translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-1 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="智能客服"
        aria-hidden={!open}
      >
        {/* 顶部：标题 + 关闭 */}
        <div className="flex shrink-0 items-center justify-between border-b border-warm-gray/15 bg-warm-white/95 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
              <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">智能客服</p>
              <p className="text-[11px] text-warm-muted">工作日 9:00–18:00 在线</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-warm-muted transition hover:bg-warm-gray/30 hover:text-foreground"
            aria-label="关闭聊天窗口"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* 中部：可滚动消息 */}
        <div
          ref={listRef}
          className="min-h-[200px] max-h-[min(40vh,280px)] flex-1 overflow-y-auto overscroll-contain px-4 py-3"
        >
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-accent text-white"
                      : "rounded-bl-md bg-warm-gray/15 text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部：输入 + 发送 */}
        <div className="shrink-0 border-t border-warm-gray/15 bg-warm-gray/5 p-3">
          <div className="flex items-end gap-2">
            <label htmlFor="fab-chat-input" className="sr-only">
              输入消息
            </label>
            <textarea
              id="fab-chat-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="输入您的问题…"
              className="max-h-24 min-h-[44px] flex-1 resize-none rounded-xl border border-warm-gray/40 bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-warm-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="button"
              onClick={send}
              disabled={!input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="发送"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-warm-muted">
            演示环境 · 消息仅供界面预览
          </p>
        </div>
      </div>

      {/* 悬浮球 */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        style={{ background: open ? FAB_GRADIENT_HOVER : FAB_GRADIENT }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = FAB_GRADIENT_HOVER;
        }}
        onMouseLeave={(e) => {
          if (!open) e.currentTarget.style.background = FAB_GRADIENT;
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "关闭智能客服" : "打开智能客服"}
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}
