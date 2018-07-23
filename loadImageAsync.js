/**
 * Created by yanghuan on 18/7/22.
 */

export default (url) =>{
    return new Promise(function(resolve, reject){
        const image = new Image();

        image.onload = function(){
            resolve(image); // step5
        };

        image.onerror = function(){
            reject(new Error('Could not load image at ' + url)); // step7
        };

        image.src = url; // step2 step4
    });
}