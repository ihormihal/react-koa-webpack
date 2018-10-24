import React from "react"
import { NavLink } from "react-router-dom"
import connect from '@/connect'



class Header extends React.Component {

    render() {
        return (
            <header>
                <div className="container full">
                    <div className="row">
                        <div className="col-xs-9">
                            <span className="logo">
                                <img src="/img/logo.svg" alt=""/>
                            </span>
                        </div>
                        <div className="col-xs-3 flex-valign-end">
                            <button className="ripple header-link btn-switch-sidebar" onClick={this.props.toggleSidebar} >
                                <span className='icon'><i className="mdi mdi-dots-horizontal"></i></span>
                            </button>
                            <NavLink to="/login" className="header-link">
                                <i className="mdi mdi-logout-variant"></i> 
                                Вихід
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}


export default connect(Header)