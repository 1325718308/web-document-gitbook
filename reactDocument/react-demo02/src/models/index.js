import { axiosGet } from '../utils/http';

function getCourseField() {
    return new Promise((resolve, reject) => {
        axiosGet({
            url: '/fliedList.json',
            success(data) {
                console.log(data)
                resolve(data.result);
            },
            error(err) {
                reject(err);
            }
        }) 
    })
}
function getCourseList() {
    return new Promise((resolve, reject) => {
        axiosGet({
            url: 'courseList.json',
            success(data) {
                resolve(data.result);
            },
            error(err) {
                reject(err);
            }
        }) 
    })
}

export {
    getCourseList,
    getCourseField 
}