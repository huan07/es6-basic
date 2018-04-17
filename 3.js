/**
 * Created by yangHuan on 17/9/18.
 */

// 1. array，按照对应位置，对变量赋值。
let [foo, [[bar], baz]] =[1, [[2], 3]];
console.log(foo, bar, baz);

let [head, ...tail]=[1, 2, 3, 4];
console.log(head, tail);

let [x, y, ...z]=['a'];
console.log(x, '解构不成功，变量的值为：undefined', y, z);

//  等号右边的不是数组会报错（不是可遍历的结构）
let [foo2]='a'; // 1,false,NaN,undefined,null,{},

// to add examples

// default value (when undefined strict)
var [x1, y1 = 'b']=['a'];
console.log('默认值生效的条件是：undefined', x1, y1);
var [x1, y1 = 'b']=['a', undefined];
console.log('默认值生效的条件是：undefined', x1, y1);
var [x1, y1 = 'b']=['a', null];
console.log('默认值生效的条件是：undefined', x1, y1);

// 默认值是一个表达式 to add

var [x4 = 1, y4 = x4]=[];
console.log(x4, y4);
var [x4 = 1, y4 = x4]=[2];
console.log(x4, y4);
var [x4 = 1, y4 = x4]=[3, 4];
console.log(x4, y4);
//let [x5=y5,y5=1]=[]; console.log(x5,y5) // 怎么没有报错呢？？？？


// 2. object 按照key对value赋值，key和value同名，可以省略value,
var { bar_1:bar_2, foo_1:foo_2, baz_1, baz_2 }={ bar_1: 'bar_2', foo_1: 'foo_2', baz_1: 'baz_1' };
console.log(bar_2, foo_2, baz_1, baz_2); // baz_2 解构失败undefined

let {
    p:[x6, { y6 }]
} = { p: ['hello', { y6: 'world' }] };
console.log(x6, y6);
let { loc, loc:{ start, }, loc:{ start:{ line, column } } }={ loc: { start: { line: 1, column: 5 } } };
console.log(loc, start, line, column);

//  等号右边的是undefined, null, 会报错

// default value (when undefined strict)
var { x7, y7 = 8 }={};
console.log('默认值生效的条件是：undefined', x7, y7);
var { x7, y7 = 8 }={ x7: 7 };
console.log('默认值生效的条件是：undefined', x7, y7);
var { x8:y8 = 9 }={};
console.log('默认值生效的条件是：undefined', y8);

// 3.
const [h, e, l, o, p]='hello';
console.log('// 3.', h, e, l, o, p);
const { length:helloLen }='hello';
console.log('// 3.', helloLen);

// 4. 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象
//let{prop:xxx}=undefined; // error
//let{prop:yyy}=null; // error

// 5.
function add([x, y]) {
    return x + y;
}
console.log('// 5.', add([4, 5]));

[[1, 2], [3, 4], [undefined, undefined]].map(([x = 2017, y = 2017]) => {
    console.log('// 5.', x + y)
});

function move({ x = 9, y = 9 }={}) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('// 5. 函数参数的解构使用默认值', x, y);
}
move({ x: 1, y: 2 });
move({ x: 1 });
move({ y: 2 });
move({});
move();

function move2({ x, y }={ x: 8, y: 8 }) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('// 5. 为函数参数指定默认值', x, y);
}
move2({ x: 1, y: 2 });
move2({ x: 1 });
move2({ y: 2 });
move2({});
move2();

// 6. to add


// 7.解构赋值用途
//(1) 交换变量的值
var xx = 100;
var yy = 200;
[xx, yy] = [yy, xx];
console.log(xx, yy);

//(2)
function example() {
    return [11, 22, 33];
}
var [xx, yy, zz]=example();
console.log(xx, yy, zz);

function example2() {
    return { foof: 'foof', barb: 'barb' };
}
var { foof, barb }=example2();
console.log(foof, barb);

//(3) 函数参数解构赋值
function example3([x, y, z]) {
    console.log(x, y, z);
}
example3([1, 2, 3]);
function example4({ x, y, z }) {
    console.log(x, y, z);
}
example4({ x: 'x', y: 'y', z: 'z' });

//(4) ...
//(5) ...
//(6)  to add
//(7)  to add