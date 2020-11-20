import defaultState from '../states/courseTabList';
export default function (state = defaultState, action) {
    switch(action.type) {
        case 'CHANGE_COURSE_FIELD':
            return {
                ...state,
                curField: action.field
            }
        default:
            return state;
    }
}