import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../actions/authedUser'
import Profile from './Profile'
import '../Styles/Navbar.css'

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
        navigate('/login')
    }

    return (
        <nav className="navbar-container">
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
                <li className="navbar-item"><Link to="/leaderboard" className="navbar-link">Leaderboard</Link></li>
                <li className="navbar-item"><Link to="/new" className="navbar-link">New</Link></li>
                <li className="navbar-item" style={{marginLeft: 'auto'}}>
                    <div className="navbar-link navbar-profile-link" style={{cursor: 'default'}}>
                        <Profile />
                    </div>
                </li>
                <li className="navbar-item">
                    <button onClick={handleLogout} className="navbar-button">Logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
