import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { visitUrl } from "@/lib/utils";
import { extractStudentInfo } from "@/lib/scrapper";

export default async function StudentProfile() {
  const stringfiedData = (await cookies()).get("user")?.value;
  const user = JSON.parse(stringfiedData ? stringfiedData : "{}");
  const sessionId = user.sessionId;
  const res = await visitUrl({
    toVisiteUrl: "https://schoolapp.ensam-umi.ac.ma/index",
    returnContent: true,
    sessionId: sessionId,
  });
  if (!res || typeof res === "boolean") {
    return <div>No student info available.</div>;
  }
  const studentInfo = extractStudentInfo(res.data);

  if (!studentInfo) {
    return <div>No student info available.</div>;
  }

  return (
    <div className="p-6 max-w-6xl  space-y-8">
      {/* Profile Card */}
      <Card className="overflow-hidden  bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100"></div>
            {/* <Image
              src={`/api/userphoto`}
              alt={studentInfo.name}
              width={140}
              height={140}
              className="relative rounded-full object-cover  bg-background"
            /> */}
            <Avatar className="w-30 h-30 relative rounded-full object-cover  bg-background">
              <AvatarImage src={`/api/userphoto`} alt="User photo" />
            </Avatar>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {studentInfo.name}
            </h1>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="secondary" className="text-sm">
                {studentInfo["Filière"]}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {studentInfo.Niveau}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                Code: {studentInfo.code}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Academic Info */}
      <Card className="p-6 transition-all hover:shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📘</span>
          <h2 className="text-2xl font-semibold tracking-tight">
            Academic Information
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Info label="Filière" value={studentInfo["Filière"]} />
          <Info label="Niveau" value={studentInfo.Niveau} />
          <Info label="Statut" value={studentInfo.Statut} />
          <Info label="Section" value={studentInfo.Section} />
          <Info label="Groupe" value={studentInfo.Groupe} />
          <Info label="Sous Groupe" value={studentInfo["Sous Groupe"]} />
          <Info label="CNE/Masar" value={studentInfo["CNE/Masar"]} />
          <Info label="Série BAC" value={studentInfo["Série BAC"]} />
          <Info label="Année BAC" value={studentInfo["Année BAC"]} />
          <Info label="Niveau Accès" value={studentInfo["Niveau Accès"]} />
          <Info label="Année Accès" value={studentInfo["Annee Accès"]} />
          <Info label="Voie Accès" value={studentInfo["Voie Accès"]} />
        </div>
      </Card>

      {/* Personal Info */}
      <Card className="p-6 transition-all hover:shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">👤</span>
          <h2 className="text-2xl font-semibold tracking-tight">
            Personal Information
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Info label="Nom" value={studentInfo.Nom} />
          <Info label="Prénom" value={studentInfo["Prénom"]} />
          <Info label="Nom Arabe" value={studentInfo["Nom Arabe"]} />
          <Info label="Prénom Arabe" value={studentInfo["Prénom Arabe"]} />
          <Info label="CIN" value={studentInfo.CIN} />
          <Info label="Sexe" value={studentInfo.Sexe} />
          <Info label="Date Naissance" value={studentInfo["Date Naissance"]} />
          <Info label="Nationalité" value={studentInfo.Nationalité} />
          <Info label="Lieu Naissance" value={studentInfo.Lieu_Naissance} />
          <Info label="Email" value={studentInfo.Email} />
          <Info label="Téléphone" value={studentInfo["Téléphone"]} />
          <Info label="Tel Parents" value={studentInfo.Tel_Parents} />
          <Info label="Adr Parents" value={studentInfo.Adr_Parents} />
        </div>
      </Card>
    </div>
  );
}

interface InfoProps {
  label: string;
  value: string | number;
}

function Info({ label, value }: InfoProps) {
  return (
    <div className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
      <dt className="text-sm font-medium text-muted-foreground mb-1">
        {label}
      </dt>
      <dd className="font-semibold tracking-tight">{value || "-"}</dd>
    </div>
  );
}
