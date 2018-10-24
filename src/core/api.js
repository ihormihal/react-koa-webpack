import axios from "axios"
import { store } from "./../App"

axios.defaults.baseURL = CONFIG.API_URL
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'

// axios.interceptors.response.use(undefined, err => {
//     let res = err.response;
//     if (res.status === 401) {
//         return new Promise((resolve, reject) => {
//             refreshLogin(getRefreshToken(),
//                 success => {
//                     setTokens(success.access_token, success.refresh_token)
//                     err.config.__isRetryRequest = true
//                     err.config.headers.Authorization = 'Bearer ' + getAccessToken()
//                     resolve(axios(err.config))
//                 },
//                 error => {
//                     console.log('Refresh login error: ', error)
//                     reject(error)
//                 }
//             )
//         });
//     }
// })

const initialState = {
    isFetching: false,
    payload: null,
    error: null
}

const serialiseObject = (obj) => {
    let pairs = [];
    for (let prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;
        if (typeof prop == 'object') {
            pairs.push(serialiseObject(obj[prop]));
            continue;
        }
        pairs.push(prop + '=' + obj[prop]);
    }
    return pairs.join('&');
}

const httpRequest = (method, url, data, actions, dispatch) => {
    store.dispatch({
        ...initialState,
        type: actions.request
    })
    axios({ method, url, data })
        .then((res) => {
            const payload = res.data.status == 'success' && res.data.data ? res.data.data : null
            store.dispatch({
                ...initialState,
                type: actions.success,
                payload
            })
        })
        .catch(err => {
            store.dispatch({
                ...initialState,
                type: actions.failure,
                payload: null,
                error: err.error
            })
        })
}

const api = {
    initialState,
    get: (url, data, actions) => httpRequest('get', url+'?'+serialiseObject(data), null, actions),
    post: (url, data, actions) => httpRequest('post', url, data, actions),
    put: (url, data, actions) => httpRequest('put', url, data, actions)
}

export default api