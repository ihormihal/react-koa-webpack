export const show = (payload) => dispatch => {
    return dispatch({ type: 'ALERT_SHOW', payload })
}
export const hide = () => dispatch => {
    return dispatch({ type: 'ALERT_HIDE', payload: null })
}