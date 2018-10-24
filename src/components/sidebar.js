import React from "react"
import { NavLink } from "react-router-dom"
import connect from '@/connect'

class Sidebar extends React.Component {
    render() {
        console.log()
        return (
            <menu className={this.props.collapseSidebar ? 'collapsed' : ''}>
                <nav className="nav-side">
                    <ul className="nav nav-col">
                        <li>
                            <NavLink to={`/buttons`} className="ripple"><i className="mdi mdi-content-copy"></i> Buttons</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/form`} className="ripple"><i className="mdi mdi-content-copy"></i> Form elements</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/modals`}className="ripple"><i className="mdi mdi-content-copy"></i> Modals</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/tabs`}className="ripple"><i className="mdi mdi-content-copy"></i> Tabs and accordions</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/table`}className="ripple"><i className="mdi mdi-content-copy"></i> Table</NavLink>
                        </li>
                    </ul>
                </nav>
            </menu>
        )
    }
}

export default connect(Sidebar)