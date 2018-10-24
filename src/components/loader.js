import React from "react"

class Loader extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        if(this.props.loading){
            return (
                <div className="loader-wrapper">
                    {this.props.children}
                    { this.props.loading && <div className="loader lds-ring-loader"><div></div><div></div><div></div><div></div></div> }
                </div>
            )
        }else{
            return this.props.children
        }
    }
}

export default Loader