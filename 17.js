/**
 * Created by yanghuan on 18/7/18.
 */
import fetch from 'node-fetch';

{
    function* gen(){
        var url = 'https://api.github.com/users/github';
        var result = yield fetch(url);
        console.log(result.bio);
    }

    var g = gen();
    var result = g.next();

    result.value.then(function(data){
        console.log(data, data.json());
        return data.json();
    }).then(function(data){
        console.log(data);
        g.next(data);
    });
}

// Thunk 函数的含义 传名调用 （有点惰性求值的意思）