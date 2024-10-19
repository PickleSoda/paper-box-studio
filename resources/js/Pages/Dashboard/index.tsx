import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import DashboardLayout from '@/layouts/AuthenticatedLayout';
export default function Dashboard({ auth, cms }: PageProps) {
    const { t } = useLaravelReactI18n();
    return (
        <DashboardLayout
            cms={cms}
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{t('h')}</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
