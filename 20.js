/**
 * Created by yangHuan on 17/11/13.
 */

// 子类没有自己的this对象，而是继承父类的this对象
// 如果不在constructor方法 调用super方法，子类就得不到this对象 新建实例会报错
{
    class Point {
        constructor(x, y){
            this.x = x;
            this.y = y;
        }

        toString(){
            console.log(this.x + ' super class ' + this.y);
        }

        // 父类的静态方法，也会被子类继承
    }

    class ColorPoint extends Point {
        constructor(x, y, color){
            super(x, y); // 1.调用父类的 constructor(x, y） ！！必须的
            this.color = color; // 只有调用super之后，才可以使用this关键字
        }

        toString(){
            return this.color + '' + super.toString(); //  调用父类的 toString(x, y）
        }
    }

    class ColorPoint2 extends Point {
        constructor(...args){ // 2.不显示定义的话，会被默认添加
            super(...args);
        }
    }

    console.log(Object.getPrototypeOf(ColorPoint)); // 从子类上获取父类
    console.log(Object.getPrototypeOf(ColorPoint2));
}


// 3. super
// 作为函数调用时，代表父类的构造函数；
// super()只能用在子类的构造函数之中，用在其他地方就会报错；


// super调用父类的方法时，方法内部的this指向子类 ！！！！
{
    class A {
        constructor(){
            console.log(new.target.name); // new.target指向当前正在执行的函数
        }
    }
    class B extends A {
        constructor(){
            super(); // A.prototype.constructor.call(this)
        }
    }
    // console.log(new A(),new B()); why error
}

// super作为对象时，在普通方法中，指向父类的原型对象！！
// 在静态方法中，指向父类
{
    class A2 {
        p(){
            return 2;
        }
    }
    class B2 extends A2 {
        constructor(){
            super();
            console.log(super.p(), '在普通方法中，指向父类的原型对象');
        }
    }
    new B2();
}

// 拿不到父类的实例属性！！
{
    class A3 {
        constructor(){
            this.p = 3; // 实例属性
        }
    }
    class B3 extends A3 {
        get m(){
            return super.p;
        }
    }
    let b = new B3();
    console.log(b, b.p); // 并不是 undefined ？？？why
}

{
    class A4 {
    }
    A4.prototype.xx = 'xx';
    class B4 extends A4 {
        constructor(){
            super();
            console.log(super.xx, '属性定义在父类的原型对象上，可以取到值');
        }
    }
    new B4();
}

// this指向子类
{
    class A5 {
        constructor(){
            this.x = 11;
        }

        print(){
            console.log(this.x);
        }
    }
    class B5 extends A5 {
        constructor(){
            super();
            this.x = 22;
        }

        m(){
            super.print(); // 普通方法中，通过super调用父类的方法，this指向当前实例
            // => super.print.call(this)
        }
    }
    var a5 = new A5();
    var b5 = new B5();
    a5.print();
    b5.m();
}

// 通过super对某个属性赋值，这时super就是this，改变的是子类的实例属性
{
    class A6 {
        constructor(){
            this.x = 111;
        }
    }
    class B6 extends A6 {
        constructor(){
            super();
            this.x = 222; // this => 子类实例
            super.x = 333; // 赋值的属性会变成子类实例的属性
            console.log(super.x); // ?? undefined
            console.log(this.x);
        }
    }
    new B6();
}

// super作为对象 用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
// to add


// 4. prototype __proto__  存在2条继承链
{
    class A {

    }

    class B extends A {

    }

    console.log(B.__proto__ === A); // 构造函数的继承，指向父类
    console.log(B.prototype.__proto__ === A.prototype); // 方法的继承
}

// 类的继承 实现模式