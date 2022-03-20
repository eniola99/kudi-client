//login-Actions
export const loginStart = () => {
    return {
        type: "LOGIN"
    }
}

export const loginSuccess = (user) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: user
    }
}

export const loginFailure = () => {
    return {
        type: "LOGIN_FAILURE"
    }
}

//logout-action
export const logout = () => {
    return {
        type: "LOGOUT"
    }
}