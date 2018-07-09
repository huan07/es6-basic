/**
 * Created by yanghuan on 18/7/6.
 */

// example4
let getJSON = null;
{
    getJSON = function(url){
        const promise = new Promise(function(resolve, reject){
            const handler = function(){
                if (this.readyState !== 4) {
                    return false;
                }
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            };

            const client = new XMLHttpRequest();
            client.open('GET', url);
            client.onreadystatechange = handler;
            client.responseType = 'json';
            client.setRequestHeader('Accept', 'application/json');
            client.send();
        });
        return promise;
    };

    getJSON('./14.json').then(function(value){
        console.log(`example4 resolve callback ${JSON.stringify(value)}`);
    }, function(error){
        console.log(`example4 reject callback ${error}`);
    });
}

// 3.then
// 返回的是一个新的Promise实例 可以采用链式写法
{
    getJSON('./14.json').then((value) =>{
        console.log('采用链式写法    ', JSON.stringify(value));
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

// example2  catch的三种写法
{
    const promise = new Promise((resolve, reject) =>{
        throw new Error('test');
    });

    const promise2 = new Promise((resolve, reject) =>{
        try {
            throw new Error('test2');
        } catch (ex) {
            reject(ex);
        }
    });

    const promise3 = new Promise((resolve, reject) =>{
        reject(new Error('test3')); // reject方法的作用，等同于抛出错误
    });

    promise.catch((error) =>{
        console.log('catch:  ,', error);
    });
    promise2.catch((error) =>{
        console.log('catch2:  ,', error);
    });
    promise3.catch((error) =>{
        console.log('catch3:  ,', error);
    });
}

// 考点
{
    const promise = new Promise((resolve, reject) =>{
        resolve('xx 999'); // Promise状态已经变成resolved（永久保持该状态，不会再变了），再抛出错误是无效的
        throw new Error('error 999');
    });

    promise.then((val) => console.log(val))
        .catch((err) => console.log(err));
}

// 6. Promise.all(Array 成员是Promise实例)
// 都成功或者其一失败 才去执行then,catch
{
    const promises = [1, 2].map((item) => getJSON(`./promiseAllTest${item}.json`));

    /*    Promise.all(promises)
     .then(([value, value2]) => console.log('6  ', value, value2))
     .catch(([error, error2]) => console.log('6 error ', error, error2));*/
}
{
    const promises = [1, 22].map((item) => getJSON(`./promiseAllTest${item}.json`));
    /*
     Promise.all(promises)
     .then(([value, value2]) => console.log('6  ', value, value2))
     .catch(([error, error2]) => console.log('6 error ', error, error2));*/
}

// Promise.all   每个实例有自己的catch 并不会触发Promise.all()的catch方法
// 不会影响彼此的执行  better
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

    /*Promise.all([p1, p2])
     .then(([value,value2]) => console.log(value,value2))
     .catch(([e,e2]) => console.log(e,e2));*/
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

// 考题
{
    setTimeout(function(){ // 下一轮循环开始执行
        console.log(3);
    }, 0);

    Promise.resolve().then(function(){ // 本轮循环结束执行
        console.log(2);
    });

    console.log(1); // 同步最先执行
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