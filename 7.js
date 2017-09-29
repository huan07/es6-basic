/**
 * Created by yanghuan on 17/9/4.
 */

// 1. 没有赋值（undefined），才取默认值
function log(x, y = 'World') { // y 不能用let const 再次声明
    console.log(x, y);
}

log('hello');
log('hello', '');
log('hello', 'baidu');

/*function foo(x,x,y) { // no error

 }*/
/*
 function foo(x,x,y=9) { // error

 }*/

// 参数默认值是惰性求值的
let x2 = 99;
function foo2(p = x2 + 1) { // 每次调用，重新计算p
    console.log(p);
}

foo2(); // 100
foo2(); // 100

x2 = 105;
foo2(); // 106
foo2(); // 106

// 与解构赋值默认值结合
function foo({ x, y = 5 }) {
    console.log(x, y);
}
foo({});
foo({ x: 1 });
foo({ x: 1, y: 10 });
//foo(); error

// 两种写法有什么差别 to add


// 5. ＝>
var f1 = v => v;
var f1_ = function (v) {
    return v;
};
console.log('f1', f1(1), f1_(1));

var f2 = () => 2;
var f2_ = function () {
    return 2;
};
console.log('f2', f2(), f2_());

var f3 = (v1, v2) => v1 + v2;
var f3_ = function (v1, v2) {
    return v1 + v2;
};
console.log('f3', f3(1, 2), f3_(1, 2));

var f4 = id => ({ id: id, name: 'Temp' }); // 返回对象要用（），否则会报错
var f4_ = function (id) {
    return {
        id: id,
        name: 'Temp'
    }
};
console.log('f4', f4('f4'), f4_('f4_'));

// 多条语句没有返回值
const f5 = () => {
    console.log('f5');
    console.log('f5_');
};
// 多条语句有返回值
const f6 = () => {
    console.log('f6');
    console.log('f6_');
    return 'f6_';
};
console.log(f5(), f6());

// 与变量解构结合
const full = ({ first, second }) => `${first}-${second}`;
const full_ = function (options) {
    return options.first + '-' + options.second;
};
console.log(full({ first: 'firstName', second: 'secondName' }), full_({ first: 'firstName', second: 'secondName' }));

// 简化回调函数
const mapcb = [1, 2, 3].map(item => item + 100);
const mapcb_ = [1, 2, 3].map(function (item) {
    return item + 100;
});
console.log(mapcb, mapcb_);

// 与rest参数结合 to add