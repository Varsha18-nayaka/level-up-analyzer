import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

/** Resume-like keyword patterns grouped by section */
const RESUME_SECTIONS = {
  education: /\b(education|university|college|bachelor|master|degree|b\.?s\.?|m\.?s\.?|b\.?tech|m\.?tech|ph\.?d|diploma|gpa|cgpa|academic|school|semester)\b/gi,
  experience: /\b(experience|work\s*history|employment|intern|internship|job|position|company|responsibilities|worked\s+at|role|employer)\b/gi,
  skills: /\b(skills|technical\s*skills|proficien|technologies|tools|programming|languages|frameworks|software|competenc|expertise)\b/gi,
  contact: /\b(email|phone|mobile|address|linkedin|github|portfolio|contact)\b/gi,
  projects: /\b(projects|project\s*work|personal\s*projects|academic\s*projects|contributions)\b/gi,
  certifications: /\b(certif|certification|certified|license|credential|course\s*completion|award)\b/gi,
};

/** Minimum thresholds */
const MIN_TEXT_LENGTH = 80;
const MIN_SECTIONS_MATCHED = 2;
const MIN_KEYWORD_HITS = 4;

export interface ResumeValidation {
  isValid: boolean;
  text: string;
  error?: string;
  sectionsFound: string[];
  keywordHits: number;
}

/** Extract text from a PDF File object */
async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(" ");
    pages.push(pageText);
  }

  return pages.join("\n");
}

/** Extract text from a DOCX File object */
async function extractDocxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/** Validate extracted text looks like a resume */
function validateResumeContent(text: string): ResumeValidation {
  const cleanText = text.replace(/\s+/g, " ").trim();

  // Check minimum length
  if (cleanText.length < MIN_TEXT_LENGTH) {
    return {
      isValid: false,
      text: cleanText,
      error: "This file appears to be empty or has very little content. Please upload a proper resume with your education, experience, and skills.",
      sectionsFound: [],
      keywordHits: 0,
    };
  }

  // Check for resume sections
  const sectionsFound: string[] = [];
  let totalHits = 0;

  for (const [section, pattern] of Object.entries(RESUME_SECTIONS)) {
    const matches = cleanText.match(pattern);
    if (matches && matches.length > 0) {
      sectionsFound.push(section);
      totalHits += matches.length;
    }
  }

  // Not enough resume-like content
  if (sectionsFound.length < MIN_SECTIONS_MATCHED || totalHits < MIN_KEYWORD_HITS) {
    return {
      isValid: false,
      text: cleanText,
      error: `This doesn't look like a resume. We couldn't find key sections like Education, Experience, or Skills. Please upload a real resume document.`,
      sectionsFound,
      keywordHits: totalHits,
    };
  }

  return {
    isValid: true,
    text: cleanText,
    sectionsFound,
    keywordHits: totalHits,
  };
}

/** Main entry: parse file and validate it's a resume */
export async function parseAndValidateResume(file: File): Promise<ResumeValidation> {
  try {
    let text: string;

    if (file.type === "application/pdf") {
      text = await extractPdfText(file);
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      text = await extractDocxText(file);
    } else {
      return {
        isValid: false,
        text: "",
        error: "Only PDF and DOCX files are accepted.",
        sectionsFound: [],
        keywordHits: 0,
      };
    }

    return validateResumeContent(text);
  } catch (err) {
    console.error("Resume parsing error:", err);
    return {
      isValid: false,
      text: "",
      error: "We couldn't read this file. It may be corrupted or password-protected. Please try another file.",
      sectionsFound: [],
      keywordHits: 0,
    };
  }
}
