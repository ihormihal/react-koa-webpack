import React from 'react'
import connect from '@/connect'

class Tabs extends React.Component {
    state = {
        tabIndex: 0,
        tabs: [
            {
                label: "Tab 1",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" 
            },
            {
                label: "Tab 2",
                content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            },
            {
                label: "Tab 3",
                content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris" 
            },
            {
                label: "Tab 4",
                content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." 
            }
        ]
    }

    componentDidMount() {
       
    }

    render() {
        return (
            <main>
                <h1>Tabs</h1>
                <div className="tabs">
                    <ul className="nav nav-inline btn-group">
                        { this.state.tabs.map((tab, index) => <li>
                            <a className={`btn ${index === this.state.tabIndex ? 'active' : ''}`} onClick={() => this.setState({ tabIndex: index })}>{tab.label}</a>
                        </li>)}
                    </ul>
                    <div>
                        { this.state.tabs.map((tab, index) => <div className={`box ${index === this.state.tabIndex ? '' : 'hidden'}`}>
                            <p>{tab.content}</p>
                        </div>)}
                    </div>
                </div>
            </main>
        )
    }
}

export default connect(
    Tabs, 
    (store) => ({
        state: store.users
    })
)