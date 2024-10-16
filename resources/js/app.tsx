import "./bootstrap";
import "../css/app.css";
import "../css/styles.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { LaravelReactI18nProvider } from "laravel-react-i18n";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@radix-ui/themes/layout/tokens.css";
import "@radix-ui/themes/layout/components.css";
import "@radix-ui/themes/layout/utilities.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import isBetween from "dayjs/plugin/isBetween";

import { initializeDarkMode } from "./store/UIStore";
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(isBetween);
initializeDarkMode();
const appName = import.meta.env.VITE_APP_NAME || "Paperbox Studio";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <LaravelReactI18nProvider
                locale={"uk"}
                fallbackLocale={"en"}
                files={import.meta.glob("/lang/*.json")}
            >
                <Theme
                    accentColor="tomato"
                    grayColor="sage"
                    radius="small"
                    scaling="95%"
                >
                    <App {...props} />
                </Theme>
            </LaravelReactI18nProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
