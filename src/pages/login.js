import React from 'react'
import connect from '@/connect'


class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <h1>Login</h1>
        )
    }
}

export default connect(Login)