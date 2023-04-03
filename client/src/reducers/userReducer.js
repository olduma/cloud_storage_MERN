const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const USED_SPACE = "USED_SPACE"

const defaultState = {
    currentUser: {},
    isAuth: false,
    totalSpace: 0,
    usedSpace: 0
}

export default function userReducer(state = defaultState, action){
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                diskSpace: action.payload.diskSpace,
                usedSpace: action.payload.usedSpace
            }
        case LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case USED_SPACE:
            return {
                ...state,
                usedSpace: action.payload
            }
        default:
            return state
    }
}

export const setUser = user => ({type: SET_USER, payload: user})
export const usedSpace = size => ({type: USED_SPACE, payload: size})
export const logout = () => ({type: LOGOUT})