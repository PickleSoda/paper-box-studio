import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { Link } from "@inertiajs/react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { toggleDarkMode } from "@/store/UIStore";
import { Moon, Sun } from "lucide-react";

export function NavSecondary({
    items,
    ...props
}: {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
    }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild size="sm">
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem key="toggle-theme">
                        <SidebarMenuButton
                            asChild
                            size="sm"
                            onClick={() => toggleDarkMode()}
                        >
                            <div>
                                <Moon className="w-5 h-5 dark:hidden block" />

                                <Sun className="w-5 h-5 dark:block hidden" />
                                <span>Toggle Theme</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
