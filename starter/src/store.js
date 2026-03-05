import { legacy_createStore as createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'

// Creiamo lo store base passando il reducer principale e i middleware
export const store = createStore(reducer, middleware)
