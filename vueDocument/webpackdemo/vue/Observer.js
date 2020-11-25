import defineReactiveData from './reactive';
import { arrMethods } from './array';
import observeArr from './observeArr';

function Observer(data) {
    if (Array.isArray(data)) {
        // 数组
        data.__proto__ = arrMethods;
        observeArr(data);
    } else {
        // 对象
        this.walk(data);
    }
}

Observer.prototype.walk = function(data) {
    var keys = Object.keys(data);
    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = data[key];
        defineReactiveData(data, key, value);
    }
}

export default Observer;