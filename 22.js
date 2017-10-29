import { firstName, lastName, year, multiply, } from './22-profile'; // 与接口提供的名字要一致 一一罗列（可以取别名）
import { firstName as firstNameAS, multiply as multiplyAS } from './22-profile';
console.log(firstName, firstNameAS, lastName, year, multiply(2, 3), multiplyAS(3, 4));

import { area, circumference } from './22-circle';
import  * as circleAS from './22-circle'; // 整体加载   ＊ 指定一个对象(别名)
console.log(area(5), circumference(5), circleAS.area(5), circleAS.circumference(5));


// export default import的时候是可以任意取名字的
import exportDefaultFun from  './22-export-default'; // 匿名函数申明  优先写法
exportDefaultFun();
