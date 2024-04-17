export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
export interface Booking {
    id: number;
    start_time: Date;
    end_time: Date;
    name: string;
    status: string;
}
