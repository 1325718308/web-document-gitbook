import { patch } from './vDom/patch';

function mountComponent(vm) {
    vm._update(vm._render());
}

function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vNode) {
        const vm = this;
        patch(vm.$el, vNode);
    }
}

export {
    mountComponent,
    lifecycleMixin
}