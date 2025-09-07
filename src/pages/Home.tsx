import MainLayout from "@/components/layout/main-layout"
import KlioBanner from "@/components/klio-banner"

const Home = () => {
  return (
    <MainLayout 
      title="Dashboard" 
      description="Welcome back!"
    >
      <KlioBanner />
    </MainLayout>
  )
}

export default Home