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
    start_time: string;
    end_time: string;
    name: string;
    status: string;
}
