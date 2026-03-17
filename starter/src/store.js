import { legacy_createStore as createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'

export const store = createStore(reducer, middleware)
