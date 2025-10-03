import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import MyBreadcrumbMenu from "./MyBreadcrumbMenu";
import { ModeToggle } from "../ModeToggle";
import SignInSingoutButton from "./SignInSingoutButton";

const MainSideBar = ({ children }: { children?: React.ReactNode }) => {
 

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 py-3 mb-5 shrink-0 items-center gap-2 transition-[width,height] ease-linear px-4 justify-between ">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <MyBreadcrumbMenu />
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />

            <SignInSingoutButton />
            
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
export default MainSideBar;
