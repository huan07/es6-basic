/**
 * Created by yanghuan on 17/7/15.
 */

import React from 'react';
import { render, } from 'react-dom';

// 1.属性的简洁表示法
{
    const foo = 'bar';
    const baz = { foo }; // 属性名为变量名，属性值为变量值
    console.log(baz);

    const o = { // !!!!
        method(){
            return 'method简写; ';
        }
    };
    const o_ = {
        method: function(){
            return 'method _es2015; ';
        }
    };
    const o__ = { // !!!!
        method: () =>{
            return 'method简写 _结合箭头函数; ';
        }
    };
    console.log(o.method(), o_.method(), o__.method());
}

// CommonJS 模块  to add

// 2.属性名表达式   字面量定义对象 属性名表达式赋值，取值
{
    const obj = {};
    obj.foo = 'foo';
    obj['ba' + 'r'] = 'bar';
    console.log('属性名表达式 => ', obj);
}

{
    let propKey = 'foo';
    let obj = {
        [propKey]: true,
        ['a' + 'bc']: 123, /* es6 可以这样用*/
        '_hc.v': '_hc.v',
        ['h' + 'ello'](){
            return 'hi';
        }
    };
    console.log('字面量定义对象 => ', obj, obj[propKey], obj['foo'], obj[`abc`], obj.hello());

    // 属性名表达式与简洁表示法，不能同时使用，会报错
    /*obj = {
     [propKey]
     }*/
}

// js会隐式的将key转换为字符串类型 String(xx)
{
    const keyA = { a: 1 };
    const keyB = { b: 2 };
    const myObject = {
        [keyA]: 'valueA',
        [keyB]: 'valueB'
    };
    console.log('myObject => ', myObject);
}

// 3  to add

// 4.Object.is 同值相等，和===基本一致，不同之处如下
{
    console.log(+0 === -0, NaN === NaN);
    console.log('Object.is', Object.is(+0, -0), Object.is(NaN, NaN));
}
{
    console.log(Object.is({}, {}), {} === {});
}
// ES5部署Object.is  to add


// 5.Object.assign 只拷贝源对象的自身属性，
// 不拷贝继承属性，
// 不拷贝不可枚举属性
{
    const target = { a: 1, b: 1 };

    const source1 = { b: 2, c: 2 };
    const source2 = { c: 3 };

    const xx = Object.assign(target, source1, source2); // 拷贝到目标对象，返回的是目标对象的值！！！！
    console.log('返回的是目标对象！！！！', xx);
    console.log('target => ', target);
}

// 只有一个参数，直接返回这个参数
{
    const obj = { a: 1 };
    console.log('Object.assign(obj)===obj', Object.assign(obj) === obj);

    console.log('参数不是对象，会被转换为对象', Object.assign(2));

    // undefined,null无法转成对象，作为首参数会报错；但是可以作为第二，第三参数的；无法转为对象，跳过
    //console.log(Object.assign(undefined)); error
    //console.log(Object.assign(null)); error
    console.log(Object.assign(obj, undefined), Object.assign(obj, undefined) === obj);
    console.log(Object.assign(obj, null), Object.assign(obj, null) === obj);

    console.log('源对象无法转为对象，不会对目标对象有效果', Object.assign({}, 3), Object.assign({}, true));
    console.log('字符串以数组的形式 拷贝到目标对象', Object.assign({}, '36'));
}

// Object.assign浅拷贝 目标对象 拷贝的是 源对象的引用
{
    const obj1 = { a: { b: 1 } };
    const obj2 = Object.assign({}, obj1);
    obj1.a.b = 'bb';
    console.log('浅拷贝', obj2.a.b);
}

// 同名属性整体替换
{
    const target = { a: { b: 'c', d: 'e' } };
    const source = { a: { b: 'hello' } };
    Object.assign(target, source);
    console.log(target);
}

// 数组的处理
{
    const xx = Object.assign([1, 2, 3], [4, 5]);
    console.log(xx);
}

// 取值函数的处理 to add


// Object.assign用途
// 1.为对象添加属性 to add
// 2.         方法 to add
// 3.克隆对象   要克隆它的继承值 to add
function clone(origin){
    return Object.assign({}, origin)
}
console.log("clone", clone({ a: 'clone' }));

