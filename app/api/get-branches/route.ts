import { visitUrl } from "@/lib/utils";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET(request: Request) {
  console.log("GET /api/get-branches called", {
    url: request.url,
    timestamp: new Date().toISOString(),
  });
  const stringfiedData = (await cookies()).get("user")?.value;
  const user = JSON.parse(stringfiedData ? stringfiedData : "{}");
    const sessionId = user.sessionId;
    

  const initialRes = await visitUrl({
    toVisiteUrl: "https://schoolapp.ensam-umi.ac.ma/plan-etudes-view/filieres",
    returnContent: true,
    sessionId: sessionId,
  });
  
  return NextResponse.json({ success: true, initialRes });
}
