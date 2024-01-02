import {
    INITIALIZED,
    SCHEDULES,
    USER
} from '../state/types'


const initialState = {
    initialized: false,
    Schedules: [],
    User: null
}





const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        case SCHEDULES:
            return {
                ...state,
                Schedules: action.payload
            }

        case USER:
            return {
                ...state,
                User: action.payload
            }

        default: return state
    }
}

export default reducer