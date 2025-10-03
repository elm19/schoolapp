import { cookies } from "next/headers";
import { visitUrl } from "@/lib/utils";
import { extractYears } from "@/lib/scrapper";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface YearInfo {
  niveau: string;
  filiere: string;
  au: string;
  statut: string;
  moyenne: string;
  pj: string;
  decision: string;
  classement: string;
  releveUrl: string;
}

export default async function YearlyGrades() {
  const stringfiedData = (await cookies()).get("user")?.value;
  const user = JSON.parse(stringfiedData ? stringfiedData : "{}");
  const sessionId = user.sessionId;
  const res = await visitUrl({
    toVisiteUrl: "https://schoolapp.ensam-umi.ac.ma/student/notesannee",
    returnContent: true,
    sessionId: sessionId,
  });
  if (!res || typeof res === "boolean") {
    return <div>No student info available.</div>;
  }
  const yearsGradeInfo = extractYears(res.data);
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Academic Years Overview
        </h1>
        <p className="text-muted-foreground">
          View your academic performance across different years
        </p>
      </div>

      <div className="grid gap-6">
        {yearsGradeInfo.map((year, index) => (
          <Card key={index} className="p-6 transition-all hover:shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Year and Program Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl font-semibold">{year.niveau}</h2>
                  <Badge variant="secondary" className="text-sm">
                    {year.filiere}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {year.au}
                  </Badge>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <StatusBadge status={year.statut} />
                  <DecisionBadge decision={year.decision} />
                </div>
              </div>

              {/* Academic Performance */}
              <div className="flex flex-col sm:flex-row gap-6 lg:w-2/3">
                <PerformanceCard
                  title="Average"
                  value={year.moyenne}
                  subtitle="Overall grade"
                />
                <PerformanceCard
                  title="Ranking"
                  value={year.classement.split("/")[0]}
                  subtitle={`out of ${year.classement.split("/")[1]}`}
                />
                <PerformanceCard
                  title="PJ Credits"
                  value={year.pj}
                  subtitle="Pending credits"
                />
              </div>

              {/* Download Button */}
              <div className="flex items-center">
                <Button variant="outline" className="w-full lg:w-auto">
                  <FileDown className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className="font-medium">
      Status: {status}
    </Badge>
  );
}

function DecisionBadge({ decision }: { decision: string }) {
  const className =
    decision.toLowerCase() === "admis"
      ? "bg-green-500/15 text-green-600 dark:text-green-400"
      : "bg-red-500/15 text-red-600 dark:text-red-400";

  return (
    <Badge variant="outline" className={`font-medium ${className}`}>
      {decision}
    </Badge>
  );
}

function PerformanceCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="flex-1 p-4 rounded-lg bg-primary/5 space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
