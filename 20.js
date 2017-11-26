/**
 * Created by yangHuan on 17/11/13.
 */

// 子类没有自己的this对象，而是继承父类的this对象
// 如果不在constructor方法 调用super方法，子类就得不到this对象 新建实例会报错
// 没有constructor方法 这个方法会默认被添加

class Point {

}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的 constructor(x, y）
        this.color = color;
    }

    toString() {
        return this.color + '' + super.toString(); //  调用父类的 toString(x, y）
    }

    // 父类的静态方法，也会被子类继承
}

class ColorPoint2 extends Point {
    constructor(...args) {
        super(...args); // Point.prototype.constructor.call(this)
    }
}

// 2. Object.getPrototypeOf方法可以用来从子类上获取父类
console.log(Object.getPrototypeOf(ColorPoint2), Point, Object.getPrototypeOf(ColorPoint2) === Point);

// 3. super
// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错
// super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类

// super调用父类的方法时，方法内部的this指向子类 ！！！！
class A {
    constructor() {
        console.log(new.target.name);
    }
}
class B extends A {
    constructor() {
        super();
    }
}
// new A();  ??
// new B();  ??

class A2 {
    p() {
        return 2;
    }
}
class B2 extends A2 {
    constructor() {
        super();
        console.log(super.p(), '在普通方法中，指向父类的原型对象');
    }
}
new B2();

// 拿不到父类的实例属性！！！！
class A3 {
    constructor() {
        this.pp = 3; // 实例属性
    }
}
class B3 extends A3 {
    get m() {
        return super.pp;
    }
}
var b3 = new B3();
console.log(b3, b3.pp); // 并不是 undefined ？？？why

class A4 {
}
A4.prototype.xx = 'xx';
class B4 extends A4 {
    constructor() {
        super();
        console.log(super.xx, '属性定义在父类的原型对象上，可以取到值');
    }
}
new B4();

// this指向子类
class A5 {
    constructor() {
        this.x = 11;
    }

    print() {
        console.log(this.x);
    }
}
class B5 extends A5 {
    constructor() {
        super();
        this.x = 22;
    }

    m() {
        super.print(); // => super.print.call(this)
    }
}
var a5 = new A5();
var b5 = new B5();
a5.print();
b5.m();


class A6 {
    constructor() {
        this.x = 111;
    }
}
class B6 extends A6 {
    constructor() {
        super();
        this.x = 222;
        super.x = 333; // super 就是this
        console.log(super.x);//  读取的是A6.prototype.x
        console.log(this.x);//  为啥不是333 ？？？？？？？
    }
}
new B6();

// super作为对象 用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
// to add


// 4. prototype __proto__ to_learn
class Aa {

}

class Bb extends Aa {

}
console.log(Bb.__proto__ === Aa);
console.log(Bb.prototype.__proto__ === Aa.prototype);





