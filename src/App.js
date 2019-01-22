import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Route, Router, Redirect } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import i18n from 'i18next'
import { reactI18nextModule } from "react-i18next"
import reducers from '@/reducers'

import Dashboard from '@/layouts/dashboard'
import Home from '@/pages/home'
import Buttons from '@/pages/buttons'
import Form from '@/pages/form'
import Modals from '@/pages/modals'
import Tabs from '@/pages/tabs'
import Table from '@/pages/table'

import Alert from '@/components/modal/alert'
import Dialog from '@/components/modal/dialog'


export const store = createStore(
    combineReducers(reducers),
    composeWithDevTools(applyMiddleware(thunk))
)
export const history = createBrowserHistory()

i18n
    .use(reactI18nextModule)
    .init({
        resources: {
            en: {
                translation: {
                    "KEYY": "Welcome to React and react-i18next"
                }
            }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export const PrivateRoute = ({ component: Component, ...rest }) => {

    const isAuntificated = true;

    return (<Route {...rest} render={(props) => (
        isAuntificated
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />)
}

export const indexRoutes = [
    {
        path: "/",
        component: Dashboard
    }
]

export const dashboardRoutes = [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/buttons",
        component: Buttons,
    },
    {
        path: "/form",
        component: Form
    },
    {
        path: "/modals",
        component: Modals
    },
    {
        path: "/tabs",
        component: Tabs
    },
    {
        path: "/table",
        component: Table
    }
]


export class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <>
                        { indexRoutes.map((route, i) => <Route path={route.path} component={route.component} key={i} />) }
                        <Dialog />
                        <Alert />
                    </>
                </Router>
            </Provider>
        )
    }
}
