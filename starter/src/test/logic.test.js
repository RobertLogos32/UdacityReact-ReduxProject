import authedUser from '../reducers/authedUser';
import { SET_AUTHED_USER, LOGOUT_USER, setAuthedUser, logoutUser } from '../actions/authedUser';
import { RECEIVE_USERS, receiveUsers } from '../actions/users';
import { RECEIVE_QUESTIONS, receiveQuestions } from '../actions/questions';

describe('Logic Tests', () => {
    describe('authedUser reducer', () => {
        it('should handle SET_AUTHED_USER', () => {
            const action = { type: SET_AUTHED_USER, id: 'sarahedo' };
            const state = authedUser(null, action);
            expect(state).toBe('sarahedo');
        });

        it('should handle LOGOUT_USER', () => {
            const action = { type: LOGOUT_USER };
            const state = authedUser('sarahedo', action);
            expect(state).toBe(null);
        });
    });

    describe('authedUser action creators', () => {
        it('setAuthedUser should create SET_AUTHED_USER action', () => {
            const action = setAuthedUser('sarahedo');
            expect(action).toEqual({
                type: SET_AUTHED_USER,
                id: 'sarahedo',
                password: undefined
            });
        });

        it('logoutUser should create LOGOUT_USER action', () => {
            const action = logoutUser();
            expect(action).toEqual({
                type: LOGOUT_USER
            });
        });
    });

    describe('users action creators', () => {
        it('receiveUsers should create RECEIVE_USERS action', () => {
            const users = { sarahedo: { id: 'sarahedo' } };
            const action = receiveUsers(users);
            expect(action).toEqual({
                type: RECEIVE_USERS,
                users
            });
        });
    });

    describe('questions action creators', () => {
        it('receiveQuestions should create RECEIVE_QUESTIONS action', () => {
            const questions = { '8xf0y6ziyjabvozdd253nd': { id: '8xf0y6ziyjabvozdd253nd' } };
            const action = receiveQuestions(questions);
            expect(action).toEqual({
                type: RECEIVE_QUESTIONS,
                questions
            });
        });
    });
});

