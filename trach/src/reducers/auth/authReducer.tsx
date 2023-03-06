import * as actions from '../../actions/auth/AuthActionCreators'

export type AuthState = {
    login: string
    password: string
    isValid: boolean
    authorized: Authorized
}

export type Authorized = {
    email: string | null
    isError: boolean
}

export const initialState: AuthState = {
    login: "",
    password: "",
    isValid: false,
    authorized: {
        email: null,
        isError: false
    }
}

export function reducer(state = initialState, action: actions.AuthActions): AuthState {
    const newState = { ...state }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    switch (action.type) {
        case actions.AuthActionTypes.LoginChanged: {

            const isEmail = re.test(String(action.login).toLowerCase())

            newState.login = action.login
            newState.isValid = newState.password.length > 3 && isEmail

            return newState
        }

        case actions.AuthActionTypes.PasswordChanged: {
            const isEmail = re.test(String(newState.login).toLowerCase())

            newState.password = action.password
            newState.isValid = action.password.length > 3 && isEmail

            return newState
        }

        case actions.AuthActionTypes.Authorized: {

            newState.authorized = {
                email: action.email,
                isError: action.email === null
            }

            return newState
        }

        default:
            return state
    }
}