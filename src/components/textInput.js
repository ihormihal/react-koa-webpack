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
            value: e.target.value 
        }, () => {
            this.props.onChange && this.props.onChange(this.state.value)
        }) 
    }

    handleFocus = (e) => {
        this.setState({ isChanged: true, isFocus: true })
    }

    handleBlur = (e) => {
        if(!this.state.value) this.setState({isFocus: false})
        this.props.onBlur && this.props.onBlur(this.state.value)
    }

    render () {
        return (<div className={`form-group floating-label ${this.props.className} ${this.props.hasError ? 'has-error' : ''} ${this.state.isFocus ? 'focus' : ''}`}>
            {this.props.label && <label>{this.props.label}</label> }
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
    label: PropTypes.string,
    icon: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string,
    hasError: PropTypes.bool
}

export default TextInput