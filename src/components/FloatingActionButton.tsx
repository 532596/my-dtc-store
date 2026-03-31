"use client";

import * as React from "react";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";

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
  const [sending, setSending] = React.useState(false);
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
  }, [messages, open, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    const userMsg: ChatMessage = { id: createId(), role: "user", text };
    const nextThread = [...messages, userMsg];
    setInput("");
    setMessages(nextThread);
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextThread.map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error || "请求失败");
      }
      const reply = data.reply?.trim();
      if (!reply) throw new Error("未收到回复");
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "assistant", text: reply },
      ]);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "暂时无法连接智能客服，请稍后再试。";
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          text: msg.includes("fetch")
            ? "网络异常，请检查是否已启动本机 Ollama 与网站服务。"
            : msg,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-0">
      <div
        ref={panelRef}
        className={`mb-3 flex w-[min(calc(100vw-2.5rem),368px)] flex-col overflow-hidden rounded-[22px] border border-zinc-200/60 bg-white/85 shadow-[0_12px_48px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-black/[0.03] transition-[max-height,opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "max-h-[min(72vh,500px)] translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-1 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="智能客服"
        aria-hidden={!open}
      >
        {/* 顶栏：渐变 + AI 标识 + 在线状态，弱化「表单感」 */}
        <div className="relative shrink-0 overflow-hidden border-b border-zinc-200/50 bg-gradient-to-b from-zinc-50/90 via-white/70 to-white/40 px-5 pb-4 pt-4">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5b6b7a]/25 to-transparent"
            aria-hidden
          />
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="relative shrink-0">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#8a9aaa]/35 via-[#6b7c8c]/20 to-transparent opacity-80 blur-[1px]" aria-hidden />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-zinc-100/90 shadow-sm ring-1 ring-zinc-200/60">
                  <Sparkles className="h-[18px] w-[18px] text-[#5b6b7a]" strokeWidth={1.5} aria-hidden />
                </div>
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900">
                    智能客服
                  </h2>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-[#5b6b7a]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#4a5568]">
                    <Bot className="h-2.5 w-2.5" strokeWidth={2} aria-hidden />
                    AI
                  </span>
                </div>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-zinc-600">在线</span>
                  </span>
                  <span className="text-zinc-400">·</span>
                  <span>工作日 9:00–18:00</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/80 hover:text-zinc-700"
              aria-label="关闭聊天窗口"
            >
              <X className="h-[17px] w-[17px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* 消息区：浅渐变底 + 助手侧带头像，增强「对话感」 */}
        <div
          ref={listRef}
          className="min-h-[196px] max-h-[min(38vh,272px)] flex-1 overflow-y-auto overscroll-contain bg-gradient-to-b from-zinc-50/80 via-white to-zinc-50/40 px-4 py-4 [scrollbar-width:thin]"
        >
          <div className="space-y-5">
            {messages.map((m) =>
              m.role === "assistant" ? (
                <div key={m.id} className="flex gap-2.5">
                  <div
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-200/90 to-zinc-100 shadow-sm ring-1 ring-white/80"
                    aria-hidden
                  >
                    <Bot className="h-3.5 w-3.5 text-zinc-600" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                      AI 助手
                    </p>
                    <div className="rounded-2xl rounded-tl-md border border-zinc-200/70 bg-white/95 px-3.5 py-2.5 text-[13px] leading-[1.55] tracking-tight text-zinc-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                      {m.text}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[88%] rounded-2xl rounded-tr-md bg-zinc-900 px-3.5 py-2.5 text-[13px] leading-[1.55] tracking-tight text-white shadow-sm">
                    {m.text}
                  </div>
                </div>
              )
            )}
            {sending && (
              <div className="flex gap-2.5 pl-9">
                <p className="text-[12px] text-zinc-400">正在生成回复…</p>
              </div>
            )}
          </div>
        </div>

        {/* 输入区 */}
        <div className="shrink-0 border-t border-zinc-200/50 bg-white/60 px-4 pb-4 pt-3 backdrop-blur-sm">
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
                  void send();
                }
              }}
              disabled={sending}
              placeholder="输入您的问题…"
              className="max-h-24 min-h-[44px] flex-1 resize-none rounded-2xl border-0 bg-white/95 px-4 py-3 text-[13px] text-zinc-900 shadow-inner shadow-zinc-900/[0.03] ring-1 ring-inset ring-zinc-200/70 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5b6b7a]/25 disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={!input.trim() || sending}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="发送"
            >
              <Send className="h-[17px] w-[17px]" strokeWidth={1.5} />
            </button>
          </div>
          <p className="mt-3 text-center text-[10px] font-normal tracking-wide text-zinc-400">
            回复由本机 Ollama 模型生成 · 请勿输入隐私信息
          </p>
        </div>
      </div>

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
