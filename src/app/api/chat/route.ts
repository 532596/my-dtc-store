import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT =
  "你是 Smart Standing Desk（智能升降桌）官网的中文智能客服。回答要简洁、专业、友好。可介绍产品系列、升降桌常识、订单与售后的一般说明；若涉及具体订单号、支付状态、物流单号等，请建议用户登录账户或前往「订单跟踪」页面查询。不要编造不存在的政策或价格。若问题与家具/升降桌无关，礼貌说明你的职责范围。";

type Body = {
  messages?: { role: "user" | "assistant" | "system"; content: string }[];
};

export async function POST(request: NextRequest) {
  const base =
    process.env.OLLAMA_BASE_URL?.replace(/\/$/, "") || "http://127.0.0.1:11434";
  const model = process.env.OLLAMA_MODEL || "qwen2.5:7b";

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "无效的 JSON" }, { status: 400 });
  }

  const incoming = body.messages?.filter(
    (m) => m && (m.role === "user" || m.role === "assistant") && m.content?.trim()
  );
  if (!incoming?.length) {
    return NextResponse.json({ error: "缺少消息内容" }, { status: 400 });
  }

  const ollamaMessages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...incoming.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.trim(),
    })),
  ];

  try {
    const res = await fetch(`${base}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: ollamaMessages,
        stream: false,
      }),
      signal: AbortSignal.timeout(120_000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Ollama error:", res.status, errText);
      return NextResponse.json(
        {
          error: "模型服务暂时不可用，请确认本机已启动 Ollama 且已拉取模型（见项目说明）。",
          detail: errText.slice(0, 200),
        },
        { status: 502 }
      );
    }

    const data = (await res.json()) as {
      message?: { role?: string; content?: string };
    };
    const content = data.message?.content?.trim();
    if (!content) {
      return NextResponse.json(
        { error: "模型未返回有效内容" },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: content });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error:
          "无法连接 Ollama。请确认已在电脑上安装并运行 Ollama，且 .env.local 中地址与模型名正确。",
      },
      { status: 503 }
    );
  }
}
