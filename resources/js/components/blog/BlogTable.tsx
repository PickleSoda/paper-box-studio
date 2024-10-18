import { PageProps } from "@/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { BlogPageType } from "@/types";

export default function BlogTable({ pages }: { pages: BlogPageType[] }) {
    const { t } = useLaravelReactI18n();
    const { post, delete: destroy } = useForm();

    // Handle visibility toggle
    const toggleVisibility = (page: BlogPageType) => {
        // Call API or Inertia post here to toggle visibility
        post(`/admin/pages/${page.id}/toggle-visibility`);
    };

    // Handle delete
    const handleDelete = (pageId: number) => {
        if (confirm("Are you sure you want to delete this page?")) {
            destroy(route("pages.destroy", pageId)); // Send delete request
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pages.map((page: BlogPageType) => (
                    <TableRow key={page.id}>
                        <TableCell>{JSON.parse(page.title).name}</TableCell>
                        <TableCell>{page.description}</TableCell>
                        <TableCell>
                            <Switch
                                checked={page.is_visible}
                                onCheckedChange={() => toggleVisibility(page)}
                            />
                        </TableCell>
                        <TableCell>
                            <Button
                                type="button"
                                variant="outline"
                                className="mr-2 bg-amber-400/70"
                            >
                                <Link href={route("pages.edit", page.id)}>
                                    Edit
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="mr-2 bg-green-500/70"
                            >
                                <Link href={route("pages.create", page.id)}>
                                    Add Sub Page
                                </Link>
                            </Button>

                            <Button
                                onClick={() => handleDelete(page.id)}
                                variant="destructive"
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
