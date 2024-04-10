import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import CalendarTable from '@/Components/CalendarTable';
import { Booking } from '@/types';
export default function Dashboard({ auth, calendarData,bookings }: PageProps<{ calendarData: any , bookings: Booking[]}>) {

    // Example usage
    const date = new Date(); // Use the current date or any specific date
    console.log(bookings);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Time Table</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>

                    <CalendarTable calendarData={calendarData} date={date} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
