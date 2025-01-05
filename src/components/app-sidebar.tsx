import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import AppSideBarLogo from "./AppSideBarLogo";
import AppSideBarMenu from "./AppSideBarMenu";

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-5">
            <AppSideBarLogo />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <AppSideBarMenu />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
