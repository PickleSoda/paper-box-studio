import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { BlogPageType, PageProps } from "@/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import CmsPagesTable from "@/components/cms-pages/CmsPagesTable";
import { Card, CardContent } from "@/components/ui/card";

export default function PageForm({
    auth,
    page,
    parent,
    childPages,
    cms,
}: PageProps<{
    page?: BlogPageType;
    parent?: BlogPageType;
    childPages?: BlogPageType[];
}>) {
    const { t } = useLaravelReactI18n();
    console.log(page);
    console.log(parent);
    console.log(childPages);
    const { data, setData, post, errors } = useForm({
        title: page?.title || "",
        description: page?.description || "",
        content: page?.content || "",
        cover_image: page?.cover_image || "",
        parent_id: parent?.id ? parent.id : page?.parent_id || "",
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route("pages.store"), {
            onSuccess: () => {
                alert("Page created successfully");
            },
        });
    };

    return (
        <AuthenticatedLayout
            cms={cms}
            user={auth.user}
            header={
                page?.id ? (
                    <h1 className="text-2xl font-bold m-4">
                        {page?.title} Page
                    </h1>
                ) : (
                    <h1 className="text-2xl font-bold m-4">
                        Create New {parent?.title} Page{" "}
                    </h1>
                )
            }
        >
            <Head title="Dashboard" />

            <div className="container">
                {childPages && (
                    <Card className="my-20">
                        <CardContent>
                            <CmsPagesTable pages={childPages} />
                        </CardContent>
                    </Card>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="Enter page title"
                        />
                        {errors.title && (
                            <span className="text-red-500">{errors.title}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Enter page description"
                        />
                        {errors.description && (
                            <span className="text-red-500">
                                {errors.description}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            placeholder="Enter page content"
                        />
                        {errors.content && (
                            <span className="text-red-500">
                                {errors.content}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="cover_image">Cover Image URL</Label>
                        <Input
                            id="cover_image"
                            type="text"
                            value={data.cover_image}
                            onChange={(e) =>
                                setData("cover_image", e.target.value)
                            }
                            placeholder="Enter cover image URL"
                        />
                        {errors.cover_image && (
                            <span className="text-red-500">
                                {errors.cover_image}
                            </span>
                        )}
                    </div>

                    <Button type="submit">
                        {page?.id ? "Update Page" : "Create Page"}
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
