/**
 * Created by yangHuan on 17/9/24.
 */

// 1. ... 将数组转为参数序列（展开数组）
{
    console.log(...[1, 2, 3]);
    console.log(1, ...[2, 3, 4], 5);
}

// 替代函数的apply方法
{
    var num = [1, 2, 98, 99];

    var max = Math.max(1, 2, 98, 99);

    var max2 = Math.max.apply(null, num);

    var max3 = Math.max.apply(Math, num);

    var max4 = Math.max(...num); // 转换后和max3一样的？？
    console.log('max => ', max, max2, max3, max4);
}
{
    let arr1 = [0, 1, 2, 3];
    let arr2 = [4, 5];
    Array.prototype.push.apply(arr1, arr2);
    console.log('Array.prototype.push.apply =>', arr1);
}
{
    let arr1 = [0, 1, 2, 3];
    let arr2 = [4, 5];
    arr1.push(...arr2);
    console.log('arr1.push(...arr2) => ', arr1);
}

// to add Data.bind


// 应用
// 复制数组
{
    const a1 = [1, 2];
    const a2 = a1;
    a2[0] = 2;
    console.log('只是复制了指针 => ', a1, a2);
}
{
    const a1 = [1, 2];
    const a2 = a1.concat();
    a2[0] = 2;
    console.log('复制数组 => ', a1, a2);
}
{
    const a1 = [3, 4];
    const a2 = [...a1];
    const [...a3]=a1;
    console.log('es6复制数组 => ', a1, a2);
}

// 合并数组
{
    const arr1 = ['a', 'b'];
    const arr2 = ['c'];
    const arr3 = ['d', 'e'];

    const result = arr1.concat(arr2, arr3);

    const result2 = [...arr1, ...arr2, ...arr3];
    console.log(result, result2);
}

// 与解构赋值结合
// rest 只能放在参数的最后一个，否则会报错
{
    const [first, ...rest]=[1, 2, 3, 4];
    console.log(first, rest);
}
{
    const [first, ...rest]=[1];
    console.log(first, rest);
}
{
    const [first, ...rest]=[];
    console.log(first, rest);
}
{
    // const [first, ...rest, xx]=[];
}

// 字符串转换为真正的数组
// 能够正确识别四个字节的 Unicode 字符
{
    var arr = [...'hello'];
    console.log(arr);
}
{
    function length(str){
        console.log('识别四个字节的 Unicode 字符 => ', [...str].length);
    }

    length('你好');
    length('hell');
}
// to add example

// 转为真正的数组
// […xx]: 任何Iterator接口的对象
{
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    const arr = [...arrayLike]; // why not error
    const arr2 = Array.from(arrayLike);
    console.log('转为真正的数组 => ', arr, arr2);
}

// (6) to add


// 2.Array.from
// 可遍历（iterable）的对象（字符串，包括 ES6 新增的数据结构 Set 和 Map）
// 类似数组的对象（本质特征只有一点，即必须有length属性）
{
    let arrayLike = { // 类似数组的对象
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    const arr = [].slice.call(arrayLike);
    const arr2 = Array.from(arrayLike);
    console.log('Array.from => ', arr, arr2);

    const arr3 = Array.from('hello'); // 字符串

    let namesSet = new Set(['a', 'b', 'c']); // Set
    const arr4 = Array.from(namesSet);

    const arr5 = Array.from([1, 2, 3]); // 数组
    console.log(arr3, arr4, arr5);

    const arrLike = { length: 3 }; // 类似数组的对象
    const arr6 = Array.from(arrLike);
    const arr7 = [...arrLike]; // 实际上是可以转换的？？？？
    console.log(arr6, arr7);
}
//  替代方法
{
    const toArray = (obj) => Array.from ? Array.from(obj) : [].slice.call(obj);
}

// Array.from的第二个参数：函数（类似map函数参数的功能）
{
    let arr = [1, 2, , 9];
    const arr2 = Array.from(arr, n => n || 0);
    console.log('Array.from的第二个参数 => ', arr2);
}


// 3.Array.of


// 5.find,findIndex 参照js-basic
// 都可以发现NaN, 弥补indexOf的不足
{
    let xx = [NaN].indexOf(NaN);

    let yy = [NaN].find(x => Object.is(NaN, x));

    let zz = [NaN].findIndex(x => Object.is(NaN, x));

    console.log('find,findIndex => ', xx, yy, zz);
}


// 7.数组实例keys,values,entries
{
    const arr = ['a', 'b', 'c'];

    for (let index of arr.keys()) {
        console.log('index => ', index);
    }

    for (let item of arr.values()) {
        console.log('item => ', item);
    }

    for (let [index, item] of arr.entries()) {
        console.log(index, item);
    }
}


// 8.includes 返回true/false
{
    var arr = [1, 2, 3, NaN];

    var xx = arr.indexOf(NaN);

    var yy = arr.includes(NaN);
    console.log('includes => ', xx, yy);
}
{
    const containsX = (arr, value) =>{ /* 性能差，每次调用都要去判断 */
        if (Array.prototype.includes) {
            return arr.includes(value);
        } else {
            return arr.some(el => el === value)
        }
    };
    console.log(containsX(arr, 13), containsX(arr, NaN));


    const contains = (() => /* 匿名函数立即执行，闭包的实现方式 better */
        Array.prototype.includes
            ? (arr, value) => arr.includes(value)
            : (arr, value) => arr.some(el => el === value))();
    console.log(contains(arr, 13), contains(arr, NaN));
}

