import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const registerUser = async (
  email: string,
  password: string,
  studentInfo: any
) => {
  console.log("Registering user:", { email, studentInfo }, "from utils");
  const supabase = await createClient();
  const stringfiedData = (await cookies()).get("user")?.value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: studentInfo,
    },
  });

  if (error) {
    console.error("Error registering user:", error);
    throw error;
  }

  console.log("User registered successfully:", data);
  return data;
};
