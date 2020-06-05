import React, { Component } from 'react';
import { SORT } from '../../utils/sort';
import { SetParamUrl, GetParamUrl } from '../../utils/urlHanlder';
import { DynamicFilter } from '../../utils/Filter'
import { addToLocalStorage, removeFromLocalStorage } from '../../utils/LocalStorage'
import Filter from '../Filter/Filter'
import './Table.css'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: [],
            testBody: [],
            sorted: null,
            name: '',
            date: '',
            title: '',
            field: '',
            BST: undefined
        }
    }

    componentWillMount() {
        const { BST } = this.props
        let data = BST.find(this.handleDateFirstTime()).children
        this.setState({
            body: data,
            date: this.handleDateFirstTime(),
            BST: BST
        }, () => {
            this.handleDataFirstTime()
        })
    }
    /**
     * sorted item 
     */
    sortItem = (body, item) => {
        const listItem = SORT(body, item)
        this.setState({
            body: listItem,
            sorted: item
        }, () => {
            SetParamUrl('sortedBy', this.state.sorted)
        })
    }
    /**
     * handle Data base on query params in url
     */
    handleDataFirstTime = () => {
        SetParamUrl('date', this.state.date)
        this.renderFromUrlFilter(this.state.body)
        if (GetParamUrl('sortedBy')) {
            const sorted = GetParamUrl('sortedBy')
            this.setState({
                sorted: sorted,
            }, () => {
                this.sortItem(this.state.body, this.state.sorted)
            })
        }
    }

    /**
     * if  date exist in query params use from it else use from root of BST Data 
     */
    handleDateFirstTime = () => {
        let date = ''
        const { BST } = this.props
        if (GetParamUrl('date')) {
            date = GetParamUrl('date')
        } else {
            date = BST.root.value
            date = (new Date(date)).toISOString().split('T')[0]
        }
        return date
    }

    /**
     * recive data header from parent and render it
     */
    renderHeaderTable = () => {
        const { header } = this.props;
        let tableHeader = header &&
            header.map((item, index) => <th key={index} onClick={() => this.sortItem(this.state.body, item.key)}>{item.value}</th>)
        return tableHeader;
    }

    /**
     * handle date and set it on BST for retriving data and set to query params
     */
    dateHandler = (event) => {
        this.setState({ date: event.target.value }, () => {
            let resultDate = this.state.BST.find(this.state.date)
            this.setState({
                body: resultDate.children
            }, () => {
                SetParamUrl('date', this.state.date)
                this.renderFromUrlFilter(this.state.body)
            })
        })
    }
    
    /**
     * retrive data base on  query params filters
     */
    renderFromUrlFilter = (body) => {
        let filterItem = {}
        let filterData = []
        if (GetParamUrl('name')) {
            this.setState({ name: GetParamUrl('name') })
            Object.assign(filterItem, { name: [GetParamUrl('name')] })
        }
        if (GetParamUrl('field')) {
            this.setState({ field: GetParamUrl('field') })
            Object.assign(filterItem, { field: [GetParamUrl('field')] });
        }
        if (GetParamUrl('title')) {
            this.setState({ title: GetParamUrl('title') })
            Object.assign(filterItem, { field: [GetParamUrl('title')] });
        }
        if (Object.keys(filterItem).length === 0 && filterItem.constructor === Object) {
            return
        } else {
            filterData = DynamicFilter(body, filterItem)
            this.setState({
                body: filterData
            })
        }
    }
    
    /**
     * add or remove item in localstorage as a favirote item
     */
    checkBoxFav = (e, id) => {
        if (e.target.checked) {
            addToLocalStorage(id)
        } else {
            removeFromLocalStorage(id)
        }
    }
    
    /**
     * rendering a item is a fav or not
     */
    isFav = (id) => {
        let items = JSON.parse(localStorage.getItem('itemList')) || []
        return items.some(item => item === id)
    }

    /**
     * execute filter and cheking this filter is exits or not
     */
      submitFilterHandler = () => {
        let newBody = this.state.BST.find(this.state.date)
        let filterItem = {}
        let filterData = []
        this.setState({ body: newBody.children }, () => {
            this.state.name.trim().length > 1 && Object.assign(filterItem, { name: [this.state.name] });
            this.state.name.trim().length > 1 && SetParamUrl('name', this.state.name)
            this.state.title.trim().length > 1 && Object.assign(filterItem, { title: [this.state.title] });
            this.state.title.trim().length > 1 && SetParamUrl('title', this.state.title)
            this.state.field.trim().length > 1 && Object.assign(filterItem, { field: [this.state.field] });
            this.state.field.trim().length > 1 && SetParamUrl('field', this.state.field)
            filterData = DynamicFilter(this.state.body, filterItem)
            this.setState({
                body: filterData
            })
        })
    }

    /**
     * render table body
     */
    renderTableData = () => {
        let items = []
        if (this.state.body && this.state.body.length > 0) {
            items = this.state.body
        }
        return items.map((item) => {
            const { id, name, date, title, field, old_value, new_value } = item
            return (
                <>
                    <tr key={id}>
                        <td>{name}</td>
                        <td>{date}</td>
                        <td>{title}</td>
                        <td>{field}</td>
                        <td>{old_value}</td>
                        <td>{new_value}</td>
                        <td><input type='checkbox' onChange={(e) => this.checkBoxFav(e, id)} defaultChecked={this.isFav(id)} /></td>
                    </tr>
                </>
            )
        })


    }
    /**
     * render filter item 
     */
    renderFilter = () => {
        return (
            <>
                <Filter
                    name={this.state.name}
                    nameHandler={(event) => this.setState({ name: event.target.value })}
                    field={this.state.field}
                    filedHandler={(event) => this.setState({ field: event.target.value })}
                    date={this.state.date}
                    dateHandler={(event) => this.dateHandler(event)}
                    title={this.state.title}
                    titleHandler={(event) => this.setState({ title: event.target.value })}
                    filterHandler={() => this.submitFilterHandler()}
                />
            </>
        )
    }

    render() {
        return (
            <div>
                {this.renderFilter()}
                <table id="table-1">
                    <tbody>
                        <tr>{this.renderHeaderTable()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table