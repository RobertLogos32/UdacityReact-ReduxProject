import { SET_AUTHED_USER } from '../actions/authedUser'

const auth = (store) => (next) => (action) => {
    if (action.type === SET_AUTHED_USER && action.id !== null) {
        const { users } = store.getState()
        const user = users[action.id]

        if (user && user.password === action.password) {
            // Se le credenziali sono corrette, l'azione passa al reducer
            return next(action)
        } else {
            // Se fallisce, crea la lista di utenti validi e blocca l'azione
            const validUsersList = Object.values(users)
                .map(u => `Username: ${u.id} | Password: ${u.password}`)
                .join('\n')
                
            alert(`USER NOT FOUND OR WRONG PASSWORD.\n\nPlease log in using one of the following registered users:\n\n${validUsersList}`)
            
            // Restituisce false per far sapere al Login.jsx che è fallito
            return false
        }
    }
    return next(action)
}

export default auth
