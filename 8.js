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

    var max = Math.max(...num); //被编译成和max4一样的语法

    var max2 = Math.max(1, 2, 98, 99);

    var max3 = Math.max.apply(null, num);

    var max4 = Math.max.apply(Math, num);

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
    const a2 = a1; // 浅拷贝
    a2[0] = 2;
    console.log('复制的是引用指针 => ', a1, a2);
}
{
    const a1 = [1, 2];
    const a2 = a1.concat();
    a2[0] = 2;
    console.log('克隆一个全新的数组 => ', a1, a2);
}
{
    const a1 = [3, 4];
    const a2 = [...a1];
    const [...a3]=a1;
    console.log('es6克隆一个全新的数组 => ', a1, a2, a3);
}

// 合并数组，都是浅拷贝
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
    console.log('first, rest => ', first, rest);
}
{
    const [first, ...rest]=[1];
    console.log('first, rest => ', first, rest);
}
{
    const [first, ...rest]=[];
    console.log('first, rest => ', first, rest);
}
{
    // const [first, ...rest, xx]=[]; // error
}

// 字符串转换为真正的数组 to add
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

// 转为真正的数组，任何部署Iterator接口的对象可用，
// […xx]: 调用的是数据结构的Iterator接口
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

// (6) Map/Set/Generator函数
{
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);
    let mapArr = [...map.keys()];
    console.log('mapArr => ', mapArr);

    const go = function*(){
        yield 1;
        yield 2;
        yield 3;
    };
    let goArr = [...go()];
    console.log('goArr => ', goArr)
}


// 2.Array.from
// 类似数组的对象（本质特征只有一点，即必须有length属性）
// 可遍历（iterable）的对象（字符串／Set 和 Map）
{
    let arrayLike = { // 类似数组的对象，有length属性
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


// 3.Array.of  to add


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
        console.log('index, item => ', index, item);
    }
}


// 8.includes 返回true/false
{
    const arr = [1, 2, 3, NaN];

    var xx = arr.indexOf(NaN);

    var yy = arr.includes(NaN); // 包含
    console.log('includes => ', xx, yy);
}
{
    const arr = [1, 2, 3, NaN];

    const containsX = (arr, value) =>{ /* 性能差，每次调用都要去判断 */
        if (Array.prototype.includes) {
            return arr.includes(value);
        } else {
            return arr.some(el => el === value)
        }
    };

    console.log(containsX(arr, 13), containsX(arr, NaN));
}
{
    const arr = [1, 2, 3, NaN];

    const contains = (() => /* 匿名函数立即执行，闭包的实现方式，结果保留在内存中  better */
        Array.prototype.includes
            ? (arr, value) => arr.includes(value)
            : (arr, value) => arr.some(el => el === value))();

    console.log(contains(arr, 13), contains(arr, NaN));
}


// 9. to add