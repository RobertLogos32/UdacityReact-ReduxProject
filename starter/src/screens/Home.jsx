import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Question from '../components/Question'
import '../Styles/Home.css'

function Home() {
    const authedUser = useSelector(state => state.authedUser)
    const questions = useSelector(state => state.questions)
    const users = useSelector(state => state.users)

    if (!authedUser || !users[authedUser] || Object.keys(questions).length === 0) {
        return (
            <>
                <Navbar />
                <div style={{textAlign: 'center', marginTop: '50px'}}>Please log in to see questions.</div>
            </>
        )
    }

    const answeredIds = Object.keys(users[authedUser].answers)
    const unansweredIds = Object.keys(questions).filter(id => !answeredIds.includes(id))


    const sortFn = (a, b) => questions[b].timestamp - questions[a].timestamp
    
    const newQuestions = unansweredIds.sort(sortFn)
    const doneQuestions = answeredIds.sort(sortFn)

    return (
        <>
            <Navbar />
            <div className="home-container">
                <div className="home-section">
                    <div className="home-section-header">
                        <h2>New Questions</h2>
                    </div>
                    <div className="home-questions-grid">
                        {newQuestions.map(id => <Question key={id} id={id} />)}
                    </div>
                </div>

                <div className="home-section">
                    <div className="home-section-header">
                        <h2>Done</h2>
                    </div>
                    <div className="home-questions-grid">
                        {doneQuestions.map(id => <Question key={id} id={id} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home