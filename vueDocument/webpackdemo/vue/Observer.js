import defineReactiveData from './reactive';

function Observer(data) {
    if (Array.isArray(data)) {
        // 数组
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