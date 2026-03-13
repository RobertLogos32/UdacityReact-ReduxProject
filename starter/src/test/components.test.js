import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createStore } from 'redux'
import rootReducer from '../reducers'
import Login from '../screens/Login'

describe('Essential Component Tests', () => {
    it('matches Login component snapshot', () => {
        const { asFragment } = render(
            <Provider store={createStore(rootReducer)}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it('updates user selection on Login form', () => {
        const preloadedState = {
            users: {
                sarahedo: { id: 'sarahedo', name: 'Sarah Edo', avatarURL: null, answers: {}, questions: [] }
            }
        }
        render(
            <Provider store={createStore(rootReducer, preloadedState)}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        )
        
        const select = screen.getByRole('combobox')
        fireEvent.change(select, { target: { value: 'sarahedo' } })
        expect(select.value).toBe('sarahedo')
    })
})

