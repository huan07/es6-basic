/**
 * Created by yangHuan on 17/9/14.
 */

var promise = new Promise(function(resolve, reject) {
    // ... code

    if (true) {/* 异步操作成功 */
        //resolve(value); // value可以是正常的值，也可以是Promise实例 =>example 5
    } else {
        //reject(error);
    }
});

// Promise的实例如下调用，或者紧跟在await后面 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
promise.then(function(value) { // 成功，失败的回调写法1
    // success
}, function(error) {
    // failure 可选的function
});

promise
    .then((value) => { // 成功，失败的回调写法2 better code
        // 状态变为resolved执行
    })
    .catch((error) => {
        // 状态变为rejected执行
        // then方法的回调函数，运行中抛出错误
        // Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
        // 一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误
    });


// example1
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'why  to learn latter');
    });
}
timeout(0).then((value) => {
    console.log(value);
});

// example2
var promise = new Promise(function(resolve, reject) { // 新建Promise 立即执行 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('first ');
    resolve('third ');
});
promise.then(function(value) {
    console.log('resolved. ' + value); // 当前脚本所有同步任务执行完才会执行
});
console.log('second ');

// example3
function loadImageAsync(url) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return new Promise(function(resolve, reject) {
        const image = new Image();

        image.onload = function() {
            resolve(image); // step5
        };

        image.onerror = function() {
            reject(new Error('Could not load image at ' + url)); // step7
        };

        image.src = url; // step2 step4
    });
}
loadImageAsync('http://www.dpfile.com/s/c/app/main/index-header/i/new-logo@2x.d69880053e4a48c7742e9e57bd432c9d.png') // step1
    .then((value) => {
        console.log(value); // step6
    }, (error) => {
        console.log(error);
    });
loadImageAsync('http://www.dpfile.com/s/c/app/main/index-header/i/new-logo@2x.d69880053e4a48c7742e9e57bd432c9d.png-error-test') // step3
    .then((value) => {
        console.log(value);
    }, (error) => {
        console.log(error); // step8
    });

// example4
var getJSON = function(url) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var promise = new Promise(function(resolve, reject) {
        var client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();

        function handler() {
            if (this.readyState !== 4) {
                return false;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    });
    return promise;
};
getJSON('./14.json').then(function(value) {
    console.log(`getJSON resolve callback ${JSON.stringify(value)}`);
}, function(error) {
    console.log(`getJSON reject callback ${error}`);
});

// resolve函数的参数还可以是一个Promise的实例
// p1的状态是pending, p2的回调函数会等待p1的状态改变；
// p1的状态已经是resolved, p2的回调函数才会立刻执行
// example5 to_learn latter
var p1 = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('fail  example5')), 3000)
});
var p2 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
});

p2
    .then(value => console.log(value))
    .catch(error => console.log(error));

// example6  调用resolve或reject并不会终结 Promise 的参数函数的执行
new Promise((resolve, reject) => {
    resolve('_1');
    console.log('_2'); // 先执行
}).then((value) => {
    console.log(value + 'resolve执行后，后面代码继续执行')
});
new Promise((resolve, reject) => {
    return resolve('_11');
    console.log('_22'); // 不会执行
}).then((value) => {
    console.log(value + '加上return resolve执行后，后面代码不会继续执行')
});

// Promise.prototype的方法then,catch

// 3 then返回的是一个新的Promise实例    采用链式写法
getJSON('./14.json').then((value) => {
    console.log('采用链式写法    ', JSON.stringify(value));
    return value.code; // 可以是一个Promise实例
}).then((code) => console.log(code));

// Promise.prototype.catch方法是.then(null, ()=>{}) 别名
getJSON('./142.json')
    .then((value) => console.log('fulfilled: ,', value))
    .catch((error) => console.log('rejected:  ,', error));

getJSON('./143.json')
    .then((value) => console.log('fulfilled: ,', value))
    .then(null, (error) => console.log('rejected:  ,', error));

// example2  catch的三种写法
var promise1 = new Promise((resolve, reject) => {
    throw new Error('test');
});

var promise2 = new Promise((resolve, reject) => {
    try {
        throw new Error('test');
    } catch (ex) {
        reject(ex);
    }
});

var promise3 = new Promise((resolve, reject) => {
    reject(new Error('test'));
});

promise1.catch((error) => {
    console.log('catch1:  ,', error);
});
promise2.catch((error) => {
    console.log('catch2:  ,', error);
});
promise3.catch((error) => {
    console.log('catch3:  ,', error);
});

//  没有使用 catch方法指定错误处理的回调函数，Promise
//  对象抛出的错误不会传递到外层代码，不会有任何反应
const someAsyncThing = () => {
    return new Promise((resolve, reject) => {
        resolve(x + 2);
    });
};

someAsyncThing().then(() => {
    console.log('everythiing is great ' +
        '不会退出进程、终止脚本执行' +
        'Promise内部的错误不会影响到Promise外部的代码，Promise会吃掉错误')
});

someAsyncThing()
    .then(() => {
    })
    .catch((error) => {
        return console.log('catch捕获到错误       ：' + error);
    });
// to add example


// 5. Promise.all(Array 成员是Promise实例)  都成功或者其一失败 才去执行then,catch
var promises = [1, 2, 3].map((item) => getJSON(`./promiseAllTest${item}.json`));

Promise.all(promises)
    .then((value) => {
        // 等结果都返回了才会触发
        console.log('Promise.all  ', value)
    })
    .catch((error) => {
        console.log(error)
    });

// Promise.all   每个实例有自己的catch 并不会触发Promise.all()的catch方法
// 不会影响彼此的执行
// better code ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
let test1 = getJSON('./promiseAllTest11.json')
    .then((value) => value)
    .catch((error) => error);
let test2 = getJSON('./promiseAllTest2.json')
    .then((value) => value)
    .catch((error) => error);
Promise.all([test1, test2])
    .then(value => console.log('Promise.all  ', value))
    .catch(error => console.log(error));

// Promise.all   实例没有自己的catch 才会触发Promise.all()的catch方法
// 会影响整体的执行结果
let test3 = getJSON('./promiseAllTest3.json')
    .then(value => value);
let test4 = getJSON('./promiseAllTest2.json')
    .then(value => value);
Promise.all([test3, test4])
    .then(value => console.log('Promise.all', value))
    .catch(error => console.log(error));

// 6. Promise.race() ??????????????????
const racePromise = Promise.race([
    getJSON('./promiseAllTest30.json'),
    new Promise((resolve, reject) => {
        setTimeout(() =>
                reject(new Error('request timeout'))
            , 0)
    })
]);
racePromise.then(value => {
    console.log(JSON.stringify(value) + '|||||racePromise.catch')
});
racePromise.catch(ex => {
    console.log(ex + '|||||racePromise.catch')
});

// Promise.resolve()
// Promise.reject()

// 10.