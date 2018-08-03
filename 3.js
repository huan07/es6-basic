/**
 * Created by yangHuan on 17/9/18.
 */

// 1. Array => 以, 分割2的，按位置赋值
// 先赋值，如果赋值的是undefined, 再用它的默认值
{
    let [foo, [[bar], baz]] =[1, [[2], 3]]; // 可用于嵌套结构
    console.log(foo, bar, baz);

    // 解构不成功，变量的值为：undefined
    let [x, y, ...z]=['a'];
    console.log(x, y, z);

    // 不完全解构
    let [a, [b], d]=[1, [2, 3], 4];
    console.log(a, b, d);
}

//  等号的右边不是数组会报错（不是可遍历的结构）
{
    let [foo]='a'; // 1,false,NaN,undefined,null,{},
    console.log('foo => ', foo);
}

// 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值 to add

// 默认值 生效的条件：=== 比较undefined
{
    var [x, y = 'b']=['a'];
    console.log('x, y => ', x, y);

    var [x, y = 'b']=['a', undefined];
    console.log('x, y => ', x, y);

    var [x, y = 'b']=['a', null];
    console.log('x, y => ', x, y);
}

// 默认值是一个表达式 表达式是惰性求值的（传入参数是undefined才去求表达式）
{
    function f(){
        console.log('aaa');
        return 'aaa';
    }

    let [x = f()]=[1];
}
{
    function f(){
        console.log('惰性求值aaa2');
        return '惰性求值aaa2';
    }

    let [x = f()]=[];
}

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明 ！！
{
    let [x = 1, y = x] = [];
    console.log('y = x => ', x, y);
}
{
    let [x = 1, y = x] = [2];
    console.log('y = x => ', x, y);
}
{
    let [x = 1, y = x] = [1, 2];
    console.log('y = x => ', x, y);
}
{
    let [x = y, y = 1] = []; // why not error
    console.log('y = x => ', x, y);
}


// 2. Object 变量必须与右侧对象属性同名赋值，与次序无关
// 左侧对象的属性名、变量名一致，可以省略一个，
{
    let { bar, foo, baz } = { foo: 'aaa', bar: 'bbb' };
    console.log('object destructure => ', foo, bar, baz); // 解构不成功，变量的值：undefined
}

// 属性名、变量名不一致，不可以省略
{
    let { foo: baz, bar } = { foo: 'aaa', bar: 'bbb' };
    console.log(baz, bar);
    // console.log(foo); // error foo is not defined, foo只是模式
}

// 可用于嵌套结构
{
    let { p:[x, { y }], p } = { p: ['hello', { y: 'world' }] };
    console.log('x, y, p => ', x, y, p);
}

// 默认值 生效的条件：对象的属性值 === undefined
{
    var { x = 3 }={};
    console.log(x);
}
{
    var { x:y = 3 }={};
    console.log(y);
}
{
    var { x:y = 3 }={ x: 5 };
    console.log('y = 5 => ', y);
}
{
    var { x = 35 }={ x: null };
    console.log('x = null => ', x);
}

// to add xx


// 3. String
{
    const [a, b, c, d, e] = 'hello';
    console.log('3. String => ', a, b, c, d, e);
    const { length:helloLen } = 'hello';
    console.log('3. helloLen => ', helloLen);
}


// 4. Number, Boolean
// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象
// undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
{
    /*let { x } = undefined;
     let { y } = null;
     console.log(x, y);*/
}


// 5. Function
{
    function add([x, y]){
        return x + y;
    }

    console.log('add([4, 5]) => ', add([4, 5]));

    [[1, 2], [3, 4], [undefined, undefined]].map(([x = 2017, y = 2017]) =>{
        console.log('5. Function => ', x + y)
    });
}

{
    function move({ x = 9, y = 9 } = {}){
        console.log('5. 函数参数的解构使用默认值', x, y); // ！！better
    }

    move({ x: 1, y: 2 });
    move({ x: 1 });
    move({ y: 2 });
    move({});
    move();
}

{
    function move({ x, y } = { x: 9, y: 9 }){
        console.log('5. 为函数参数指定默认值', x, y);
    }

    move({ x: 1, y: 2 });
    move({ x: 1 });
    move({ y: 2 });
    move({});
    move();
}

// 6. to add


// 7.解构赋值用途
//(1) 交换变量的值
{
    let x = 1;
    let y = 2;
    [x, y] = [y, x];
    console.log('交换变量的值 => ', x, y);
}

//(2) 从函数返回多个值
{
    function example(){
        return [1, 2, 3];
    }

    let [a, b, c] = example();
    console.log('函数返回数组 解构 => ', a, b, c);
}
{
    function example(){
        return { foo: 1, bar: 2 };
    }

    let { foo, bar } = example();
    console.log('函数返回对象 解构 => ', foo, bar);
}

//(3) 函数参数[], {}, 解构赋值
{
    function example([x, y, z]){
        console.log('函数参数[] => ', x, y, z);
    }

    example([1, 2, 3]);
}
{
    function example({ x, y, z }){
        console.log('函数参数{} =>', x, y, z);
    }

    example({ x: 'x', y: 'y', z: 'z' });
}

//(4) 提取json数据
//(5) 函数参数的默认值，例如：ajax参数的默认值   better
//(6)  to add
//(7) 输入模块的指定方法 to add