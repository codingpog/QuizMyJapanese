import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Signup from './components/Signup'
import {Route, Routes, Navigate} from "react-router-dom"
import './App.css'

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
