import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Guest from "@/layouts/GuestLayout";
import "../../css/styles.css";

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

                <main className="z-10 dots p-4 border-4 bg-amber-100/20 border-amber-800 ">
                    <p className="font-bold text-xl p-10 w-64">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Veniam laudantium ab tempore, nemo quod natus
                        blanditiis aut, odit dolores totam perferendis quos eos
                        ut non reprehenderit officiis ipsum quia eum.
                    </p>
                </main>

                <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>
        </Guest>
    );
}
