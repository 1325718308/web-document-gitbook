
function proxyData(vm, target, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[target][key];
        },
        set(newVal) {
            vm[target][key] = newVal;
        }
    })
}

export default proxyData;