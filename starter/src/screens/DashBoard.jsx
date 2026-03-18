import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { handleAddAnswer } from '../actions/shared'
import Navbar from '../components/Navbar'
import '../Styles/DashBoard.css'

function DashBoard() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const authedUser = useSelector(state => state.authedUser)
    const questions = useSelector(state => state.questions)
    const users = useSelector(state => state.users)

    const question = questions[id]
    
    if (!question) {
        return (
            <>
                <Navbar />
                <div style={{textAlign: 'center', marginTop: '50px', fontSize: '1.5rem'}}>
                    <h2>404 - Poll Not Found</h2>
                    <button onClick={() => navigate('/')} style={{padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer'}}>Back to Home</button>
                </div>
            </>
        )
    }

    const author = users[question.author]
    const hasAnsweredOptionOne = question.optionOne.votes.includes(authedUser)
    const hasAnsweredOptionTwo = question.optionTwo.votes.includes(authedUser)
    const hasAnswered = hasAnsweredOptionOne || hasAnsweredOptionTwo

    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes

    const optionOnePercentage = totalVotes > 0 ? Math.round((optionOneVotes / totalVotes) * 100) : 0
    const optionTwoPercentage = totalVotes > 0 ? Math.round((optionTwoVotes / totalVotes) * 100) : 0

    const handleVote = (option) => {
        dispatch(handleAddAnswer(id, option))
    }

    return (
        <>
            <Navbar />
            <div className="poll-detail-container">
                <h2 className="poll-author-title">Poll by {author.id}</h2>
                <img 
                    src={author.avatarURL} 
                    alt={author.id} 
                    className="poll-avatar" 
                />
                
                <h3 className="poll-question-title">Would You Rather</h3>

                <div className="poll-options-container">
                    <div className={`poll-option-card${hasAnsweredOptionOne ? ' selected' : ''}`}>
                        <div className="poll-option-text">
                            {question.optionOne.text}
                        </div>
                        {!hasAnswered ? (
                            <button className="poll-option-button" onClick={() => handleVote('optionOne')}>
                                Click
                            </button>
                        ) : (
                            <div className="poll-results">
                                {hasAnsweredOptionOne && (
                                    <div className="result-label selected-label">✓ Your vote</div>
                                )}
                                <p className="poll-votes">{optionOneVotes} {optionOneVotes === 1 ? 'vote' : 'votes'}</p>
                                <p className="poll-percentage">{optionOnePercentage}%</p>
                            </div>
                        )}
                    </div>

                    <div className={`poll-option-card${hasAnsweredOptionTwo ? ' selected' : ''}`}>
                        <div className="poll-option-text">
                            {question.optionTwo.text}
                        </div>
                        {!hasAnswered ? (
                            <button className="poll-option-button" onClick={() => handleVote('optionTwo')}>
                                Click
                            </button>
                        ) : (
                            <div className="poll-results">
                                {hasAnsweredOptionTwo && (
                                    <div className="result-label selected-label">✓ Your vote</div>
                                )}
                                <p className="poll-votes">{optionTwoVotes} {optionTwoVotes === 1 ? 'vote' : 'votes'}</p>
                                <p className="poll-percentage">{optionTwoPercentage}%</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard