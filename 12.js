/**
 * Created by yangHuan on 17/10/20.
 */

// var proxy = new Proxy(target,handler);

var proxy = new Proxy({}, {
    get: function(target, property) {
        return 35;
    }
});
console.log(proxy, proxy.time, proxy.name);

var target = {};
var handler = {}; // 直接通向原对象
var proxy = new Proxy(target, handler);
proxy.a = 'b';
console.log(target.a);

//
var object = { proxy: new Proxy(target, handler) };

//
var proxy2 = new Proxy({}, {
    get: function(target, property) {
        return 3535;
    }
});
let obj2 = Object.create(proxy2);
console.log(obj2.time);
// to add example


// 2.
// get()
var person = {
    name: '张三',
};
var proxy = new Proxy(person, {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new Error('property not in target');
        }
    }
});
// console.log(proxy.age);
console.log(proxy.name);

var proto = new Proxy({}, {
    get(target, propertyKey, receiver){
        console.log('get ' + propertyKey);
        return target[propertyKey];
    }
});
var obj = Object.create(proto); // get方法继承
obj.yy;

//
function createArray(...elements) {
    let handler = {
        get(target, propertyKey, receiver){
            let index = Number(propertyKey);
            if (index < 0) {
                propertyKey = String(target.length + index);
            }
            return Reflect.get(target, propertyKey, receiver);// ？？？？？？？？？？？？？？？？？？？？？
        }
    };

    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
console.log(arr[-2]);

// to add example


// set()
let validator = {
    get: function(obj, prop) {
        if (prop in obj) {
            return obj[prop];
        } else {
            throw new Error('property not in target');
        }
    },
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new Error('age value is not integer');
            }
            if (value > 200) {
                throw new Error('value>200 is invalid');
            }
        }
        obj[prop] = value;
    },
};
let person2 = new Proxy({}, validator);
//person2.age = 100; // to learn  why error？？？？？？？？？
//console.log('person2.age    ,', person2.age);

let handler3 = {
    get(target, key){
        invariant(key, 'get');
        return target[key];
    },
    set(target, key, value){
        invariant(key, 'set');
        target[key] = value;
        return true;
    }
};
function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
let target3 = {};
let proxy3 = new Proxy(target3, handler3);
//proxy3._prop;
//proxy3.prop = 'c';？？？？？？？？？？？？？？？
//console.log(proxy3);

let handler4 = {
    set: function(obj, prop, value, receiver) {
        obj[prop] = receiver;
    }
};
let proxy4 = new Proxy({}, handler4);
//proxy4.foo = 'bar';？？？？？？？？？？？？
//console.log(proxy4.foo === proxy4);

// apply()
var applyHandler = {
    apply(target, ctx, args){
        return Reflect.apply(...arguments);
    }
};

// example
var target = function() {
    return 'i am the tartget';
};
var handler = {
    apply() {
        return 'i am the proxy';
    },
};
var p = new Proxy(target, handler);
console.log('apply example', p());

var sum = function(left, right) {
    return left + right;
};
var twice = {
    apply(target, ctx, args){
        return Reflect.apply(...arguments) * 2;
    }
};
var p2 = new Proxy(sum, twice);
console.log('apply proxy,      ', p2(1, 3), p2.call(null, 5, 6), p2.call(null, 7, 8));
console.log(Reflect.apply(p2, null, [9, 10]));


// has()  对HasProperty拦截，对in 操作法生效
var target = {
    _prop: 'foo',
    prop: 'a big foo you',
};
var hasHandler = {
    has(target, key){
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    },
};
var p3 = new Proxy(target, hasHandler);
console.log('has proxy,       ', '_prop' in p3, 'prop' in p3);

// 原对象不可配置或者禁止扩展，这时has拦截会报错
var target4 = { a: 10 };
Object.preventExtensions(target4);
var p4 = new Proxy(target4, {
    has(){
        return false;
    },
});
// console.log('a' in p4); error

// has方法不对 HasOwnProperty拦截，  对for in 不生效
const stu1 = {
    name: '张三',
    score: 59,
};
const stu2 = {
    name: '李四',
    score: 89,
};
var hasHandler = {
    has(target, key){
        if (key === 'score' && target[key] < 60) {
            console.log(`${target.name}不及格`);
            return false;
        }
        return key in target;
    }
};
const oproxy1 = new Proxy(stu1, hasHandler);
const oproxy2 = new Proxy(stu2, hasHandler);
console.log('score' in oproxy1, 'score' in oproxy2);

for(let stu1Key in oproxy1) {
    console.log(stu1Key, oproxy1[stu1Key]);
}
for(let stu2Key in oproxy2) {
    console.log(stu2Key, oproxy2[stu2Key]);  // 都会打印出来 has在这里不管用的
}

// construct() 拦截new命令
var handler = {
    constructor(target, args, newTarget){
        return new target(...args);
    },
};
var p = new Proxy(function() {
}, {
    constructor: function(target, args) {
        console.log('called: ' + args.join(', '));
        return { // 返回的必须是一个对象，否则会报错
            value: args[0] * 10,
        };
    }
});
(new p(1)).value;  // 为啥没有打印出来呢？

