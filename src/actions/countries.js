//demo
import api from "@/core/api";

export const getCountries = (data) => dispatch => {
    return api.post('/countries', data, {
        request: 'REQUEST_GET_COUNTRIES',
        success: 'SUCCESS_GET_COUNTRIES',
        failure: 'FAILURE_GET_COUNTRIES'
    })
}