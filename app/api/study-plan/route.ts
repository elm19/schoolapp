import { NextRequest, NextResponse } from "next/server";
import { extractStudyPlan } from "@/lib/scrapper";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const sessionId = formData.get("sessionId") as string;
    const niveau = formData.get("niveau") as string;
    const filiere = formData.get("filiere") as string;
    const semestre = formData.get("semestre") as string;
    const _csrf = formData.get("_csrf") as string;

    // Prepare form data for submission
    const formDataToSend = new URLSearchParams();
    formDataToSend.append('niveau', niveau);
    formDataToSend.append('filiere', filiere);
    formDataToSend.append('semestre', semestre);
    formDataToSend.append('_csrf', _csrf);

    // Submit the form to the SchoolApp server
    const response = await fetch('https://schoolapp.ensam-umi.ac.ma/plan-etudes-view/modules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `JSESSIONID=${sessionId}`,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      },
      body: formDataToSend.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract the updated data from the HTML response
    const updatedData = extractStudyPlan(html);
    
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error("Error in study-plan API:", error);
    return NextResponse.json(
      { error: "Failed to process study plan request" },
      { status: 500 }
    );
  }
}