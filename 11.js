/**
 * Created by yangHuan on 17/9/12.
 */

// 构造函数，Set数据结构  成员的值是唯一的(可以用来数组去重)
// 1. 键名 键值是同一个值
const defineSet = new Set();
const defineSet2 = new Set([1, 2, 3, 4, 4, 3, 2, 1]);

// NaN等于自身，两个对象总是不想等的 !!!!!!!!!!!!
{
    const set = new Set();
    const a = NaN;
    const b = NaN;
    set.add(a);
    set.add(b);
    console.log('1.两个NaN是相等的 ＝>', set.size);
}
{
    const set = new Set();
    set.add({});
    console.log('2.两个对象{}总是不相等的 =>', set.size);
    set.add({});
    console.log(set.size);
}
{
    const set = new Set();
    set.add(1).add(2).add(2).add(3);
    console.log('add size example => ', set.size, set);

    set.delete(1);
    console.log('delete size example => ', set.has(1), set.has(2));

    set.clear();
    console.log('clear size example => ', set.size);
}

// 数组去重：数组作为参数转换为Set数据结构，Set再被转换为数组
// 扩展运算符[...xx],  Array.from(xx)可以将 Set数据结构 转为数组
{
    function dedupe(arr){
        return Array.from(new Set(arr));
    }

    const array = [1, 2, '2', 2, 3];
    const items = new Set(array);
    const xx = [...items];
    const yy = dedupe(array);
    console.log(Object.prototype.toString.call(items));
    console.log('去重数组的方式之一 => ', xx, Object.prototype.toString.call(xx));
    console.log('去重数组的方式之二 =>', yy, Object.prototype.toString.call(yy));
}

// keys(), values(), entries(),forEach()
{
    const set = new Set(['red', 'green', 'blue']);
    for (let item of set.keys()) {
        console.log(item);
    }
    for (let item of set.values()) { // 可以省略values() to add to add
        console.log(item);
    }
    for (let item of set) {
        console.log(item);
    }

    for (let item of set.entries()) {
        console.log(item);
    }

    set.forEach((value, key, self) =>{
        console.log(`value=>${value},key=>${key},`)
    });
}

// map filter 间接用于Set
{
    let set = new Set([1, 2, 3]);
    set = new Set([...set].map(x => x + 100));
    console.log(set);
}
{
    let set = new Set([2, 4, 9, 11]);
    set = new Set([...set].filter(x => x % 2 === 1));
    console.log(set);
}
{
    console.log('Set => union intersect difference==数组并集==数组交集==数组差集===');
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    const union = [...new Set([...arr1, ...arr2])]; // 数组并集
    const intersect = arr1.filter((item) => set2.has(item));  //   数组交集
    const difference = arr1.filter((item) => !set2.has(item));  // 数组差集

    console.log(union, intersect, difference);
    console.log(new Set(union), new Set(intersect), new Set(difference));
}


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