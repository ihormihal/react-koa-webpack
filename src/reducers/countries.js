//demo
import api from '@/core/api'

const countries = (state = api.initialState, action) => {
    switch (action.type) {
        case 'REQUEST_GET_COUNTRIES':
            return {
                ...state,
                isFetching: true,
                error: null
            }
        case 'SUCCESS_GET_COUNTRIES':
            return {
                ...state,
                isFetching: false,
                payload: action.payload,
                error: null
            }
        case 'FAILURE_GET_COUNTRIES':
            return {
                ...state,
                isFetching: false,
                payload: null,
                error: action.payload
            }
        default:
            return state
    }
}

export default countries