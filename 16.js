/**
 * Created by yanghuan on 18/7/18.
 */

// 1.
{
    function* helloWorldGenetator(){
        yield 'hello';
        yield 'world';
        return 'ending';
    }

    var hwg = helloWorldGenetator();
    console.log(hwg); // 返回 => 指向内部状态的指针对象

    console.log(hwg.next());

    console.log(hwg.next());

    console.log(hwg.next());

    console.log(hwg.next());

    // 调用 Generator 函数，
    // 返回一个遍历器对象，代表 Generator 函数的内部指针
}

// example
{
    function *gen(){
        yield 123 + 456;
    }

    var g = gen();

    console.log('手动的惰性求值 => ', g.next());
    console.log(g.next());
}

// Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函
{
    function *f(){
        console.log('执行了');
    }

    var generator = f();

    setTimeout(function(){
        generator.next();
    }, 2000)
}

// yield表达式如果用在另一个表达式之中，必须放在圆括号里面
// 用作函数参数或放在赋值表达式的右边，可以不加括号
{
    function *demo(){
        console.log('hello undefined => ' + (yield));
        console.log('hello 123 => ' + (yield 123));
    }

    var g = demo();
    g.next();
    g.next();
    g.next();
}

// 与 Iterator 接口的关系
// 对象的Symbol.iterator方法，等于该对象的遍历器生成函数
// 可以把 Generator 赋值给对象的Symbol.iterator属性
{
    var myIterable = {};
    myIterable[Symbol.iterator] = function*(){
        yield 1;
        yield 2;
        yield 3;
    };

    console.log('myIterable => ', [...myIterable])
}

// to add


// 2.next方法参数
// yield表达式本身没有返回值，或者说总是返回undefined
{
    function *f(){
        for (var i = 0; true; i++) {
            var reset = yield i;
            if (reset) {
                i = -1;
            }
        }
    }

    var g = f();

    console.log(g.next());

    console.log(g.next());

    console.log(g.next(true));
}

// V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。
// 从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数
{
    function *foo(x){
        var y = 2 * (yield(x + 1));
        var z = yield(y / 3);
        console.log('x, y, z => ', x, y, z);
        return (x + y + z);
    }

    var a = foo(5);
    console.log('next方法不传参数 => ', a.next());
    console.log(a.next());
    console.log(a.next());

    var b = foo(5);
    console.log('next方法传参数 => ', b.next());
    console.log(b.next(12));
    console.log(b.next(13));
}

{
    function *dataConsumer(){
        console.log('started');
        console.log(`1.${yield}`);
        console.log(`2.${yield}`);
        return 'result';
    }

    let g = dataConsumer();

    g.next();

    g.next('a');

    g.next('b');

    g.next();
}

// 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层。
{
    function wrapper(generatorFunction){
        return function(...args){
            let generatorObject = generatorFunction(...args);
            generatorObject.next();
            return generatorObject;
        };
    }

    const wrapped = wrapper(function*(){
        console.log(`first input: ${yield}`);
        return 'DONE';
    });

    wrapped().next('hello');
    wrapped().next('world');
}


// 3. for...of循环可以自动遍历 Generator 函数时生成的Iterator对象
{
    function *foo(){
        yield 1;
        yield 2;
        yield 3;
        return 4;
    }

    for (let v of foo()) {
        console.log('v => ', v);
    }
}

