import React from 'react'
import connect from '@/connect'

class Tabs extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
       
    }

    render() {
        return (
            <main>
                <h1>Tabs</h1>
                { 
                    [...Array(100)].map((x, i) => {
                        return <p key={i}>{i}</p>
                    })
                }
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