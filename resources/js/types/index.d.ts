import { Method } from "@inertiajs/core";
import { type LucideIcon } from "lucide-react";

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
export type BlogPageType = {
    id: number;
    title: string;
    description: string;
    content: string;
    cover_image: string;
    is_visible: boolean;
    parent_id: number | null;
    created_at: string;
    updated_at: string;
};

export type BlogPageListType = {
    id: number;
    title: string;
    description: string;
    is_visible: boolean;
    subpages: BlogPageListType[];
};

type PageItem = {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    method?: Method;
    items?: PageItem[];
};