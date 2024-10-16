import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, Booking } from "@/types";
import DayTable from "@/components/schedule/DayTable";
import BookingForm from "@/components/schedule/BookingForm";
import MonthCalendar from "@/components/schedule/MonthCalendar";
import { CalendarStore } from "@/store/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function Dashboard({
    auth,
    bookings,
}: PageProps<{ bookings: Booking[] }>) {
    useEffect(() => {
        CalendarStore.update((state) => {
            state.bookings = bookings;
        });
    }, [bookings]);

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string>("");

    const openBookingModal = (time: string) => {
        setSelectedTime(time);
        setShowBookingModal(true);
    };

    const closeBookingModal = () => {
        setSelectedTime("");
        setShowBookingModal(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-foreground leading-tight">
                    Time Table
                </h2>
            }
        >
            <Head title="Time Table" />
            <div className="w-full lg:w-1/2 mx-auto mt-6 sm:mt-0">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse items-center lg:items-start lg:flex-row">
                        <div className="w-full flex justify-center lg:justify-start h-min">
                            <MonthCalendar />
                        </div>
                        <div className="lg:w-full">
                            <Separator
                                orientation="vertical"
                                className="hidden lg:block"
                            />
                            Some data for the left side
                        </div>
                    </div>
                </div>
                <DayTable openModal={openBookingModal} />
            </div>

            <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Booking Details</DialogTitle>
                        <DialogDescription>
                            Please fill in the booking details below.
                        </DialogDescription>
                    </DialogHeader>
                    <BookingForm
                        initialStartTime={selectedTime}
                        onClose={() => setShowBookingModal(false)}
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={closeBookingModal}>
                            Cancel
                        </Button>
                        <Button type="submit" form="booking-form">
                            Confirm Booking
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
