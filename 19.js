/**
 * Created by yangHuan on 17/9/18.
 */

const methodName = 'getSum';
class Point {
    // 可以看作构造函数的另一种写法
    // 默认严格模式
    constructor(x, y) { // 类的默认方法 没有显示定义，空的constructor会被默认添加
        this.x = x; // this => 实例对象
        this.y = y;
    }

    toString() {
        return '(' + this.x + ',' + this.y + ')';
    }

    // 类的属性名可以采用表达式
    [methodName]() {
        return this.x * this.y;
    }
}

console.log(Object.prototype.toString.call(Point));
console.log(typeof Point);
console.log(Point);
console.log(Point.prototype.constructor);
console.log(Point.prototype.constructor === Point);

const point = new Point(3, 4);
console.log(point.toString(), point.getSum());


function Point2(x, y) {
    this.x = x;
    this.y = y;
}

Point2.prototype.toString = function() {
    return '(' + this.x + ',' + this.y + ')';
};
var point2 = new Point2(32, 42);
console.log(point2.toString());