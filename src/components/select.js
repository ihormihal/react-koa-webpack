import React from "react"
import PropTypes from 'prop-types'

import Dropdown from './dropdown'

class Select extends Dropdown {

    state = {
        fadeOut: false,
        isOpen: false
    }

    onChange(value) {
        this.props.onChange(value)
        this.close()
    }

    render() {

        const renderSelected = this.props.selected || ((value) => value)
        const renderOption = this.props.option || ((item) => item)
        return (
            <div
                className={`dropdown ${this.state.isOpen ? 'active ' : ''} ${this.props.className || ''}`}
            >
                <span className={`toggle select mtr`} onClick={() => this.open()}>{ renderSelected(this.props.value) } <i className="arrow mdi mdi-chevron-down"></i></span>
                <div className={`popup popup-select ${ this.state.positionClass } ${this.state.fadeOut ? 'fadeOut': ''}`} onAnimationEnd={this.animationEnd}>
                    <ul onClick={() => this.close()} className="collection links">
                        { 
                            this.props.values.map((item, i) => {
                                return (
                                    <li className={this.props.value === item ? 'active' : ''} key={i} onClick={() => this.onChange(item)}>
                                        { renderOption(item) }
                                        { this.props.value === item && <i className="check mdi mdi-check"></i> }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

Select.propTypes = {
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.object]),
    values: PropTypes.array,
    selected: PropTypes.func,
    option: PropTypes.func
}

export default Select


//usage
{/* 
<Select
    value={this.state.onPage} 
    values={[10, 50, 100]}
    selected={(value) => <span>{value}</span>}
    option={(item) => <span>{item}</span> }
    onChange={(value) => this.setPageSize(value) }
/> 
*/}