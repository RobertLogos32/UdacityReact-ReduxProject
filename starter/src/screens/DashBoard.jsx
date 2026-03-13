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

    const handleVote = (option) => {
        dispatch(handleAddAnswer(id, option))
    }

    // Calculations for results if answered
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    const optionOnePercent = totalVotes === 0 ? 0 : Math.round((question.optionOne.votes.length / totalVotes) * 100)
    const optionTwoPercent = totalVotes === 0 ? 0 : Math.round((question.optionTwo.votes.length / totalVotes) * 100)

    const avatarSrc = author.avatarURL || `https://ui-avatars.com/api/?name=${author.name}&background=random&size=250`

    return (
        <>
            <Navbar />
            <div className="poll-detail-container">
                <h2 className="poll-author-title">Poll by {author.id}</h2>
                <img src={avatarSrc} alt={`Avatar of ${author.name}`} className="poll-avatar" />
                
                <h3 className="poll-question-title">Would You Rather</h3>

                <div className="poll-options-container">
                    <div className="poll-option-card">
                        <div className="poll-option-text">
                            {question.optionOne.text}
                        </div>
                        {!hasAnswered ? (
                            <button className="poll-option-button" onClick={() => handleVote('optionOne')}>
                                Click
                            </button>
                        ) : (
                            <div className={`poll-results ${hasAnsweredOptionOne ? 'selected-result' : ''}`} style={{padding: '1rem', backgroundColor: hasAnsweredOptionOne ? '#ecfdf5' : '#f9fafb', flex: 1, borderTop: '1px solid #e5e7eb'}}>
                                {hasAnsweredOptionOne && <div style={{color: '#059669', fontWeight: 'bold', marginBottom: '0.5rem'}}>✓ Your Vote</div>}
                                <div className="poll-result-bar-bg">
                                    <div className="poll-result-bar-fill" style={{width: `${optionOnePercent}%`}}>
                                        {optionOnePercent}%
                                    </div>
                                </div>
                                <div className="poll-meta">
                                    {question.optionOne.votes.length} out of {totalVotes} votes
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="poll-option-card">
                        <div className="poll-option-text">
                            {question.optionTwo.text}
                        </div>
                        {!hasAnswered ? (
                            <button className="poll-option-button" onClick={() => handleVote('optionTwo')}>
                                Click
                            </button>
                        ) : (
                            <div className={`poll-results ${hasAnsweredOptionTwo ? 'selected-result' : ''}`} style={{padding: '1rem', backgroundColor: hasAnsweredOptionTwo ? '#ecfdf5' : '#f9fafb', flex: 1, borderTop: '1px solid #e5e7eb'}}>
                                {hasAnsweredOptionTwo && <div style={{color: '#059669', fontWeight: 'bold', marginBottom: '0.5rem'}}>✓ Your Vote</div>}
                                <div className="poll-result-bar-bg">
                                    <div className="poll-result-bar-fill" style={{width: `${optionTwoPercent}%`}}>
                                        {optionTwoPercent}%
                                    </div>
                                </div>
                                <div className="poll-meta">
                                    {question.optionTwo.votes.length} out of {totalVotes} votes
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard