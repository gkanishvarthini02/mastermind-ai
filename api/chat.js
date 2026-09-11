export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is missing."
    });
  }

  try {
    const body = req.body || {};

    const message = String(
      body.message || ""
    ).trim();

    const history = Array.isArray(body.history)
      ? body.history
      : [];

    const domain =
      body.domain &&
      typeof body.domain === "object"
        ? body.domain
        : {};

    if (!message) {
      return res.status(400).json({
        error: "Message is required."
      });
    }

    const board = String(
      domain.board || ""
    ).trim();

    const standard = String(
      domain.standardLabel ||
      domain.standard ||
      ""
    ).trim();

    const subject = String(
      domain.subject || ""
    ).trim();

    const book = String(
      domain.book || ""
    ).trim();

    const specialist = String(
      domain.specialist ||
      subject + " Specialist" ||
      "MasterMind AI"
    ).trim();

    const context = `
You are MasterMind AI, an advanced Education AI Teacher.

Language:
Understand Tamil, Tanglish and English.
Reply in the same language as the student.

${board ? `Board: ${board}` : ""}
${standard ? `Standard: ${standard}` : ""}
${subject ? `Subject: ${subject}` : ""}
${book ? `Textbook: ${book}` : ""}
${specialist ? `Specialist: ${specialist}` : ""}

If school details are already provided above,
do not ask the student for them again.

Help with:
- Teaching
- Notes
- Quiz
- MCQ
- Exams
- Worksheets
- Homework
- Revision
- Flashcards
- Mind Maps
- Study Plans
- Important Questions
- Viva
- Summaries
- Projects
- Presentations

If the student asks to create something,
create it directly.

Do not invent exact textbook chapters,
page numbers, textbook questions or URLs.
`;

    const contents = [];

    for (
      const item of history.slice(-10)
    ) {
      if (
        !item ||
        !item.content
      ) {
        continue;
      }

      contents.push({
        role:
          item.role === "assistant"
            ? "model"
            : "user",

        parts: [
          {
            text: String(
              item.content
            )
          }
        ]
      });
    }

    contents.push({
      role: "user",

      parts: [
        {
          text: message
        }
      ]
    });

    const requestBody = {
      system_instruction: {
        parts: [
          {
            text: context
          }
        ]
      },

      contents: contents,

      generationConfig: {
        maxOutputTokens: 4096
      }
    };

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

    const response = await fetch(
      url,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "x-goog-api-key":
            apiKey
        },

        body: JSON.stringify(
          requestBody
        )
      }
    );

    const data =
      await response
        .json()
        .catch(() => ({}));

    if (!response.ok) {

      console.error(
        "Gemini API ERROR:",
        JSON.stringify(
          data,
          null,
          2
        )
      );

      return res.status(
        response.status
      ).json({
        error:
          data?.error?.message ||
          `Gemini API error ${response.status}`,

        code:
          data?.error?.status ||
          null,

        status:
          response.status
      });
    }

    const text =
      data
        ?.candidates?.[0]
        ?.content
        ?.parts
        ?.filter(
          part =>
            part &&
            part.text
        )
        ?.map(
          part =>
            part.text
        )
        ?.join("") ||
      "Sorry, I could not generate a response.";

    return res.status(200).json({
      text: text,
      model: "gemini-3.6-flash"
    });

  } catch (error) {

    console.error(
      "MasterMind Server ERROR:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "Server error while connecting to Gemini.",

      status: 500
    });
  }
}