// example 利用 Generator 函数和for...of循环，实现斐波那契数列
{
    function *fibonacci(){
        let [prev, curr]=[0, 1];
        for (; ;) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    for (let n of fibonacci()) {
        if (n > 5) {
            break;
        }
        console.log(n);
    }
}

// 通过 Generator 函数为对象加上遍历接口，就可以使用for...of遍历
{
    function *objectEntries(obj){
        let propKeys = Reflect.ownKeys(obj);

        for (let propKey of propKeys) {
            yield [propKey, obj[propKey]];
        }
    }

    let jane = { first: 'Jane', last: 'Doe' };

    for (let [key, value] of objectEntries(jane)) {
        console.log(key, value);
    }
}
{
    function *objectEntries(){
        let propKeys = Reflect.ownKeys(this);

        for (let propKey of propKeys) {
            yield [propKey, this[propKey]];
        }
    }

    let jane = { first: 'Jane', last: 'Doe' };

    jane[Symbol.iterator] = objectEntries;

    for (let [key, value] of jane) {
        console.log(key, value);
    }
}

// for...of循环，
// 扩展运算符（...），
// Array.from，
// 解构赋值方法内部调用的，都是遍历器接口
{
    function *numbers(){
        yield 1;
        yield 2;
        return 3;
        yield  4;
    }

    console.log([...numbers()], Array.from(numbers()));

    let [x, y]=numbers();
    console.log(x, y);
}

// 4.遍历器对象的throw方法
// 可以在函数体外抛出错误，然后在 Generator 函数体内捕获
{
    var g = function*(){
        try {
            yield;
        } catch (e) {
            console.log('内部捕获', e);
        }
    };

    var i = g();
    i.next();

    try {
        i.throw('a');
        i.throw('b');
        i.throw('c');
    } catch (e) {
        console.log('外部捕获', e);
    }
}

// 遍历器对象的throw方法 建议抛出Error对象的实例
{
    var g = function*(){
        try {
            yield;
        } catch (e) {
            console.log(e);
        }
    };

    var i = g();
    i.next();
    i.throw(new Error('出错了！'));
}

// to add


// 5.遍历器对象的return方法
// 返回给定的值，并且终结遍历 Generator 函数
{
    function *gen(){
        yield 1;
        yield 2;
        yield 3;
    }

    var g = gen();

    console.log(g.next());
    console.log(g.return('foo'));
    console.log(g.next()); // 开始取值undefind
    console.log(g.next());
}

{
    function *gen(){
        yield 11;
        yield 22;
        yield 33;
    }

    var g = gen();

    console.log(g.next());
    console.log(g.return()); // 没有参数返回undefined
    console.log(g.next()); // 开始取值undefind
    console.log(g.next());
}

// Generator 函数内部有try...finally代码块，
// 那么return方法会推迟到finally代码块执行完再执行
{
    function *numbers(){
        yield 1;
        try {
            yield 2;
            yield 3;
        } finally {
            yield 4;
            yield 5;
        }
        yield 6;
    }

    var g = numbers();
    console.log(g.next());
    console.log(g.next());
    console.log(g.return(99));
    console.log(g.next()); // 为啥不返回了？？
    console.log(g.next()); // 为啥不返回了？？
}


// 6.next()、throw()、return()
// 都是让 Generator 函数恢复执行，使用不同的语句替换yield表达式。
{
    const gen = function*(x, y){
        let result = yield x + y;
        return result;
    };

    const g = gen(1, 2);
    console.log('next() => ', g.next());
    console.log(g.next(1));
    console.log(g.next());


    //console.log('throw() => ',g.throw(new Error('抛错')));


    console.log('return() => ', g.return(99));
}


// 7.yield*
// 如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的
{
    function * foo(){
        yield 'a';
        yield 'b';
    }

    function *bar(){
        yield 'x';
        foo();
        yield 'y';
    }

    for (let v of bar()) {
        console.log('Generator 函数 内部 调用另外一个Generator 函数，默认没有效果 => ', v);
    }
}
{
    function * foo(){
        yield 'a';
        yield 'b';
    }

    function *bar(){
        yield 'x';
        yield foo(); // 改进1
        yield 'y';
    }

    for (let v of bar()) {
        console.log('yield 返回的是遍历器对象 => ', v);
    }
}

{
    function * foo(){
        yield 'a';
        yield 'b';
    }

    function *bar(){
        yield 'x';
        yield* foo(); // 改进2
        yield 'y';
    }

    for (let v of bar()) {
        console.log('yield* 返回了遍历器对象的内部值 => ', v);
    }
}

// yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环
{

}

// 如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员
{
    function* gen(){
        yield* ['a', 'b', 'c'];
    }

    var g = gen();
    console.log('遍历数组成员 => ', g.next());
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());
}
{
    function* gen(){
        yield ['a', 'b', 'c'];
    }

    var g = gen();
    console.log('返回整个数组 => ', g.next());
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());
}

