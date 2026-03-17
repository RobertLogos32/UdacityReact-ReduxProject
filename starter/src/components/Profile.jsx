import { useSelector } from 'react-redux'

function Profile() {
    const authedUser = useSelector(state => state.authedUser)
    const user = useSelector(state => state.users[authedUser])

    if (!user) {
        return null
    }

    return (
        <div className="profile-wrapper">
            <img 
              src={user.avatarURL} 
              alt={user.id} 
              style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', display: 'block'}}
            />
            <p style={{margin: 0}}>{user.name}</p>
        </div>
    )
}

export default Profile