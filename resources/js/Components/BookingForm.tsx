import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import dayjs from "dayjs";
import { CalendarStore } from "@/store/calendar";
import { useStoreState } from "pullstate";
interface BookingFormProps {
    initialStartTime: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialStartTime }) => {
    const [sendType,setSendType] = useState({type:"post",id:0});
    const { data, setData, post,patch, errors, processing } = useForm({
        start_time: initialStartTime,
        end_time: dayjs(initialStartTime,"DD-MM-YYYY HH:mm")
            .add(1, "hour")
            .format("DD-MM-YYYY HH:mm"),
        name: "",
        status: "",
    });
    const bookings = useStoreState(CalendarStore, (s) => s.bookings);
    useEffect(() => {
        const booking = bookings.find((booking) =>
            dayjs(initialStartTime,"DD-MM-YYYY HH:mm").isBetween(
                dayjs(booking.start_time),
                dayjs(booking.end_time),
                null,
                "[)"
            )
        );
        console.log(booking,dayjs(initialStartTime,"DD-MM-YYYY HH:mm"));

        if (booking) {
            
            setData({
                start_time: dayjs(booking.start_time).format(
                    "DD-MM-YYYY HH:mm"
                ),
                end_time: dayjs(booking.end_time).format(
                    "DD-MM-YYYY HH:mm"
                ),
                name: booking.name,
                status: booking.status,
            });
            setSendType({type:"patch" , id:booking.id});
        }
}, [initialStartTime]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(sendType.type === "post"){
            post(route("booking.store"));
        }
        else{
            patch(route("booking.update",sendType.id));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
            <div>
                <InputLabel htmlFor="start_time" value="Start Time" />
                <TextInput
                    id="start_time"
                    value={data.start_time}
                    onChange={(e) => setData("start_time", e.target.value)}
                    required
                />
                <InputError message={errors.start_time} />
            </div>

            <div>
                <InputLabel htmlFor="end_time" value="End Time" />
                <TextInput
                    id="end_time"
                    value={data.end_time}
                    onChange={(e) => setData("end_time", e.target.value)}
                    required
                />
                <InputError message={errors.end_time} />
            </div>

            <div>
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />
                <InputError message={errors.name} />
            </div>

            <div>
                <InputLabel htmlFor="status" value="Status" />
                <TextInput
                    id="status"
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    required
                />
                <InputError message={errors.status} />
            </div>

            <PrimaryButton disabled={processing}>Submit</PrimaryButton>
        </form>
    );
};

export default BookingForm;
