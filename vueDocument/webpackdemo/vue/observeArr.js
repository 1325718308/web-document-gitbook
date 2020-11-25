import observe from './observe';
function observeArr(array) {
    for (let i = 0; i < array.length; i++) {
        observe(array[i]); 
    }
}
export default observeArr;