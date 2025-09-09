import { Routes, Route } from 'react-router-dom'
import Layout from "@/components/layout/layout"
import Home from "@/pages/Home"
import Inbox from "@/pages/Inbox"
import CalendarPage from '@/pages/CalendarPage'
import UnderConstructionPage from '@/pages/UnderConstructionPage'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ForgotPassword from '@/pages/ForgotPassword'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/calendar" element={<CalendarPage />} />
        
        <Route path="/file-manager" element={<UnderConstructionPage />} />
        <Route path="/settings" element={<UnderConstructionPage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/404" element={<UnderConstructionPage />} />
        <Route path="/500" element={<UnderConstructionPage />} />
        <Route path="/blank" element={<UnderConstructionPage />} />
        <Route path="/pricing" element={<UnderConstructionPage />} />
        <Route path="/contact" element={<UnderConstructionPage />} />
        <Route path="/profile" element={<UnderConstructionPage />} />
        
        <Route path="/components/alerts" element={<UnderConstructionPage />} />
        <Route path="/components/avatar" element={<UnderConstructionPage />} />
        <Route path="/components/badge" element={<UnderConstructionPage />} />
        <Route path="/components/breadcrumb" element={<UnderConstructionPage />} />
        <Route path="/components/button" element={<UnderConstructionPage />} />
        <Route path="/components/calendar" element={<UnderConstructionPage />} />
        <Route path="/components/card" element={<UnderConstructionPage />} />
        <Route path="/components/dropdown-menu" element={<UnderConstructionPage />} />
        <Route path="/components/input" element={<UnderConstructionPage />} />
        <Route path="/components/label" element={<UnderConstructionPage />} />
        <Route path="/components/popover" element={<UnderConstructionPage />} />
        <Route path="/components/progress" element={<UnderConstructionPage />} />
        <Route path="/components/scroll-area" element={<UnderConstructionPage />} />
        <Route path="/components/select" element={<UnderConstructionPage />} />
        <Route path="/components/separator" element={<UnderConstructionPage />} />
        <Route path="/components/sheet" element={<UnderConstructionPage />} />
        <Route path="/components/sidebar" element={<UnderConstructionPage />} />
        <Route path="/components/skeleton" element={<UnderConstructionPage />} />
        <Route path="/components/table" element={<UnderConstructionPage />} />
        <Route path="/components/textarea" element={<UnderConstructionPage />} />
        <Route path="/components/tooltip" element={<UnderConstructionPage />} />
        
        <Route path="/charts/area" element={<UnderConstructionPage />} />
        <Route path="/charts/bar" element={<UnderConstructionPage />} />
        <Route path="/charts/line" element={<UnderConstructionPage />} />
        <Route path="/charts/pie" element={<UnderConstructionPage />} />
        
        <Route path="/forms/advanced" element={<UnderConstructionPage />} />
        <Route path="/forms/basic" element={<UnderConstructionPage />} />
        <Route path="/forms/validation" element={<UnderConstructionPage />} />
        
        <Route path="/tables/basic" element={<UnderConstructionPage />} />
        <Route path="/tables/advanced" element={<UnderConstructionPage />} />
        
        <Route path="*" element={<UnderConstructionPage />} />
      </Routes>
    </Layout>
  )
}

export default App