import { Routes, Route } from 'react-router-dom'
import Layout from "@/components/layout/layout"
import Home from "@/pages/Home"

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  )
}

export default App