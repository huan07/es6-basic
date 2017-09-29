/**
 * Created by yangHuan on 17/9/24.
 */

// 1. ... 将数组转为参数序列
console.log(...[1, 2, 3]);
console.log(1, ...[2, 3, 4], 5);

// example
// 应用
// (1)合并 数组
const more = [11, 22];
console.log([1, 2].concat(more, 33), [1, 2, ...more, 33]);

const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];
const arrResult = [...arr1, ...arr2, ...arr3];
const arrResult_ = arr1.concat(arr2, arr3);
console.log(arrResult, arrResult_);

// (2)与解构赋值结合 rest 只能放在参数的最后一个，否则会报错
const list = ['list1', 'list2', 'list3', 'list4'];
const [a, ...rest]=list;
console.log(a, rest, list[0], list.slice(1));

// (3)函数的返回值

// (4)字符串
console.log([...'hello'], ...'world');
// (5)
// (6)
