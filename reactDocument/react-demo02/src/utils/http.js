// import axios from 'axios';
import { BASE_URL } from '../configs/config';

function axiosGet(options) {
    var promise = fetch(BASE_URL + options.url, {
        method: 'get'
    }).then(response => response.json())
        .catch(err => console.log(err));
    promise.then(res => {
        console.log(res)
        options.success(res.data)
    }).catch(err => {
        options.error(err)
    })
    // axios({
    //     url: BASE_URL + options.url, 
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'text/plain'
    //     },
    //     method: 'GET'
    // }).then(res => {
    //     options.success(res.data);
    // }).catch(e => {
    //     options.error(e);
    // })
}
export {
    axiosGet
}