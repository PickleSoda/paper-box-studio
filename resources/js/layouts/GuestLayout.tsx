import React, { PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";
import { PageType, User } from "@/types";
import { Footer } from "@/components/sections/footer";
import { PackageOpen, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ToggleTheme } from "@/components/ui/toggle-theme";

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "#team",
        label: "Team",
    },
    {
        href: "#contact",
        label: "Contact",
    },
];

export default function Guest({
    children,
    cms,
}: PropsWithChildren<{ user?: User; cms?: PageType[] }>) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <header className="shadow-inner w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-border z-40 rounded-2xl flex justify-between items-center p-2 bg-background/70">
                <Link
                    href="/"
                    className=" text-lg flex items-center gap-2 px-2"
                >
                    <PackageOpen className="w-8 h-8" />
                    Paper Box
                </Link>
                {/* <!-- Mobile --> */}
                <div className="flex items-center lg:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Menu
                                onClick={() => setIsOpen(!isOpen)}
                                className="cursor-pointer lg:hidden"
                            />
                        </SheetTrigger>

                        <SheetContent
                            side="left"
                            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl"
                        >
                            <div>
                                <SheetHeader className="mb-4 ml-4">
                                    <Link
                                        href="/"
                                        className=" text-lg flex items-center gap-2 px-2"
                                    >
                                        <PackageOpen className="w-8 h-8" />
                                        Paper Box
                                    </Link>
                                </SheetHeader>

                                <div className="flex flex-col gap-2">
                                    {routeList.map(({ href, label }) => (
                                        <Button
                                            key={href}
                                            onClick={() => setIsOpen(false)}
                                            asChild
                                            variant="ghost"
                                            className="justify-start text-base"
                                        >
                                            <Link href={href}>{label}</Link>
                                        </Button>
                                    ))}
                                    {cms?.map(({ title, url }) => (
                                        <Button
                                            key={url}
                                            onClick={() => setIsOpen(false)}
                                            asChild
                                            variant="ghost"
                                            className="justify-start text-base"
                                        >
                                            <Link href={url}>{title}</Link>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
                                <Separator className="mb-2" />

                                <ToggleTheme />
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* <!-- Desktop --> */}
                <NavigationMenu className="hidden lg:block mx-auto">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            {routeList.map(({ href, label }) => (
                                <NavigationMenuLink key={href} asChild>
                                    <Link
                                        href={href}
                                        className="text-base px-2"
                                    >
                                        {label}
                                    </Link>
                                </NavigationMenuLink>
                            ))}
                            {cms?.map(({ title, url }) => (
                                <NavigationMenuLink key={url} asChild>
                                    <Link href={url} className="text-base px-2">
                                        {title}
                                    </Link>
                                </NavigationMenuLink>
                            ))}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="hidden lg:flex">
                    <ToggleTheme />
                </div>
            </header>
            <div className="w-full m-0 p-0 -mt-14">{children}</div>
            <Footer />
        </>
    );
}
