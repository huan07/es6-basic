/**
 * Created by yangHuan on 17/9/13.
 */

// 1.
function timeout(ms){  //  .then()调用 或者紧跟在await后调用 与timeout2是等价的
    return new Promise((resolve) =>{
        setTimeout(resolve, ms);
    });
}
async function timeout2(ms){ // async函数返回的是 Promise 对象，可以作为await命令的参数
    await new Promise((resolve) =>{
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms){
    await timeout(ms);
    console.log('timeout => ', value);

    await timeout2(ms);
    console.log('timeout2 => ', value);
}
asyncPrint('hello baidu', 1000);


// 3. then(成功回调,失败回调)
{
    async function f(){
        return 'async函数内部return语句返回的值，会成为then方法回调函数的参数';
    }

    f().then((v) => console.log(v));
}
{
    const f2 = async function(){
        throw new Error('async函数内部抛出错误，会导致返回的 Promise 对象' +
            '变为reject状态，reject的参数会被catch方法的回调函数接收到');
    };
    f2().then(
        v => console.log(v),
        e => console.log(e)
    );
}

// await
// 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数
{
    const f5 = async() =>{
        return await 123;
    };

    f5().then(v => console.log(v));
}

// await命令后面的 Promise 对象如果变为reject状态，
// 则reject的参数会被catch方法的回调函数接收到
{
    async function f(){
        await Promise.reject('出错了');
    }

    f()
        .then(v => console.log(v))
        .catch(e => console.log('执行 catch回调 => ', e));
}
{
    async function f(){
        await Promise.reject('出错了2');
        await Promise.resolve('状态已经凝固了，不会再次发生改变，不会执行')
    }

    f()
        .then(v => console.log(v))
        .catch(e => console.log('执行 catch回调2 => ', e));
}

{
    async function f(){
        try {
            await Promise.reject('出错了3');
        } catch (ex) {

        }
        return await Promise.resolve('不管第一个异步操作是否成功，第二个await都会执行');
    }

    f()
        .then(v => console.log('执行 then回调 => ', v))
        .catch(e => console.log(e));
}
{
    async function f(){
        await Promise.reject('出错了4')
            .catch(e => console.log(e));
        return await Promise.resolve('不管第一个异步操作是否成功，第二个await都会执行2');

    }

    f()
        .then(v => console.log('执行 then回调2 => ', v))
        .catch(e => console.log(e));
}


// 错误处理
async function f6(){
    await new Promise(function(resolve, reject){
        throw new Error('错误处理f6');
    });
}
f6().then(v => console.log(v)) // .then(成功回调).catch(失败回调)
    .catch(e => console.log(e));

// 两个独立的异步操作可以同时触发，会缩短程序的执行时间；

/*let foo = await getFoo(); 继发执行
 let bar = await getBar();   getFoo完成以后才执行 getBar*/

// better code 1
/*let [foo, bar]= await
 Promise.all([getFoo(), getBar()]);

 // better code 2
 let fooPromise = getFoo();
 let barPromise = getBar();
 let foo = await
 fooPromise;
 let bar = await
 barPromise;*/


// await 用在普通函数会报错 参照examples




