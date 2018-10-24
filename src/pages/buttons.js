import React from 'react'
import connect from '@/connect'


class Buttons extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main>
                <h1>Buttons</h1>
                { 
                    [...Array(100)].map((x, i) => {
                        return <p key={i}>{i}</p>
                    })
                }
            </main>
        )
    }
}

export default connect(Buttons)