import React from "react"
import ReactDOM from 'react-dom'

class Modal extends React.Component {

    constructor(props) {
        super(props)
        this.state = { show: false }
    }

    stop(e) {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }

    render() {
        return ReactDOM.createPortal(
            (<div className="modal" onClick={() => this.props.clickOutside()}>
                <div className="modal-content" onClick={this.stop}>
                    <div className="box">
                        { this.props.children }
                    </div>
                </div>
            </div>),
            document.getElementById('modal-root')
        )
    }
}


export default Modal