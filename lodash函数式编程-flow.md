```
// lodash函数式编程流的原理

function flow() {
    const funcs = arguments;
    const len = funcs ? funcs.length : 0;
    let index = len;
    while(index--) {
        if(typeof funcs[index] !== 'function') {
            throw new TypeError('Expected a function')
        }
    }
    return function(...args) {
        let index = 0;
        let res = len ? funcs[index].apply(this, args) : args[0];

        while(++index < len) {
            res = funcs[index].call(this, res);
        }
        return res;
    }
}

const f = flow(add, mult)(1);
// 4 
```
