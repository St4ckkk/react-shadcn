import MainLayout from "@/components/layout/main-layout";
import NotesComponent from "@/components/notes";

export default function NotesPage() {
    return (
        <MainLayout
            title="Notes"
            description="Your personal notes"
        >
            <NotesComponent />

        </MainLayout>
    )
}