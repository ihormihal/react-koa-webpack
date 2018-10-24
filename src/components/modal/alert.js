import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show, hide } from '@/actions/alert'

class Alert extends React.Component {

    constructor(props) {
        super(props)
        this.state = { show: false }
    }

    stop(e) {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }

    hide() {
        this.props.hide()
    }

    render() {
        let prefix, icon
        switch(this.props.payload.type){
            case 'SUCCESS':
                prefix = 'success'
                icon = <i className="mdi mdi-check-circle"></i>
                break
            case 'ERROR':
                prefix = 'error'
                icon = <i className="mdi mdi-alert-circle"></i>
                break
            default:
                prefix = 'info'
                icon = <i className="mdi mdi-information-outline"></i>
        }
        return (
            this.props.isActive ? <div className={ `modal alert ${prefix}` } onClick={() => this.hide()}>
                <div className="modal-content" onClick={this.stop}>
                    <div className="header">
                        <div className="icon">{ icon }</div>
                        { this.props.payload.header }
                    </div>
                    <div className="box">
                        { this.props.payload.message }
                    </div>
                </div>
            </div> : null
        )
    }
}


export default connect(
    //mapStateToProps
    (store) => ({
        isActive: store.alert.isActive,
        payload: store.alert.payload
    }),
    //actions
    dispatch => bindActionCreators({ show, hide }, dispatch)
)(Alert)