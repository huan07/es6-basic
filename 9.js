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

    const o2 = { // !!!!
        method: () =>{
            return 'method简写 _结合箭头函数; ';
        }
    };

    const o_ = {
        method: function(){
            return 'method _es2015; ';
        }
    };
    console.log(o.method(), o2.method(), o_.method());
}

// CommonJS 模块  to add

// 2.属性名表达式
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
    console.log('字面量定义对象，允许属性名表达式 => ', obj, obj[propKey], obj['foo'], obj[`abc`], obj.hello());

    // 属性名表达式与简洁表示法，不能同时使用，会报错
    /*obj = {
     [propKey]
     }*/
}


// 3  to add


// 4.Object.is 同值相等，和 === 基本一致，不同之处如下
{
    console.log(+0 === -0, NaN === NaN);
    console.log('Object.is => ', Object.is(+0, -0), Object.is(NaN, NaN));
}
{
    console.log(Object.is({}, {}), {} === {});

    const obj = {};
    const obj2 = obj;
    console.log('引用类型值比较的是引用地址 => ', Object.is(obj, obj2));
}
// ES5部署Object.is  to add


// 5.Object.assign 只拷贝源对象的自身属性，
//  继承、不可枚举属性 不拷贝
{
    const target = { a: 1, b: 1 };

    const source1 = { b: 2, c: 2 };
    const source2 = { c: 3 };

    const xx = Object.assign(target, source1, source2); // 拷贝到目标对象，返回的是目标对象的值！！
    console.log('target => ', xx, target, xx === target);
}

// 只有一个参数，直接返回这个参数
// undefined,null无法转成对象，作为首参数会报错；但是可以作为第二，第三参数的；无法转为对象，跳过
{
    const obj = { a: 1 };
    console.log(Object.assign(obj), Object.assign(obj) === obj);

    console.log('参数不是对象，会被转换为对象', Object.assign(2));

    //console.log(Object.assign(undefined)); error
    //console.log(Object.assign(null)); error

    // 源对象无法转为对象，不会对目标对象有效果，直接跳过
    // 字符串以数组的形式 拷贝到目标对象
    console.log(Object.assign(obj, '99', 3, true, undefined, null));
}

// Object.assign浅拷贝 目标对象 拷贝的是 源对象的引用
{
    const obj1 = { a: { b: 1 } };
    const obj2 = Object.assign({}, obj1);
    obj1.a.b = 'bb';
    console.log('浅拷贝 => ', obj1.a.b, obj2.a.b);
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
// 3.克隆对象  看不到区别呢？
{
    function clone(origin){ // 克隆对象自身的值
        return Object.assign({}, origin)
    }

    const obj = { a: 'clone' };
    console.log("clone => ", clone(obj));
}
{
    function clone2(origin){ // 克隆对象自身值 + 继承值
        const originProp = Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originProp), origin);
    }

    const obj = { a: 'clone' };
    console.log("clone => ", clone2(obj));
}

// 4.合并多个对象
{
    var target = { a: 1, b: 2 };
    var source1 = { b: 3, c: 4 };
    var source2 = { c: 5 };
    const merge = (target, ...sources) => Object.assign(target, ...sources);
    console.log('merge合并到某个对象', merge(target, source1, source2));

    const merge2 = (...sources) => Object.assign({}, ...sources);
    console.log('merge2返回一个新对象', merge2(source1, source2));
}

// 5.为属性指定默认值
// 1)
{
    const DEFAULTS = {
        logLevel: 0,
        outputFormat: 'html',
        url: { // 属性值要是一个对象 DEFAULTS可能不会起作用  浅拷贝 整体替换
            host: 'xx',
            port: 7070
        },
    };

    function processContent(options){
        console.log('options => ', options);
        options = Object.assign({}, DEFAULTS, options); // better, 没有必要再声明一个变量
        console.log('options => ', options);
    }

    processContent({ url: { port: 8080 } });
}


// 6. 结合10.js
{

}

// 7.Object.getOwnPropertyDescriptors
{
    const obj = {
        foo: 123,
        get bar(){
            return 'abc';
        }
    };

    const descriptors = Object.getOwnPropertyDescriptors(obj);
    console.log('getOwnPropertyDescriptors => ', descriptors);
}

