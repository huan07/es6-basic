/**
 * Created by yangHuan on 17/9/13.
 */

import getJSON from './getJSON';

// 1.
// async表示函数里有异步操作，返回值是Promise对象
// await表示紧跟在后面的表达式 需要等待结果 await命令只能用在async函数之中，否则会报错 （使用esm加载器除外）
function timeout(ms){
    return new Promise((resolve) =>{
        setTimeout(resolve, ms);
    });
}
async function timeout2(ms){
    await new Promise((resolve) =>{ // await命令的参数 可以是Promise 对象
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
// async函数内部 return语句返回的值 ！！，会成为then方法回调函数的参数
// async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态，
//                    抛出的错误对象 会被catch方法回调函数接收到
{
    async function f(){
        return '3. 成功回调的参数';
    }

    f().then((v) => console.log(v));
}
{
    const f2 = async function(){
        throw new Error('3.2 失败回调的参数');
    };
    f2().then(
        v => console.log(v),
        e => console.log(e)
    );
}

// Promise 对象的状态变化
// 只有async函数内部的异步操作执行完(中途遇到return语句或者抛出错误，也算执行完)，才会执行then方法指定的回调函数


// await
{
    const f5 = async() =>{
        return await 123; // 转成 Promise 对象，并立即resolve
    };

    f5().then(v => console.log(v));
}

{
    async function f1(){
        await Promise.reject('出错了');
    }

    f1()
        .then(v => console.log(v))
        .catch(e => console.log('catch回调 => ', e));
}


{
    async function f2(){
        await Promise.reject('出错了2');
        await Promise.resolve('状态已经凝固了，不会再次发生改变，不会执行')
    }

    f2()
        .then(v => console.log(v))
        .catch(e => console.log('catch回调2 => ', e));
}

// 解决
// 前一个异步操作失败，也不要中断后面的异步操作
{
    async function f3(){
        try {
            await Promise.reject('出错了3');
        } catch (ex) {

        }
        return await Promise.resolve('没有中断');
    }

    f3()
        .then(v => console.log('执行 then回调 => ', v))
        .catch(e => console.log(e));
}
{
    async function f32(){
        await Promise.reject('出错了32')
            .catch(e => console.log(e));
        return await Promise.resolve('没有中断');

    }

    f32()
        .then(v => console.log('执行 then回调2 => ', v))
        .catch(e => console.log(e));
}


// 错误处理
{
    async function f(){
        await new Promise(function(resolve, reject){
            throw new Error('错误处理f');
        });
    }

    f().then(v => console.log(v))
        .catch(e => console.log(e + '  接受到参数'));
}

// 防止出错的方法
// Promise对象，运行结果可能是rejected 最好把await命令放在try...catch代码块之中
{
    async function f(){
        try {
            await new Promise(function(resolve, reject){
                throw new Error('错误处理f');
            });
        } catch (ex) {

        }
        return await '错误处理';
    }

    f().then(v => console.log(v + '  接受到参数'))
        .catch(e => console.log(e));
}

// 2)多个独立的异步操作，可以让它们同时触发，缩短程序的执行时间
{
    // promise.all
}
{
    async function f(){
        const foo = await getJSON('./promiseAllTest1.json');
        const bar = await getJSON('./promiseAllTest2.json');
        return [foo, bar];
    }

    f().then(v => console.log(v)).catch(e => console.log(e));
}

// 3)