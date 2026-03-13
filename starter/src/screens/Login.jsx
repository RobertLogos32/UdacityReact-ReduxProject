import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import '../Styles/Auth.css'

function Login() {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    
    const users = useSelector(state => state.users)
    const userList = Object.values(users)

    const handleLogin = (e) => {
        e.preventDefault()
        
        const result = dispatch(setAuthedUser(userId, password))
        
        if (result !== false) {
            const redirectUrl = location.state?.from?.pathname || '/'
            navigate(redirectUrl, { replace: true })
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Log In</h1>
                <form className="auth-form" onSubmit={handleLogin}>
                    <select 
                        className="auth-input" 
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={{ padding: '0.75rem', width: '100%', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    >
                        <option value="" disabled>Select User</option>
                        {userList.map(user => (
                            <option key={user.id} value={user.id}>{user.name} ({user.id})</option>
                        ))}
                    </select>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="auth-input" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="auth-button" disabled={!userId || !password}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
