import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

(() => {
  const MODEL = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
  const launcher = document.getElementById("mk-ai-launcher");
  const panel = document.getElementById("mk-ai-panel");
  const closeBtn = document.getElementById("mk-ai-close");
  const newBtn = document.getElementById("mk-ai-new");
  const form = document.getElementById("mk-ai-form");
  const input = document.getElementById("mk-ai-input");
  const messagesEl = document.getElementById("mk-ai-messages");
  const sendBtn = document.getElementById("mk-ai-send");
  const titleEl = document.querySelector(".mk-ai-title");
  const subEl = document.querySelector(".mk-ai-sub");
  if (!launcher || !panel || !form) return;

  let engine = null;
  let loading = false;
  let busy = false;
  let messages = [];

  const escapeText = (text) => String(text).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));

  function addBubble(role, text) {
    const row = document.createElement("div");
    row.className = `mk-ai-row ${role}`;
    const bubble = document.createElement("div");
    bubble.className = "mk-ai-bubble";
    bubble.innerHTML = escapeText(text).replace(/\n/g, "<br>");
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return row;
  }

  function addTyping(label = "") {
    const row = document.createElement("div");
    row.className = "mk-ai-row assistant";
    row.id = "mk-ai-typing-row";
    row.innerHTML = `<div class="mk-ai-bubble"><span class="mk-ai-typing"><i></i><i></i><i></i></span>${label ? `<span class="mk-ai-status">${escapeText(label)}</span>` : ""}</div>`;
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function updateTyping(label) {
    const el = document.querySelector("#mk-ai-typing-row .mk-ai-status");
    if (el) el.textContent = label;
  }

  function removeTyping() { document.getElementById("mk-ai-typing-row")?.remove(); }

  function resetChat() {
    messages = [];
    messagesEl.innerHTML = `<div class="mk-ai-welcome"><h3>How can I help?</h3><p>This AI runs directly in your browser. Ask questions, explain concepts, help with writing, reasoning, coding and more.</p><div class="mk-ai-free-note">No API key. No subscription.</div></div>`;
    input.focus();
  }

  function openChat() {
    panel.classList.add("is-open");
    launcher.setAttribute("aria-expanded", "true");
    setTimeout(() => input.focus(), 80);
    if (!engine && !loading) loadModel();
  }

  function closeChat() {
    panel.classList.remove("is-open");
    launcher.setAttribute("aria-expanded", "false");
  }

  async function loadModel() {
    if (engine || loading) return;
    if (!("gpu" in navigator)) {
      titleEl.textContent = "AI Assistant";
      subEl.textContent = "WebGPU not supported";
      addBubble("assistant", "This browser does not support WebGPU, which this free browser-based AI needs. Please use a recent version of Chrome, Edge, or Safari on a compatible device.");
      return;
    }

    loading = true;
    sendBtn.disabled = true;
    subEl.textContent = "Loading AI model…";
    addTyping("First load may take a while; the model is cached afterward.");

    try {
      engine = await CreateMLCEngine(MODEL, {
        initProgressCallback: (progress) => {
          const text = progress?.text || "Loading AI model…";
          updateTyping(text);
          subEl.textContent = text.length > 34 ? "Preparing AI…" : text;
        }
      });
      removeTyping();
      subEl.textContent = "Runs in your browser • Free";
      addBubble("assistant", "I'm ready. Ask me anything.");
    } catch (error) {
      console.error(error);
      removeTyping();
      subEl.textContent = "Model could not load";
      addBubble("assistant", "I couldn't load the free AI model on this device. Please try a current Chrome, Edge, or Safari browser with WebGPU enabled and enough available memory.");
    } finally {
      loading = false;
      sendBtn.disabled = false;
    }
  }

  launcher.addEventListener("click", () => panel.classList.contains("is-open") ? closeChat() : openChat());
  closeBtn.addEventListener("click", closeChat);
  newBtn.addEventListener("click", resetChat);

  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 110) + "px";
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;

    if (!engine) {
      openChat();
      if (loading) {
        addBubble("assistant", "The AI is still loading. Please wait a moment and send your question again.");
      }
      return;
    }

    busy = true;
    sendBtn.disabled = true;
    input.value = "";
    input.style.height = "auto";
    messages.push({ role: "user", content: text });
    addBubble("user", text);
    addTyping();

    try {
      const reply = await engine.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful, accurate, direct general-purpose AI assistant embedded on Mukesh Parankusam's personal website. Answer the user's question naturally. Do not pretend to have live web access. If you are uncertain, say so. Prefer clear explanations and useful answers. You can answer questions, explain concepts, help with writing, coding, reasoning, translation, and general knowledge." },
          ...messages
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 700
      });
      removeTyping();
      const answer = reply?.choices?.[0]?.message?.content?.trim() || "I couldn't generate a response.";
      messages.push({ role: "assistant", content: answer });
      addBubble("assistant", answer);
    } catch (error) {
      console.error(error);
      removeTyping();
      addBubble("assistant", "I couldn't generate a response right now. Please try again.");
    } finally {
      busy = false;
      sendBtn.disabled = false;
      input.focus();
    }
  });

  resetChat();
})();
