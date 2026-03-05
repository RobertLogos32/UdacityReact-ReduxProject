import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import '../Styles/Auth.css'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        
        const result = dispatch(setAuthedUser(username, password))
        
        if (result !== false) {
            navigate('/')
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Log In</h1>
                <form className="auth-form" onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Username (e.g. sarahedo)" 
                        className="auth-input" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="auth-input" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="auth-button" disabled={!username || !password}>
                        Login
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Login
