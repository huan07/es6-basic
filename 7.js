/**
 * Created by yanghuan on 17/9/4.
 */

// 1. 没有赋值（或者显式undefined），才取默认值
{
    function log(x, y = 'World'){ // y 不能用let const 再次声明
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
    foo({ x: 1, y: 10 });
    // foo(); // error
}
{
    function foo({ x, y = 5 }={}){ // 函数参数的默认值是 {} , 不传参数调用，就不会报错了
        console.log(x, y);
    }

    foo();
}

// 函数参数的默认值是空对象，不是空对象的差别 to add

// 参数默认值的位置 不是尾参数，调用时必须 显式传入参数undefined
{
    function f(x = 1, y){
        console.log('参数默认值的位置 不是尾参数 => ', x, y);
    }

    f();
    f(2);
    // f(,2); // error
    f(undefined, 2);
    f(3, 4);
}

// 作用域 to add
{
    var x = 1;

    function f(x, y = x){
        console.log('作用域 => ', y);
    }

    f(2);
}
{
    var x = 1;

    function f(x, y){
        console.log('作用域 => 2', y);
    }

    f(2);
}

// rest参数
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
    var f31 = (v1, v2) =>{
        return v1 + v2;
    }
    var f3_ = function(v1, v2){
        return v1 + v2;
    };
    console.log('f3', f3(1, 2), f31(1, 2), f3_(1, 2));


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
    const full = ({ first, second }) => `${first}-${second}`;
    const full_ = function(options){
        return options.first + '-' + options.second;
    };
    console.log(full({ first: 'firstName', second: 'secondName' }));
    console.log(full_({
            first: 'firstName',
            second: 'secondName'
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
    console.log('与rest参数结合 => ', headAndTail(11, 18, 19));
}

// this的指向 是固定的，定义时所在的对象
{
    function foo(){
        setTimeout(() =>{
            console.log('id:', this.id);
        }, 100)
    }

    var id = 21;
    foo.call({ id: 38 });

    foo.apply({ id: 99 });
}


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