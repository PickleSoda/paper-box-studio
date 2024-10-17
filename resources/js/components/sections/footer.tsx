import React from "react";
import { PackageOpen } from "lucide-react";
import { Link } from "@inertiajs/react"; // Adjust if you're using a different routing library

const footerTexts = {
    branding: {
        name: "Paper Box",
        link: "/",
    },
    sections: {
        followUs: {
            title: "Follow US",
            links: [
                { name: "Github", href: "#" },
                { name: "Twitter", href: "#" },
                { name: "Dribbble", href: "#" },
            ],
        },
        platforms: {
            title: "Platforms",
            links: [
                { name: "Web", href: "#" },
                { name: "Mobile", href: "#" },
                { name: "Desktop", href: "#" },
            ],
        },
        about: {
            title: "About",
            links: [
                { name: "Features", href: "#" },
                { name: "Pricing", href: "#" },
                { name: "FAQ", href: "#" },
            ],
        },
        community: {
            title: "Community",
            links: [
                { name: "Youtube", href: "#" },
                { name: "Discord", href: "#" },
                { name: "Twitch", href: "#" },
            ],
        },
    },
    copyright: {
        text: "© 2024 Landing page made by",
        author: "Achi U.",
        authorLink: "",
    },
};

export const Footer = () => {
    const { branding, sections, copyright } = footerTexts;

    return (
        <footer id="footer" className="bg-background">
            {/* Divider */}
            <hr className="w-11/12 mx-auto border-t border-gray-300 my-8" />

            {/* Main Content */}
            <div className="container mx-auto py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
                {/* Branding */}
                <div className="col-span-full xl:col-span-2">
                    <Link
                        href={branding.link}
                        className="font-bold text-xl flex items-center text-primary"
                    >
                        <PackageOpen
                            className="mr-2"
                            size={24}
                            aria-hidden="true"
                        />
                        {branding.name}
                    </Link>
                </div>

                {/* Sections */}
                {Object.values(sections).map((section) => (
                    <div key={section.title} className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">{section.title}</h3>
                        {section.links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>

            {/* Footer Credit */}
            <div className="container mx-auto pb-14 text-center">
                <p>
                    &copy; 2024 {copyright.text}{" "}
                    <a
                        href={copyright.authorLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-primary transition-all border-b-2 border-transparent hover:border-primary"
                    >
                        {copyright.author}
                    </a>
                </p>
            </div>
        </footer>
    );
};
