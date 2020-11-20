import React, { Component } from 'react';
import './index.css'
class FiledItem extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        const {item, changeCourseField, curField} = this.props;
        return (
        <button 
            onClick={() => changeCourseField(item.field)}
            className={item.field === curField ? 'current-field' : 'filed-item'}>{item.field_name}
        </button>);
    }
}
 
export default FiledItem;