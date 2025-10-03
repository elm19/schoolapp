import AuthForm from "@/components/auth/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn - SchoolApp+",
  description:
    "This is SchoolApp+ SignIn Page, with options of using Google account student academic account or Guest  ",
};

export default function SignIn() {
  return <AuthForm signIn />;
}
