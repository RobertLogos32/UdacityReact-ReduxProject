import { _saveQuestion, _saveQuestionAnswer } from '../../../_DATA'

describe('_saveQuestion', () => {
    it('should return the saved question with all expected fields when correctly formatted data is passed', async () => {
        const question = {
            optionOneText: 'Red',
            optionTwoText: 'Blue',
            author: 'sarahedo'
        }
        const result = await _saveQuestion(question)
        expect(result.author).toBe('sarahedo')
        expect(result.optionOne.text).toBe('Red')
        expect(result.optionTwo.text).toBe('Blue')
        expect(result.id).toBeDefined()
        expect(result.timestamp).toBeDefined()
    })

    it('should return an error if incorrect data is passed', async () => {
        const question = {
            optionOneText: 'Red',
            author: 'sarahedo'
        }
        await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
    })
})

describe('_saveQuestionAnswer', () => {
    it('should return true when correctly formatted data is passed', async () => {
        const answer = {
            authedUser: 'sarahedo',
            qid: '8xf0y6ziyjabvozdd253nd',
            answer: 'optionOne'
        }
        const result = await _saveQuestionAnswer(answer)
        expect(result).toBe(true)
    })

    it('should return an error if incorrect data is passed', async () => {
        const answer = {
            authedUser: 'sarahedo'
        }
        await expect(_saveQuestionAnswer(answer)).rejects.toEqual("Please provide authedUser, qid, and answer")
    })
})

