/**
 * Created by yanghuan on 17/7/15.
 */

import React from 'react';
import { render, } from 'react-dom';

// 1
var foo = 'bar';
var baz = { foo, };
console.log(baz);

var o = { // !!!!
    method(){
        return 'method简写; ';
    }
};
var o_ = {
    method: function() {
        return 'method _ es2015; ';
    }
};
var o__ = { // !!!!
    method: () => {
        return 'method简写 _结合箭头函数; ';
    }
};
console.log(o.method(), o_.method(), o__.method());

// CommonJS 模块  to add

// 2 属性名表达式赋值，取值  !!!!!!!!!!!!
let propKey = 'foo';
let obj = { // ES6 允许字面量定义对象时,用表达式作为对象的属性名，在 ES5 中不支持
    [propKey]: true,
    ['a' + 'bc']: 123,
    '_hc.v': '_hc.v',
    ['h' + 'ello'](){
        return 'hello function';
    }
};
console.log('obj', obj, obj[propKey], obj[`abc`], obj.hello());
// 属性名表达式与简洁表示法，不能同时使用，会报错
/*obj={
 [propKey],
 }*/

const keyA = { a: 1 };
const keyB = { b: 2 };
const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
};
console.log('myObject', myObject);

// 3  to add

// 4
console.log("Object.is('true','true')", Object.is('true', 'true'));

console.log("Object.is({},{})", Object.is({}, {}));

console.log("Object.is(-0,0)", Object.is(-0, 0), "  -0===0", -0 === 0);

console.log("Object.is(NaN,NaN)", Object.is(NaN, NaN), "NaN===NaN", NaN === NaN);
// ES5 可以通过下面的代码，部署Object.is   to add

// 5
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2); // 到某个对象
console.log('Object.assign(target,x,y)', target);

var obj2 = { a: 1 };
console.log('Object.assign(obj2)===obj2', Object.assign(obj2) === obj2);

// undefined,null无法转成对象，作为首参数会报错；但是＝》可以作为第二，第三参数的；无法转为对象，跳过
//console.log(Object.assign(undefined));
//console.log(Object.assign(null));
console.log('Object.assign(obj2,undefined)', Object.assign(obj2, undefined), Object.assign(obj2, undefined) === obj2);
console.log('Object.assign(obj2,null)', Object.assign(obj2, null), Object.assign(obj2, null) === obj2);
console.log(Object.assign({}, 3), Object.assign({}, true), Object.assign({}, '33'));


// Object.assign浅拷贝 拷贝的是对象的引用
var obj1 = { a: { b: 1 } };
var obj2 = Object.assign({}, obj1);  // 返回一个新对象
obj1.a.b = 'bb';
console.log('obj2.a.b 浅拷贝', obj2.a.b);

var target = { a: { b: 'c', d: 'e' } };
var source = { a: { b: 'hello' } };
Object.assign(target, source);
console.log('target浅拷贝', target);

// Object.assign用途
// 1.为对象添加属性 to add
// 2.         方法 to add
// 3.克隆对象   要克隆它的继承值 to add
function clone(origin) {
    return Object.assign({}, origin)
}
console.log("clone({a:'clone'})", clone({ a: 'clone' }));

// 4.合并多个对象
var target = { a: 1, b: 2 };
var source1 = { b: 3, c: 4 };
var source2 = { c: 5 };
const merge = (target, ...sources) => Object.assign(target, ...sources);
merge(target, source1, source2);
console.log('merge合并到某个对象', target);

const merge2 = (...sources) => Object.assign({}, ...sources);
console.log('merge2返回一个新对象', merge2(source1, source2));

// 5.为属性指定默认值
// 1)
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html',
    url: { // 属性值要是一个对象 DEFAULTS不会起作用 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        host: 'xx',
        port: 7070
    },
};

function processContent(options) {
    options = Object.assign({}, DEFAULTS, options); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 深拷贝 to add
    console.log(options)
}
processContent({ url: { port: 8080 } });

// to add to add to add============================================


// 10.对象的扩展运算符 ... 只能放在最后
// (1)
const [a, ...b]=[1, 2, 3];
console.log('数组的扩展运算符 解构赋值', a, b);

let { x1, y1, ...z1 } = { x1: 11, y1: 22, a: 33, b: 44 };
console.log('对象的扩展运算符 解构赋值', x1, y1, z1);

//let { x2, y2, ...z2 } = null;       // error
//let { x3, y3, ...z3 } = undefined;  // error

let obj3 = { a: { b: 1 } };
let { ...x4 } = obj3;
console.log(x4);
obj3.a.b = 999;
console.log(x4.a.b);

// (2)
let z2 = { a: 3, b: 4 };
let z3 = { c: 3, d: 4 };
let n = { ...z2 };
console.log(n, Object.assign({}, z2));

let z2z3 = { ...z2, ...z3 };
console.log(z2z3, Object.assign({}, z2, z3));

let xWithOverrides = { ...z2, x: 1, y: 2 };
let xWithOverrides2 = { ...z2, ...{ x: 1, y: 2 } };
let xWithOverrides3 = Object.assign({}, z2, { x: 1, y: 2 });
let x2 = 1, y2 = 2, xWithOverrides4 = { ...z2, x2, y2 }; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
console.log(xWithOverrides, xWithOverrides2, xWithOverrides3, xWithOverrides4);

let z4 = {};
let xWithDefaults = { x: 1, y: 2, ...z4 };
let xWithDefaults2 = Object.assign({}, { x: 1, y: 2 }, z4);
console.log(xWithDefaults, xWithDefaults2);

let emptyObject = { ...null, ...undefined };
console.log(emptyObject);

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
