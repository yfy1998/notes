function curry(fn,...args){
    if(args.length<fn.length){
        return function(...args1){
            return curry(fn,...args,...args1);
        }
    }
    else{
        return fn(...args);
    }
}