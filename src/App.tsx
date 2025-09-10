import { Routes, Route } from 'react-router-dom'
import Layout from "@/components/layout/layout"
import PageTitle from "@/components/PageTitle"
import Home from "@/pages/Home"
import Inbox from "@/pages/Inbox"
import CalendarPage from '@/pages/CalendarPage'

import Login from '@/pages/authentication/Login'
import Register from '@/pages/authentication/Register'
import ForgotPassword from '@/pages/ForgotPassword'


import NotFound from '@/pages/error/NotFound'
import UnderConstructionPage from '@/pages/UnderConstructionPage'
import ServerError from '@/pages/error/ServerError'
import Forbidden from '@/pages/error/Forbidden'
import NoAccess from '@/pages/error/NoAccess'

import Profile from '@/pages/settings/Profile'
import Account from '@/pages/settings/Account'
import Appearance from '@/pages/settings/Appearance'
import Notification from '@/pages/settings/Notification'

const App = () => {
  return (
    <>
      <PageTitle />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/calendar" element={<CalendarPage />} />

          {/* Authentication Pages */}
          <Route path="/pages/authentication/login" element={<Login />} />
          <Route path="/pages/authentication/register" element={<Register />} />
          <Route path="/pages/authentication/forgot-password" element={<ForgotPassword />} />
          
          <Route path="/file-manager" element={<UnderConstructionPage />} />

          {/* Settings Pages */}
          <Route path="/pages/settings/profile" element={<Profile />} />
          <Route path="/pages/settings/account" element={<Account />} />
          <Route path="/pages/settings/appearance" element={<Appearance />} />
          <Route path="/pages/settings/notifications" element={<Notification />} />
          <Route path="/pages/settings/display" element={<UnderConstructionPage />} />

          

          {/* Error Pages */}
          <Route path="/pages/error/404" element={<NotFound />} />
          <Route path="/pages/error/500" element={<ServerError />} />
          <Route path="/pages/error/403" element={<Forbidden />} />
          <Route path="/pages/error/401" element={<NoAccess />} />
          <Route path="/blank" element={<UnderConstructionPage />} />
          <Route path="/pricing" element={<UnderConstructionPage />} />
          <Route path="/contact" element={<UnderConstructionPage />} />
        
          
          <Route path="/pages/components/accordion" element={<UnderConstructionPage />} />
          <Route path="/pages/components/badges" element={<UnderConstructionPage />} />
          <Route path="/pages/components/breadcrumbs" element={<UnderConstructionPage />} />
          <Route path="/pages/components/buttons" element={<UnderConstructionPage />} />
          <Route path="/pages/components/cards" element={<UnderConstructionPage />} />
          <Route path="/pages/components/carousel" element={<UnderConstructionPage />} />
          <Route path="/pages/components/list-group" element={<UnderConstructionPage />} />
          <Route path="/pages/components/modal" element={<UnderConstructionPage />} />
          <Route path="/pages/components/tabs" element={<UnderConstructionPage />} />
          <Route path="/pages/components/pagination" element={<UnderConstructionPage />} />
          <Route path="/pages/components/progress" element={<UnderConstructionPage />} />
          <Route path="/pages/components/spinners" element={<UnderConstructionPage />} />
          <Route path="/pages/components/tooltips" element={<UnderConstructionPage />} />
          
          <Route path="/pages/tables/general" element={<UnderConstructionPage />} />
          <Route path="/pages/tables/data" element={<UnderConstructionPage />} />
          
          <Route path="/pages/charts/chartjs" element={<UnderConstructionPage />} />
          <Route path="/pages/charts/recharts" element={<UnderConstructionPage />} />
          <Route path="/pages/charts/apexcharts" element={<UnderConstructionPage />} />
          <Route path="/pages/charts/echarts" element={<UnderConstructionPage />} />
          
          <Route path="/pages/icons/lucide" element={<UnderConstructionPage />} />
          <Route path="/pages/icons/bootstrap" element={<UnderConstructionPage />} />
          
      
        </Routes>
      </Layout>
    </>
  )
}

export default App