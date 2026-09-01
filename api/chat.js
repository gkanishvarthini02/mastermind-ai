export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "OPENAI_API_KEY is not configured in Vercel."
    });
  }

  try {
    const {
      message = "",
      image = null,
      history = []
    } = req.body || {};

    const cleanMessage =
      String(message).trim() || "Please analyze the attached image.";

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-12)
      : [];

    // Build conversation history
    const input = safeHistory.map((item) => ({
      role: item.role,
      content: [
        {
          type:
            item.role === "assistant"
              ? "output_text"
              : "input_text",
          text: item.content
        }
      ]
    }));

    // Current user message
    const currentContent = [
      {
        type: "input_text",
        text: cleanMessage
      }
    ];

    // Add image if provided
    if (
      typeof image === "string" &&
      image.startsWith("data:image/")
    ) {
      currentContent.push({
        type: "input_image",
        image_url: image
      });
    }

    input.push({
      role: "user",
      content: currentContent
    });

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-5.6-luna",

          instructions:
            "You are MasterMind AI, a capable multilingual assistant. " +
            "Address the user respectfully as Founder when natural. " +
            "Answer the actual question directly and naturally. " +
            "Match the user's language: Tamil, Tanglish, English, or mixed. " +
            "Use clear headings and bullets when useful. " +
            "If an image is attached, analyze it carefully. " +
            "Never claim to have performed an action that you did not perform.",

          input: input,

          max_output_tokens: 2000
        })
      }
    );

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI API error:", data);

      return res.status(openaiResponse.status).json({
        error:
          data?.error?.message ||
          "OpenAI request failed."
      });
    }

    const reply =
      data.output_text ||
      data.output
        ?.flatMap((item) => item.content || [])
        ?.filter((part) => part.type === "output_text")
        ?.map((part) => part.text)
        ?.join("\n") ||
      "";

    if (!reply.trim()) {
      return res.status(502).json({
        error: "OpenAI returned an empty response."
      });
    }

    return res.status(200).json({
      reply: reply.trim()
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
