// Updated Authenticated.tsx

import React, {
    PropsWithChildren,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { cn } from "@/lib/utils";
import { ToggleTheme } from "@/components/ui/toggle-theme";

// Import ShadCN UI components
import { CircleUser, Menu, Package2, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Method } from "@inertiajs/core";

type NavigationItem = {
    name: string;
    href: string;
};
type ProfileLink = {
    name: string;
    href: string;
    method: Method;
    as: string;
};

const navigationItems: NavigationItem[] = [
    {
        name: "Dashboard",
        href: route("dashboard"),
    },
    {
        name: "Bookings",
        href: route("booking"),
    },
    // Add more navigation items as needed
];

const profileLinks: ProfileLink[] = [
    {
        name: "Profile",
        href: route("profile.edit"),
        method: "get",
        as: "a",
    },
    {
        name: "Log Out",
        href: route("logout"),
        method: "post",
        as: "button",
    },
];

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [activeLink, setActiveLink] = useState<string | null>(null);
    useEffect(() => {
        setActiveLink(window.location.pathname);
    }, []);
    return (
        <div className="flex min-h-screen w-full flex-col">
            {/* Header */}
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
                {/* Navigation Menu */}
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href={route("dashboard")}
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Paperbox Studio</span>
                    </Link>
                    {navigationItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-foreground text-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href={route("dashboard")}
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Your App Name</span>
                            </Link>
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "hover:text-foreground text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Right Side */}
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    {/* Search Form */}
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {profileLinks.map((link) => (
                                <DropdownMenuItem asChild key={link.name}>
                                    <Link
                                        href={link.href}
                                        method={link.method}
                                        as={link.as}
                                    >
                                        {link.name}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ToggleTheme />
                </div>
            </header>

            {/* Optional Header (e.g., Page Title) */}
            {header && (
                <header className="bg-background/70 shadow">
                    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                {children}
            </main>
        </div>
    );
}
