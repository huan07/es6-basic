/**
 * Created by yangHuan on 17/9/11.
 */

let s = Symbol();
typeof s;
console.log(typeof s);

var s1 = Symbol('foo');
var s2 = Symbol('bar');
console.log(s1, s2, typeof s1, typeof s2, s1.toString(), s2.toString());

// Symbol的参数是一个对象，to add

console.log(`Symbol()===Symbol()=>${Symbol() === Symbol()}`, `Symbol('foo')===Symbol('foo')=>${Symbol('foo') === Symbol('foo')}`);

var sym = Symbol('My symbol');
//console.log('Symbol与其他类型值运算会报错'+sym,`Symbol与其他类型值运算会报错${sym}`);

// Symbol可以显式转换为String，可以转换为Boolean,不能为Number
var sym = Symbol('My symbol');
console.log(String(sym), sym.toString(), Boolean(sym));
if (sym) {
    console.log('Symbol隐式转换为Boolean');
}

// 1.2
var mySymbol = Symbol(); // 属性名必须放在[]内

var a1 = {};
a1[mySymbol] = 'hello1'; // 不能用点运算符

var a2 = {
    [mySymbol]: 'hello2',
}

var a3 = {};
Object.defineProperty(a3, mySymbol, { value: 'hello3' });

console.log(a1, a2, a3);

var log = {};
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn'),
};
console.log(log.levels);

// to add another examples

// 3.风格良好的代码：消除魔术字符串 解除常量在代码中的强耦合，利于维护
// best
var shapeType = {  // better code style
    triangle: 'Triangle'
};

function getArea(shape, options) {
    var area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}

console.log('消除魔术字符串getArea', getArea(shapeType.triangle, { width: 10, height: 10 }));

// 4.
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'hello';
obj[b] = 'world';

var objectSymbols = Object.getOwnPropertySymbols(obj);
console.log('objectSymbols', objectSymbols);

// 4.2 example
var obj = { 5: 5, };
var foo = Symbol('foo');
Object.defineProperty(obj, foo, {
    value: 'foobar',
});
for (var i in obj) {
    console.log(i);
}
console.log('Object.getOwnPropertyNames(obj)', Object.getOwnPropertyNames(obj), 'Object.getOwnPropertySymbols(obj)', Object.getOwnPropertySymbols(obj));
console.log('Reflect.ownKeys(obj)', Reflect.ownKeys(obj));
// example to add

// 5. Symbol.for('x')登记机制，而Symbol('x')没有
console.log(`Symbol.for('foo')===Symbol.for('foo')`, Symbol.for('foo') === Symbol.for('foo'));
console.log(`Symbol.for('foo')===Symbol('foo')`, Symbol.for('foo') === Symbol('foo'));

// Symbol.keyFor()返回一个已登记的Symbol类型的key
var s1 = Symbol.for('foo2');
var s2 = Symbol('foo2');
console.log(Symbol.keyFor(s1), Symbol.keyFor(s2));

var iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

console.log(`iframe.contentWindow.Symbol.for('foo')===Symbol.for('foo')`, iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo'))

// 6. to add
// 7. to add










