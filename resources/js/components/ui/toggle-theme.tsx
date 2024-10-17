import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { toggleDarkMode } from "@/store/UIStore";

export const ToggleTheme = () => {
    return (
        <Button
            onClick={() => toggleDarkMode()}
            size="icon"
            variant="secondary"
            className="rounded-full"
        >
            <Moon className="w-5 h-5 dark:hidden block" />

            <Sun className="w-5 h-5 dark:block hidden" />
        </Button>
    );
};
