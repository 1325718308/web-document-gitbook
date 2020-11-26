import observe from './observe';

function defineReactiveData(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
        get() {
            return value;
        },
        set(newValue) {
            if (newValue === value) return;
            observe(newVal);
            value = newVal;
        }
    })
}

export {
    defineReactiveData
}