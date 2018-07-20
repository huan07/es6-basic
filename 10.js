/**
 * Created by yangHuan on 17/10/17.
 */
// 1. 对象的key有两种类型：
// 字符串；
// Symbol：值都是不相等的，防止属性名的冲突；
{
    let s = Symbol();
    console.log(s, typeof s, Object.prototype.toString.call(s));
}
{
    let s = Symbol('foo');
    console.log(s);
}
{
    let s = Symbol({
        toString(){
            return '调用对象toString方法的返回值';
        }
    });
    console.log(s);
}

// Symbol数据类型的值是不想等，不能与其他类型的值运算，会报错
{
    const sym = Symbol('My symbol');
    console.log(String(sym), sym.toString());
    console.log(Boolean(sym), !sym);
    // console.log(Number(sym),sym+1); error
}

// 2.Symbol值作为属性名时，该属性还是公开属性，不是私有属性
{
    let mySymbol = Symbol();

    let a = {};
    a[mySymbol] = 'hello';   // 不能用点运算符，Symbol值必须放在方括号内，否则就是字符串类型属性

    let a2 = {
        [mySymbol]: 'hello',
    };

    let a3 = {};
    Object.defineProperty(a3, mySymbol, { value: 'hello' });

    console.log(a, a2, a3);
}


// 3. 消除魔术字符串
{
    const shapeType = {
        triangle: Symbol(),
        rectangle: Symbol(),
    };

    function getArea(shape, options){
        let area = 0;
        switch(shape) {
            case shapeType.triangle:
                area = .5 * options.width * options.height;
                break;
            case shapeType.rectangle:
                area = options.width * options.height;
                break;
            default:
                break;
        }
        return area;
    }

    const triangleArea = getArea(shapeType.triangle, { width: 20, height: 10 });
    const rectangleArea = getArea(shapeType.rectangle, { width: 20, height: 10 });
    console.log('triangleArea, rectangleArea => ', triangleArea, rectangleArea);
}


// 4.
// Object.getOwnPropertySymbols() 自身Symbol属性
{

    const fooBar = Symbol('fooBar');
    const fooBarU = Symbol('fooBarU'); // 定义为不可枚举

    const obj = {
        foo: 'foo string key',
        [fooBar]: 'fooBar symbol key',
    };

    Object.defineProperty(obj, 'fooU', {
        value: 'fooU',
        enumerable: false,
    });

    Object.defineProperty(obj, fooBarU, {
        value: 'fooBarU',
        enumerable: false,
    });

    for (var key in obj) {
        console.log('遍历自身＋继承的可枚举属性 => ', key)
    }

    const keys = Object.keys(obj);
    console.log('返回 可枚举的 自身属性 keys => ', keys);

    const names = Object.getOwnPropertyNames(obj);
    console.log('返回 可枚举＋不可枚举 自身属性 names => ', names);

    const symbols = Object.getOwnPropertySymbols(obj);
    console.log('返回 可枚举＋不可枚举 Symbols属性 symbols => ', symbols);

    const allKeys = Reflect.ownKeys(obj);
    console.log('allKeys => ', allKeys);
}

// 实现非私有的内部方法的效果 to add
{

}


// 5.
{
    let s1 = Symbol.for('foo'); // 被登记在全局环境供搜索
    let s2 = Symbol.for('foo');
    console.log(s1 === s2, Symbol.keyFor(s1));

    let s3 = Symbol('FOO'); // 每次都生成一个新的Symbol值
    let s4 = Symbol('FOO');
    console.log(s3 === s4, Symbol.keyFor(s3));
}
// to add example

// 6. 模块的Singleton模式

// to add example


// 7.内置的Symbol值
// to add

// Symbol.iterator => 该对象的默认遍历器方法
// for...of循环时，会调用Symbol.iterator方法
{
    const myIterable = {};
    myIterable[Symbol.iterator] = function*(){
        yield 1;
        yield 2;
        yield 3;
    };
    console.log('Symbol.iterator => ', [...myIterable]);
}
{
    class Collection {
        *[Symbol.iterator](){
            let i = 0;
            while(this[i] !== undefined) {
                yield this[i];
                ++i;
            }
        }
    }

    let myCollection = new Collection();
    myCollection[0] = 1;
    myCollection[1] = 2;

    for (let value of myCollection) {
        console.log('value => ', value);
    }
}