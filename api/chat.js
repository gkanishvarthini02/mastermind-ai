export default async function handler(req, res) {
  // CORS & Method Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, image, history, domain } = req.body || {};

  if (!message && !image) {
    return res.status(400).json({ error: 'Message or image is required' });
  }

  // Vercel Environment Variables-ல் இருந்து GEMINI_API_KEY எடுக்கப்படும்
  // கொடுக்கப்படாவிட்டால் fallback ஆக ஏற்கனவே உள்ள key பயன்படுத்தப்படும்
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyD-2ilciYExRLjbmPqFU76oRF0Htz3HLJc";

  // System Instruction: நேச்சுரலான தமிழ் உரையாடல் & டொமைன் சார்ந்த துல்லியமான பதில்கள்
  let systemText = `You are MasterMind AI, an intelligent, authentic, and versatile AI super app. 
Address the user respectfully as 'Founder' or friendly in clear, natural Tamil (and English where technical terms apply).
Always provide direct, structured, concrete, and helpful answers without counter-questions or canned excuses.`;

  if (domain && domain.name) {
    systemText += `\nCurrent Active Domain Context: ${domain.name} (${domain.desc || ''}, Parent: ${domain.parent || ''}). Tailor your depth and output to this domain.`;
  }

  try {
    const contents = [];

    // System prompt-ஐ முதல் அறிவுறுத்தலாக சேர்த்தல்
    contents.push({
      role: 'user',
      parts: [{ text: systemText }]
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'சரி Founder, நான் தயாராக இருக்கிறேன். உங்கள் கேள்விக்குத் துல்லியமான பதிலை வழங்குகிறேன்.' }]
    });

    // முந்தைய உரையாடல் வரலாறு (Chat History) சேர்த்தல்
    if (Array.isArray(history)) {
      for (const turn of history.slice(-10)) {
        if (turn.role === 'user' && turn.content) {
          contents.push({
            role: 'user',
            parts: [{ text: String(turn.content) }]
          });
        } else if (turn.role === 'assistant' && turn.content) {
          contents.push({
            role: 'model',
            parts: [{ text: String(turn.content) }]
          });
        }
      }
    }

    // தற்போதைய கேள்வி மற்றும் இமேஜ் (Multimodal)
    const currentParts = [];
    if (message) {
      currentParts.push({ text: message });
    }

    if (image && typeof image === 'string' && image.startsWith('data:')) {
      const match = image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
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

    // Google Gemini 1.5 Flash REST API அழைப்பு
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (geminiResponse.ok) {
      const data = await geminiResponse.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiReply) {
        return res.status(200).json({ text: aiReply });
      }
    }

    // Fallback: Gemini API தடைபட்டால் அதிவேக Backup Multi-Model Engine
    const fallbackSys = encodeURIComponent("You are MasterMind AI. Address user as Founder. Give immediate, deep, professional, concrete answers in natural Tamil.");
    const fallbackRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(message || 'Photo analysis')}?system=${fallbackSys}`);
    
    if (fallbackRes.ok) {
      const fallbackText = await fallbackRes.text();
      if (fallbackText && fallbackText.length > 5) {
        return res.status(200).json({ text: fallbackText });
      }
    }

    throw new Error('All AI engines failed to generate response.');

  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Internal AI Server Error'
    });
  }
}
