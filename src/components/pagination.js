import React from "react"

export default class Pagination extends React.Component {

    constructor(props) {
        super(props)

        this.breakAfter = 5
        this.nearCount = 3
    }
    

    prev() {
        this.setPage(this.props.current - 1)
    }

    next() {
        this.setPage(this.props.current + 1)
    }

    setPage(page) {
        this.props.setPage(page)
    }

    render() {
        const pages = []

        for(let i = 0; i < this.props.pages; i++){
            const page = {
                index: i,
                text: i + 1,
                visible: true,
                active: this.props.current === i
            }

            //break before
            if(this.props.current > this.breakAfter){
                if(i < this.props.current - this.nearCount) page.visible = false
                //middle in break before
                let middle = Math.round((this.props.current - this.nearCount) / 2)
                if(i === middle) {
                    page.visible = true
                    page.text = '...'
                }
            }
            
            //break after
            if(this.props.pages - this.props.current > this.breakAfter){
                if(i > this.props.current + this.nearCount) page.visible = false
                //middle in break after
                let middle = Math.round((this.props.pages + this.props.current + this.nearCount) / 2)
                if(i === middle) {
                    page.visible = true
                    page.text = '...'
                }
            }

            //always show first and last
            if(i == 0 || i + 1 === this.props.pages) page.visible = true;

            pages.push(page)
        }

        if(this.props.pages > 1){
            return (
                <ul className="pagination">
                    { this.props.current > 1 && <li><a onClick={() => this.prev()}><i className="mdi mdi-chevron-left"></i></a></li> }
                    {
                        pages.map((page, i) => {
                            if(page.visible){
                                return ( 
                                    <li key={i} className={ page.active ? 'active ' : '' }>
                                        <a onClick={() => this.setPage(page.index)}>{page.text}</a>
                                    </li> 
                                )
                            }
                        })
                    }
                    { this.props.current + 1 < this.props.pages && <li><a onClick={() => this.next()}><i className="mdi mdi-chevron-right"></i></a></li> }
                </ul>
            )
        }else{
            return null
        }
    }
}