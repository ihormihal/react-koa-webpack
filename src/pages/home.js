import React from 'react'
import connect from '@/connect'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <main>
                <h1>Home</h1>
                { 
                    [...Array(100)].map((x, i) => {
                        return <p key={i}>{i}</p>
                    })
                }
            </main>
        )
    }
}

export default connect(Home)