import { PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/components/shared/ApplicationLogo";
import UIStore from "@/store/UIStore";
import { Link } from "@inertiajs/react";
import { User } from "@/types";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { cn } from "@/lib/utils"; // Utility function for conditional classes

import { Method } from "@inertiajs/core";

type NavigationItem = {
    name: string;
    href: string;
    active: boolean;
};
type ProfileLink = {
    name: string;
    href: string;
    method: Method;
    as: string;
};
// Extracted navigation items
const navigationItems: NavigationItem[] = [
    {
        name: "Dashboard",
        href: route("dashboard"),
        active: route().current("dashboard"),
    },
    {
        name: "Time Table",
        href: route("timetable"),
        active: route().current("timetable"),
    },
];

// Extracted profile links
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
    const toggleDarkMode = () => {
        UIStore.update((s) => {
            return { isDarkMode: !s.isDarkMode };
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" className="flex items-center">
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            {/* Menu icon */}
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left">
                                    {/* Mobile Navigation Links */}
                                    <div className="py-4">
                                        <NavigationMenu>
                                            <NavigationMenuList className="flex flex-col space-y-2">
                                                {navigationItems.map((item) => (
                                                    <NavigationMenuItem key={item.name}>
                                                        <NavigationMenuLink asChild>
                                                            <Link
                                                                href={item.href}
                                                                className={cn(
                                                                    "text-sm font-medium",
                                                                    item.active
                                                                        ? "text-primary"
                                                                        : "text-muted-foreground"
                                                                )}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </NavigationMenuItem>
                                                ))}
                                            </NavigationMenuList>
                                        </NavigationMenu>
                                    </div>
                                    {/* User Info and Links */}
                                    <div className="pt-4 border-t">
                                        <div className="px-4">
                                            <div className="font-medium text-base">{user.name}</div>
                                            <div className="font-medium text-sm text-muted-foreground">
                                                {user.email}
                                            </div>
                                        </div>
                                        <div className="mt-3 space-y-1">
                                            {profileLinks.map((link) => (
                                                <Button
                                                    key={link.name}
                                                    variant="ghost"
                                                    asChild
                                                    className="w-full justify-start"
                                                >
                                                    <Link
                                                        href={link.href}
                                                        method={link.method}
                                                        as={link.as}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Centered Navigation (hidden on mobile) */}
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-start">
                            {/* Logo */}
                            <Link href="/" className="shrink-0">
                                <ApplicationLogo className="block h-9 w-auto dark:fill-white" />
                            </Link>
                            {/* Navigation Links */}
                            <NavigationMenu>
                                <NavigationMenuList className="flex space-x-4 ml-6">
                                    {navigationItems.map((item) => (
                                        <NavigationMenuItem key={item.name}>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "text-sm font-medium transition-colors hover:text-primary",
                                                        item.active
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        {/* Right side */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            {/* Dark Mode Toggle */}
                            <Button variant="ghost" onClick={toggleDarkMode}>
                                {/* You can replace this with an icon */}
                                Dark
                            </Button>
                            {/* User Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center">
                                        {user.name}
                                        <svg
                                            className="ml-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
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
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-background shadow">
                    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
