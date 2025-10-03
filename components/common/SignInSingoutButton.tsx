"use client";

import { useUser } from "@/context/user-provider";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignOut } from "@/lib/server/auth";
import { useState } from "react";

const SignInSingoutButton = () => {

  const user = useUser();
  const [userState] = useState(user);
  return (
    <div>
      {userState ? (
        <Button onClick={async () => await SignOut()}>Sign Out</Button>
      ) : (
        <Button>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </div>
  );
};
export default SignInSingoutButton;
