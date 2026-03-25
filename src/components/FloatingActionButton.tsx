"use client";

import * as React from "react";
import { MessageCircle, Send, X } from "lucide-react";

/** 悬浮球：低饱和中性色，避免高饱和渐变 */
const FAB_BG = "#3d3d3f";
const FAB_BG_HOVER = "#525254";

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
      <div
        ref={panelRef}
        className={`mb-3 flex w-[min(calc(100vw-2.5rem),360px)] flex-col overflow-hidden rounded-[22px] border border-zinc-200/70 bg-white/80 shadow-[0_12px_48px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-black/[0.03] transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "max-h-[min(72vh,500px)] translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-1 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="智能客服"
        aria-hidden={!open}
      >
        {/* 顶栏：克制分隔、留白 */}
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-200/60 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100/90 text-zinc-600">
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-medium tracking-tight text-zinc-900">
                智能客服
              </p>
              <p className="mt-0.5 text-[11px] font-normal tracking-wide text-zinc-500">
                工作日 9:00–18:00 在线
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="关闭聊天窗口"
          >
            <X className="h-[17px] w-[17px]" strokeWidth={1.5} />
          </button>
        </div>

        {/* 消息区 */}
        <div
          ref={listRef}
          className="min-h-[188px] max-h-[min(38vh,260px)] flex-1 overflow-y-auto overscroll-contain px-5 py-4 [scrollbar-width:thin]"
        >
          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-[18px] px-3.5 py-2.5 text-[13px] leading-[1.55] tracking-tight ${
                    m.role === "user"
                      ? "rounded-br-[6px] bg-zinc-900 text-white"
                      : "rounded-bl-[6px] bg-zinc-100/90 text-zinc-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 输入区 */}
        <div className="shrink-0 border-t border-zinc-200/60 bg-zinc-50/40 px-4 pb-4 pt-3">
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
              className="max-h-24 min-h-[44px] flex-1 resize-none rounded-2xl border-0 bg-white/90 px-4 py-3 text-[13px] text-zinc-900 shadow-inner shadow-zinc-900/5 ring-1 ring-inset ring-zinc-200/80 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300/60"
            />
            <button
              type="button"
              onClick={send}
              disabled={!input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="发送"
            >
              <Send className="h-[17px] w-[17px]" strokeWidth={1.5} />
            </button>
          </div>
          <p className="mt-3 text-center text-[10px] font-normal tracking-wide text-zinc-400">
            演示环境 · 消息仅供界面预览
          </p>
        </div>
      </div>

      {/* 悬浮球：中性深灰 + 轻阴影，克制不抢眼 */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full text-white shadow-[0_4px_24px_rgba(0,0,0,0.14),0_0_0_1px_rgba(255,255,255,0.12)_inset] transition-[transform,box-shadow] duration-200 hover:scale-[1.03] hover:shadow-[0_6px_28px_rgba(0,0,0,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
        style={{ background: open ? FAB_BG_HOVER : FAB_BG }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = FAB_BG_HOVER;
        }}
        onMouseLeave={(e) => {
          if (!open) e.currentTarget.style.background = FAB_BG;
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "关闭智能客服" : "打开智能客服"}
      >
        <MessageCircle className="h-[22px] w-[22px]" strokeWidth={1.5} aria-hidden />
      </button>
    </div>
  );
}
