/**
 * Created by yanghuan on 17/9/4.
 */

// 1.函数参数的默认值；没有赋值（或者显式undefined），才取默认值
{
    function log(x, y = 'World'){ // 在函数体中，y不能用let const 再次声明
        console.log(x, y);
    }

    log('hello');
    log('hello', '');
    log('hello', 'baidu');
}

// 使用参数默认值时，函数不能有 同名命名参数
{
    /*function foo(x,x,y){

     }*/

    /*function foo(x,x,y=9){

     }*/
}

// 参数默认值是惰性求值的
{
    let x = 99;

    function foo2(p = x + 1){ // 每次调用，重新计算p
        console.log(p);
    }

    foo2(); // 100
    foo2(); // 100

    x = 105;
    foo2(); // 106
    foo2(); // 106
}

// 与解构赋值默认值结合
{
    function foo({ x, y = 5 }){
        console.log(x, y);
    }

    foo({});
    foo({ x: 1 });
    foo({ x: 1, y: 2 });
    // foo(); // error
}
{
    function foo({ x, y = 5 }={}){ // 函数参数的默认值是 {} , 不传参数调用，就不会报错了
        console.log('提供函数参数的默认值 => ', x, y);
    }

    foo({});
    foo({ x: 1 });
    foo({ x: 1, y: 2 });
    foo();
}

// 函数参数的默认值是空对象，不是空对象的差别 to add

// 参数默认值的位置
{
    function f(x = 1, y){
        console.log('参数默认值的位置 => ', x, y);
    }

    f();
    f(2);
    // f(,1); // error
    f(undefined, 2); // 不是尾参数，调用时必须 显式传入参数undefined
    f(3, 4);
}

// 函数的 length 属性  to add

// 作用域 to add
{
    var x = 1;

    function f(x, y = x){
        console.log('作用域 => ', y);
    }

    f(2);
}
{
    let x = 1;

    function f(y = x){
        let x = 2;
        console.log('作用域 => 2', y);
    }

    f();
}

// 指定某个参数不得省略
{
    function throwIfMissing(){
        throw new Error('Missing parameter');
    }

    function foo(mustBeProvided = throwIfMissing()){
        return mustBeProvided;
    }

    //foo();
    foo(99);
}


// 2.rest参数（只能是最后一个参数，否则会报错）
{
    function add(...values){
        let sum = 0;

        for (var i of values) {
            sum += i;
        }

        return sum;
    }

    console.log('sum => ', add(3, 5, 8))
}

// 改写数组push
{
    function push(result, ...items){
        items.forEach(function(item, index){
            result.push(item);
            console.log(item);
        })
    }

    var a = [];
    push(a, 8, 9, 10);
    console.log('push => ', a);
}


// 3. to add
// 4. to add


// 5. ＝>
{
    var f = v => v;
    var f_ = function(v){
        return v;
    };
    console.log('f', f(1), f_(1));


    //
    var f2 = () => 2;
    var f2_ = function(){
        return 2;
    };
    console.log('f2', f2(), f2_());


    //
    var f3 = (v1, v2) => v1 + v2;
    var f32 = (v1, v2) =>{
        return v1 + v2;
    };
    var f3_ = function(v1, v2){
        return v1 + v2;
    };
    console.log('f3', f3(1, 2), f32(1, 2), f3_(1, 2));


    //
    var f4 = id => ({ id: id, name: 'Temp' }); // 返回对象要用（），否则会报错
    var f4_ = function(id){
        return {
            id: id,
            name: 'Temp'
        }
    };
    console.log('f4', f4('f4'), f4_('f4_'));


    // 多条语句没有返回值
    const f5 = () =>{
        console.log('f5');
        console.log('f5_');
    };
    // 多条语句有返回值
    const f6 = () =>{
        console.log('f6');
        console.log('f6_');
        return 'f6_';
    };
    f5();
    console.log(f6());
}

// 与变量解构结合
{
    const full = ({ first, last }) => `${first}-${last}`;
    const full_ = function(options){
        return options.first + '-' + options.last;
    };
    console.log(full({ first: 'firstName', last: 'secondName' }));
    console.log(full_({
            first: 'firstName',
            last: 'secondName'
        })
    );
}

// 简化回调函数
{
    const mapcb = [1, 2, 3].map(item => item + 100);
    const mapcb_ = [1, 2, 3].map(function(item){
        return item + 100;
    });
    console.log(mapcb, mapcb_);
}

// 与rest参数结合
{
    const numbers = (...nums) => nums;
    console.log('与rest参数结合 => ', numbers(11, 12, 13));

    const headAndTail = (head, ...tail) => [head, tail];
    console.log('与rest参数结合 => ', headAndTail(11, 12, 13));
}

// this的指向 在箭头函数中是固定的，this=>定义时所在的对象 ，而不是使用时所在的对象（与普通函数相反）！！
// 实际原因：箭头函数根本没有自己的this，导致内部的this就是 最外层代码块的this ！！
// 没有自己的this, 所以不能够通过call, apply, bind去改变this的指向
{
    function foo(){
        setTimeout(() =>{
            console.log('id:', this.id);
        }, 100)
    }

    var id = 21;
    // foo(); // error
    foo.call({ id: 38 });
    foo.apply({ id: 99 });
}

// example
{
    function Timer(){
        this.s1 = 0;
        this.s2 = 0;

        setInterval(() => this.s1++, 1000); // 指向的是定义时对象 => Timer实例

        setInterval(function(){
            this.s2++; // 指向的是运行时对象 => window对象
        }, 1000);
    }

    var timer = new Timer();

    setTimeout(() => console.log('s1 => ', timer.s1), 3100);
    setTimeout(() => console.log('s2 => ', timer.s2), 3100);
}

// example2
{
    function foo(){
        return () =>{
            return () =>{
                return () =>{
                    console.log('嵌套的箭头函数this的指向，id: ', this.id);
                };
            };
        };
    }

    var f = foo.call({ id: 1 });
    console.log('f ', f);

    var t1 = f.call({ id: 2 })()(); // 无法改变this
    console.log('t1 ', f());

    var t2 = f().call({ id: 3 })(); // 无法改变this
    console.log('t2 ', f()());

    var t3 = f()().call({ id: 4 }); // 无法改变this
    console.log('t3 ', f()()());
}

// 箭头函数还没有自己的arguments、super、new.target; 指向最外层的函数的参数
{
    function foo(){
        setTimeout(() =>{
            console.log('arguments => ', arguments);
        }, 1000);
    }

    foo(98, 99);
}

// 嵌套的箭头函数 to add

{
    var foo = {
        color: 'red',
    };

    function sayColor(){
        return this.color;
    }

    var xx = foo::sayColor;

    var xx2 = sayColor.bind(foo);


    console.log(xx(), xx2());

    console.log(foo::sayColor(), sayColor.apply(foo), sayColor.call(foo));
}

// ::
{

}


// 考题：箭头函数的this指向
{
    class Animal {
        constructor(){
            this.type = 'animal';
        }

        say(val){
            setTimeout(function(){ // 超时调用，this指向全局作用域 Window（非严格模式下，否则是undefined） // bang
                console.log(this);
                console.log(this.type + ' says ' + val);
            }, 1000)
        }
    }

    var animal = new Animal();
    animal.say('hi');
}
{
    class Animal {
        constructor(){
            this.type = 'animal';
        }

        say(val){
            setTimeout(() =>{
                console.log(this);
                console.log(this.type + ' says ' + val);
            }, 1000);
        }
    }

    var animal = new Animal();
    animal.say('hello');
}