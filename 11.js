/**
 * Created by yangHuan on 17/9/12.
 */

// Set数据结构
// 1. 键名 键值是同一个值
const define1 = new Set();
[2, 3, 4, 5, 2, 2].forEach(x => define1.add(x));
for (let i of define1) {
    console.log(i);
}

const define2 = new Set([1, 2, 3, 4, 4, 3, 2, 1]);
console.log('[...set]', [...define2], define2.size, '去重数组的方式之一 => [...new Set(array)]');

function divs() {
    return [...document.querySelectorAll('div')];
}
const set2 = new Set(divs());
console.log('set2.size', set2.size);
const set3 = new Set();
divs().forEach(div => set3.add(div));
console.log('set3.size', set3.size);

// NaN等于自身，两个对象总是不想等的
let set4 = new Set();
let a = NaN;
let b = NaN;
set4.add(a);
set4.add(b);
console.log(set4.size);

let set5 = new Set();
set5.add({});
console.log(set5.size);
set5.add({});
console.log('set5.add({}) again', set5.size);

// api usage
let set6 = new Set();
set6.add(1).add(2).add(2).add(3);
console.log(set6.size, set6.has(1), set6);
set6.delete(1);
console.log(set6.size);
set6.clear();
console.log(set6.size);


const items = new Set([1, 2, 3, 4, 3, 2]);
const array = Array.from(items);
console.log('Array.from可以将Set结构转为数组', array);

function dedupe(arr) {
    return Array.from(new Set(arr));
}
console.log('去重数组的方式之二', dedupe([1, 2, '2', 3, 4]));

console.log('keys(), values(), entries(),forEach()==========');
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
set7.forEach((value, key, self) => {
    console.log(`value=>${value},key=>${key},`)
});

console.log('map,filter  use in Set============= ');
let set8 = new Set([1, 2, 3]);
set8 = new Set([...set8].map(x => x + 10));
console.log(set8);

let set9 = new Set([2, 4, 6, 8, 9, 11]);
set9 = new Set([...set9].filter(x => x % 2 === 1));
console.log(set9);
console.log('Set => union intersect difference=========');

const set11 = new Set([0, 1, 2, 3, 3]);
const set12 = new Set([0, 11, 22, 33, 33]);
const union = new Set([...set11, ...set12]);
const intersect = new Set([...set11].filter(x => set12.has(x)));
const difference = new Set([...set11].filter(x => !set12.has(x)));

// 在遍历操作中，同步改变原来的Set结构  to add


// 2.WeakSet to add
// 成员只能是对象


// 3.Map
const data = {};
const element = document.getElementById('app');
data[element] = 'metadata';
console.log('data', data);

const m = new Map();
const o = { p: 'hello baidu' };
m.set(o, 'baidu');
console.log('m.get(o)=>', m.get(o));
console.log(m.has(o), m);
m.delete(o);
console.log(m.has(o));



