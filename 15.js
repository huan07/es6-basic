/**
 * Created by yanghuan on 18/7/13.
 */

// 需要一种统一的接口机制，来处理所有不同的数据结构

// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就称这种数据结构是“可遍历的”（iterable）；
// 就可以用for...of循环遍历它的成员；
// 也可以使用while循环遍历；

// 遍历器对象本质上，就是一个指针对象

// 1.
{
    function makeIterator(array){
        var nextIndex = 0;
        return {
            next: function(){ // closure
                return nextIndex < array.length ?
                    { value: array[nextIndex++], done: false } :
                    { value: undefined, done: true };
            }
        };
    }

    var it = makeIterator(['a', 'b']);
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
}


// 2.默认Iterator接口
{
    let arr = ['a', 'b'];
    let iter = arr[Symbol.iterator]();

    console.log('2. => ', iter);
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());
}

// 类 部署 Iterator 接口
{
    class RangeIterator {
        constructor(start, stop){
            this.value = start;
            this.stop = stop;
        }

        [Symbol.iterator](){
            return this;
        }

        next(){
            var value = this.value;
            if (value < this.stop) {
                this.value++;
                return { value: value, done: false };
            }
            return { value: undefined, done: true };
        }
    }

    function range(start, stop){
        return new RangeIterator(start, stop);
    }

    for (var value of range(0, 3)) {
        console.log('类 value => ', value);
    }
}

// 指针结构 部署 Iterator 接口  to do
{
    function Obj(value){
        this.value = value;
        this.next = null;
    }

    Obj.prototype[Symbol.iterator] = function(){
        var iterator = { next: next };

        var current = this;

        function next(){
            if (current) {
                var value = current.value;
                current = current.next;
                return { value: value, done: false };
            } else {
                return { value: undefined, done: true };
            }
        }

        return iterator;
    };

    var one = new Obj(1);
    var two = new Obj(2);
    var three = new Obj(3);

    one.next = two;
    two.next = three;

    for (var i of one) {
        console.log('指针结构 i => ', i)
    }
}

// 为对象添加 Iterator 接口
{
    let obj = {
        data: ['hello', 'world'],
        [Symbol.iterator](){
            const self = this;
            let index = 0;
            return {
                next(){
                    if (index < self.data.length) {
                        return {
                            value: self.data[index++],
                            done: false
                        };
                    } else {
                        return {
                            value: undefined,
                            done: true
                        };
                    }
                }
            };
        }
    };

    for (let v of obj) {
        console.log('为对象添加 Iterator 接口 v => ', v)
    }
}

// 对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，
// 有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口
{
    let iterable = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3,
        [Symbol.iterator]: Array.prototype[Symbol.iterator]
    };

    for (let item of iterable) {
        console.log('类似数组的对象 item => ', item);
    }
}


// 3.调用 Iterator 接口的场合
// (1)解构赋值 Array/Set
{
    let set = new Set().add('a').add('b').add('c');

    let [x, y]=set;

    let [first, ...rest]=set;

    console.log('3.1 => ', x, y, first, rest);
}

// (2)...也会调用默认的 Iterator 接口
// 只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组；
{

}

// (3)yield*  to add
// for...of
// Array.from
// Map(), Set(), WeapMap(), WeakSet()
// Promise.all()
// Promise.race()


// 4. String 的Iterator接口(原生具有)
{
    var someString = 'hi';
    console.log('4. => ', typeof someString[Symbol.iterator]);

    var iterator = someString[Symbol.iterator](); // {}
    console.log(iterator.next(), iterator.next(), iterator.next());
}

// 可以覆盖原生的Symbol.iterator方法
{
    var str = new String('he');
    console.log('4.2 => ', [...str], str);

    str[Symbol.iterator] = function(){
        return {
            next: function(){
                if (this._first) {
                    this._first = false;
                    return {
                        value: 'bye',
                        done: false
                    }
                } else {
                    return {
                        done: true
                    }
                }
            },
            _first: true
        }
    };
    console.log([...str], str);
}


// 5.Symbol.iterator方法的最简单实现
{
    let myIterable = {
        [Symbol.iterator]: function*(){
            yield 1;
            yield 2;
            yield 3;
        }
    };
    console.log('5. => ', myIterable, [...myIterable]);

    let obj = {
        *[Symbol.iterator](){
            yield 'hello';
            yield 'world';
        }
    };
    for (let x of obj) {
        console.log(x);
    }
    console.log('5.2 => ', obj, [...obj]);
}


// 6.return()
// throw() 主要是配合Generator函数使用
{
    function readLinesSync(file){
        return {
            [Symbol.iterator](){
                return {
                    next(){
                        return { done: false };
                    },
                    return(){
                        // file.close();
                        return { done: true };
                    }
                };
            }
        };
    }

    for (let line of readLinesSync('./24.js')) {
        console.log(line);
        break;
    }
}

// 7. for...of
// for...of循环内部调用的是数据结构的Symbol.iterator方法

// Array 默认部署了Symbol.iterator属性
// 可以代替forEach
{
    const arr = ['red', 'green', 'blue'];

    for (let v of arr) {
        console.log('v => ', v);
    }

    const obj = {};
    obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

    for (let v of obj) {
        console.log('v => ', v);
    }

    arr.forEach(function(item, index){
        console.log('item,index => ', item, index)
    });
}

// js for...in循环，只能获得对象的键名，不能直接获取键值；适用于遍历对象
// ES6 for...of循环，调用数据结构的Symbol.iterator方法，遍历数据成员；适用于遍历数组
// 头条考题，二者的区别
{
    var arr = ['a', 'b', 'c'];

    for (let key in arr) {
        console.log('key => ', key);
    }

    for (let value of arr) {
        console.log('value => ', value)
    }
}

// Set / Map
{

}

// for...of 与其他遍历语法的比较
// for循环, 比较麻烦
// forEach, 无法中途跳出循环，不能与break、continue和return配合使用
{

}

