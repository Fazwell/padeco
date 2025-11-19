// app/api/chat/route.ts
import { NextRequest } from "next/server";

export const runtime = "edge"; // blazing fast

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // ← FIXED: The official replacement (faster, smarter)
        messages: [
          {
            role: "system",
            content: "You are PADECO Assistant — friendly, smart, and concise.",
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Groq error:", res.status, error);
      return Response.json({ reply: "I'm having a hiccup... Try again!" });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    return Response.json({ reply: reply || "Hmm, I didn't catch that." });
  } catch (err) {
    console.error("Chat error:", err);
    return Response.json({ reply: "Oops! Lost connection. Refresh and try again." });
  }
}