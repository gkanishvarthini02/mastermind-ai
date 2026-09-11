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

  const {
    prompt,
    image
  } = req.body || {};

  if (!prompt) {
    return res.status(400).json({
      error: "Video prompt is required"
    });
  }

  try {
    const parts = [
      {
        text: String(prompt)
      }
    ];

    if (
      image &&
      typeof image === "string"
    ) {
      const match = image.match(
        /^data:(image\/[^;]+);base64,(.+)$/
      );

      if (match) {
        parts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        });
      }
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:generateVideos",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },

        body: JSON.stringify({
          instances: [
            {
              prompt: String(prompt)
            }
          ],

          parameters: {
            aspectRatio: "16:9",
            resolution: "720p"
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
          "Video generation failed",
        details: data
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error(
      "Video generation error:",
      error
    );

    return res.status(500).json({
      error:
        "Unable to start video generation"
    });
  }
}
