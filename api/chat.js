export default async function handler(req, res) {
  // CORS & Method Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, image, history, domain } = req.body || {};

  if (!message && !image) {
    return res.status(400).json({
      error: 'Message or image is required'
    });
  }

  // 🔐 Gemini API key — Vercel Environment Variable மட்டும்
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is missing in Vercel Environment Variables.'
    });
  }

  // 🧠 MasterMind AI System Instruction
  let systemText = `You are MasterMind AI, an intelligent, authentic and versatile AI super app.

Address the user respectfully as "Founder" or in friendly, clear natural Tamil.
Use English when technical terms are more appropriate.

Always provide:
- Direct answers
- Clear structure
- Concrete information
- Useful examples when needed
- Natural Tamil conversation

Do not give unnecessary excuses.
Do not ask unnecessary counter-questions.
When the user asks you to create something, provide the complete requested result rather than only an outline.`;

  // 🌐 Active Domain Context
  if (domain && domain.name) {
    systemText += `

Current Active Domain:
${domain.name}

Domain Description:
${domain.desc || ''}

Parent Domain:
${domain.parent || ''}

Tailor your answer according to this domain and specialist context.`;
  }

  try {
    const contents = [];

    // System instruction
    contents.push({
      role: 'user',
      parts: [
        {
          text: systemText
        }
      ]
    });

    contents.push({
      role: 'model',
      parts: [
        {
          text: 'சரி Founder. MasterMind AI தயாராக இருக்கிறது. உங்கள் கேள்விக்கு துல்லியமான பதிலை வழங்குகிறேன்.'
        }
      ]
    });

    // 💬 Previous conversation
    if (Array.isArray(history)) {
      for (const turn of history.slice(-10)) {

        if (
          turn &&
          turn.role === 'user' &&
          turn.content
        ) {
          contents.push({
            role: 'user',
            parts: [
              {
                text: String(turn.content)
              }
            ]
          });
        }

        else if (
          turn &&
          turn.role === 'assistant' &&
          turn.content
        ) {
          contents.push({
            role: 'model',
            parts: [
              {
                text: String(turn.content)
              }
            ]
          });
        }
      }
    }

    // 📝 Current message
    const currentParts = [];

    if (message) {
      currentParts.push({
        text: String(message)
      });
    }

    // 🖼️ Image / Photo
    if (
      typeof image === 'string' &&
      image.startsWith('data:')
    ) {
      const match = image.match(
        /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/s
      );

      if (match) {
        currentParts.push({
          inline_data: {
            mime_type: match[1],
            data: match[2]
          }
        });
      }
    }

    contents.push({
      role: 'user',
      parts: currentParts
    });

    // 🚀 Gemini API
    const geminiUrl =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent';

    let lastError = 'Gemini request failed.';

    // 🔄 Retry temporary errors
    for (let attempt = 0; attempt < 4; attempt++) {

      try {

        const geminiResponse = await fetch(
          geminiUrl,
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': apiKey
            },

            body: JSON.stringify({
              contents,

              generationConfig: {
                maxOutputTokens: 4096
              }
            })
          }
        );

        const data =
          await geminiResponse
            .json()
            .catch(() => ({}));

        // ✅ Success
        if (geminiResponse.ok) {

          const aiReply =
            data?.candidates?.[0]?.content?.parts
              ?.map(part => part?.text || '')
              .join('')
              .trim();

          if (aiReply) {
            return res.status(200).json({
              text: aiReply
            });
          }

          lastError =
            'Gemini returned an empty response.';
        }

        // ❌ API error
        else {

          lastError =
            data?.error?.message ||
            `Gemini request failed (${geminiResponse.status})`;

          // Retry only temporary errors
          if (
            geminiResponse.status !== 429 &&
            geminiResponse.status !== 503
          ) {
            break;
          }
        }

      } catch (error) {

        lastError =
          error?.message ||
          'Network error while contacting Gemini.';
      }

      // ⏳ Exponential backoff
      if (attempt < 3) {
        await new Promise(resolve =>
          setTimeout(
            resolve,
            800 * Math.pow(2, attempt)
          )
        );
      }
    }

    // ❌ All attempts failed
    return res.status(503).json({
      error: lastError
    });

  } catch (error) {

    return res.status(500).json({
      error:
        error?.message ||
        'Internal AI Server Error'
    });
  }
}
