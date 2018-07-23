/**
 * Created by yanghuan on 18/7/6.
 */

import getJSON from './getJSON';

// example4
{
    getJSON('./14.json').then(function(value){
        console.log(`example4 resolve callback ${JSON.stringify(value)}`);
    }, function(error){
        console.log(`example4 reject callback ${error}`);
    });
}


// 3.then
// 返回的是 一个新的Promise实例  可以采用链式写法
{
    getJSON('./14.json').then((value) =>{
        console.log('采用链式写法    ', value);
        return value.code; // 可以是一个Promise实例
    }).then((code) => console.log(code));
}


// 4.catch
// .then(null, ()=>{})别名
{
    getJSON('./14.json')
        .then((value) => console.log('fulfilled: ,', value))
        .catch((error) => console.log('rejected:  ,', error));
}
{
    getJSON('./142.json')
        .then((value) => console.log('fulfilled: ,', value))
        .then(null, (error) => console.log('rejected:  ,', error));
}

// catch的三种写法
{
    const promise = new Promise((resolve, reject) =>{
        throw new Error('test');
    });
    promise.catch((error) =>{
        console.log('catch的三种写法1,', error);
    });
}

{
    const promise = new Promise((resolve, reject) =>{
        reject(new Error('test2')); // reject方法的作用，等同于抛出错误
    });
    promise.catch((error) =>{
        console.log('catch的三种写法2,', error);
    });
}

{
    const promise = new Promise((resolve, reject) =>{
        try {
            throw new Error('test3');
        } catch (ex) {
            reject(ex);
        }
    });
    promise.catch((error) =>{
        console.log('catch的三种写法3,', error);
    });
}

// Promise状态已经变成resolved（永久保持该状态，不会再变了），再抛出错误是无效的
// 考点 ！！
{
    const promise = new Promise((resolve, reject) =>{
        resolve('考点 999');
        throw new Error('error 999');
    });

    promise.then((val) => console.log(val))
        .catch((err) => console.log(err));
}

// Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应
let someAsyncThing = null;
{
    someAsyncThing = () =>{
        return new Promise((resolve, reject) =>{
            resolve(x + 2);
        });
    };

    someAsyncThing().then(() =>{
        console.log('everythiing is great ' +
            '不会退出进程、终止脚本执行' +
            'Promise内部的错误不会影响到Promise外部的代码，' +
            'Promise会吃掉错误，后续代码继续执行');
    });

    setTimeout(() => console.log(123), 1000);

    // 专门监听未捕获的reject错误  to add
}

{
    const promise = new Promise((resolve, reject) =>{
        resolve('ok');
        setTimeout(() =>{
            throw new Error('test'); // 这个错误是在Promise函数体外抛出的，会冒泡到最外层，成了未捕获的错误
        }, 0);
    });

    promise.then(value => console.log(value));
}

{
    someAsyncThing()
        .catch(error => console.log('oh no', error))
        .then(() => console.log('carry on'));
}
// to add examples


// 6. Promise.all(Array 成员是Promise实例)
// 都成功或者其一失败 才去执行then,catch
{
    const promises = [1, 2].map((item) => getJSON(`./promiseAllTest${item}.json`));

    Promise.all(promises)
        .then(([value, value2]) => console.log('6  ', value, value2))
        .catch(([error, error2]) => console.log('6 error ', error, error2));
}

// Promise.all 作为参数的Promise实例，自己定义了catch方法，那么它一旦被rejected，
// 并不会触发Promise.all()的catch方法  不会影响彼此的执行  better
{
    const p1 = new Promise((resolve, reject) =>{
        resolve('62  hello');
    })
        .then(value => value)
        .catch(e => e);

    const p2 = new Promise((resolve, reject) =>{
        throw new Error('62  报错了');
    })
        .then(value => value)
        .catch(e => e);

    Promise.all([p1, p2])
        .then(([value, value2]) => console.log(value, value2))
        .catch(([e, e2]) => console.log(e, e2));
}

// Promise.all   实例没有自己的catch 才会触发Promise.all()的catch方法
// 会影响整体的执行结果！！
{
    const p1 = new Promise((resolve, reject) =>{
        resolve('62  hello');
    })
        .then(value => value);

    const p2 = new Promise((resolve, reject) =>{
        throw new Error('62  报错了');
    })
        .then(value => value);

    /* Promise.all([p1, p2])
     .then(([value,value2]) => console.log(value,value2))
     .catch(([e,e2]) => console.log(e,e2));*/
}


// 7. Promise.race
{
    const promises = [1, 22].map((item) => getJSON(`./promiseAllTest${item}.json`));

    /*Promise.race(promises)
     .then(([value, value2]) => console.log('7  ', value, value2))
     .catch(([error, error2]) => console.log('7 error ', error, error2));*/
}

// 8. Promise.resolve
{
    var foo = Promise.resolve('foo');

    var foo2 = new Promise(resolve => resolve('foo'));

    console.log('foo,foo2 => ', foo, foo2)
}
{
    let thenable = {
        then: function(resolve, reject){
            resolve(42);
        }
    };

    let p1 = Promise.resolve(thenable);
    p1.then(value => console.log('thenable => ', value));
}
{
    const p = Promise.resolve('Hello');
    p.then(s => console.log('参数不是具有then方法的对象 =>', s));
}
{
    const p = Promise.resolve();
    p.then(function(){

    });
}

// 9.Promise.reject
{
    const p = Promise.reject('出错了');

    const p2 = new Promise((resolve, reject) => reject('出错了'));
    p2.then(null, function(e){
        console.log(e);
    });
    console.log('p,p2 => ', p, p2)
}
{
    const thenable = {
        then(resolve, reject){
            reject('出错了');
        }
    };

    Promise.reject(thenable).catch(e => console.log('e === thenable => ', e === thenable))
}