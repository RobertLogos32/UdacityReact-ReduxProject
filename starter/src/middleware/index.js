import { thunk } from 'redux-thunk'
import { applyMiddleware } from 'redux'
import auth from './auth'

export default applyMiddleware(
    thunk,
    auth
)
