/*
 export default function () {
 console.log('export default 匿名函数');
 }

 export default function foo() { // 加载的时候世通匿名函数
 console.log('export default 非匿名函数');
 }

 function foo2() { // 加载的时候世通匿名函数
 console.log('export default 函数申明');
 }
 export default foo2;

 const bar = 'bar';
 export default bar;

 export default ['bar1', 'bar2'];
 */

export default () => {
    console.log('export default 匿名函数 es6');
}