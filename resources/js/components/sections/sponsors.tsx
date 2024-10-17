import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";
interface sponsorsProps {
    icon: string;
    name: string;
}

const sponsors: sponsorsProps[] = [
    {
        icon: "Crown",
        name: "Acmebrand",
    },
    {
        icon: "Vegan",
        name: "Acmelogo",
    },
    {
        icon: "Ghost",
        name: "Acmesponsor",
    },
    {
        icon: "Puzzle",
        name: "Acmeipsum",
    },
    {
        icon: "Squirrel",
        name: "Acme",
    },
    {
        icon: "Cookie",
        name: "Accmee",
    },
    {
        icon: "Drama",
        name: "Acmetech",
    },
];

export const SponsorsSection = () => {
    return (
        <section id="sponsors" className="container py-16 sm:py-20 max-w-3/4">

            <div className="mx-auto">
                <Marquee
                    className="gap-[3rem]"
                    fade
                    innerClassName="gap-[3rem]"
                    pauseOnHover
                >
                    {sponsors.map(({ icon, name }) => (
                        <div
                            key={name}
                            className="flex items-center text-xl md:text-2xl font-medium"
                        >
                            <Icon
                                name={icon as keyof typeof icons}
                                size={32}
                                color="hsl(var(--secondary-foreground))"
                                className="mr-2"
                            />
                            {name}
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};
