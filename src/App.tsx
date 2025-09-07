import { Routes, Route } from 'react-router-dom'
import Layout from "@/components/layout/layout"
import Home from "@/pages/Home"
import Inbox from "@/pages/Inbox"

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </Layout>
  )
}

export default App