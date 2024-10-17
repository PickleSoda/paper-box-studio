import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useForm } from "@inertiajs/react";
import BlogTable from "@/components/blog/BlogTable";
import { BlogPageType } from "@/types";

export default function Pages({
    auth,
    pages,
}: PageProps<{ pages: BlogPageType[] }>) {
    const { t } = useLaravelReactI18n();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {t("hi")}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="container">
                <h1 className="text-2xl font-bold mb-4">All Pages</h1>

                <BlogTable pages={pages} />
            </div>
        </AuthenticatedLayout>
    );
}