// components/ui/input-error.tsx
import React from "react";
import { cn } from "@/lib/utils"; // Utility for conditional class names

interface InputErrorProps {
    message?: string;
    className?: string;
}

export const InputError: React.FC<InputErrorProps> = ({ message, className }) => {
    if (!message) return null;

    return (
        <p className={cn("text-sm text-destructive mt-1", className)}>
            {message}
        </p>
    );
};

