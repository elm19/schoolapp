"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

import { usePathname } from "next/navigation";

const MyBreadcrumbMenu = () => {
  const pathname = usePathname();

  // map pathnames to human-friendly titles
  const titles: Record<string, string> = {
    "/": "",
    "/current-grades": "Current Grades",
    "/semester-grades": "Semester Grades",
    "/calendar": "Calendar",
    "/profile": "Profile",
    "/contribute": "Feedback & Support",
  };
  const pageTitle = titles[pathname];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pageTitle && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default MyBreadcrumbMenu;
