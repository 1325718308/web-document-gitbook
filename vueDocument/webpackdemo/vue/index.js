import {initState} from './init';
import {compileToRenderFunction} from './compiler';
import {lifecycleMixin, mountComponent} from './lifecycle'
import {renderMixin} from './vDom'
function Vue(options) {
    this._init(options);
}

Vue.prototype._init = function(options) {
    var vm = this;
    vm.$options = options;
    
    // 初始化状态
    initState(vm);
    if (vm.$options.el) {
        vm.$mount(vm.$options.el);
    }
}
lifecycleMixin(Vue);
renderMixin(Vue);
Vue.prototype.$mount = function(el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    vm.$el = el;
    if (!options.render) {
        let template = options.template;

        if (!template && el) {
            template = el.outerHTML;
        }
        const render = compileToRenderFunction(template)
        options.render = render;
    }
    mountComponent(vm);
}
export default Vue;
