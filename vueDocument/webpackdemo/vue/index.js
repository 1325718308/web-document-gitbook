import {initState} from './init';
function Vue(options) {
    this._init(options);
}

Vue.prototype._init = function(options) {
    var vm = this;
    vm.$options = options;
    
    // 初始化状态
    initState(vm);
}
export default Vue;
