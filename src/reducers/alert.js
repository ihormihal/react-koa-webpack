const initialState = {
    isActive: false,
    payload: { type: 'INFO' }
}

const alert = (state = initialState, action) => {
    switch (action.type) {
        case 'ALERT_SHOW':
            return {
                ...state,
                isActive: true,
                payload: action.payload
            }
        case 'ALERT_HIDE':
            return initialState
        default:
            return state
    }
}

export default alert