/**
 * Created by yangHuan on 17/9/14.
 */

var promise = new Promise(function(resolve, reject) {
    // ... code

    if (true) {/* 异步操作成功 */
        //resolve(value);
    } else {
        //reject(error);
    }
});

promise.then(function(value) { // 成功，失败的回调写法1
    // success
}, function(error) {
    // failure 可选的function
});

// example1
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done55done55');
    });
}
timeout(0).then((value) => {
    console.log(value);
});

// example2
var promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
});
promise.then(function() {
    console.log('resolved.'); // 当前脚本所有同步任务执行完才会执行
});
console.log('Hi!');

// example3
function loadImageAsync(url) {
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
var getJSON = function(url) {
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

// example5 resolve函数的参数可以是一个Promise的实例
// p1的状态是pending,p2的回调函数会等待p1的状态改变；
// p1的状态已经是resolved,rejected,p2的回调函数会立刻执行  to learn latter
var p1 = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000)
});
var p2 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
});

p2 // 成功，失败的回调写法2 better code better code
    .then(value => console.log(value))
    .catch(error => console.log(error));

// example6
new Promise(function(resolve, reject) {
    resolve('example6'); // 加上return 就不会有后续代码的执行，不会有意外；better code
    console.log(2);
}).then(v => console.log(`${v} resolved`), e => console.log(`${e} rejected`));


// Promise.prototype.then() 返回的是一个新的Promise实例， 链式写法，
getJSON('./14.json').then((value) => {
    console.log(JSON.stringify(value));
    return value.code; // 可以是一个Promise实例
}).then((code) => console.log(code));

// Promise.prototype.catch方法是.then(null, rejection) // to learn latter


// 5. Promise.all  都成功或者其一失败 才去执行then,catch
var promises = [1, 2, 3].map((item) => getJSON(`./promiseAllTest${item}.json`));

Promise.all(promises)
    .then((value) => {
        console.log(value)
    })
    .catch((error) => {
        console.log(error)
    });

// Promise.all   每个实例有自己的catch 并不会触发Promise.all()的catch方法  better code
let test1 = getJSON('./promiseAllTest1.json')
    .then(value => value)
    .catch(error => error);
let test2 = getJSON('./promiseAllTest2.json')
    .then(value => value)
    .catch(error => error);
Promise.all([test1, test2])
    .then(value => console.log(value))
    .catch(error => console.log(error));

// Promise.all   实例没有自己的catch 才会触发Promise.all()的catch方法
let test3 = getJSON('./promiseAllTest3.json')
    .then(value => value);
let test4 = getJSON('./promiseAllTest4.json')
    .then(value => value);
Promise.all([test3, test4])
    .then(value => console.log(value))
    .catch(error => console.log(error));

// 6. Promise.race()


// 10.


