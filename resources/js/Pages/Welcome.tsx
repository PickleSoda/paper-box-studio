import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import '../../css/styles.css'

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    console.log(auth)
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img id="background" className="absolute left-0 top-0 w-full h-full object-cover overflow-y-hidden max-h-screen" src="/images/studio.jpeg" />
                <div className="relative min-h-screen flex items-top justify-center selection:bg-[#FF2D20] selection:text-white ">
                    <div className="relative w-full max-w-3xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10">
                            <div className="flex justify-start">
                                <img src="/images/logo.png" alt="" className='h-32 w-auto' />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end text-2xl text-white font-bold">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                    </div>
                </div>
                        <main className="z-10 dots p-4 border-4 bg-amber-100/20 border-amber-800">
                                <p className='font-bold text-xl p-10 w-64'>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam laudantium ab tempore, nemo quod natus blanditiis aut, odit dolores totam perferendis quos eos ut non reprehenderit officiis ipsum quia eum.
                                </p>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
            </div>
        </>
    );
}
