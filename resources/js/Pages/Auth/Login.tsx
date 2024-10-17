// src/components/auth/Login.jsx

import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/layouts/GuestLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a Shadcn UI Checkbox
import { Head, Link, useForm } from "@inertiajs/react";
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const { t } = useLaravelReactI18n() as any; // Laravel React i18n hook
    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login")); // Inertia.js form submission
    };

    return (
        <GuestLayout>
            <Head title={t("login").titile} /> {/* Set page title with i18n */}
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <Card className="mx-4 sm:mx-auto max-w-md my-56">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {t("login").title}
                    </CardTitle>
                    <CardDescription>{t("login").description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid gap-4">
                            {/* Email Input */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {t("login").emailLabel}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        {t("login").passwordLabel}
                                    </Label>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="ml-auto inline-block text-sm underline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                        >
                                            {t("login").forgotPassword}
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {t("confirmPassword").errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="flex items-center">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked: boolean) =>
                                        setData("remember", checked)
                                    }
                                />
                                <Label
                                    htmlFor="remember"
                                    className="ms-2 text-sm text-gray-600 dark:text-gray-400"
                                >
                                    {t("login").rememberMe}
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {t("login").loginButton}
                            </Button>

                            {/* Google Login */}
                            <Button variant="outline" className="w-full">
                                {t("login").loginWithGoogle}
                            </Button>
                        </div>

                        {/* Sign-Up Link */}
                        <div className="mt-4 text-center text-sm">
                            {t("login").noAccount}{" "}
                            <Link
                                href={route("register")}
                                className="underline"
                            >
                                {t("login").signUp}
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
