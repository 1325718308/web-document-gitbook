import observe from './observe';
function defineReactiveData(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
        get() {
            console.log('响应式数据：获取', value);
            return value;
        },
        set(newVal) {
            console.log('响应式数：设置', newVal);
            if (newVal == value) return
            data[key] = newVal;
        }
    })
}
export default defineReactiveData;