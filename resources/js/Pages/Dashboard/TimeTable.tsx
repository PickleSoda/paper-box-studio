import React, { useState,useEffect } from "react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps,Booking } from "@/types";
import DayTable from "@/components/schedule/DayTable";
import BookingForm from "@/Components/BookingForm";
import Modal from "@/Components/Modal"; 
import MonthCalendar from "@/components/schedule/MonthCalendar";
import { CalendarStore } from "@/store/calendar";

export default function Dashboard({
    auth,
    bookings,
}: PageProps<{ bookings: Booking[] }>) {
    useEffect(() => {
        CalendarStore.update((state) => {
            state.bookings = bookings;
        });
    }, [bookings, CalendarStore]);
   
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
                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-4">
                        
                        <MonthCalendar/>
                        <DayTable
                            openModal={openBookingModal}
                        />
                    </div>
                </div>
            </div>
            <Modal
                            show={showBookingModal}
                            onClose={closeBookingModal}
                        >
                           <BookingForm initialStartTime={selectedTime}/>
                        </Modal>
        </AuthenticatedLayout>
    );
}
