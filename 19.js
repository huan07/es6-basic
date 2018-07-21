/**
 * Created by yangHuan on 17/9/18.
 */

// 1.
{
    function Point(x, y){
        this.x = x;
        this.y = y;
    }

    Point.prototype.toString = function(){ // 可枚举 ！！区别1
        console.log(this.x + ' -Point- ' + this.y);
    };

    var p = new Point(1, 2);
    p.toString();

    console.log(Object.keys(p), Object.keys(Point.prototype));
    console.log(Object.getOwnPropertyNames(p), Object.getOwnPropertyNames(Point.prototype));
}
{
    class PointP {
        constructor(x, y){
            this.x = x;
            this.y = y;
        }

        toString(){ // 类的所有方法都是定义在prototype属性上  // 不可以枚举 ！！
            console.log(this.x + ' -Point- ' + this.y);
        }
    }

    var pp = new PointP(11, 22);
    pp.toString();

    console.log(Object.keys(p), Object.keys(PointP.prototype));
    console.log(Object.getOwnPropertyNames(p), Object.getOwnPropertyNames(PointP.prototype));

    console.log(typeof PointP, PointP.prototype.constructor === PointP, pp.constructor === PointP);
}
{
    // 类的属性名可以采用表达式
    const methodName = 'getSum';
    class Point {
        constructor(x, y){
            // 类的默认方法；
            // 如果没有显示定义，JavaScript引擎会添加空的constructor方法
            // 通过 new命令生成实例对象，自动调用该方法，默认返回this对象
            this.x = x; // this => 实例对象 ！！！！
            this.y = y;
        }

        toString(){
            return `(${this.x},${this.y})`;
        }

        [methodName](){
            return this.x + this.y;
        }
    }
    var point = new Point(3, 4);
    console.log(point.toString(), point.getSum());
}


// 2.类和模块的内部，默认就是use strict


// 3.
{
    class Foo {
        constructor(){
            // 指定返回另外一个对象
            return Object.create(null);
        }
    }

    const foo = new Foo();
    console.log(foo, foo instanceof Foo);
    // console.log(Foo()); // 必须用new调用，否则error  ( es5可以不用new ！！)
}

// 4.类的实例对象
// 类的所有实例共享一个原型对象


// 5. Class表达式
{
    const MyClass = class Me { // Me只在 Class 的内部代码可用，指代当前类 在外部用会报错
        getClassName(){
            return Me.name;
        }
    };

    let inst = new MyClass();
    console.log('5. => ', inst.getClassName());
}
{
    const MyClassX = class {
        xx(){
            console.log('内部没有用到，可以省略');
        }
    };
    new MyClassX().xx();
}

// 立即执行的Class
{
    const person = new class {
        constructor(name){
            this.name = name;
        }

        sayName(){
            console.log('立即执行的Class => ', this.name);
        }
    }('ycg');
    person.sayName();
}


// 6.不存在变量提升
// 类定义后，方便被子类继承


// 7.私有方法和私有属性（es6不提供）to do
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


// 8.类的方法内部this，它默认 => 类的实例
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
    // printName(); // error 提取出来单独使用，this => 该方法运行时所在的环境（严格模式 => undefined）
}

{
    // 解决方法1:
    class Logger2 {
        constructor(){
            this.printName = this.printName.bind(this); // 编译后 被转换为实例方法
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
}
{
    // 解决方法2:
    class Logger3 {
        printName = (name = 'there') =>{ // 编译后 被添加到构造函数里面去了，也被转换为实例方法
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


// 9.name
{

}


// 10.Class 的取值函数（getter）和存值函数（setter）
{
    class MyClass {

        get prop(){
            return 'getter';
        }

        set prop(value){
            console.log(`setter: ${value}`);
        }
    }

    let inst = new MyClass();

    inst.prop = 123;

    console.log(inst.prop);
}
// to add example


// 11.Class 的 Generator 方法
{
    class Foo {
        constructor(...args){
            this.args = args;
        }

        *[Symbol.iterator](){ // 返回一个Foo类的默认遍历器
            for (let arg of this.args) {
                yield arg;
            }
        }
    }

    for (let x of new Foo('hello', 'world')) {
        console.log('Generator 方法 => ', x);
    }
}


// 12.static方法 (内部的this => 类)
// static方法直接被类调用，不会被实例继承；
// static方法可以被子类继承；
// static方法也是可以从super对象上调用的；
{
    class Foo {
        static classMethod(){
            console.log('static方法 直接被类调用，不会被实例继承；');
        }
    }

    Foo.classMethod();

    var foo = new Foo();
    // foo.classMethod(); // error
}
{
    class Foo2 {
        static bar(){
            this.baz();
        }

        static baz(){
            console.log('static方法 内部的this => 类');
        }

        baz(){
            console.log('原型方法，被实例共享的方法');
        }
    }

    Foo2.bar();

    Foo2.baz();

    new Foo2().baz();
}
{
    class Foo3 {
        static classMethod(){
            console.log('static方法 可以被子类继承');
        }
    }

    class Bar extends Foo3 {
    }

    Bar.classMethod();
}
{
    class Foo4 {
        static classMethod(){
            return 'static方法 可以被子类从super对象上调用';
        }
    }

    class Bar extends Foo4 {
        static classMethod(){
            return super.classMethod() + ', too';
        }
    }

    console.log(Foo4.classMethod(), Bar.classMethod());
}


// 13.static属性、实例属性
{
    class Foo {
    }
    Foo.prop = 11; // 老的写法
    console.log(Foo, Foo.prop);
}
{
    class MyClass {
        static myStaticProp = 44; // 类的静态属性

        constructor(){
            console.log('MyClass.myStaticProp => ', MyClass.myStaticProp);
        }
    }
    new MyClass();
}
{
    class MyClass {
        myProp = 42; // 类的实例属性  新的写法，老写法放在constructor内；

        constructor(){
            console.log('this.myProp => ', this.myProp);
        }
    }
    new MyClass();
}


// 15. new.target 用在构造函数，返回new的构造函数名，如果不是用new调用的，返回undefined
// 用在Class 返回当前的Class；子类继承父类时，new.target会返回子类；
// 可以写出不能独立使用、必须继承后才能使用的类
{
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
    // Person2('xiaoMing'); // error
}

{
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
            console.log('子类继承父类时，new.target会返回子类')
        }
    }
    new Square(5);
}

{
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

    // new Shape(); // error
    new Circle(66);
}