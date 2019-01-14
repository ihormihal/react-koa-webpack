import React from "react"

class Loader extends React.Component {

    delay = 200
    timer = null
    state = {
        loading: false
    }

    componentDidUpdate() {
        if(this.timer) clearTimeout(this.timer)
        if(this.props.loading === this.state.loading) return;
        this.timer = setTimeout(() => {
            this.setState({
                loading: this.props.loading
            })
        }, this.delay)
    }

    render() {
        return this.state.loading && <div className="loader-wrapper">
            <div className="loader lds-ring-loader"><div></div><div></div><div></div><div></div></div>
        </div>
    }
}

export default Loader