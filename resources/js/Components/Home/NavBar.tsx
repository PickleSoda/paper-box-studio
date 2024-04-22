import React from 'react';
import { Link , InertiaLinkProps } from '@inertiajs/react';


interface NavBarProps {
    auth:boolean;
}

const NavBar: React.FC<NavBarProps> = ({ auth }) => {
    return (
        <header className="grid grid-cols-2 items-center gap-2 py-10">
            <div className="flex justify-start">
                <img src="/images/logo.png" alt="Logo" className='h-32 w-auto' />
            </div>
            <nav className="-mx-3 flex flex-1 justify-end text-2xl text-white">
                {auth ? (
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
    );
};
export default NavBar;
