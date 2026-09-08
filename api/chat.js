export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not configured."
    });
  }

  try {
    const { message, image, history, domain } = req.body || {};

    if (!message && !image) {
      return res.status(400).json({
        error: "Message or image is required."
      });
    }

    const contents = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-20)) {
        if (!item || !item.content) continue;

        contents.push({
          role: item.role === "assistant" ? "model" : "user",
          parts: [
            {
              text: String(item.content)
            }
          ]
        });
      }
    }

    const parts = [];

    if (message) {
      parts.push({
        text: String(message)
      });
    }

    if (image && typeof image === "string") {
      const match = image.match(
        /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
      );

      if (match) {
        parts.push({
          inline_data: {
            mime_type: match[1],
            data: match[2]
          }
        });
      }
    }

    contents.push({
      role: "user",
      parts
    });

    let domainInfo = "No specific domain is selected.";

    if (domain && typeof domain === "object") {
      domainInfo =
        "Selected MasterMind domain: " +
        String(domain.name || "") +
        ". Domain purpose: " +
        String(domain.desc || "") +
        ".";
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: `
You are MasterMind AI — the intelligent engine of MasterMind AI Omniverse Super App.

${domainInfo}

If a specific domain is selected, behave as a specialist in that domain.

Give answers that match the selected domain using:
- Correct terminology
- Relevant examples
- Practical guidance
- Domain-specific reasoning

Do not simply repeat the domain name.

PERSONALITY:
- Intelligent
- Friendly
- Practical
- Creative
- Precise
- Natural
- Helpful

LANGUAGE:
- Understand Tamil, Tanglish and English.
- Reply in the language the user naturally uses.
- If the user writes Tanglish, reply in comfortable Tanglish.
- Do not unnecessarily change languages.

IMPORTANT:
- Give clear and useful answers.
- Do not give generic filler.
- Never invent information.
- Do not pretend something was completed when it was not.
- When the user asks for steps, keep them simple.
- If the user asks for ONE step, give only ONE step.
- Understand conversation context.
- Be patient with beginners.

CODING:
- Give complete and usable code when appropriate.
- Never expose API keys or credentials.

IMAGE:
- Analyze only what can actually be determined from the image.
- Do not claim to identify a real person.
- Do not invent details that are not visible.

MOST IMPORTANT:
Help the user accomplish the actual task.
Prefer practical answers over unnecessary explanations.
`
              }
            ]
          },
          contents,
          generationConfig: {
            maxOutputTokens: 4096
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "Gemini request failed."
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.filter(part => part.text)
        ?.map(part => part.text)
        ?.join("") ||
      "Sorry, I couldn't generate a response.";

    return res.status(200).json({
      text
    });

  } catch (error) {
    console.error("MasterMind Gemini error:", error);

    return res.status(500).json({
      error: "Server error while contacting Gemini."
    });
  }
                
