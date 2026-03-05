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

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions/:id" element={<DashBoard />} />
      </Routes>
    </div>
  )
}

export default App
