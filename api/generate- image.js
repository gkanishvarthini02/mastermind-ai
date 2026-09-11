export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey =
    process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not configured"
    });
  }

  const { prompt } = req.body || {};

  if (!prompt) {
    return res.status(400).json({
      error: "Image prompt is required"
    });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: String(prompt)
                }
              ]
            }
          ],

          generationConfig: {
            responseModalities: [
              "TEXT",
              "IMAGE"
            ]
          }
        })
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "Image generation failed"
      });
    }

    const parts =
      data?.candidates?.[0]?.content?.parts || [];

    const imagePart =
      parts.find(
        part =>
          part?.inlineData?.data ||
          part?.inline_data?.data
      );

    if (!imagePart) {
      return res.status(500).json({
        error: "No generated image was returned",
        text: parts
          .filter(p => p.text)
          .map(p => p.text)
          .join("")
      });
    }

    const inline =
      imagePart.inlineData ||
      imagePart.inline_data;

    const mimeType =
      inline.mimeType ||
      inline.mime_type ||
      "image/png";

    return res.status(200).json({
      success: true,
      mimeType,
      image:
        `data:${mimeType};base64,${inline.data}`
    });

  } catch (error) {
    console.error(
      "Image generation error:",
      error
    );

    return res.status(500).json({
      error:
        "Unable to generate image"
    });
  }
}
