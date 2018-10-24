export const show = (payload) => dispatch => {
    return dispatch({ type: 'DIALOG_SHOW', payload })
}
export const hide = () => dispatch => {
    return dispatch({ type: 'DIALOG_HIDE', payload: null })
}
export const action = (actionType) => dispatch => {
    return dispatch({ type: actionType })
}