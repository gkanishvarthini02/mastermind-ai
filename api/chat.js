export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "OPENAI_API_KEY is missing in Vercel."
    });
  }

  try {
    const body = req.body || {};
    const message = String(body.message || "").trim();
    const image = body.image || null;
    const history = Array.isArray(body.history) ? body.history : [];

    const input = [];

    for (const item of history.slice(-12)) {
      if (
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string"
      ) {
        input.push({
          role: item.role,
          content: item.content
        });
      }
    }

    const currentMessage = [];

    currentMessage.push({
      type: "input_text",
      text: message || "Please help me with this."
    });

    if (
      typeof image === "string" &&
      image.startsWith("data:image/")
    ) {
      currentMessage.push({
        type: "input_image",
        image_url: image
      });
    }

    input.push({
      role: "user",
      content: currentMessage
    });

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-5.6-luna",

          instructions: `
You are MasterMind AI.

Give high-quality, natural answers like a modern AI assistant.

Understand Tamil, Tanglish, English and mixed language.

Reply in the same language style used by the user.

Be helpful, accurate, friendly and direct.

Remember the conversation context when answering.

For coding questions, provide working code with clear explanations when needed.

For image questions, carefully analyze the image before answering.

Do not give fake information.

Do not use repetitive fallback messages.

Do not say that information is being "integrated" or "processed" instead of answering.

Address the user as Founder only when it feels natural.
`,

          input: input,

          max_output_tokens: 3000
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenAI API request failed."
      });
    }

    let reply = "";

    if (data.output_text) {
      reply = data.output_text;
    } else if (Array.isArray(data.output)) {
      for (const item of data.output) {
        if (Array.isArray(item.content)) {
          for (const part of item.content) {
            if (
              part.type === "output_text" &&
              part.text
            ) {
              reply += part.text;
            }
          }
        }
      }
    }

    reply = reply.trim();

    if (!reply) {
      return res.status(502).json({
        error: "AI returned an empty response."
      });
    }

    return res.status(200).json({
      reply: reply
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "Unexpected server error."
    });
  }
}
