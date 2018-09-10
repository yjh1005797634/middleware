
/**
 * Created by apple on 18/9/9.
 */


let sum = (a,b) => a+b;

let upper = str=> str.toUpperCase();

// let result = upper(sum('a','b'));
// console.log(result);

// let result = compose(upper,sum)('a','b');


function compose(...fns) {

    return function (...args) {

        let last = fns.pop();

        return fns.reduceRight((composed,fn) => {

            return fn(composed);
        },last(...args))
    }
}


// console.log(result);

export {compose}