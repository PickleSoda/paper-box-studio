import { useState, useEffect, ComponentProps } from "react";

import {
    BookOpen,
    Bot,
    PackageOpen,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react";
import { PageType } from "@/types";
import { NavMain } from "@/components/side-bar/nav-main";
import { NavProjects } from "@/components/side-bar/nav-projects";
import { NavSecondary } from "@/components/side-bar/nav-secondary";
import { NavUser } from "@/components/side-bar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@/types";

const data = {
    navSecondary: [],
};

type SidebarProps = ComponentProps<typeof Sidebar> & {
    user: User;
    mainLinks: PageType[];
    secondaryLinks: PageType[];
    userLinks: PageType[];
    cmsLinks: PageType[];
};

export function AppSidebar({
    user,
    mainLinks,
    secondaryLinks,
    userLinks,
    cmsLinks,
    ...props
}: SidebarProps) {
    const [activeLink, setActiveLink] = useState<string | null>(null);
    useEffect(() => {
        setActiveLink(window.location.pathname);
    }, []);

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <PackageOpen className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Paper Box
                                    </span>
                                    <span className="truncate text-xs">
                                        Admin Panel
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={mainLinks} />
                <NavProjects projects={cmsLinks} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} links={userLinks} />
            </SidebarFooter>
        </Sidebar>
    );
}
