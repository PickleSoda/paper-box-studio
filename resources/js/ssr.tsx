import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { route } from "../../vendor/tightenco/ziggy";
import { RouteName, RouteParams } from "ziggy-js";
import { LaravelReactI18nProvider } from "laravel-react-i18n";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob("./Pages/**/*.tsx")
            ),
        setup: ({ App, props }) => {
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as RouteParams<string & {}>, absolute, {
                    ...(page.props.ziggy as any),
                    location: new URL((page.props.ziggy as any).location),
                });

            return (
                <LaravelReactI18nProvider
                    locale={"en"}
                    fallbackLocale={"en"}
                    files={import.meta.glob("/lang/*.json", { eager: true })}
                >
                    <App {...props} />{" "}
                </LaravelReactI18nProvider>
            );
        },
    })
);
