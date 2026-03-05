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
              src={user.avatarURL || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
              alt={`Avatar of ${user.name}`} 
              style={{width: 30, height: 30, borderRadius: '50%', objectFit: 'cover'}}
            />
            <p style={{margin: 0}}>{user.name}</p>
        </div>
    )
}

export default Profile