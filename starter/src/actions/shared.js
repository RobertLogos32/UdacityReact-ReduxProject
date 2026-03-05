import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions, addQuestion, addAnswer } from './questions'

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveQuestions(questions))
    })
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
  }
}

export function handleAddAnswer (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => {
        dispatch(addAnswer({ authedUser, qid, answer }))
      })
  }
}
