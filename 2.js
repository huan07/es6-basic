/**
 * Created by yangHuan on 17/9/20.
 */

// 1. let,const变量只在代码块内有效 {}就是一个代码块
{
    let a = 10;
    var b = 1;
}

//console.log(a); // error 没有被定义
console.log(b);

// example 1
for(let i = 0; i < 10; i++) {
}
// console.log(i); // error 没有被定义  ！！！！！！！！！！！！！

for(var i2 = 0; i2 < 10; i2++) {
}
console.log(i2);

// example 2
var a3 = [];
for(var i3 = 0; i3 < 3; i3++) {
    a3[i3] = function() {
        console.log(i3);
    };
}
a3[0]();
a3[2]();

var a4 = [];
for(let i4 = 0; i4 < 3; i4++) {
    a4[i4] = function() {
        console.log(i4);
    };
}
a4[0]();
a4[2]();

// example 3
var blockTestLet1 = () => {
    let ll = 'blockTestLet1';
    return ll;
};
var blockTestLet2 = () => {
    let ll = 'blockTestLet2';
    return ll;
};
var blockTestConst1 = () => {
    const ll = 'blockTestConst1';
    return ll;
};
var blockTestConst2 = () => {
    const ll = 'blockTestConst2';
    return ll;
};
console.log('block {} TestLetConst=>', blockTestLet1(), blockTestLet2(), blockTestConst1(), blockTestConst2());

// for 特别之处：父作用域，循环体自作用域
/*for (let i5 = 0; i5 < 3; i5++) { // 有坑 无数次的打印
 let i5 = '1';
 console.log(i5);  // ??
 }*/


// let没有变量提示
console.log(foo);
var foo = 'foo';

console.log(bar); // why not error
let bar = 'bar';

// 3. const
// const一旦声明变量，就必须立即初始
// same let 只在声明所在的块级作用域内有效
// same let 不可重复声明
// 不提升，同样存在暂时性死区，只能在声明的位置后面使用