// 如果被代理的 Generator 函数有return语句，那么就可以
// 向代理它的 Generator 函数返回数据
{
    function* foo(){
        yield 2;
        yield 3;
        return 'foo';
    }

    function* bar(){
        yield 1;
        var v = yield* foo();
        console.log('v => ', v);
        yield 4;
    }

    var g = bar();

    console.log(g.next());

    console.log(g.next());

    console.log(g.next());

    console.log(g.next());

    console.log(g.next());
}
{
    function* genFuncWithReturn(){
        yield 2;
        yield 3;
        return 'foo';
    }

    function* logReturned(genObj){
        let result = yield* genObj;
        console.log('logReturned result => ', result)
    }

    console.log([...logReturned(genFuncWithReturn())]);
}

// yield*命令可以很方便地取出嵌套数组的所有成员 good
{
    function* iterTree(tree){
        if (Array.isArray(tree)) {
            for (let i = 0; i < tree.length; i++) {
                yield* iterTree(tree[i]);
            }
        } else {
            yield tree;
        }
    }

    const tree = ['a', ['b', 'c'], ['d', ['e', 'f']]];

    for (let v of iterTree(tree)) {
        console.log('取出嵌套数组的所有成员 => ', v);
    }
}

// 用yield*语句遍历完全二叉树 to add
{

}


// 8.作为对象属性的 Generator 函数
{

}


// 9.Generator 函数的this
// Generator 函数总是返回一个遍历器（实例）；而不是this对象；不能跟new命令一起用，会报错；
// 也继承了 Generator 函数的prototype对象上的方法
{
    function* g(){

    }

    g.prototype.hello = function(){
        return 'hi';
    };

    let obj = g();

    console.log(obj instanceof g, obj.hello());
}

{
    function* g(){
        // this.a = 11; // error
    }

    let obj = g();
    console.log(obj.next());
    console.log(obj.next());
    console.log(obj.a);
}
{
    function* F(){
        yield this.x = 2;
        yield this.y = 3;
    }

    console.log(new F()); // 好好的呀，没有报错呢？

    var f = new F();
    console.log(f.next());
    console.log(f.next());
    console.log(f.next());
}

// 让 Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this
// 变通方法1：生成一个空对象，使用call方法绑定 Generator 函数内部的this
{
    function* F(){
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }

    var obj = {};
    var f = F.call(obj);

    console.log('变通方法1 => ', f.next());
    console.log(f.next());
    console.log(f.next());

    console.log(obj);
}
// 改造后
{
    function* F(){
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }

    var f = F.call(F.prototype);

    console.log('遍历器f, 实例obj合并后 => ', f.next());
    console.log(f.next());
    console.log(f.next());

    console.log(f, f.a, f.b, f.c); // 从原型取到属性值
}

// 变通方法2 再将F改成构造函数
{
    function* gen(){
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }

    function F(){
        return gen.call(gen.prototype);
    }

    var f = new F();

    console.log('执行new命令 => ', f.next());
    console.log(f.next());
    console.log(f.next());

    console.log(f, f.a, f.b, f.c); // 从原型取到属性值
}

{
    function* gen(){
        yield 1;
        return 2;
    }

    let g = gen();

    console.log(g.next());

    console.log(g.next());
}


// 11.Generator 可以暂停函数执行，返回任意表达式的值

// 1.异步操作的同步化表达
{

}
