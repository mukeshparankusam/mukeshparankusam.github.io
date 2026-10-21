export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGIN || "https://mukeshparankusam.co.in").split(",").map(x => x.trim());
    const corsOrigin = allowed.includes(origin) ? origin : allowed[0];
    const headers = {
      "Access-Control-Allow-Origin": corsOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    const url = new URL(request.url);
    if (url.pathname !== "/api/chat") return new Response("Not found", { status: 404, headers });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers });
    if (!env.OPENAI_API_KEY) return Response.json({ error: "AI service is not configured." }, { status: 503, headers });
    try {
      const body = await request.json();
      const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
      const input = messages.filter(m => ["user", "assistant"].includes(m.role) && typeof m.content === "string")
        .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));
      if (!input.length || input[input.length - 1].role !== "user") return Response.json({ error: "Please send a question." }, { status: 400, headers });
      const upstream = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "Authorization": `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-4.1-mini",
          instructions: "You are EMKAY AI, the website assistant for Mukesh Parankusam. Answer clearly and naturally about his work, Chemistry education, academic leadership, curriculum design, organizations, and publications. Do not invent private details, qualifications, achievements, or unavailable book contents. If you do not know something, say so. For unrelated questions, be helpful but concise.",
          input
        })
      });
      const raw = await upstream.json();
      if (!upstream.ok) return Response.json({ error: "AI provider request failed." }, { status: 502, headers });
      let reply = raw.output_text || "";
      if (!reply && Array.isArray(raw.output)) reply = raw.output.flatMap(o => o.content || []).filter(c => c.type === "output_text").map(c => c.text).join("\\n");
      return Response.json({ reply: reply || "I could not prepare a response. Please try again." }, { headers });
    } catch (e) {
      return Response.json({ error: "Invalid request or temporary service issue." }, { status: 400, headers });
    }
  }
};
