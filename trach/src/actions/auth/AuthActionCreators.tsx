import { store } from "../../app/store"
import { HistoryRouter } from "../../core/Router"
import { AppState } from "../../reducers/mainReducer"
import { auth } from "../../util/firebase"
import { saveReportByTrackOrAlbumToCsvFile } from "../ReportActionCreators"

export type LoginChangeAction = {
    type: AuthActionTypes.LoginChanged
    login: string
}

export type PasswordChangeAction = {
    type: AuthActionTypes.PasswordChanged
    password: string
}

export type AuthorizedAction = {
    type: AuthActionTypes.Authorized
    email: string | null
}

export enum AuthActionTypes {
    LoginChanged = "AuthActionTypes.LoginChanged",
    PasswordChanged = "AuthActionTypes.PasswordChanged",
    Authorized = "AuthActionTypes.IsAuthorized"
}

export function LoginChangeAction(login: string): LoginChangeAction {
    return {
        type: AuthActionTypes.LoginChanged,
        login: login
    }
}

export function PasswordChangeAction(password: string): PasswordChangeAction {
    return {
        type: AuthActionTypes.PasswordChanged,
        password: password
    }
}

export function AuthorizedAction(email: string | null): AuthorizedAction {
    return {
        type: AuthActionTypes.Authorized,
        email: email
    }
}

export function checkIsAuthorized() {
    const dispatch = store.dispatch
    const user = auth.currentUser

    if (user !== null) {
        dispatch(AuthorizedAction(user.email))
    }
}

export function authorizeActionCreator(router: HistoryRouter, trackId: number) {
    const dispatch = store.dispatch
    const state: AppState = store.getState()

    if (state.auth.isValid) {
        auth
            .signInWithEmailAndPassword(state.auth.login, state.auth.password)
            .then(
                result => {
                    if (result.user !== undefined && result.user !== null) {
                        saveReportByTrackOrAlbumToCsvFile(trackId)
                        dispatch(AuthorizedAction(result.user.email))
                        router.goBack()
                    }
                    else {
                        dispatch(AuthorizedAction(null))
                    }
                },
                _ => dispatch(AuthorizedAction(null))
            )
    }
}

export type AuthActions = LoginChangeAction | PasswordChangeAction | AuthorizedAction