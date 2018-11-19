// !!! SelectMultiple component - IN PROGRESS !!!
import React from "react"
import PropTypes from 'prop-types'
import debounce from 'debounce'

import Dropdown from './dropdown'


const searchFunc = (array, search, prop) => {
    if(!search) return array
    return array.filter((val) => val.hasOwnProperty(prop) && val[prop].toLowerCase().indexOf(search.toLowerCase()) > -1)
}

class SelectMultipe extends Dropdown {

    state = {
        fadeOut: false,
        isOpen: false,
        searchValue: '',
        selected: [],
        values: []
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            positionClass: Dropdown.getPositionClass(props.position),
            selected: props.value ? props.value : [],
            values: searchFunc(props.values, state.searchValue, props.search)
        }
    }

    clickOption(item, e) {
        let index = this.state.selected.indexOf(item)
        if(index > -1){
            this.deleteSelected(index, e)
        }else{
            let selected = this.state.selected
            selected.push(item)
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


    search(e) {
        this.setState({ searchValue: e.target.value })
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
                            <input onChange={this.search.bind(this)} value={this.state.searchValue} type="search" className="mtr full" placeholder="Search..." />
                            <i className="icon grey mdi mdi-magnify" />
                        </div>
                    </div> }
                    <ul onClick={() => this.close()} className="collection links">
                        { 
                            this.props.values && this.state.values.map((item, i) => {
                                const isSelected = this.state.selected.indexOf(item) > -1
                                return (
                                    <li className={isSelected ? 'active' : ''} key={i} onClick={(event) => this.clickOption(item, event)}>
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
    option: PropTypes.func,
    search: PropTypes.string
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