/**
 * Created by yangHuan on 17/9/18.
 */

// 1.
{
    function PointTest(x, y){
        this.x = x;
        this.y = y;
    }

    PointTest.prototype.toString = function(){
        console.log(this.x + ' -PointTest- ' + this.y);
    };
    var p = new PointTest(1, 2);
    p.toString();
}
{
    class PointTest2 {
        // 可以看作构造函数的另一种写法
        // 类的所有方法都是定义在类的prototype属性上
        // 类方法是不可枚举的（ es5的原型方法是枚举的 ）！！
        constructor(x, y){
            this.x = x;
            this.y = y;
        }

        toString(){
            console.log(this.x + ' -PointTest2- ' + this.y);
        }
    }
    new PointTest2(11, 22).toString();
    console.log(typeof PointTest2, PointTest2 === PointTest2.prototype.constructor);
}
{
    const methodName = 'getSum';
    class Point {
        constructor(x, y){
            // 类的默认方法
            // 如果没有显示定义，JavaScript引擎会添加空的constructor方法
            // 通过 new 命令生成实例对象，自动调用该方法   返回实例对象
            this.x = x; // this => 实例对象 ！！
            this.y = y;
        }

        toString(){
            return '(' + this.x + ',' + this.y + ')';
        }

        // 类的属性名可以采用表达式
        [methodName](){
            return this.x * this.y;
        }
    }
    var point = new Point(3, 4);
    console.log(point.toString(), point.getSum());
}


// 2.类和模块的内部，默认就是严格模式


// 3.
{
    class Foo {
        constructor(){
            return Object.create(null); // 在这里返回另外一个对象
        }
    }
    console.log(new Foo() instanceof Foo);
    // console.log(Foo()); // 必须用new调用，否则error  ( es5可以不用new )
}


// 4.类的实例对象
// 实例的属性除非显式定义在其本身（定义在this对象）；否则都定义在原型上（class上）
// 类的所有实例共享一个原型对象
// Object.getPrototypeOf 方法来获取实例对象的原型，可以为原型添加属性／方法
{
    class Point {
        constructor(x, y){
            this.x = x;
            this.y = y;
        }

        toString(){
            console.log(this.x + ' 4.类的实例对象 ' + this.y);
        }
    }
    var point = new Point(22, 33);
    point.toString();
    console.log(point.hasOwnProperty('x'));
    console.log(point.hasOwnProperty('y'));
    console.log(point.hasOwnProperty('toString'), ' toString不是定义在this上不算实例属性 ');
    console.log(point.__proto__.hasOwnProperty('toString'));

    var point2 = new Point(22, 33);
    var point3 = new Point(222, 333);
    console.log(point2.__proto__ === point3.__proto__);


    point2.__proto__.printHello = function(){  // 不推荐使用，会影响到所有实例！！
        console.log('Hello', this.x + this.y);
    };
    point2.printHello();
    point3.printHello();
    var point4 = new Point(2222, 3333);
    point4.printHello();
}


// 5. Class 表达式
{
    const MyClassX = class Me { // Me只在 Class 的内部代码可用，指代当前类 在外部用会报错
        getClassName(){
            return Me.name;
        }
    };

    let inst = new MyClassX();
    console.log(inst.getClassName());

    const MyClassX2 = class {
        xx(){
            console.log(' 内部没有用到，可以省略 ');
        }
    };
    new MyClassX2().xx();

    // 立即执行的Class
    const myClass3 = new class {
        constructor(name){
            this.name = name;
        }

        sayName(){
            console.log(this.name + '-' + this.name);
        }
    }('ycg');
    myClass3.sayName();
}


// 6.不存在变量提升
// 类定义后，方便被子类继承


