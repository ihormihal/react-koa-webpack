import React from 'react'
import connect from '@/connect'
import {Switch, Redirect} from 'react-router-dom'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

import {PrivateRoute, dashboardRoutes} from '@/App'

class Dashboard extends React.Component {
    componentDidMount(){
        this.rootElement = document.getElementById('app')
    }

    toggleSidebar = () => {
        if(this.rootElement.classList.contains('sidebar-collapsed')){
            this.rootElement.classList.remove('sidebar-collapsed')
        }else{
            this.rootElement.classList.add('sidebar-collapsed')
        }
    }

    render() {

        return (
            <>
                <Header toggleSidebar={this.toggleSidebar}/>
                <Sidebar />
                <Switch>
                    {dashboardRoutes.map((route, i) => {
                        return route.redirect ?
                            <Redirect from={route.path} to={route.to} key={i}/> :
                            <PrivateRoute path={route.path} component={route.component} key={i} exact={route.exact}/>
                    })}
                </Switch>
            </>
        )
    }
}


export default connect(
    Dashboard,
    (store) => ({
        ctx: store.ctx,
    })
)