// 4.合并多个对象
var target = { a: 1, b: 2 };
var source1 = { b: 3, c: 4 };
var source2 = { c: 5 };
const merge = (target, ...sources) => Object.assign(target, ...sources);
console.log('merge合并到某个对象', merge(target, source1, source2));

const merge2 = (...sources) => Object.assign({}, ...sources);
console.log('merge2返回一个新对象', merge2(source1, source2));

// 5.为属性指定默认值
// 1)
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html',
    url: { // 属性值要是一个对象 DEFAULTS可能不会起作用  浅拷贝 整体替换
        host: 'xx',
        port: 7070
    },
};

function processContent(options){
    options = Object.assign({}, DEFAULTS, options);
    console.log(options)
}
processContent({ url: { port: 8080 } });


// 6.to add
// 7.to add
// 8.to add
// 9.to add


// 10.Object.keys，Object.values, Object.entries
{
    var obj = { foo: 'foo', bar: 'bar' };
    var keys = Object.keys(obj);
    console.log('Object.keys => ', keys);


    let { keys, values, entries } = Object; // 解构出方法
    let obj = { a: 1, b: 2, c: 3 };

    for (let key of keys(obj)) {
        console.log('key => ', key);
    }

    for (let value of values(obj)) {
        console.log('value => ', value);
    }

    for (let [key, value] of entries(obj)) {
        console.log(key, value);
    }
}


// 11.对象的扩展运算符  解构赋值 ... 只能放在最后，否则会报错
// (1)
const [a, ...b]=[1, 2, 3];
console.log('数组的扩展运算符 解构赋值', a, b);

{
    let { x, y, ...z } = { x: 11, y: 22, a: 33, b: 44 };
    console.log('对象的扩展运算符 解构赋值', x, y, z);
}

// 等号右边无法转换为对象，会报错
{
    //let { x, y, ...z } = null;
    //let { x2, y2, ...z2 } = undefined;
}

// 解构赋值的拷贝是浅拷贝 引用类型值拷贝的是 值的引用 ，而不是值的副本
{
    let obj = { a: { b: 1 } };
    let { ...x } = obj;
    console.log(x);
    obj.a.b = 999;
    console.log(x.a.b);
}

// 解构赋值 不能复制继承原型对象的属性 to add

// (2)拷贝对象
{
    let z = { a: 3, b: 4 };
    let n = { ...z };
    console.log(n, Object.assign({}, z));

    let z2z3 = { ...z, ...{ c: 'c' } };
    console.log('合并2个对象', z2z3, Object.assign({}, z, { c: 'c' }));
}

// 扩展运算符内部的同名属性会被覆盖掉
{
    let z = { a: 3, b: 4 };
    let aWithOverrides = { ...z, x: 1, y: 2 };
    let aWithOverrides2 = { ...z, ...{ x: 1, y: 2 } };
    let aWithOverrides3 = Object.assign({}, z, { x: 1, y: 2 });

    let x = 1, y = 2, aWithOverrides4 = { ...z, x, y };
    console.log(aWithOverrides, aWithOverrides2, aWithOverrides3, aWithOverrides4);
}

// 设置新对象的默认属性
{
    let z = { a: 3, b: 4 };
    let aWithOverrides = { x: 1, y: 2, ...z };
    console.log(aWithOverrides);
}

// 拷贝对象原型的属性 to add

// 空对象没有任何效果, null, undefined会被忽略
{
    let z = {};
    let aWithDefaults = { x: 1, y: 2, ...z };
    let aWithDefaults2 = Object.assign({}, { x: 1, y: 2 }, z);
    console.log(aWithDefaults, aWithDefaults2);

    let emptyObject = { ...null, ...undefined };
    console.log(emptyObject);
}


// to add


// 11.
const message = {
    body: {
        user: {
            firstName: 'firstName',
        }
    }
};
// const firstName = message?.body?.user?.firstName; error
const firstName_ = (message && message.body && message.body.user && message.body.user.firstName) || 'default';
console.log(firstName_);
