import { useSelector } from 'react-redux'
import Profile from "./Profile"

function TableSection({ id }) {
    const user = useSelector(state => state.users[id])

    if (!user) {
        return null
    }

    const answered = Object.keys(user.answers).length
    const created = user.questions.length

    return (
        <tr>
            <td>
                <div className="user-info-cell">
                    <img 
                      src={user.avatarURL} 
                      alt={user.id} 
                      style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e5e7eb', objectFit: 'cover'}} 
                    />
                    <div className="user-details">
                        <p className="user-name">{user.name}</p>
                        <p className="user-handle">{user.id}</p>
                    </div>
                </div>
            </td>
            <td className="stat-cell">{answered}</td>
            <td className="stat-cell">{created}</td>
        </tr>
    )
}

export default TableSection