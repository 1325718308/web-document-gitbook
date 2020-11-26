
import { initMixin } from './instance/init';
import {lifecycleMixin} from './compiler/lifecycle'
import {renderMixin} from './compiler/vDom'
function Vue(options) {
    this._init(options)
}
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;


