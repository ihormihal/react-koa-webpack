export const show = (payload) => dispatch => {
    return dispatch({ type: 'MODAL_SHOW', payload })
}
export const hide = () => dispatch => {
    return dispatch({ type: 'MODAL_HIDE', payload: null })
}