import KanbanComponent from "@/components/kanban"
import MainLayout from "@/components/layout/main-layout"

export default function Kanban() {

  return (
    <MainLayout
      title="Kanban"
      description="Agile workflow visualization that actually works. Move tasks between columns with smooth animations, built with React and Shadcn UI who value clean code and great user experiences."
    >
      <KanbanComponent />
    </MainLayout>
  )
}