import {PDFParse} from "pdf-parse";
import mammoth from "mammoth";

export async function extractTextFromFile(
  buffer: Buffer,
  mimetype: string
): Promise<string> {
  if (mimetype === "text/plain") {
    return buffer.toString("utf-8");
  }

  if (mimetype === "application/pdf") {
    const parser = new PDFParse({data:buffer});
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }

  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported file type. Use PDF, TXT, or DOCX.");
}