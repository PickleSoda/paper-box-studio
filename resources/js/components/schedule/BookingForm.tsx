import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import { CalendarStore } from "@/store/calendar";
import { useStoreState } from "pullstate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BookingFormProps {
    initialStartTime: string;
    onClose: () => void; // Function to signal closing the modal
}

const BookingForm: React.FC<BookingFormProps> = ({
    initialStartTime,
    onClose,
}) => {
    const [sendType, setSendType] = useState({ type: "post", id: 0 });
    const [durationHours, setDurationHours] = useState(1);

    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        errors,
        processing,
    } = useForm({
        id: 0,
        start_time: initialStartTime,
        end_time: dayjs(initialStartTime, "DD-MM-YYYY HH:mm")
            .add(1, "hour")
            .format("DD-MM-YYYY HH:mm"),
        name: "",
        status: "",
    });

    const bookings = useStoreState(CalendarStore, (s) => s.bookings);

    useEffect(() => {
        const booking = bookings.find((booking) =>
            dayjs(initialStartTime, "DD-MM-YYYY HH:mm").isBetween(
                dayjs(booking.start_time),
                dayjs(booking.end_time),
                null,
                "[)"
            )
        );

        if (booking) {
            setData({
                id: booking.id,
                start_time: dayjs(booking.start_time).format(
                    "DD-MM-YYYY HH:mm"
                ),
                end_time: dayjs(booking.end_time).format("DD-MM-YYYY HH:mm"),
                name: booking.name,
                status: booking.status,
            });
            setSendType({ type: "patch", id: booking.id });
            setDurationHours(
                dayjs(booking.end_time).diff(dayjs(booking.start_time), "hour")
            );
            console.log(booking);
            console.log("data", data);
        }
    }, [initialStartTime]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (sendType.type === "post") {
            post(route("booking.store"), {
                onSuccess: () => onClose(),
            });
        } else {
            patch(route("booking.update", sendType.id), {
                onSuccess: () => onClose(),
            });
        }
    };

    const handleDelete = () => {
        destroy(route("booking.destroy", sendType.id), {
            onSuccess: () => onClose(),
        });
    };
    const handleDurationChange = (value: string) => {
        setDurationHours(parseInt(value));
        const newEndTime = dayjs(data.start_time, "DD-MM-YYYY HH:mm")
            .add(parseInt(value), "hour")
            .format("DD-MM-YYYY HH:mm");
        setData("end_time", newEndTime);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
            <div>
                <Label htmlFor="start_time">Start Time</Label>
                <Input
                    id="start_time"
                    type="text"
                    value={data.start_time}
                    onChange={(e) => setData("start_time", e.target.value)}
                    required
                />
                <InputError message={errors.start_time} />
            </div>

            <div>
                <Label htmlFor="duration">Duration (Hours)</Label>
                <Select
                    value={durationHours.toString()}
                    onValueChange={(value) => handleDurationChange(value)}
                >
                    <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                            <SelectItem key={hour} value={hour.toString()}>
                                {hour} {hour === 1 ? "hour" : "hours"}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="end_time">End Time</Label>
                <Input
                    id="end_time"
                    type="text"
                    value={data.end_time}
                    onChange={(e) => setData("end_time", e.target.value)}
                    required
                    readOnly
                />
                <InputError message={errors.end_time} />
            </div>

            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />
                <InputError message={errors.name} />
            </div>

            <div>
                <Label htmlFor="status">Status</Label>
                <Input
                    id="status"
                    type="text"
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    required
                />
                <InputError message={errors.status} />
            </div>

            <div className="flex justify-end gap-2 mt-4">
                {sendType.type === "patch" && (
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        Delete
                    </Button>
                )}
                <Button type="submit" disabled={processing}>
                    {processing ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default BookingForm;
