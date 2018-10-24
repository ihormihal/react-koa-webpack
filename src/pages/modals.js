import React from 'react'
import connect from '@/connect'

class Modals extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main>
                <h1>Modals</h1>
                { 
                    [...Array(100)].map((x, i) => {
                        return <p key={i}>{i}</p>
                    })
                }
            </main>
        )
    }
}

export default connect(Modals)