import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import TableSection from '../components/TableSection'
import '../Styles/Leaderboard.css'

function Leaderboard() {
    const users = useSelector(state => state.users)
    

    const leaderboardData = Object.values(users)
        .map(user => ({
            id: user.id,
            answered: Object.keys(user.answers).length,
            created: user.questions.length,
            score: Object.keys(user.answers).length + user.questions.length
        }))
        .sort((a, b) => b.score - a.score)

    return (
        <>
            <Navbar />
            <div className="leaderboard-container">
                <div className="leaderboard-table-wrapper">
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Users</th>
                                <th>Answered</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardData.map(user => (
                                <TableSection key={user.id} id={user.id} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Leaderboard