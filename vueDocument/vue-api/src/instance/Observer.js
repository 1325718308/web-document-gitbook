import { defineReactiveData} from './reactive';
import  observeArr  from './array/observeArr';
import  { arrMethods } from './array';

function Observer(data) {
    if (Array.isArray(data)) {
        // 处理数组
        data.__proto__ = arrMethods;
        observeArr(data);
    } else {
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
