import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../Styles/Question.css'

function Question({ id }) {
    const question = useSelector(state => state.questions[id])
    const author = useSelector(state => state.users[question?.author])

    if (!question || !author) {
        return null
    }

    const d = new Date(question.timestamp)
    let hours = d.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    const strTime = `${hours}:${d.getMinutes().toString().padStart(2, '0')}:${ampm}`
    const strDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
    
    const formattedDate = `${strTime} | ${strDate}`

    return (
        <div className="question-card">
            <div className="question-header">
                <img 
                    src={author.avatarURL} 
                    alt={author.id} 
                    className="question-avatar" 
                />
                <h3 className="question-name">{author.id}</h3>
            </div>
            <p className="question-time">{formattedDate}</p>
            <Link to={`/questions/${id}`} style={{textDecoration: 'none'}}>
                <button className="question-button">Show</button>
            </Link>
        </div>
    )
}

export default Question