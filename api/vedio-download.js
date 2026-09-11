export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const videoUrl = req.query?.url;

  if (!videoUrl) {
    return res.status(400).json({
      error: "Video URL is required"
    });
  }

  try {
    const url = new URL(videoUrl);

    if (!["http:", "https:"].includes(url.protocol)) {
      return res.status(400).json({
        error: "Invalid video URL"
      });
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Unable to download video"
      });
    }

    const contentType =
      response.headers.get("content-type") ||
      "video/mp4";

    const buffer = Buffer.from(
      await response.arrayBuffer()
    );

    res.setHeader(
      "Content-Type",
      contentType
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="MasterMind-AI-Video.mp4"'
    );

    res.setHeader(
      "Content-Length",
      buffer.length
    );

    return res.status(200).send(buffer);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Video download failed"
    });
  }
}
