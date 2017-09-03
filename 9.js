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
// ES5 可以通过下面的代码，部署Object.is to add


render(
    <div>
        {'999999'}
    </div>,
    document.getElementById('app')
);
