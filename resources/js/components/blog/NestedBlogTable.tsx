import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BlogPageListType } from "@/types";

interface NestedBlogTableProps {
    pages: BlogPageListType[];
}

const NestedBlogTable = ({ pages }: NestedBlogTableProps) => {
    // Recursive function to render pages and subpages
    const renderPage = (page: BlogPageListType) => {
        return (
            <AccordionItem key={page.id} value={String(page.id)}>
                <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">{page.title}</span>
                        <span className="text-sm text-gray-500">
                            {page.is_visible ? "Visible" : "Hidden"}
                            {page.subpages.length > 0 &&
                                ` (${page.subpages.length} subpages)`}
                        </span>
                    </div>
                    <div className="flex space-x-4">
                        <Button variant="outline">
                            {page.is_visible ? "Hide" : "Show"}
                        </Button>
                        {page.subpages.length > 0 && (
                            <AccordionTrigger>
                                <Button variant="ghost">Show More</Button>
                            </AccordionTrigger>
                        )}
                    </div>
                </div>

                {/* Recursive rendering for subpages */}
                <AccordionContent>
                    {page.subpages.length > 0 ? (
                        <ul className="ml-4">
                            {page.subpages.map((subpage) =>
                                renderPage(subpage)
                            )}
                        </ul>
                    ) : (
                        <p className="ml-4 text-gray-500">No subpages</p>
                    )}
                </AccordionContent>
            </AccordionItem>
        );
    };

    return (
        <Accordion type="single" collapsible className="w-full">
            {pages.map((page) => renderPage(page))}
        </Accordion>
    );
};

export default NestedBlogTable;
