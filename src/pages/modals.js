import React from 'react'
import connect from '@/connect'

import Modal from '@/components/modal/modal'

import { show as showModal } from "@/actions/modal"
import { show as showAlert } from "@/actions/alert"
import { show as showDialog } from "@/actions/dialog"

class Modals extends React.Component {
    
    state = {}

    render() {
        return (
            <main>
                <div className="box">
                    <h3>Modals</h3>
                    <div className="btn-group">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => this.setState({customModal: true})}
                        >Custom modal</button>

                        { this.state.customModal && <Modal clickOutside={() => this.setState({customModal: false})}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                            <button className="btn" onClick={() => this.setState({customModal: false})}>Close</button>
                        </Modal> }

                        <button 
                            className="btn" 
                            onClick={() => {
                                this.props.actions.showDialog({
                                    header: 'Are you sure?',
                                    message: '',
                                    options: {
                                        ok: {
                                            text: 'Так',
                                            actionType: 'DIALOG_ACTION_OK'
                                        },
                                        cancel: {
                                            text: 'Hi',
                                            actionType: 'DIALOG_ACTION_CANCEL'
                                        }
                                    }
                                })
                            }}
                        >Dialog</button>

                        <button 
                            className="btn btn-success" 
                            onClick={() => {
                                this.props.actions.showAlert({ type: 'SUCCESS', header: 'Success!', message: 'Some message' })
                            }}
                        >Success message</button>

                        <button 
                            className="btn btn-danger"
                            onClick={() => {
                                this.props.actions.showAlert({ type: 'ERROR', header: 'Something go wrong!', message: 'Some message' })
                            }}
                        >Error message</button>

                        <button 
                            className="btn btn-primary" 
                            onClick={() => {
                                this.props.actions.showAlert({ header: 'Header text', message: 'Some message' })
                            }}
                        >Info message</button>
                    </div>
                </div>
            
            </main>
        )
    }
}

export default connect(
    Modals, 
    (store) => ({}), 
    { showModal, showAlert, showDialog })