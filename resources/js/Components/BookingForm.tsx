import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import dayjs from 'dayjs';
import { Booking } from '@/types';
interface BookingFormProps {
    initialStartTime: string;
}
const BookingForm: React.FC<BookingFormProps> = ({ initialStartTime }) => {
    const { data, setData, post, errors, processing } = useForm({
        start_time: dayjs(initialStartTime, 'DD-MM-YYYY HH:mm').toDate(),
        end_time: dayjs(initialStartTime, 'DD-MM-YYYY HH:mm').add(1, 'hour').toDate(),
        name: '',
        status: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('booking.store')); // Update your endpoint as needed
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="start_time" value="Start Time" />
                {data.start_time.toString()}
                
                <InputError message={errors.start_time} />
            </div>

            <div>
                <InputLabel htmlFor="end_time" value="End Time" />
                {/* <TextInput
                    id="end_time"
                    value={data.end_time}
                    onChange={e => setData('end_time', e.target.value)}
                    required
                /> */}
                <InputError message={errors.end_time} />
            </div>

            <div>
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                />
                <InputError message={errors.name} />
            </div>

            <div>
                <InputLabel htmlFor="status" value="Status" />
                <TextInput
                    id="status"
                    value={data.status}
                    onChange={e => setData('status', e.target.value)}
                    required
                />
                <InputError message={errors.status} />
            </div>

            <PrimaryButton disabled={processing}>Submit</PrimaryButton>
        </form>
    );
};

export default BookingForm;
