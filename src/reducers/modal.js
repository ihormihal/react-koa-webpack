const initialState = {
    isActive: false,
    payload: null
}

const modal = (state = initialState, action) => {
    switch (action.type) {
        case 'MODAL_SHOW':
            return {
                ...state,
                isActive: true,
                payload: action.payload
            }
        case 'MODAL_HIDE':
            return initialState
        default:
            return state
    }
}

export default modal