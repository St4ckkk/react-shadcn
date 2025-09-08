import { Routes, Route } from 'react-router-dom'
import Layout from "@/components/layout/layout"
import Home from "@/pages/Home"
import Inbox from "@/pages/Inbox"
import CalendarPage from './pages/CalendarPage'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Layout>
  )
}

export default App