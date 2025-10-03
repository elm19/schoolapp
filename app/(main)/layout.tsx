import MainSideBar from "@/components/common/MainSideBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainSideBar>{children}</MainSideBar>;
}
