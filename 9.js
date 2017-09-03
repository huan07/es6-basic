/**
 * Created by yanghuan on 17/7/15.
 */

import React from 'react';
import { render, } from 'react-dom';

// 1.1
var foo = 'bar';
var baz = { foo, };
console.log('baz', baz);

// 1.2
function f(x, y) {
    return { x, y };
}
console.log('f(1,2)', f(1, 2));

// 1.3
var o = {
    method(){
        return 'method简写';
    }
};
console.log('o.method()', o.method());
// to add

// 2.1
let propKey = 'foo';
let obj = { // ES6 允许字面量定义对象时,用表达式作为对象的属性名
    [propKey]: true,
    ['a' + 'bc']: 123,
    ['h' + 'ello'](){
        return 'hello function';
    }
}
console.log('obj', obj, obj.hello());
// 属性名表达式与简洁表示法，不能同时使用，会报错

// 2.2
const keyA = { a: 1 };
const keyB = { b: 2 };

const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
};
console.log('myObject', myObject);

// 3.1  to add

// 4.1
console.log("Object.is('true','true')", Object.is('true', 'true'));

console.log("Object.is({},{})", Object.is({}, {}));

console.log("Object.is(-0,0)", Object.is(-0, 0), "  -0===0", -0 === 0);

console.log("Object.is(NaN,NaN)", Object.is(NaN, NaN), "NaN===NaN", NaN === NaN);
// ES5 可以通过下面的代码，部署Object.is   to add

// 5.1
var target = { a: 1, b: 1 };
var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
console.log('target', target);

// 5.2
var obj2 = { a: 1 };
console.log('Object.assign(obj2)===obj2', Object.assign(obj2) === obj2);
// undefined,null无法转成对象，作为参数会报错；但是＝》可以作为第二，第三参数的；
//console.log(Object.assign(undefined));
//console.log(Object.assign(null));

console.log('Object.assign(obj2,undefined)', Object.assign(obj2, undefined));
console.log('Object.assign(obj2,null)', Object.assign(obj2, null));
// to see 字符串作为非首参数的情况 to add

// 5.3

// Object.assign浅拷贝
var obj1 = { a: { b: 1 } };
var obj2 = Object.assign({}, obj1);
obj1.a.b = 'bb';
console.log('obj2.a.b 浅拷贝', obj2.a.b);

var target = { a: { b: 'c', d: 'e' } };
var source = { a: { b: 'hello' } };
Object.assign(target, source);
console.log('target浅拷贝', target);

// Object.assign用途
// 1.为对象添加属性 to add
// 2.         方法 to add
// 3.克隆对象 要克隆它的继承值 to add
function clone(origin) {
    return Object.assign({}, origin)
}
console.log("clone({a:'clone'})", clone({ a: 'clone' }));
// 4.合并多个对象
const merge = (target2, ...sources) => Object.assign(target2, ...sources);
const target2 = { a: 1, b: 2 };
const sources1 = { b: 3, c: 4 };
const sources2 = { c: 5 };
merge(target2, sources1, sources2);
console.log('target2 合并到某个对象', target2);


const merge2 = (...sources) => Object.assign({}, ...sources);
console.log('merge2({a:1},{b:2}) 返回一个新对象', merge2({ a: 11 }, { b: 22 }));

// 5.为属性指定默认值
// 1)
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html',
    url: { // 属性值要是一个对象 DEFAULTS不会起作用
        host: 'xx',
        port: 7070
    },
};

function processContent(options) {
    options = Object.assign({}, DEFAULTS, options);
    console.log(options)
}
processContent({ url: { port: 8080 } });

// to add to add to add============================================
// 10.对象的扩展运算符 ...
const [a, ...b]=[1, 2, 3];
console.log('数组的扩展运算符 解构赋值', a, b);

/*let { x1, y1, ...z1 }={ x1: 11, y1: 22, a: 33, b: 44 };  // why ???????????????
 console.log('对象的扩展运算符 解构赋值', x1, y1, z1);*/


/*let z ={a:1,b:2};
 let n ={...z};
 console.log('{...z}',n);*/


// to add to add to add============================================
// null 传导运算符
const xxx = {
    a: {
        b: {
            c: 'cc',
        }
    }
};
const cAttribute = xxx ?
.
a ?
.
b ?
.
c || 'cc22';


render(
    <div>
        {'999999'}
    </div>,
    document.getElementById('app')
);
