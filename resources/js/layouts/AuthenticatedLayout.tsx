import { AppSidebar } from "@/components/side-bar/app-sidebar";
import { PageItem } from "@/types";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { PropsWithChildren, ReactNode } from "react";
import { User } from "@/types";
import{
    CircleUser,
    LogOut,
} from "lucide-react";

const mainLinks: PageItem[] = [
  {
      title: "Dashboard",
      url: route("dashboard"),
  },
  {
      title: "Bookings",
      url: route("booking"),
  },
  {
      title: "Pages",
      url: route("pages.index"),
  },
];

const secondaryLinks: PageItem[] = [
  {
    title: "Profile",
    url: route("profile.edit"),
},
{
    title: "Log Out",
    url: route("logout"),
}
];

const userLinks: PageItem[] = [
  {
    title: "Profile",
    url: route("profile.edit"),
    icon: CircleUser,
},
{
    title: "Log Out",
    url: route("logout"),
    method: "post",
    icon: LogOut,
}
];

export default function AuthenticatedLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    return (
        <SidebarProvider>
            <AppSidebar user={user} mainLinks={mainLinks} secondaryLinks={secondaryLinks} userLinks={userLinks} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        {header && (
                            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        )}
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
