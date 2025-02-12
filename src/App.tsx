import { BrowserRouter, Routes, Route } from "react-router"
import Home from './pages/Home'
import Login from './pages/Login'
import './styles/index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