// 解决Object.assign()无法正确拷贝get属性和set属性的问题。// to do
{
    const source = {
        set foo(value){
            console.log(value);
        }
    };

    const target = {};
    Object.assign(target, source);

    console.log('无法正确拷贝get属性和set属性 => ', Object.getOwnPropertyDescriptor(target, 'foo'));
    console.log('无法正确拷贝get属性和set属性 => ', Object.getOwnPropertyDescriptors(target));
}

// Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，
// 就可以实现正确拷贝
{
    const source = {
        set foo(value){
            console.log(value);
        }
    };

    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));

    console.log('实现正确拷贝 => ', Object.getOwnPropertyDescriptor(target2, 'foo'));
    console.log('实现正确拷贝 => ', Object.getOwnPropertyDescriptors(target2));
}

// to add 有点晕


// 8. __proto__
// Object.setPrototypeOf(object,prototype) // 将prototype设置为object的原型对象
// Object.getPrototypeOf(object) // 读取object的原型对象
// Object.create
{
    const xx = function(obj, proto){
        obj.__proto__ = proto;
        return obj;
    };
}

{
    const o = Object.setPrototypeOf({}, null);
    console.log('o => ', o);
}
{
    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);

    proto.y = 20;
    proto.z = 40;

    console.log('obj, proto => ', obj, proto);
}


// 9.
// this => 函数所在的当前对象！！
// super => 当前对象的原型对象，只能用在对象方法的简写法中，否则会报错

{
    const proto = {
        foo: 'hello'
    };

    const obj = {
        foo: 'world',
        find(){ // 另外两种对象的函数内调用会报错
            return super.foo;
        }
    };

    Object.setPrototypeOf(obj, proto);
    console.log('9. => ', obj);
    console.log('super属性 => ', obj.find());
}

// example
{
    const proto = {
        foo: 'hello',
        find(){
            console.log(this, this.foo);
        },
    };

    const obj = {
        foo: 'world',
        find(){
            super.find();
        },
    };

    Object.setPrototypeOf(obj, proto);
    console.log('9.2 => ', obj);
    obj.find();
}


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


// 11.对象的...

// 1)解构赋值
// 等号右边要求是对象，undefined, null, 无法转换为对象，error
{
    let { x, y, ...z }={ x: 1, y: 2, a: 3, b: 4 };
    console.log(x, y, z);
}
{
    // let { ...x, y, ...z }={ x: 1, y: 2, a: 3, b: 4 }; // error ...要放最后位置
    // console.log(x, y, z);
}

// ...解构赋值，不能复制继承自原型对象的属性 ！！
{
    let o1 = { a: 1 };
    let o2 = { b: 2 };
    o2.__proto__ = o1;

    let { ...o3 }=o2;
    console.log('...不能复制继承自原型对象的属性o3 => ', o3);
}

// 一般变量的解构赋值，可以复制继承自原型对象的属性 ！！
{
    const o = Object.create({ x: 1, y: 2 });
    o.z = 3;
    console.log('Object.create创建对象 o => ', o);

    let { x, ...newObj }=o; // newObj只复制o的自身属性（...运算符复制），x是一般变量的解构赋值，
    console.log('x, newObj => ', x, newObj);

    let { y, z }=newObj;
    console.log('y, z => ', y, z);


    // {...{y,z}} =o; // ...后面要直接跟上变量名！！
}

// (2)拷贝对象：实例属性
{
    let z = { a: 3, b: 4 };
    let n = { ...z };
    console.log(n, Object.assign({}, z));
}
// 想完整克隆一个对象，还拷贝对象原型的属性 to add
{

}

{
    let z = { a: 3, b: 4 };
    let zc = { ...z, ...{ c: 'c' } };
    console.log('...合并2个对象 => ', zc, Object.assign({}, z, { c: 'c' }));
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

// 空对象没有任何效果, null, undefined会被忽略
{
    let z = {};
    let aWithDefaults = { x: 1, y: 2, ...z };
    let aWithDefaults2 = Object.assign({}, { x: 1, y: 2 }, z);
    console.log(aWithDefaults, aWithDefaults2);

    let emptyObject = { ...null, ...undefined };
    console.log('emptyObject => ', emptyObject);
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
