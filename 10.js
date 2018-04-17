/**
 * Created by yangHuan on 17/10/17.
 */
// 1. 对象的key有两种：字符串，Symbol类型
let s1 = Symbol();
console.log(s1, typeof s1, Object.prototype.toString.call(s1));

let s2 = Symbol('foo');
console.log(s2);

let s3 = Symbol({
    toString(){
        return '调用对象toString方法的返回值';
    }
});
console.log(s3);

// Symbol数据类型的值是不想等，不能与其他类型的值运算
const sym = Symbol('My symbol');
console.log(String(sym), sym.toString());
console.log(Boolean(sym), sym, !sym);
// console.log(Number(sym),sym+1); error

// 2.！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
let symbolAttr = Symbol();
let obj = {};
obj[symbolAttr] = 'hello';   // 不能用点运算符  Symbol 值必须放在方括号内

let obj2 = {
    [symbolAttr]: 'baidu',
};

let obj3 = {};
Object.defineProperty(obj3, symbolAttr, { value: 'love you' });

console.log(obj[symbolAttr], obj2[symbolAttr], obj3[symbolAttr]);

// 3. 消除魔术字符串！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
const shapeType = {
    triangle: Symbol(),
    rectangle: Symbol(),
};
function getArea(shape, optioms) {
    let area = 0;
    switch(shape) {
        case shapeType.triangle:
            area = .5 * optioms.width * optioms.height;
            break;
        case shapeType.rectangle:
            area = optioms.width * optioms.height;
            break;
    }
    return area;
}
const triangleArea = getArea(shapeType.triangle, { width: 20, height: 10 });
const rectangleArea = getArea(shapeType.rectangle, { width: 20, height: 10 });
console.log(triangleArea, rectangleArea);


// 获取对象的所有 Symbol 属性名: Object.getOwnPropertySymbols方法 不会被其他方法返回
const testObjKey = {
    true: 1,
    1: 2,
    [Symbol(true)]: 11,
    [Symbol(1)]: 22,
};
console.log(Object.getOwnPropertySymbols(testObjKey));

for(let i in testObjKey) {
    console.log(i);
}
console.log(Object.getOwnPropertyNames(testObjKey), Object.keys(testObjKey), JSON.stringify(testObjKey));

console.log(Reflect.ownKeys(testObjKey)); // all attr
// add example


// 5.
let ss1 = Symbol.for('foo'); // 被登记在全局环境供搜索
let ss2 = Symbol.for('foo');
console.log(ss1 === ss2);

let ss3 = Symbol('FOO'); // 每次都生成一个新的Symbol值
let ss4 = Symbol('FOO');
console.log(ss3 === ss4);

console.log(Symbol.keyFor(ss1), Symbol.keyFor(ss3));
// to add example

// 6. 模块的Singleton模式
// to add example


// 7.内置的Symbol值
// to learn