/**
 * Created by yangHuan on 17/9/14.
 */

import loadImageAsync from './loadImageAsync';

// 2.
{
    const promise = new Promise(function(resolve, reject){
        // ... code

        if (true) {
            //resolve(value); // 可以是 正常的值／Promise实例 => example5
        } else {
            //reject(error); // 可以是 error实例
        }
    });

    promise.then(function(value){ // 成功，失败的回调写法1
        ;
    }, function(error){ // 可选回调函数
        ;
    });

    promise
        .finally(() =>{
        });

    promise
        .then((value) =>{ // 成功，失败的回调写法2  better
            ;
        })
        .catch((error) =>{
            ;
            // then方法的回调函数，运行中抛出错误，不写的话，内部错误不会反应到外部
            // 一般总是建议，Promise 对象后面要跟catch方法，可以处理Promise 对象抛出的错误

            // Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止；
            // catch方法捕获promise、前一个回调函数运行时发生的错误
        });
}

// example1 ? ?
{
    function timeout(ms){
        return new Promise((resolve, reject) =>{
            setTimeout(resolve, ms, 'example1          >');
        });
    }

    timeout(0).then((value) =>{
        console.log(value);
    });
}

// example2 考点
{
    // 新建Promise 会立即执行，无法中途取消 ！！
    let promise = new Promise(function(resolve, reject){
        resolve('example2 third');
        console.log('example2 first');
    });

    // 在本轮“事件循环”结束时执行
    promise.then(function(value){
        console.log(`${value} resolved. `);

    });

    // 立即执行
    console.log('example2 second');

    // 在下一轮“事件循环”开始时执行
    setTimeout(() =>{
        console.log('example2 last');
    }, 0);
}

// example3
{
    loadImageAsync('./bd_logo1.png') // step1
        .then((value) =>{
            console.log(value); // step6
        }, (error) =>{
            console.log(error);
        });
    loadImageAsync('https://www.baidu.com/img/bd_logo11.png') // step3
        .then((value) =>{
            console.log(value);
        }, (error) =>{
            console.log(error); // step8
        });
}


// resolve参数：Promise的实例
// p1的状态是pending, p2的回调函数会等待p1的状态改变；
// p1的状态已经是resolved/rejected, p2的回调函数才会立刻执行
// example5 to do
{
    const p1 = new Promise(function(resolve, reject){
        setTimeout(() => reject(new Error('fail  example5')), 3000);
    });

    const p2 = new Promise(function(resolve, reject){
        setTimeout(() => resolve(p1), 1000); // p1是Promise实例，rejected
    });

    p2
        .then(value => console.log(value))
        .catch(error => console.log(error));
}

// 调用resolve或reject并不会终结 Promise的参数函数的执行
// example6
{
    new Promise((resolve, reject) =>{
        resolve('example6  _2');
        console.log('example6  _1');
    }).then((value) =>{
        console.log(value + 'resolve执行后，后面语句 会执行');
    });

    new Promise((resolve, reject) =>{
        return resolve('example6  _11'); // 后面语句不会执行
        console.log('example6  _22'); // 可以放在成功的回调内执行
    }).then((value) =>{
        console.log(value + 'return resolve执行后，后面语句 不会执行');
    });
}