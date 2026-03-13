import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Question from '../components/Question'
import '../Styles/Home.css'

function Home() {
    const [view, setView] = useState('unanswered')
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
                <div className="home-toggle-container" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', gap: '0' }}>
                    <button 
                        onClick={() => setView('unanswered')}
                        style={{
                            padding: '10px 20px',
                            cursor: 'pointer',
                            backgroundColor: view === 'unanswered' ? '#10b981' : '#f3f4f6',
                            color: view === 'unanswered' ? 'white' : '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px 0 0 4px',
                            fontWeight: 'bold'
                        }}
                    >
                        Unanswered
                    </button>
                    <button 
                        onClick={() => setView('answered')}
                        style={{
                            padding: '10px 20px',
                            cursor: 'pointer',
                            backgroundColor: view === 'answered' ? '#10b981' : '#f3f4f6',
                            color: view === 'answered' ? 'white' : '#374151',
                            border: '1px solid #d1d5db',
                            borderLeft: 'none',
                            borderRadius: '0 4px 4px 0',
                            fontWeight: 'bold'
                        }}
                    >
                        Answered
                    </button>
                </div>

                <div className="home-section">
                    <div className="home-section-header">
                        <h2>{view === 'unanswered' ? 'New Questions' : 'Done'}</h2>
                    </div>
                    <div className="home-questions-grid">
                        {view === 'unanswered' 
                            ? newQuestions.map(id => <Question key={id} id={id} />)
                            : doneQuestions.map(id => <Question key={id} id={id} />)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home