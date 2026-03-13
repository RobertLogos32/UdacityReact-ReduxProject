import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { handleInitialData } from './actions/shared'
import './Styles/App.css'
import Home from './screens/Home'
import Login from './screens/Login'
import Leaderboard from './screens/Leaderboard'
import New from './screens/New'
import DashBoard from './screens/DashBoard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/new" element={<ProtectedRoute><New /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/questions/:id" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
