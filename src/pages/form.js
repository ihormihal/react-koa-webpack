import React from 'react'
import connect from '@/connect'
import { Form, Field } from 'react-final-form'

import Modal from '@/components/modal/modal'
import Dropdown from '@/components/dropdown'
import DatePicker from '@/components/datepicker'
import Select from '@/components/select'
import SelectMultiple from '@/components/select-multiple'

import { show as showModal } from "@/actions/modal"
import { show as showAlert } from "@/actions/alert"
import { show as showDialog } from "@/actions/dialog"

class FormPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}


        this.formStore = {
            cities: [
                {
                    city: 'Kyiv',
                    country: 'Ukraine'
                },
                {
                    city: 'Lviv',
                    country: 'Ukraine'
                },
                {
                    city: 'Copenhagen',
                    country: 'Denmark'
                },
                {
                    city: 'Paris',
                    country: 'France'
                },
                {
                    city: 'Amsterdam',
                    country: 'Netherlands'
                }
            ]
        }

        this.formValues = {
            date: new Date(),
            sex: 'male',
            city: this.formStore.cities[1],
            cities: [ this.formStore.cities[0], this.formStore.cities[1] ]
        }
    }

    validateForm(values) {
        console.log(values)
        let errors = {}
        if(values.firstName && values.firstName.length > 10){
            errors.firstName = 'Длина строки должна быть не больше 10 символов'
        }
        return errors
    }

    submitForm(values) {
        console.log(values)
    }

    onChange() {

    }

    render() {
        const { t } = this.props

        const renderForm = ({ handleSubmit, reset, submitting, pristine, values }) => {
            return (
                <form onSubmit={handleSubmit}>
                    {/* <div className="form-group">
                        <label>Simple input <sup>*</sup></label>
                        <input className="full" type="text" placeholder="Placeholder" />
                    </div>

                    <div className="form-group">
                        <label>Bordered input <sup>*</sup></label>
                        <input className="default full" type="text" placeholder="Placeholder" />
                    </div> */}

                    <div className="row">

                        <div className="col-md-6">
                            <Field
                                name="firstName"
                                render={({ input, meta }) => (
                                <div className={`form-group ${meta.touched && meta.error ? 'has-error' : ''}`}>
                                    <label>First name (max 10 symbols)<sup>*</sup></label>
                                    <input className="full mtr" type="text" placeholder="Placeholder" {...input} />
                                    { meta.touched && meta.error && <span className="help-block">{ meta.error }</span> }
                                </div>
                            )} />

                            <div className="form-group">
                                <label>Birdth date</label>
                                <Field
                                    name="date"
                                    component={ DatePicker }
                                    placeholder="Pick date"
                                />
                            </div>

                            <div className="form-group">
                                <label>Select city</label>
                                <Field
                                    name="city"
                                    values={this.formStore.cities}
                                    component={ ({ input, values }) => (
                                        <Select
                                            value={input.value} 
                                            values={values}
                                            selected={(val) => <span>{val.city}, {val.country}</span>}
                                            option={(val) => <span>{val.city}, {val.country}</span>}
                                            onChange={(value) => input.onChange(value) }
                                        />
                                    ) }
                                />
                            </div>

                            <div className="form-group">
                                <label>Select cities</label>
                                <Field
                                    name="cities"
                                    values={this.formStore.cities}
                                    component={ ({ input, values }) => (
                                        <SelectMultiple
                                            value={input.value} 
                                            values={values}
                                            selected={(val) => <span>{val.city}, {val.country}</span>}
                                            option={(val) => <span>{val.city}, {val.country}</span>}
                                            onChange={(value) => input.onChange(value) }
                                        />
                                    ) }
                                />
                            </div>

                        </div>

                        <div className="col-md-6">
                            <Field
                                name="option1"
                                type="checkbox"
                                render={({ input, meta }) => (
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" {...input} />
                                        <span className="check"></span>
                                        Option 1
                                    </label>
                                </div>
                            )} />
                            <Field
                                name="option2"
                                type="checkbox"
                                render={({ input, meta }) => (
                                <div className="switch">
                                    <label>
                                        <input type="checkbox" {...input} />
                                        <span className="toggle"></span>
                                        Option 2
                                    </label>
                                </div>
                            )} />

                            <Field
                                name="sex"
                                value={'male'}
                                type="radio"
                                render={({ input, meta }) => (
                                <div className="radio">
                                    <label>
                                        <input type="radio" {...input} />
                                        <span className="circle"></span>
                                        Male
                                    </label>
                                </div>
                            )} />

                            <Field
                                name="sex"
                                type="radio"
                                value={'female'}
                                render={({ input, meta }) => (
                                <div className="radio">
                                    <label>
                                        <input type="radio" {...input} />
                                        <span className="circle"></span>
                                        Female
                                    </label>
                                </div>
                            )} />

                        </div>

                    </div>

                    
                </form>
            )
        }



        return (
            <main>
                <div className="box">
                    <h1>Components</h1>
                    <a href="http://mycode.in.ua/imf/form" target="_blank">http://mycode.in.ua/imf/form</a>
                </div>

                <div className="box">
                    <h3>Tooltip { t('KEYY') }</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <Dropdown className="underline" tooltip={true} render={() => <span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, architecto beatae vitae dicta sunt explicabo.</span>}>eiusmod tempor</Dropdown> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                </div>

                <div className="box">

                    <h3>Form with validation</h3>
                    <Form 
                        onSubmit={this.submitForm}
                        validate={this.validateForm}
                        render={renderForm} 
                        initialValues={this.formValues}
                    />

                </div>

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
    FormPage, 
    (store) => ({}),
    { showModal, showAlert, showDialog }
)