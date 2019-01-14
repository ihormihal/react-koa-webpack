import React from "react"
import PropTypes from 'prop-types'
class TextInput extends React.Component {
    state = {
        value: '',
        isChanged: false,
        isFocus: false
    }

    static getDerivedStateFromProps(props, state) {
        if(state.isChanged) return state;
        return {
            ...state,
            value: props.defaultValue || '',
            isFocus: !!props.defaultValue
        }
    }

    handleChange = (e) => {
        this.setState({ 
            isChanged: true,
            value: e.target.value 
        })
    }

    handleFocus = (e) => {
        this.setState({isFocus: true})
    }

    handleBlur = (e) => {
        if(!this.state.value) this.setState({isFocus: false})
    }

    render () {
        return (<div className={`form-group floating-label ${this.state.isFocus ? 'focus' : ''}`}>
            <label>Capital</label>
            <div className={this.props.icon && 'input-icon'}>
                <input 
                    className="full mtr" 
                    type="text" 
                    defaultValue={this.props.defaultValue}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    >
                </input>
                { this.props.icon && <i className={`icon mdi mdi-${this.props.icon}`}></i> }
            </div>
        </div>)
    }
}

TextInput.propTypes = {

}

export default TextInput