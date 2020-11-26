import { ARR_METHODS } from './config';
import observeArr from './observeArr'

var originArrMethods = Array.prototype;
var arrMethods = Object.create(originArrMethods);
ARR_METHODS.map(function (m) {
    arrMethods[m] = function () {
        var args = Array.prototype.slice.call(arguments);
        var rt = originArrMethods[m].apply(this, args);
        var newArr;
        switch(m) {
            case 'push':
            case 'unshift':
                newArr = args;
                break;
            case 'splice':
                newArr = args[2].slice(2);
                break;
            default: 
                break;
        }

        newArr && observeArr(newArr);
        return rt;
    }
})
export {
    arrMethods
}
