import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import CourseFiled from '../components/CourseField';
import CourseList from '../components/CourseList';
import { changeCourseField } from '../store/actions/courseTabList';

class IndexPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }  
    render() { 
        const { curField, changeCourseField } = this.props;
        return (<div>
            <CourseFiled 
                curField={curField}
                changeCourseField={changeCourseField}/>
            <CourseList 
                curField={curField}/>
        </div>);
    }
}
const mapStateToProps = state => {
    return {
        curField: state.courseTabList.curField,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeCourseField(field) {
            dispatch(changeCourseField(field))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);