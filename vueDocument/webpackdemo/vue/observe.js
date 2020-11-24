import Observer from './observer';
function observe(data) {
    if (typeof data !== 'object' || data === null) return;
    return new Observer(data);
}
export default observe;