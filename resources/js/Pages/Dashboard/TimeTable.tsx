import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import CalendarTable from "@/Components/CalendarTable";
import BookingForm from "@/Components/BookingForm";
import { Booking } from "@/types";
import Modal from "@/Components/Modal";
export default function Dashboard({
    auth,
    calendarData,
    bookings,
}: PageProps<{ calendarData: any; bookings: Booking[] }>) {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const openBookingModal = (time: string) => {
        setSelectedTime(time);
        console.log(time);
        setShowBookingModal(true);
    };
    const closeBookingModal = () => {
        setSelectedTime('');
        setShowBookingModal(false);
    };
    console.log(bookings);

    // Example usage
    const date = new Date();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Time Table
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <Modal
                            show={showBookingModal}
                            onClose={closeBookingModal}
                        >
                           <BookingForm initialStartTime={selectedTime}/>
                        </Modal>
                        <CalendarTable
                            calendarData={calendarData}
                            date={date}
                            openModal={openBookingModal}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
