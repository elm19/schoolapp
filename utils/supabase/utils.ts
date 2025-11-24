import { createClient } from "@/utils/supabase/server";


export const registerUser = async (email: string, password: string, studentInfo: any) => {
    console.log("Registering user:", { email, studentInfo }, 'from utils');
    const supabase = await createClient();
    const data = await supabase.from("profiles").insert({
      email,
        name: studentInfo?.name,
      password: password,
    //   year: parseInt(studentInfo?.Niveau || "", 10),
      branch_id: studentInfo?.Filière,
    });
    console.log("User registration data:", data);
    return data;
}

