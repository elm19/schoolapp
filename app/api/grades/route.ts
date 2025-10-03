import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { extractMarks } from "@/lib/scrapper";

// Environment variables
const SCHOOL_BASE_URL =
  process.env.SCHOOL_BASE_URL || "https://schoolapp.ensam-umi.ac.ma";
const MARKS_URL = `${SCHOOL_BASE_URL}/student/notessem`;

export async function GET(request: NextRequest) {
  try {
    // Get session ID from Authorization header
    const sessionId = request.cookies.get("sessionId")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, message: "Session ID is required" },
        { status: 401 }
      );
    }
    // Fetch marks page with session cookie
    const marksRes = await fetch(MARKS_URL, {
      headers: {
        Cookie: `JSESSIONID=${sessionId}`,
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
      },
    });

    const marksHtml = await marksRes.text();

    // Verify authentication
    const $ = cheerio.load(marksHtml);
    const isAuthenticated =
      $('form[action="/login"]').length === 0 &&
      $('a[href*="logout"]').length > 0;

    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: "Session expired or invalid" },
        { status: 401 }
      );
    }

    // Extract marks
    const marks = extractMarks(marksHtml);

    return NextResponse.json({
      success: true,
      marks,
    });
  } catch (error: unknown) {
    console.error("Marks data error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
