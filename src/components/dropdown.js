import React from "react"
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Popup extends React.Component {
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            document.getElementById('modal-root')
        )
    }
}

class Dropdown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fadeOut: false,
            isOpen: false,
            popupStyle: {}
        }
    }

    clickOutside = (e) => {
        let isOutsideClick = !e.target.closest('.dropdown, .rdtTimeToggle, .rdtSwitch, .rdtMonth, .rdtYear')
        if(isOutsideClick) this.close()
    }

    componentDidMount() {
        document.addEventListener('click', this.clickOutside)
        this.setPopupStyle()
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickOutside)
    }

    animationEnd = (e) => {
        if(this.state.fadeOut && e.nativeEvent.target.classList.contains('popup')){
            this.setState({fadeOut: false, isOpen: false})  
        }
    }

    open() {
        this.setState({fadeOut: false, isOpen: true})
    }

    close() {
        this.setState({fadeOut: true})
    }

    onMouseEnter() {
        if(this.props.onHover || this.props.tooltip) this.open()
    }

    onMouseLeave() {
        if(this.props.onHover || this.props.tooltip) this.close()
    }

    onClick() {
        if(this.props.onClick) {
            this.state.isOpen ? this.close() : this.open()
        }
    }

    setPopupStyle() {
        if(this.props.tooltip && this.toggleNode){
            this.setState({
                popupStyle: {
                    left: (- this.toggleNode.offsetWidth/2) + 'px'
                }
            })
        }
    }

    render() {
        let prefix
        switch(this.props.position){
            case 'bottom':
                prefix = 'popup-bottom'
                break;
            case 'top':
                prefix = 'popup-top'
                break;
            default:
            prefix = ''
        }
        return (
            <span 
                className={'dropdown' + (this.state.isOpen ? ' active ': '')} 
                onMouseEnter={() => this.onMouseEnter()}
                onMouseLeave={() => this.onMouseLeave()}
            >
                <span 
                    ref={(node) => { this.toggleNode = node }}
                    onClick={() => this.onClick()} 
                    className={`toggle ripple ${this.props.className || ''}`}
                >{this.props.children}</span>
                <span 
                    style={this.state.popupStyle} 
                    className={`popup ${ prefix } ${this.state.fadeOut ? 'fadeOut': ''} ${this.props.tooltip ? 'tooltip': ''}`} 
                    onAnimationEnd={this.animationEnd}
                >{this.props.render && this.props.render(() => this.close())}</span>
            </span>
        )
    }
}

Dropdown.propTypes = {
    children: PropTypes.node,
    render: PropTypes.func,
    onClick: PropTypes.bool,
    onHover: PropTypes.bool
}

export default Dropdown

//usage
{/* 
<Dropdown 
    onHover={true} 
    popup={<SelectWorkspace />}
>
    <div className="ml1 header-link">Робота з ФО <i className="mdi mdi-chevron-down"></i></div>
</Dropdown> 
*/}
