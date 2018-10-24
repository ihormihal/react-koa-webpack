export const change = (payload) => dispatch => {
    return dispatch({ type: 'CHANGE_CTX', payload })
}