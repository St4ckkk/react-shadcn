import { SidebarProvider } from "./components/ui/sidebar"
import Layout  from "./components/custom/layout"
import { AppSidebar } from "./components/app-sidebar"

const App = () => {
  return (
    <>
      <Layout>
          <AppSidebar />
        <div className="min-h-screen bg-background flex">
          <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold underline">Hello, world!</h1>
          </main>
        </div>
      </Layout>
    </>
  )
}

export default App