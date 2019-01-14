import React from 'react'
import connect from '@/connect'
import { Form, Field } from 'react-final-form'

import TextInput from '@/components/input'
import Dropdown from '@/components/dropdown'
import DatePicker from '@/components/datepicker'
import Select from '@/components/select'
import SelectMultiple from '@/components/select-multiple'

class FormPage extends React.Component {

    state = {}

    formStore = {
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

    formValues = {
        date: new Date(),
        sex: 'male',
        city: this.formStore.cities[1],
        cities: [ this.formStore.cities[0], this.formStore.cities[1] ],
        cities2: [ this.formStore.cities[0], this.formStore.cities[1] ]
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

    search(val) {
        console.log('search', val)
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

                            <div className="form-group">
                                <label>Select cities</label>
                                <Field
                                    name="cities2"
                                    values={this.formStore.cities}
                                    component={ ({ input, values }) => (
                                        <SelectMultiple
                                            value={input.value}
                                            values={values}
                                            selected={(val) => <span>{val.city}, {val.country}</span>}
                                            option={(val) => <span>{val.city}, {val.country}</span>}
                                            onChange={(value) => input.onChange(value) }
                                            search="city"
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do &nbsp;
                        <Dropdown 
                            className="underline" 
                            tooltip={true} 
                            render={() => <span>Sed ut perspiciatis unde omnis iste natus <b>error</b> sit voluptatem accusantium doloremque laudantium, architecto beatae vitae dicta sunt explicabo.</span>}
                        >eiusmod tempor</Dropdown> 
                        &nbsp; tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    </p>

                    <h3>Custom input</h3>
                    <TextInput
                        label='Text label'
                        icon='magnify'
                        defaultValue={'werw'}
                    />
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
            </main>
        )
    }
}


export default connect(
    FormPage, 
    (store) => ({})
)