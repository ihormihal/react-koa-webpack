// !!! SelectMultiple component - IN PROGRESS !!!
import React from "react"
import PropTypes from 'prop-types'
import debounce from 'debounce'

import Dropdown from './dropdown'

class SelectMultipe extends Dropdown {

    state = {
        fadeOut: false,
        isOpen: false,
        selected: []
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            positionClass: Dropdown.getPositionClass(props.position),
            selected: props.value ? props.value : []
        }
    }

    clickOption(isSelected, index, e) {
        if(isSelected){
            this.deleteSelected(index, e)
        }else{
            let value = this.props.values[index]
            let selected = this.state.selected
            selected.push(value)
            this.setState({ selected })
            this.props.onChange(this.state.selected)
        }
    }

    deleteSelected(index, e) {
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()

        let selected = this.state.selected
        selected.splice(index, 1)
        this.setState({ selected })
        this.props.onChange(this.state.selected)
    }

    search() {
        // this.props.search(e.target.value)
        console.log(debounce)
        debounce(() => {
            console.log('search')
        }, 200)
    }

    render() {

        const renderSelected = this.props.selected || ((value) => value)
        const renderOption = this.props.option || ((item) => item)

        return (
            <div
                className={`imf-select dropdown ${this.state.isOpen ? ' active' : ''}`}
            >
                <span className="toggle" onClick={() => this.open()}>
                    <div className="select selection imf-select full">
                        {
                            this.state.selected.map((item, i) => {
                                return (
                                    <div key={i} onClick={(event) => this.deleteSelected(i, event)}>
                                        { renderSelected(item) }
                                        <i className="x mdi mdi-close"></i>
                                    </div>
                                )
                            })
                        }
                        <i className="arrow mdi mdi-chevron-down"></i>
                    </div>
                    
                </span>
                <div className={`popup popup-select ${ this.state.positionClass  } ${this.state.fadeOut ? 'fadeOut': ''}`} onAnimationEnd={this.animationEnd}>
                    { this.props.search && <div className="search form-group">
                        <div className="input-icon icon-left">
                            <input onKeyUp={this.search.bind(this)} type="search" className="mtr full" placeholder="Search..." />
                            <i className="icon grey mdi mdi-magnify" />
                        </div>
                    </div> }
                    <ul onClick={() => this.close()} className="collection links">
                        { 
                            this.props.values && this.props.values.map((item, i) => {
                                const isSelected = this.state.selected.indexOf(item) > -1
                                return (
                                    <li className={isSelected ? 'active' : ''} key={i} onClick={(event) => this.clickOption(isSelected, i, event)}>
                                        { renderOption(item) }
                                        { isSelected && <i className="check mdi mdi-check"></i> }
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

SelectMultipe.propTypes = {
    value: PropTypes.array,
    values: PropTypes.array,
    selected: PropTypes.func,
    option: PropTypes.func
}

export default SelectMultipe


//usage
{/* 
<SelectMultipe
    value={this.state.onPage} 
    values={[10, 50, 100]}
    selected={(value) => <span>{value}</span>}
    option={(item) => <span>{item}</span> }
    onChange={(value) => this.setPageSize(value) }
/> 
*/}