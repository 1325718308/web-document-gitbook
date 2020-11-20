import React, { Component } from 'react';
import { getCourseList } from '../../models';
import CourseItem from './CourseItem';

export default class CourseList extends Component{
    state = {
        courseList:[]
    }
    async getCourseList() {
        const courseList = await getCourseList();
        this.setState({courseList});
    }
    componentDidMount() {
        this.getCourseList()
    }
    filterCourse(courseList, curField) {
        if (curField === '-1') {
            return courseList;
        }
        return courseList.filter(item => item.field === curField);
    }
    render() {
        const { courseList } = this.state;
        const { curField } = this.props;
        return (
            <div className="container">
                <ul className="course-list">
                    {
                        this.filterCourse(courseList, curField).map((item, index) => {
                           return (<CourseItem item={item} key={index} />)
                        })
                    }
                </ul>
            </div>
        )
    }
}