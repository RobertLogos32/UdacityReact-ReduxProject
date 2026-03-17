
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'
import Navbar from '../components/Navbar'
import '../Styles/New.css'

function New() {
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authedUser = useSelector(state => state.authedUser)

    if (!authedUser) {
        return (
            <>
                <Navbar />
                <div style={{textAlign: 'center', marginTop: '50px'}}>Please log in to create a new poll.</div>
            </>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (optionOne && optionTwo) {
            dispatch(handleAddQuestion(optionOne, optionTwo))
            navigate('/')
        }
    }

    return (
        <>
            <Navbar />
            <div className="new-poll-container">
                <h2>Would You Rather</h2>
                <form onSubmit={handleSubmit} className="new-poll-form">
                    <input 
                        type="text" 
                        placeholder="Option One" 
                        value={optionOne}
                        onChange={(e) => setOptionOne(e.target.value)}
                        className="new-poll-input"
                    />
                    <input 
                        type="text" 
                        placeholder="Option Two" 
                        value={optionTwo}
                        onChange={(e) => setOptionTwo(e.target.value)}
                        className="new-poll-input"
                    />
                    <button 
                        type="submit" 
                        disabled={!optionOne || !optionTwo}
                        className="new-poll-button"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default New
