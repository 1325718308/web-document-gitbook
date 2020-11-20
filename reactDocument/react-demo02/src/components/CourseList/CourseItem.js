import React, { Component } from 'react';
class CourseItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {item} = this.props;
        return ( <li className="course-item">{item.course_name}</li> );
    }
}
 
export default CourseItem;