## 一、冒泡排序
- ### 实现思想
    1、比较相邻的元素。如果第一个比第二个大，就交换他们两个。

    2、对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
    
    3、针对所有的元素重复以上两个步骤，除了最后一个。因为第一次循环结束后最后一个元素已经是最大值了，所以不需要在比较最后一个元素
    
    3、持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
- ### 代码实现
```
    function bubblingSort(arr = []) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i; j++) {
                if (arr[j] < arr[j - 1]) { //相邻两个元素比较
                    let temp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = temp;
                }
            }
        }
    return arr;
}
```
- ### 算法流程图

![](https://user-gold-cdn.xitu.io/2020/5/15/172161f64f5922a9?w=1280&h=720&f=jpeg&s=58950)
- ### 时间复杂度O(n²)，空间复杂度0(1)
## 二、插入排序
- ### 算法思想
    插入排序是指在待排序的元素中，假设前面n-1(其中n>=2)个数已经是排好顺序的，现将第n个数插到前面已经排好的序列中，然后找到合适自己的位置，使得插入第n个数的这个序列也是排好顺序的。按照此法对所有元素进行插入，直到整个序列排为有序的过程，称为插入排序。
- ### 代码实现
```
    function insertSort(arr) {
        for (i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return arr;
    }
```
- ### 算法图解

![](https://user-gold-cdn.xitu.io/2020/5/15/1721743febece4bc?w=1053&h=644&f=webp&s=19252)
- ### 时间复杂度O(n²)，空间复杂度0(1)
## 三、选择排序
- ### 算法思想
    第一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，然后再从剩余的未排序元素中寻找到最小（大）元素，然后放到已排序的序列的末尾。以此类推，直到全部待排序的数据元素的个数为零
- ### 代码实现
```
    function chooseSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            let min = arr[i]; //选择一个最小的值
            for (let j = i + 1; j < arr.length - 1; j++) {
                if (min > arr[j]) {
                    let temp = min;
                    min = arr[j];
                    arr[j] = temp;
                }
            }
            arr[i] = min;
        }
        return arr;
    }
```
- ### 算法流程图

![](https://user-gold-cdn.xitu.io/2020/5/15/1721628f17cad7a8?w=1280&h=720&f=jpeg&s=70393)
- ### 时间复杂度O(n²)，空间复杂度0(1)
## 四、归并排序
- ### 算法思想
    归并排序使用了非常好的二分法思想。把一个数组，分成两部分，排序之后，较小的那个值取出来放在第一个位置，再合并。
- ### 代码实现
```
    function mergeSort(arr) {
        if (arr.length == 1) {
            return arr;
        }
        let middle = Math.floor(arr.length / 2);//去中间下标用来分割数组
        let left_arr = arr.slice(0, middle);//左边数组
        let right_arr = arr.slice(middle);//右边数组
        return merge(mergeSort(left_arr), mergeSort(right_arr))//重复上面的步骤
    }
    function merge(left_arr, right_arr) { 
        let results = [];//存储排序后的结果
        while(left_arr.length > 0 && right_arr.length > 0) {
            if (left_arr[0] > right_arr[0]) {
                results.push(right_arr.shift());//这里用shift是因为要从原数组种删除这个值
            } else {
                results.push(left_arr.shift());
            }
        }
        return [...results, ...left_arr, ...right_arr]; //这里使用了es6特性
    }
```
- ### 算法图解

![](https://user-gold-cdn.xitu.io/2020/5/15/172163284f6631b0?w=740&h=467&f=png&s=293893)
- ### 时间复杂度O(nlogn)，空间复杂度O(n)
## 五、快速排序
- ### 算法思想
    快速排序和归并排序相似，也是用了二分的思想。但是不同的是快速排序取得是一个中间值，比较剩下的元素，比它小的值放在左边，比它大的放在右边。最后拼接两个数组。
- ### 代码实现
```
    function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }
        let middleIndex = Math.floor(arr.length / 2);
        let middle = arr.splice(middleIndex,1)[0];// 取中间值
        let left = [];
        let right = [];
        for(let i=0; i< arr.length; i++) {
            if (arr[i] < middle) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return quickSort(left).concat([middle], quickSort(right));
    }
```
- ### 算法图解

![](https://user-gold-cdn.xitu.io/2020/5/15/172163b62dd604d5?w=823&h=576&f=webp&s=14440)
- ### 时间复杂度O(nlogn)，空间复杂度O(n)