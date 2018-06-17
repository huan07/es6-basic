/**
 * Created by yangHuan on 17/9/18.
 */

// 1. array，按照对应位置，对变量赋值（用 , 分割，按位置赋值）。
// 先赋值，如果赋值的是undefined, 再用它的默认值
{
    let [foo, [[bar], baz]] =[1, [[2], 3]]; // 可用于嵌套结构
    console.log(foo, bar, baz);

    let [head, ...tail]=[1, 2, 3, 4];
    console.log(head, tail);

    // 解构不成功，变量的值为：undefined
    let [x, y, ...z]=['a'];
    console.log(x, y, z);
}

// 不完全解构

//  等号右边的不是数组会报错（不是可遍历的结构）
{
    let [foo]='a'; // 1,false,NaN,undefined,null,{},
}

// to add examples

// 默认值 生效的条件是：undefined, ===比较
{
    var [x1, y1 = 'b']=['a'];
    console.log(x1, y1);

    var [x1, y1 = 'b']=['a', undefined];
    console.log(x1, y1);

    var [x1, y1 = 'b']=['a', null];
    console.log(x1, y1, 'y1没有取到默认值');
}

// 默认值是一个表达式 惰性求值 to add
{

}

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
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


// 2. object 按照左右侧对象的属性名，对左侧对象的变量名赋值，
// 左侧对象的属性名、变量名一致，可以省略一个，
// 解构失败，变量的值等于undefined
{
    let { foo, bar, baz } = { bar: 'bbb', foo: 'aaa' };
    console.log('object destructure => ', foo, bar, baz);
}
{
    // 属性名，变量名不一致，不可以省略
    let { foo, bar:baz } = { foo: 'aaa', bar: 'bbb' };
    console.log(foo, baz);
    // console.log(bar); // error foo is not defined
}
{
    let { p:[x, { y }] } = { p: ['hello', { y: 'world' }] };
    console.log('可用于嵌套结构 => ', x, y);

    let { loc, loc:{ start }, loc:{ start:{ line, column } } } = { loc: { start: { line: 1, column: 5 } } };
    console.log(loc, start, line, column);
}

// 指定默认值（从右侧匹配到的值是undefined, 指定的默认值才生效）
{
    var { x = 33 }={};
    console.log(x);

    var { x:y = 34 }={};
    console.log(y);

    var { x = 35 }={ x: null };
    console.log(x);
}


// to add


// 3. String
{
    const [a, b, c, d, e] = 'hello';
    console.log('3. String => ', a, b, c, d, e);
    const { length:helloLen } = 'hello';
    console.log('3. String => ', helloLen);
}


// 4. Number, Boolean
// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象
//  等号右边的是undefined, null, 会报错
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

    console.log('5. Function => ', add([4, 5]));

    [[1, 2], [3, 4], [undefined, undefined]].map(([x = 2017, y = 2017]) =>{
        console.log('5. Function => ', x + y)
    });
}
{
    function move({ x = 9, y = 9 } = {}){
        console.log('// 5. 函数参数的解构使用默认值', x, y);
    }

    move({ x: 1, y: 2 });
    move({ x: 1 });
    move({ y: 2 });
    move({});
    move();

    function move2({ x, y } = { x: 9, y: 9 }){
        console.log('// 5. 为函数参数指定默认值', x, y);
    }

    move2({ x: 1, y: 2 });
    move2({ x: 1 });
    move2({ y: 2 });
    move2({});
    move2();
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
        return [11, 22, 33];
    }

    let [a, b, c] = example();
    console.log('函数返回数组 解构 => ', a, b, c);
}
{
    function example(){
        return { foo: 'foo', bar: 'bar' };
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
//(7)  to add