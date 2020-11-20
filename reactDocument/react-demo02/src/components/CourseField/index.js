import React, { Component } from 'react';
import FiledItem from './FiledItem';
import { getCourseField } from '../../models';

export default class CourseFiled extends Component{
    state = {
        filedData: []
    }
    getFiledData() {
        const courseList = await getCourseField();
        this.setState({courseList});
    }
    componentDidMount() {
        this.getFiledData();
    }

    render() {
        const { changeCourseField, curField } = this.props;
        return (
            <div className="container">
                <FiledItem key={-1} 
                    curField={curField}
                    changeCourseField={() => changeCourseField('-1')}
                    item={{field: '-1', field_name: '全部课程'}}/>
                {
                    this.state.filedData.map((item, index) => {
                        return (
                            <FiledItem 
                                curField={curField}
                                changeCourseField={changeCourseField}
                                item={item} key={index} />
                        )
                    })
                }
            </div>
        )
    }
}