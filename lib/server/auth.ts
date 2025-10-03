"use server";
import { cookies } from "next/headers";
import { visitUrl } from "../utils";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
  try {
    const storedUser = (await cookies()).get("user")?.value;
    if (!storedUser) return null;
    const user = JSON.parse(storedUser);
    const res = await visitUrl({ sessionId: user.sessionId });
    if (res === false && user.sessionId) {
      // Session is invalid, remove sessionId
      await SignOut();
    }
    const userWithoutSession = { ...user, sessionId: undefined };
    return res ? userWithoutSession : null;
  } catch {
    return null;
  }
};

export const SignOut = async () => {
  (await cookies()).delete("user");
  redirect("/sign-in");
};