// deleteProperty() 拦截delete操作，
var handler = {
    deleteProperty(target, key){
        invariant(key, 'delete');
        return true;
    }
};
function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
var target = { _prop: 'foo', prop: 'foo you' };
var proxy = new Proxy(target, handler);
delete proxy.prop;
console.log(proxy);

// defineProperty() 拦截 Object.defineProperty操作
var handler = {
    defineProperty(target, key, descriptor){
        return false;
    }
};
var target = {};
var proxy = new Proxy(target, handler);
// proxy.foo='bar'; 会报错的


// getOwnPropertyDescriptor() 拦截Object.getOwnPropertyDescriptor
var handler = {
    getOwnPropertyDescriptor(target, key){
        if (key[0] === '_') {
            return;
        }
        return Object.getOwnPropertyDescriptor(target, key);
    }
};
var target = { _foo: 'foo', baz: 'baz' };
var proxy = new Proxy(target, handler);
console.log(
    Object.getOwnPropertyDescriptor(proxy, 'baz'),
    Object.getOwnPropertyDescriptor(proxy, '_foo'),
    Object.getOwnPropertyDescriptor(proxy, 'wat')
);


// getPrototypeOf 拦截获取对象原型
var proto = {};
var proxy = new Proxy({}, {
    getPrototypeOf(target){
        return proto;
    }
});
console.log(
    Object.getPrototypeOf(proxy) === proto
);

// isExtensible 拦截Object.isExtensible
var proxy = new Proxy({}, {
    isExtensible(target){
        console.log('called');
        return true; // 返回 false 调用时会报错
    }
});
Object.isExtensible(proxy);
console.log(
    '强限制,    ',
    Object.isExtensible(proxy) === Object.isExtensible({})
);

// ownKeys 拦截对象自身属性的读取；Object.getOwnPropertyNames()
var handler = {
    ownKeys(target){
        return ['a', 'b'];
    }
};
var target = {
    a: 1,
    b: 2,
    c: 3,
};
var proxy = new Proxy(target, handler);
console.log(
    Object.keys(proxy)
);

// example 2
var handler = {
    ownKeys(target){
        return Reflect.ownKeys(target).filter((key) => key[0] !== '_');
    }
};
var target = {
    _foo: 'foo',
    _foo2: 'foo2',
    _foo3: 'foo3',
    _foo4: 'foo4',
    prop: 'prop',
    prop2: 'prop2',
    prop3: 'prop3',
};
var proxy = new Proxy(target, handler);
for(let key of Object.keys(proxy)) {
    console.log(target[key]);
}

// example 3 Object.keys 有三类属性会被自动过滤
var handler = {
    ownKeys(target){
        return ['a', 'd', Symbol.for('secret'), 'key'];
    }
};
var target = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.for('secret')]: 4,
};
Object.defineProperty(target, 'key', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 'static'
});
var proxy = new Proxy(target, handler);
console.log(Object.keys(proxy));

var proxy = new Proxy({}, {
    ownKeys(target){
        return ['a', 'b', 'c']; // 返回的数组成员，只能是字符串或 Symbol 值；其他类型会报错
    }
});
console.log(
    Object.getOwnPropertyNames(proxy)
);

// example 4
// 'a'是不可配置的属性，必须被返回，否则会报错
var obj = {};
Object.defineProperty(obj, 'a', {
    configurable: false,
    enumerable: true,
    value: 10,
});
var proxy = new Proxy(obj, {
    ownKeys(target){
        return ['b', 'a'];
    }
});
console.log(
    Object.getOwnPropertyNames(proxy)
);

// example 4
// 目标对象是不可扩展的，ownKeys方法返回的数组之中，必须包含原对象的所有属性，不能多不能少
var obj = {
    a: 1,
};
Object.preventExtensions(obj);
var proxy = new Proxy(obj, {
    ownKeys(target){
        return ['a'];
    }
});
console.log(
    Object.getOwnPropertyNames(proxy)
);

// preventExtensions() 拦截Object.preventExtensions
// 只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错
var proxy = new Proxy({}, {
    preventExtensions(target){
        return false;
    }
});
/*console.log(
 Object.preventExtensions(proxy)   error
 )*/

// 解决上述报错的方式
var proxy = new Proxy({}, {
    preventExtensions(target){
        console.log('called');
        Object.preventExtensions(target);
        return true;
    }
});
console.log(
    Object.preventExtensions(proxy)
)

// setPrototypeOf 拦截Object.setPrototypeOf
// 目标对象不可扩展，setPrototypeOf方法不得改变目标对象的原型
var handler = {
    setPrototypeOf(target, proto){
        throw new Error('changing the prototype is forbidden');
    }
};
var proto = {};
var target = function() {

};
var proxy = new Proxy(target, handler);
// Object.setPrototypeOf(proxy,proto);


// 3.Proxy.revocable返回一个可取消的Proxy实例
// Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问
var handler = {};
var target = {};

var { proxy, revoke } = Proxy.revocable(target, handler);
proxy.foo = 123;
console.log(proxy);

// revoke(); console.log(proxy.foo); 取消Proxy实例


// 4.this Proxy代理的情况下，目标对象内部this指向Proxy代理
var handler = {};
var target = {
    m(){
        return this === proxy;
    }
};
var proxy = new Proxy(target, handler);
console.log(
    'Proxy代理this问题    ',
    target.m(),
    proxy.m()
);
// to add example


// 5.











