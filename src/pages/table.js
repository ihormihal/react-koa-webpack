import React from 'react'
import connect from '@/connect'
import Pagination from '@/components/pagination'
import Select from '@/components/select'
import Loader from '@/components/loader'

import { getCountries } from '@/actions/countries'


const getSortClass = (sortBy, sortDir, prop) => {
    let sortClass = 'mdi-sort'
    switch(sortDir){
        case 'ASC':
            sortClass = 'mdi-sort-ascending'
            break
        case 'DESC':
            sortClass = 'mdi-sort-descending'
            break
        default:
            break
    }
    return sortClass
}

class SortIcon extends React.Component {
    
    getSortClass (sortDir) {
        let sortClass = 'mdi-sort'
        if(this.props.sortBy !== this.props.prop) return sortClass
        switch(sortDir){
            case 'ASC':
                sortClass = 'mdi-sort-ascending'
                break
            case 'DESC':
                sortClass = 'mdi-sort-descending'
                break
            default:
                break
        }
        return sortClass
    }

    handleClick() {
        let sortDir = this.props.sortDir === 'ASC' ? 'DESC' : 'ASC'
        this.props.onChange(this.props.prop, sortDir)
    }

    render(){
        let sortClass = this.getSortClass(this.props.sortDir)
        return (
            <i className={`mdi ${sortClass}`} onClick={() => this.handleClick()}></i>
        )
    }
}

class Administration extends React.Component {

    state = {
        page: 0,
        onPage: 10,
        sortBy: 'name',
        sortDir: null,
        selectSelected: []
    }

    componentDidMount() {
        this.search()
    }

    search() {
        this.props.actions.getCountries({
            page: this.state.page,
            onPage: this.state.onPage,
            sortBy: this.state.sortBy,
            sortDir: this.state.sortDir
        })
    }
    
    setPage(page) {
        this.setState({ page, selectSelected: [] }, this.search)
    }

    setPageSize(size) {
        this.setState({ page: 0, onPage: size, selectSelected: [] }, this.search)
    }

    sort (sortBy, sortDir) {
        this.setState({ sortBy, sortDir }, this.search ) 
    }

    onSelect(values) {
        this.setState({ selectSelected: values })
    }

    render() {
        const isLoading = this.props.countries.payload && this.props.countries.payload.isFetching
        // const isLoading = true //for test
        const countries = this.props.countries.payload && this.props.countries.payload.countries
        const pageCount = this.props.countries.payload && this.props.countries.payload.pageCount || 1
        return (
            <main>
                <div className="box">
                    <Loader loading={isLoading}>

                        <div className="mb2" />

                        <table className="datatable mb1">
                            <thead>
                                <tr>
                                    <th>
                                        <SortIcon sortDir={this.state.sortDir} sortBy={this.state.sortBy} prop="id" onChange={this.sort.bind(this)} />
                                        ID
                                    </th>
                                    <th>
                                        <SortIcon sortDir={this.state.sortDir} sortBy={this.state.sortBy} prop="name" onChange={this.sort.bind(this)} />
                                        Name
                                    </th>
                                    <th>Code</th>
                                    <th>ISO</th>
                                    <th>Continent</th>
                                    <th>Capital</th>
                                    <th>Phone</th>
                                    <th>Currency</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            { countries && <tbody>
                                {
                                    countries.map((country) => {
                                        return (
                                            <tr key={country.id}>
                                                <td>{country.id}</td>
                                                <td>{country.name}</td>
                                                <td>{country.code}</td>
                                                <td>{country.iso_code}</td>
                                                <td>{country.continent}</td>
                                                <td>{country.capital}</td>
                                                <td>{country.phone}</td>
                                                <td>{country.currency}</td>
                                                <td>{country.date}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody> }
                        </table>
                        <div className="row">
                            <div className="col-sm-8">
                                <Pagination
                                    pages={pageCount}
                                    current={this.state.page}
                                    setPage={(index) => this.setPage(index)}
                                />
                            </div>
                            <div className="col-sm-4 text-right">
                                <Select
                                    position="top"
                                    value={this.state.onPage} 
                                    values={[10, 50, 100]}
                                    onChange={(value) => this.setPageSize(value) }
                                />
                            </div>
                        </div>

                    </Loader>
                </div>
            </main>
        )
    }
}

export default connect(
    Administration,
    (store) => ({
        countries: store.countries
    }),
    { getCountries }
)