// 7.私有方法和私有属性（es6不提供）
// 变通方法模拟实现
{
    class Widget {

        // 公有方法
        foo(baz){
            this._bar(baz);
        }

        // 私有方法，但是不保险，在外部还是可以被调用的
        _bar(baz){
            return this.snaf = baz;
        }
    }
    var widget = new Widget();
    widget.foo('私有方法实现方式一 加_');
    console.log(widget.snaf);

    class Widget2 {
        // 模块内的所有方法对外都是可见的
        foo(baz){
            bar.call(this, baz);
        }
    }

    // 当前模块的私有方法 移除
    function bar(baz){
        return this.snaf2 = baz;
    }

    var widget2 = new Widget2();
    widget2.foo('私有方法实现方式二 私有方法移出模块');
    console.log(widget2.snaf2);
}
{
    const bar = Symbol('bar3');
    const snaf = Symbol('snaf3');
    class Widget3 {
        foo(baz){
            this[bar](baz);
        }

        [bar](baz){
            return this[snaf] = baz;
        }
    }
    var widget3 = new Widget3();
    widget3.foo('私有方法实现方式三 利用Symbol值的唯一性 命名私有方法名');
    console.log(widget3[snaf]);
}

// 私有属性不支持  提案：为 class 加了私有属性， ＃  to add

// 8.this的指向 （默认指向类的实例）
// 单独使用方法（比如，解构出来方法），可能会报错
{
    class Logger {
        printName(name = 'there'){
            this.print(`hello ${name}`);
        }

        print(text){
            console.log(text);
        }
    }
    const logger = new Logger();
    logger.printName();


    const { printName } = logger;
    // printName(); // error this指向该方法运行时所在的环境
}

{
    // 解决方法1:
    class Logger2 {
        constructor(){
            this.printName = this.printName.bind(this); //
        }

        printName(name = 'there'){
            this.print(`hello ${name}`);
        }

        print(text){
            console.log(text);
        }
    }
    var logger = new Logger2();
    var { printName } = logger;
    printName(`Logger2 here`);

    // 解决方法2:
    class Logger3 {
        printName = (name = 'there') =>{ //
            this.print(`hello ${name}`);
        };

        print(text){
            console.log(text);
        }
    }
    var logger = new Logger3();
    var { printName } = logger;
    printName(`Logger3 here`);

    // 解决方法3: Proxy to add
}


// 13.static 方法 (,this指的是类 )
class Foo2 {
    static classMethod(){
        console.log('hello');

        this.baz();
    }

    static baz(){
        console.log('类的静态方法，不会被实例继承，直接通过 类 调用')
    }

    baz(){
        console.log('会被 实例继承的 方法')
    }
}

Foo2.classMethod();


class Foo3 {
    static classMethod(){
        console.log('static方法 可以被子类继承');
    }
}
class Bar extends Foo3 {
}
Bar.classMethod();


class Foo4 {
    static classMethod(){
        console.log('static方法 可以被子类从super对象上调用');
    }
}
class Bar4 extends Foo4 {
    static classMethod(){
        super.classMethod();
    }
}
Bar4.classMethod();

// 14.static属性、实例属性
class Foo5 {
}
Foo5.prop = 11; // 老的写法
console.log(Foo5, Foo5.prop)

// 静态属性提案
// 新的写法
// 类的实例属性、静态属性
class MyClass {
    myProp = 42;

    constructor(){
        console.log(this.myProp);
    }
}
new MyClass();

class MyClass2 {
    static myProp = 44;

    constructor(){
        console.log(MyClass2.myProp);
    }
}
new MyClass2();

// 15. new.target 用在构造函数，返回new的构造函数名，如果不是用new调用的，返回undefined
// 用在Class 返回当前的Class；被子类继承返回子类名
// 可以被用在，不能独立使用，必须继承才能使用的类
function Person(name){
    if (new.target === Person) {
        this.name = name;
    } else {
        throw new Error('必须使用new命令生成实例');
    }
}

function Person2(name){
    if (new.target !== undefined) {
        this.name = name;
    } else {
        throw new Error('必须使用new命令生成实例');
    }
}

new Person('xiaoMing');
// Person2('xiaoMing'); error

class Rectangle {
    constructor(length, width){
        console.log(new.target === Rectangle, length, width);
        this.length = length;
        this.width = width;
    }
}
new Rectangle(3, 4);

class Square extends Rectangle {
    constructor(length){
        super(length, length);
    }
}
new Square(5);

class Shape {
    constructor(){
        if (new.target === Shape) {
            throw new Error('不能独立使用，被子类继承才可以使用');
        }
    }
}
class Circle extends Shape {
    constructor(radius){
        super();
        console.log('radius', radius);
    }
}
// new Shape();  error
new Circle(66);


// 类必须通过new 来调用
// 静态属性通过 类 调用，实例对象属性用 this 调用