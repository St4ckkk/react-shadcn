import { Routes, Route } from 'react-router-dom'
import Layout from "@/components/layout/layout"
import PageTitle from "@/components/PageTitle"
import Home from "@/pages/Home"
import Inbox from "@/pages/Inbox"
import CalendarPage from '@/pages/CalendarPage'
import FileManager from '@/pages/apps/file-manager/FileManager'

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



import Kanban from './pages/Kanban'
import Notes from './pages/apps/notes/Notes'
import NotesDetails from './pages/apps/notes/NotesDetails'
import FolderDetails from './pages/apps/file-manager/FolderDetails'


import ColumnPricing from './pages/pricing/column-pricing'
import TablePricing from './pages/pricing/table-pricing'
import SinglePricing from './pages/pricing/single-pricing'

const App = () => {
  return (
    <>
      <PageTitle />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/file-manager/folder/:folderId" element={<FolderDetails />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<NotesDetails />} />



          {/* Pricing Pages */}
          <Route path="/pages/pricing/column" element={<ColumnPricing />} />
          <Route path="/pages/pricing/table" element={< TablePricing/>} />
          <Route path="/pages/pricing/single" element={< SinglePricing/>} />

          {/* Authentication Pages */}
          <Route path="/pages/authentication/login" element={<Login />} />
          <Route path="/pages/authentication/register" element={<Register />} />
          <Route path="/pages/authentication/forgot-password" element={<ForgotPassword />} />



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




        </Routes>
      </Layout>
    </>
  )
}

export default App