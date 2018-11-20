import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show, hide, action } from '@/actions/dialog'

class Dialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = { show: false }
    }

    componentDidMount() {
        document.addEventListener('keydown', (e) => {
            // console.log('keydown',e.which)
            if(this.props.isActive){
                if(e.which === 27) this.hide()
                if(e.which === 13) this.ok()
            }
        })
    }

    stop(e) {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }

    hide() {
        this.props.hide()
    }

    ok() {
        this.props.action(this.props.payload.options.ok.actionType)
    }

    cancel() {
        this.props.action(this.props.payload.options.cancel.actionType)
        this.hide()
    }

    render() {
        const payload = this.props.payload
        return (
            this.props.isActive ? <div className="modal dialog" onClick={() => this.hide()}>
                <div className="modal-content" onClick={this.stop}>
                    <div className="header">
                        <div className="icon"><i className="mdi mdi-help-circle"></i></div>
                        {payload.header}
                    </div>
                    <div className="box">{payload.message}</div>
                    <div className="box">
                        <div className="btn-group">
                            <button tabIndex="1" className="btn btn-primary" onClick={() => this.ok()}>{payload.options.ok.text}</button>
                            <button tabIndex="2" className="btn" onClick={() => this.cancel()}>{payload.options.cancel.text}</button>
                        </div>
                    </div>
                </div>
            </div> : null
        )
    }
}


export default connect(
    //mapStateToProps
    (store) => ({
        isActive: store.dialog.isActive,
        payload: store.dialog.payload,
    }),
    //actions
    dispatch => bindActionCreators({ show, hide, action }, dispatch)
)(Dialog)