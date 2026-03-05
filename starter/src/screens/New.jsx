
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'
import Navbar from '../components/Navbar'

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
            <div className="new-poll-container" style={{maxWidth: '600px', margin: '2rem auto', textAlign: 'center'}}>
                <h2>Would You Rather</h2>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <input 
                        type="text" 
                        placeholder="Option One" 
                        value={optionOne}
                        onChange={(e) => setOptionOne(e.target.value)}
                        style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc'}}
                    />
                    <input 
                        type="text" 
                        placeholder="Option Two" 
                        value={optionTwo}
                        onChange={(e) => setOptionTwo(e.target.value)}
                        style={{padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc'}}
                    />
                    <button 
                        type="submit" 
                        disabled={!optionOne || !optionTwo}
                        style={{padding: '0.75rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: optionOne && optionTwo ? 'pointer' : 'not-allowed'}}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default New
