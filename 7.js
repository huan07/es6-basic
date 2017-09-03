/**
 * Created by yanghuan on 17/9/4.
 */

// 1.
function log(x, y = 'World') { // y 不能用let const 再次声明
    console.log(x, y);
}

log('hello');
log('hello', '');
log('hello', 'baidu');

/*function foo(x,x,y) { // error

 }*/
/*
 function foo(x,x,y=9) { // error

 }*/

let x2 = 99;
function foo2(p = x2 + 1) { // 每次调用，重新计算p
    console.log(p);
}

foo2(); // 100
foo2(); // 100

x2 = 105;
foo2(); // 106
foo2(); // 106


// 5.
var f1 = v => v;
var f1_ = function(v) {
    return v;
};
console.log('f1', f1(1), f1_(1));

var f2 = () => 2;
var f2_ = function() {
    return 2;
};
console.log('f2', f2(), f2_());

var f3 = (v1, v2) => v1 + v2;
var f3_ = function(v1, v2) {
    return v1 + v2;
};
console.log('f3', f3(1, 2), f3_(1, 2));

let getTempItem = id => ({ id: id, name: 'Temp' });