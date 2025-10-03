"use client";

import { useUser } from "@/context/user-provider";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export const MainDataCard = () => {
  const user = useUser();
  console.log("User data in MainDataCard:", user);
  // Map badge styles for readability
  const badgeVariant =
    user?.type === "user"
      ? "default"
      : user?.type === "student"
      ? "secondary"
      : "destructive";

  const badgeLabel =
    user?.type === "user"
      ? "Untracked"
      : user?.type === "student"
      ? "Tracked"
        : "Guest";
  
  

  return (
    <div className="shadow-md bg-muted/50 rounded-2xl p-6 w-full max-w-sm mx-auto">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={`/api/userphoto`}
            alt="User photo"
          />
        </Avatar>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {user?.name || "Guest User"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {user?.year ? `${user.year}A` : ""}{" "}
            {user?.program ? `| ${user.program}` : ""}
          </p>
        </div>

        <Badge variant={badgeVariant} className="self-start">
          {badgeLabel}
        </Badge>
      </div>
    </div>
  );
};
