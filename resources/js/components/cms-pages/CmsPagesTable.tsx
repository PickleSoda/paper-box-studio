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
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { Edit, PlusCircle, Trash } from "lucide-react"; // Lucide icons

export default function CmsPagesTable({ pages }: { pages: BlogPageType[] }) {
    const { t } = useLaravelReactI18n();
    const { patch, delete: destroy } = useForm();
    const [open, setOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState<BlogPageType | null>(null);

    // Handle visibility toggle
    const toggleVisibility = (page: BlogPageType) => {
        patch(route('pages.changeVisibility', { pageId: page.id }), {
            onSuccess: () => alert('Visibility changed successfully'),
        });
    };

    // Open confirmation dialog for delete
    const confirmDelete = (page: BlogPageType) => {
        setSelectedPage(page);
        setOpen(true);
    };

    // Handle delete action
    const handleDelete = () => {
        if (selectedPage) {
            destroy(route("pages.destroy", selectedPage.id)); // Send delete request
            setOpen(false);
        }
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Visibility</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pages.map((page: BlogPageType) => (
                        <TableRow key={page.id}>
                            <TableCell>{JSON.parse(page.title).name}</TableCell>
                            <TableCell>
                                <Switch
                                    checked={page.is_visible}
                                    onCheckedChange={() => toggleVisibility(page)}
                                />
                            </TableCell>
                            <TableCell>
                                <Button variant="outline" className="mr-2">
                                    <Link href={route("pages.edit", page.id)}>
                                        <Edit className="w-4 h-4" /> {/* Edit Icon */}
                                    </Link>
                                </Button>
                                <Button variant="outline" className="mr-2">
                                    <Link href={route("pages.create", page.id)}>
                                        <PlusCircle className="w-4 h-4" /> {/* Add Sub Page Icon */}
                                    </Link>
                                </Button>
                                <Button
                                    onClick={() => confirmDelete(page)}
                                    variant="destructive"
                                >
                                    <Trash className="w-4 h-4" /> {/* Delete Icon */}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Dialog for Delete Confirmation */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {/* No visible trigger required; dialog opens from the delete action */}
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>{t('Delete Page')}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this page? This action cannot be undone.
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
