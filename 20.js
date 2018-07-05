/**
 * Created by yangHuan on 17/11/13.
 */

// 1.
{
    class Point {
        constructor(x, y){
            this.x = x;
            this.y = y;
        }

        toString(){
            return this.x + ' super class ' + this.y;
        }

        // 父类的静态方法，也会被子类继承
    }

    class ColorPoint extends Point {
        constructor(x, y, color){
            super(x, y); // 1.调用父类的 constructor(x, y） ！！必须的
            this.color = color; // 只有调用super之后，子类才有this对象，才可以添加子类的属性
        }

        toString(){
            return super.toString() + ' , ' + this.color; //  调用父类的 toString(x, y）
        }
    }

    class ColorPoint2 extends Point {
        constructor(...args){ // 2.不显示定义的话，会被默认添加
            super(...args);
        }
    }

    console.log(Object.getPrototypeOf(ColorPoint) === Point); // 从子类上获取父类
    console.log(Object.getPrototypeOf(ColorPoint2) === Point, Point);
}


// 3. super
// a.作为函数调用时，代表父类的构造函数；
{
    class A {
        constructor(){
            console.log('作为函数调用时 => ', this); // new.target指向当前正在执行的函数
        }
    }
    class B extends A {
        constructor(){
            super(); // A.prototype.constructor.call(this)
            // this => 子类
        }
    }
    new A();
    new B();
}

// b.super作为对象时，
// 在普通方法中，指向父类的原型对象；父类方法被子类调用，this => 子类实例
// 在静态方法中，指向父类
{
    class A {
        p(){
            return 2;
        }
    }
    class B extends A {
        constructor(){
            super();
            console.log('在普通方法中 => ', super.p()); // super => 父类的原型
        }
    }
    new B();
}

// 拿不到父类的实例属性，可以拿到原型属性
{
    class A {
        constructor(){
            this.p = 3;
        }
    }
    class B extends A {
        get m(){
            return super.p;
        }
    }
    let b = new B();
    console.log(b, b.m);
}

{
    class A {
    }
    A.prototype.xx = 'xx';

    class B extends A {
        constructor(){
            super();
            console.log('属性定义在父类的原型对象上，可以取到值 => ', super.xx);
        }
    }
    new B();
}

{
    class A {
        constructor(){
            this.x = 'A';
        }

        print(){
            console.log(this.x);
        }
    }

    class B extends A {
        constructor(){
            super();
            this.x = 'B';
        }

        m(){
            super.print(); // 普通方法中，通过super调用父类的方法，this指向当前实例
            // => super.print.call(this)
        }
    }
    var a = new A();
    var b = new B();
    a.print();
    b.m();
}

// 通过super对某个属性赋值，这时super就是this，改变的是子类的实例属性
{
    class A {
        constructor(){
            this.x = 91;
        }
    }
    class B extends A {
        constructor(){
            super();
            this.x = 92; // this => 子类实例
            super.x = 93; // 赋值的属性会变成子类实例的属性
            console.log(super.x); // ?? undefined
            console.log(this.x); // ?? 为啥不是93
        }
    }
    new B();
}

{
    class Parent {
        static myMethod(msg){
            console.log('static => ', msg);
        }

        myMethod(msg){
            console.log('instance => ', msg)
        }
    }

    class Child extends Parent {
        static myMethod(msg){
            super.myMethod(msg); // super => 父类
        }

        myMethod(msg){
            super.myMethod(msg); // super => 父类原型
        }
    }

    Child.myMethod(1);

    new Child().myMethod(2);
}

{
    class A {
        constructor(){
            this.x = 1;
        }

        static print(){
            console.log(this.x);
        }
    }

    class B extends A {
        constructor(){
            super();
            this.x = 2;
        }

        static m(){
            super.print();
        }
    }

    B.x = 3;
    B.m();
}


// 4.__proto__
// prototype 存在2条继承链
{
    class A {

    }

    class B extends A {

    }

    console.log('构造函数的继承 => ', B.__proto__ === A); // => 父类
    console.log('方法的继承 => ', B.prototype.__proto__ === A.prototype); // => 父类原型
}

// 类的继承 实现模式
{
    class A {

    }

    class B {

    }

    Object.setPrototypeOf(B, A);
    Object.setPrototypeOf(B.prototype, A.prototype);
}

// to add other


// 5. 无法继承原生构造函数
{
    function MyArray(){
        Array.apply(this, arguments);
    }

    MyArray.prototype = Object.create(Array.prototype, {
        constructor: {
            value: MyArray,

        }
    });

    var colors = new MyArray();
    colors[0] = 'red';
    console.log(colors, colors.length);

    var colors2 = new Array();
    colors2[2] = 'red';
    console.log(colors2, colors2.length);
}

// ES6 允许继承原生构造函数定义子类
{
    class MyArray extends Array {
        constructor(...args){
            super(...args);
        }
    }

    var colors = new MyArray();
    colors[0] = 'red';
    console.log(colors, colors.length);

    var colors2 = new Array();
    colors2[2] = 'red';
    console.log(colors2, colors2.length);
}

// 带版本功能的数组 to add
{

}

// Error example
{
    class ExtendableError extends Error {
        constructor(message){
            super();
            this.message = message;
            this.stack = (new Error()).stack;
            this.name = this.constructor.name;
        }
    }

    class MyError extends ExtendableError {
        constructor(m){
            super(m);
        }
    }

    var myerror = new MyError('11');
    console.log(myerror.message, myerror.name, myerror.stack);
}

// to add 行为差异