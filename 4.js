/**
 * Created by yanghuan on 18/6/28.
 */

// 1.
{
    console.log('\u0061');

    console.log('\u{20BB7}');

    let hello = 123;
    console.log('hell\u{6F}');
}


// 7.includes, startsWith, endsWith,
{
    let s = 'Hello world';

    const x = s.includes('He');
    const y = s.startsWith('Hel');
    const z = s.endsWith('ld');

    console.log(x, y, z);
}

// 8.repeat
{
    console.log('x'.repeat(3), 'hello'.repeat(2), 'world'.repeat(0))
}

// 11.`` 模版字符串
// 当作普通字符串、
// 定义多行字符串、
// 在字符串中嵌入变量
{
    let name = 'Bob';
    let time = 'today';

    const result = `Hello ${name}, how are you ${time} ${'? ? ?'}`;
    console.log('模版字符串 => ', result);
}