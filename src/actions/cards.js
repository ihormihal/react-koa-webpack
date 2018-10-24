import api from "@/core/api";

export const getDetails = (cardId) => dispatch => {
    return api.get(`/card/${cardId}/details`, null, {
        request: 'REQUEST_GET_CARD_HISTORY',
        success: 'SUCCESS_GET_CARD_HISTORY',
        failure: 'FAILURE_GET_CARD_HISTORY'
    })
}
export const gethistory = (cardId) => dispatch => {
    return api.get(`/card/${cardId}/history`, null, {
        request: 'REQUEST_GET_CARD_HISTORY',
        success: 'SUCCESS_GET_CARD_HISTORY',
        failure: 'FAILURE_GET_CARD_HISTORY'
    })
}