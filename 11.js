/**
 * Created by yangHuan on 17/9/12.
 */

// Set数据结构  类似于数组，但是成员的值都是唯一的(可以用来数组去重)
// Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数
const defineSet = new Set();
const defineSet2 = new Set([1, 2, 3, 4, 4, 3, 2, 1]);
console.log(Object.prototype.toString.call(defineSet2));

// Set内部判断两个值是否不同，类似于精确相等运算符（===），主要的区别是NaN等于自身
// NaN等于自身，两个对象总是不想等的
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

// Set 实例的方法: add, delete, has, clear
{
    const set = new Set();
    set.add(1).add(2).add(2).add(3);
    console.log('add example => ', set.size, set);

    set.delete(1);
    console.log('delete example => ', set.has(1), set.has(2));

    set.clear();
    console.log('clear example => ', set.size);
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
    console.log('去重数组的方式之一 => ', xx);
    console.log('去重数组的方式之二 =>', yy);
}

// Set 实例的方法: keys(), values(), entries(), 返回的都是遍历器对象
// forEach();
// Set数据结构 默认遍历器生成函数就是它的values方法
{
    const set = new Set(['red', 'green', 'blue']);
    for (let item of set.keys()) {
        console.log(item);
    }
    for (let item of set.values()) { // 可以省略values() to add to add
        console.log(item);
    }

    for (let item of set.entries()) {
        console.log(item);
    }

    console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // why not true
    console.log(set[Symbol.iterator] === set.entries); // why not true
    for (let item of set) {
        console.log(item);
    }

    set.forEach((value, key, self) =>{
        console.log(`value=>${value},key=>${key},`)
    });
}

// map filter 间接用于Set
{
    let set = new Set([1, 2, 3]);
    set = new Set([...set].map(x => x + 1000));
    console.log(set);
}
{
    let set = new Set([2, 4, 9, 11]);
    set = new Set([...set].filter(x => x % 2 === 1));
    console.log(set);
}

// 数组并集/交集/差集
{
    console.log('Set => union intersect difference');
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


// 2.WeakSet
// a.WeakSet 的成员只能是对象（任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数）
// b.WeakSet 中的对象都是弱引用 to add
{
    const ws = new WeakSet();
    // ws.add(1); error
    // ws.add(Symbol()); error
}

{
    const ws = new WeakSet();

    const a = [[1, 2], [3, 4]];
    const ws2 = new WeakSet(a);
    console.log('ws, ws2 => ', ws, ws2);
}


// 3.Map   value-value的hash结构
{
    const data = {};
    const element = document.getElementById('app');
    data[element] = 'metadata'; // 非字符串的key 在后台被自动转换为 字符串值
    console.log('data => ', data, data['[object HTMLDivElement]']);
}

// set get size has delete clear
// 引用类型值，按内存地址 对同一个对象的引用，Map结构才将其视为同一个key
// 简单类型值，严格相等，Map结构才将其视为同一个key
// 实例方法：keys values entries forEach
{
    const defineMap = new Map();
    const o = { p: 'hello baidu' };

    defineMap.set(o, 'baidu');  // 返回的是当前的Map对象，可以采用链式写法
    console.log('defineMap.get(o)=>', defineMap.get(o), defineMap.size);

    console.log(defineMap.has(o));
    defineMap.delete(o);
    console.log(defineMap.has(o));
}
{
    const defineMap2 = new Map([
        ['name', '张三'],
        ['title', 'author']
    ]); // 每个成员是一个双元素的数组
    console.log(defineMap2.get('name'), defineMap2.size, defineMap2.has('name'),);

    for (let key of defineMap2.keys()) {
        console.log('1=>', key);
    }

    for (let value of defineMap2.values()) {
        console.log('2=>', value);
    }

    for (let [key, value] of defineMap2.entries()) {
        console.log('4=>', key, value);
    }
    console.log(defineMap2[Symbol.iterator] === defineMap2.entries);

    for (let [key, value] of defineMap2) {
        console.log('44=>', key, value);
    }

    console.log(defineMap2, defineMap2.keys(), defineMap2.values(), defineMap2.entries());
    console.log('Map结构转换为数组  扩展运算符[... Map]');
    console.log([...defineMap2], [...defineMap2.keys()], [...defineMap2.values()], [...defineMap2.entries()]);
}

// Map的间接map,filter
// Map的forEach
{
    const map0 = new Map()
        .set(1, 'a')
        .set(2, 'b')
        .set(3, 'c');
    const array0 = [...map0];

    const array1 = array0.filter(([k, v]) => k <= 2);

    const array2 = array0.map(([k, v]) => [k + '_key', v + '_value']);

    console.log('map0 => ', map0, array0);
    console.log('map1 => ', new Map(array1), array1);
    console.log('map2 => ', new Map(array2), array2);

    new Map(array2).forEach((value, key, map) => console.log(key, value));
}
// to add example


// Map <=> Array
{
    const map = new Map()
        .set(true, 7)
        .set({ foo: 3 }, ['abc'])
        .set(undefined, 'undefined');
    console.log('Map <=> Array', map, [...map]);

    const arr = [[true, 7], [{ foo: 3 }, ['abc']]];
    console.log(new Map(arr), arr);
}

// Map <=> Object
{
    function xx(){

    }
}


// to add