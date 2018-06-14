/**
 * Created by yangHuan on 17/9/20.
 */

// 1. let,const变量只在代码块内有效  {} 就是一个代码块
{
    let a = 10;
    var b = 1;
}
// console.log(a); // error 没有被定义
console.log(b);

// example 1
{
    for (let i = 0; i < 10; i++) {
    }
    // console.log(i); // error 没有被定义 i只是在循环体内有效

    for (var i = 0; i < 10; i++) {
    }
    console.log('i => ', i);
}

// example 2
{
    var a = [];
    for (var i = 0; i < 3; i++) {
        a[i] = function(){
            console.log('var => ', i);
        };
    }
    a[0](); // 调用时，i 已经是全局变量
    a[2]();
}
{

    var a = [];
    for (let i = 0; i < 3; i++) {
        a[i] = function(){
            console.log('let => ', i);  // i只在本轮循环有效，js引擎内部会记住上一轮循环的值，从而i++
        };
    }
    a[0]();
    a[2]();
}

// example 3 for 特别之处：父作用域，循环体是子作用域
{
    for (let i = 0; i < 3; i++) {
        let i = 'abc';
        console.log('for循环，父子作用域 => ', i);
    }
}

// example 4
{
    var blockTestLet1 = () =>{
        let ll = 'blockTestLet1';
        return ll;
    };
    var blockTestLet2 = () =>{
        let ll = 'blockTestLet2';
        return ll;
    };
    var blockTestConst1 = () =>{
        const ll = 'blockTestConst1';
        return ll;
    };
    var blockTestConst2 = () =>{
        const ll = 'blockTestConst2';
        return ll;
    };
    console.log('block {} test=>', blockTestLet1(), blockTestLet2(), blockTestConst1(), blockTestConst2());
}


// let不存在变量提升；=> 先定义变量，再调用
console.log('foo => ', foo);
var foo = 2;

console.log('bar => ', bar); // why not error ? ? ?  ? ? ?  ? ? ?  ? ? ?
let bar = 2;

// 暂时性死区 to add example
{
    var tmp = 123;

    if (true) {
        tmp = 'abc'; // why not error ? ? ?  ? ? ?  ? ? ?  ? ? ?
        let tmp;
    }
}

// typeof不再是一个安全操作，但是对var管用
{
    console.log('typeof => ', typeof x); // why not error ? ? ?  ? ? ?  ? ? ?  ? ? ?
    typeof x; // why not error ? ? ?  ? ? ?  ? ? ?  ? ? ?
    let x;
}
// to add example


// 不提升，同样存在暂时性死区，只能在声明的位置后面使用

// 不允许重复声明
{
    function func(){
        let a = 10;
        // var a = 1;
    }

    function func(){
        let a = 10;
        // let a = 1;
    }
}
{
    function func(arg){
        // let arg;
    }

    function func2(arg){
        {
            let arg;
        }
    }
}


// 2.块级作用域
{
    var tmp = new Date();

    function f(){
        console.log('tmp => ', tmp);
        if (false) {
            var tmp = 'hello world';
        }
    }

    f();
}

// es6块级作用域
{
    function f1(){
        let n = 5;
        if (true) {
            let n = 10; // 转化后 内部代码块的n，外部代码块的n是用不同的变量区分开的
            console.log('inner es6 => ', n);
        }
        console.log('outer es6 => ', n);
    }

    f1();
}
{
    function f1(){
        var n = 5;
        if (true) {
            var n = 10;
            console.log('inner 有变量提升 => ', n);
        }
        console.log('outer 有变量提升 => ', n);
    }

    f1();
}

// 外层作用域 无法读取内层作用域的变量
{
    {
        let outer = 'outer';
        {
            let inner = 'inner';
        }
        console.log(outer);
        // console.log(inner); // error
    }
}
{
    {
        let outer = 'outer';
        {
            let outer = 'inner';
            console.log('内层作用域可以定义外层作用域的同名变量outer => ', outer);
        }
    }
}
