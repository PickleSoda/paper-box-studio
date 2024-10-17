import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Guest from "@/layouts/GuestLayout";
import { FeaturesSection } from "@/components/sections/fetured";
import { SponsorsSection } from "@/components/sections/sponsors";
import { TestimonialSection } from "@/components/sections/testimonials";
import { TeamSection } from "@/components/sections/team";
import { BenefitsSection } from "@/components/sections/benefits";
// import { ContactSection } from "@/components/sections/contact";

import { About } from "@/components/sections/about";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <Guest user={auth.user}>
            <Head title="Welcome" />
            <img
                id="background"
                className="w-full h-screen object-cover overflow-y-hidden"
                src="/images/studio.jpeg"
            />
            <SponsorsSection />
            <FeaturesSection />
            <BenefitsSection />
            <About/>
            <TeamSection />
            <TestimonialSection />
            {/* <ContactSection /> */}
        </Guest>
    );
}
