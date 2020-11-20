import { getCourseField } from '../../models/index';
const CHANGE_COURSE_FIELD = 'CHANGE_COURSE_FIELD';
const GET_COURSE_FIELD = 'GET_COURSE_FIELD';

function changeCourseField(field) {
    return {
        type: CHANGE_COURSE_FIELD,
        field // payload
    }
}

export {
    changeCourseField
}