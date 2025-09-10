import MainLayout from "@/components/layout/main-layout"
import KlioBanner from "@/components/klio-banner"
import { useIsMobile } from "@/hooks/use-mobile"

const Home = () => {
  const isMobile = useIsMobile()

  return (
    <MainLayout 
      title="Dashboard" 
      description="Welcome back!"
    >
      <div className={isMobile ? '' : ''}>
        <KlioBanner />
      </div>
    </MainLayout>
  )
}

export default Home