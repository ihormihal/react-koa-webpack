const initialState = {
    isActive: false,
    payload: {
        header: '',
        content: '',
        options: {
            ok: {
                text: 'Ok',
                actionType: 'NONE'
            },
            cancel: {
                text: 'Cancel',
                actionType: 'NONE'
            }
        }
    }
}

const dialog = (state = initialState, action) => {
    switch (action.type) {
        case 'DIALOG_SHOW':
            return {
                ...state,
                isActive: true,
                payload: action.payload
            }
        case 'DIALOG_HIDE':
            return initialState
        default:
            return state
    }
}

export default dialog