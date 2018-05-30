/**
 * Created by yangHuan on 17/9/12.
 */

// 构造函数，Set数据结构  成员的值是唯一的
// 1. 键名 键值是同一个值
const defineSet = new Set();
const defineSet2 = new Set([1, 2, 3, 4, 4, 3, 2, 1]);

// NaN等于自身，两个对象总是不想等的 !!!!!!!!!!!!
const set4 = new Set();
const a = NaN;
const b = NaN;
set4.add(a);
set4.add(b);
console.log('两个NaN是相等的', set4.size);

const set5 = new Set();
set5.add({});
console.log(set5.size);
set5.add({});
console.log('两个对象{}总是不相等的', set5.size);

console.log('Set api usage!!!!!!!!!!!!!!!!!!!!!!!!!!!');
const set6 = new Set();
set6.add(1).add(2).add(2).add(3);
console.log(set6.size, set6);
set6.delete(1);
console.log(set6.size, set6.has(1), set6.has(2));
set6.clear();
console.log(set6.size);

const items = new Set([1, 2, 3, 4, 3, 2]);
const array1 = [...items];
const array2 = Array.from(items);
console.log('扩展运算符,   [...xx],  Array.from(xx)可以将 Set数据结构 转为数组!!!!!!!!!!!!!!!!!!!!!!!!!');
console.log(items, Object.prototype.toString.call(items));
console.log(array1, Object.prototype.toString.call(array1));
console.log(array2, Object.prototype.toString.call(array2));

function dedupe(arr){
    return Array.from(new Set(arr));
}
const repeatedArr = [1, 2, '2', 2, 3];
console.log('去重数组的方式之一!!!!!!!!!!!!!!!!!!!!!!!!!!!', [...new Set(repeatedArr)]);
console.log('去重数组的方式之二!!!!!!!!!!!!!!!!!!!!!!!!!!!', dedupe(repeatedArr));

console.log('keys(), values(), entries(),forEach()=============');
const set7 = new Set(['red', 'green', 'blue']);
for (let item of set7.keys()) {
    console.log(item);
}
for (let item of set7.values()) { // 可以省略values() to add
    console.log(item);
}
for (let item of set7.entries()) {
    console.log(item);
}
set7.forEach((value, key, self) =>{
    console.log(`value=>${value},key=>${key},`)
});

console.log('map,filter  use in Set=========================== ');
let set8 = new Set([1, 2, 3]);
set8 = new Set([...set8].map(x => x + 10));
console.log(set8);

let set9 = new Set([2, 4, 6, 8, 9, 11]);
set9 = new Set([...set9].filter(x => x % 2 === 1));
console.log(set9);

console.log('Set => union intersect difference==数组并集==数组交集==数组差集===');
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
const set1 = new Set(arr1);
const set2 = new Set(arr2);

const union = [... new Set([...arr1, ...arr2])]; // 数组并集
const intersect = arr1.filter((item) => set2.has(item));  //   数组交集
const difference = arr1.filter((item) => !set2.has(item));  // 数组差集

console.log(union, intersect, difference);
console.log(new Set(union), new Set(intersect), new Set(difference));


// 2.WeakSet  成员只能是对象；它的对象都是弱引用；不可遍历
{
    let ws = new WeakSet();
    // ws.add(1); error
    // ws.add(Symbol()); error
}

{

}


// 3.Map   value-value的hash结构
const data = {};
const element = document.getElementById('app');
data[element] = 'metadata';
console.log('data', data);

console.log('Map api usage: size set get has delete clear !!!!!!!!!!!!!!!!!!!');
const defineMap = new Map();
const o = { p: 'hello baidu' };
defineMap.set(o, 'baidu');  // 返回整个 Map 结构
console.log('defineMap.get(o)=>', defineMap.get(o), defineMap.size);
console.log(defineMap.has(o), defineMap);
defineMap.delete(o);
console.log(defineMap.has(o));

const defineMap2 = new Map([
    ['name', '张三'],
    ['title', 'author']
]); // 每个成员是一个双元素的数组
console.log(defineMap2.size, defineMap2.has('name'), defineMap2.get('name'))

// 引用类型值，按内存地址 对同一个对象的引用，Map结构才将其视为同一个key
// 简单类型的值，严格相等，Map结构才将其视为同一个key

console.log('Map api usage: keys values entries forEach !!!!!!!!!!!!!!!!!!!');
for (let key of defineMap2.keys()) {
    console.log(key);
}

for (let value of defineMap2.values()) {
    console.log(value);
}

for (let item of defineMap2.entries()) {
    console.log(item[0], item[1], item);
}

for (let [key, value] of defineMap2.entries()) {
    console.log(key, value);
}

for (let [key, value] of defineMap2) {
    console.log(key, value);
}

console.log(defineMap2, defineMap2.keys(), defineMap2.values(), defineMap2.entries(), defineMap2.entries);
console.log('Map结构转换为数组  ...运算符');
console.log([...defineMap2], [...defineMap2.keys()], [...defineMap2.values()], [...defineMap2.entries()])


console.log('Map与其他数据结构的转换!!!!!!!!!!!!!!!!!!!!!!!!!!!');
// Map  Array
const arrMap = new Map()
    .set(true, 'true')
    .set(undefined, 'undefined');
console.log(arrMap, [...arrMap]);
const arr = [[1, 1], [2, 2]];
console.log(new Map(arr), arr);

// to add