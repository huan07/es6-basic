/**
 * Created by yangHuan on 17/9/20.
 */

// 1. let,const变量只在代码块内有效  {} 就是一个代码块 ！！
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

// for特别之处：父作用域，循环体是子作用域
{
    for (let i = 0; i < 3; i++) {
        let i = 'abc';
        console.log('for循环，父子作用域 => ', i); // 编译后 用不同变量表示i的
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


// let不存在变量提升；=> 先定义变量，再初始化 ！！
console.log('foo => ', foo);
var foo = 2;

console.log('bar => ', bar); // why not error ? ? ?
let bar = 2;

// 暂时性死区（声明let变量之前就调用，会导致报错）
{
    var tmp = 123;

    if (true) {
        tmp = 'abc'; // why not error ? ? ?
        let tmp;
        console.log('tmp', tmp);
    }
}
{
    if (true) {
        tmp = 'abc';
        console.log('tmp,abc => ', tmp); // why not error ? ? ?

        let tmp;
        console.log('tmp', tmp);

        tmp = 123;
        console.log('tmp,123 => ', tmp);
    }
}

// typeof不再是一个安全操作，但是对var管用
{
    console.log('typeof let x before => ', typeof x); // why not error ? ? ?
    let x;
}
{
    console.log('typeof x 未声明 => ', typeof x);
}

{
    function bar(x = y, y = 2){
        return [x, y];
    }

    console.log(bar()); // why not error ? ? ?
}
{
    function bar(x = 22, y = x){
        return [x, y];
    }

    console.log(bar());
}

// 不允许（在相同的作用域内）重复声明
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

// 没有块级作用域，这带来很多不合理的场景
// 1.内层变量可能会覆盖外层变量
// 2.用来计数的循环变量i泄露为全局变量
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
            let n = 10; // 编译后，同名变量n是用不同的标识符区分开的
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

// 外层作用域 无法读取 内层作用域的变量
// 内层作用域 可以定义 外层作用域的同名变量，但是外层作用域的变量值保存不变
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
            console.log('outer内层作用域 => ', outer);
        }
        console.log('outer外层作用域 => ', outer);
    }
}

// 块级作用域与函数声明 to add
{

}