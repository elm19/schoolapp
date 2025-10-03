import { cookies } from "next/headers";
import { visitUrl } from "@/lib/utils";
import { extractStudyPlan } from "@/lib/scrapper";
import { Card } from "@/components/ui/card";
import { StudyPlanClient } from "./study-plan-client";
import { StudyPlanData } from "@/lib/scrapper";

export default async function StudyPlanPage() {
  const stringfiedData = (await cookies()).get("user")?.value;
  const user = JSON.parse(stringfiedData ? stringfiedData : "{}");
  const sessionId = user.sessionId;

  // First, get the initial page with the form
  const initialRes = await visitUrl({
    toVisiteUrl: "https://schoolapp.ensam-umi.ac.ma/plan-etudes-view/modules",
    returnContent: true,
    sessionId: sessionId,
  });

  if (!initialRes || typeof initialRes === "boolean") {
    return <div>Unable to load study plan data.</div>;
  }

  // Extract available options from the form
  const studyPlanData = extractStudyPlan(initialRes.data);

  return <StudyPlanClient initialData={studyPlanData} sessionId={sessionId} />;
}