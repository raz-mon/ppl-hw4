/* 2.1 */

export const MISSING_KEY = '___MISSING___'

type PromisedStore<K, V> = {
    get(key: K): Promise<V>,
    set(key: K, value: V): Promise<void>,
    delete(key: K): Promise<void>
}

export function makePromisedStore<K, V>(): PromisedStore<K, V> {
    const m = new Map<K, V>();
    return {
        get(key: K) {
            return new Promise<V>((resolve, reject) => {
                const v:V | undefined = m.get(key);
                if (v != undefined)
                    resolve(v);
                else
                    reject(MISSING_KEY);
            })
        },
        set(key: K, value: V) {
            return new Promise<void>((resolve, reject) => {
                if (m.set(key, value).has(key))
                    resolve();
                else
                    reject();
            })
        },
        delete(key: K) {
            return new Promise<void>((resolve, reject) => {
            const b: boolean = m.delete(key);
            if (b)
                resolve();
            else
                reject(MISSING_KEY);
            })
        },
    }
}

 export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): Promise<V[]> {
    let retarr: V[] = [];
    return new Promise<V[]>((resolve, reject) => {
        keys.forEach((key: K) => store.get(key).then((val: V) => 
            retarr.push(val)).catch((err) => reject(MISSING_KEY)))
        resolve(retarr);
    })
    // This contains a mutation on retarr! Is this o.k?
 }

/* 2.2 */

//  ??? (you may want to add helper functions here)

export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
    // We want to save the parameter of f as a key, and it's value as it's Val.
    // The goal is that in every call of f with a parameter that f has been called with before, the result of 
    // the computation is already saved as the value attached to the parameter (key) in the Promised-Store.
    // Every time that f is called with a new parameter, we perform the calculation of f on it, and save
    // the couple <parameter, value> in our store (which holds a map that holds these references).
    
    // I think that this has to look the same as the upper interface.
    const store: PromisedStore<T, R> = makePromisedStore();
    
    const retfun = async (param: T): Promise<R> => {
        
        try{
            const val = await store.get(param);     // check if the function has already been called with this parameter.
            return store.get(param);
        }
        catch{          // key 'param' is not in the store - the function was not called with it yet.
            store.set(param, f(param));
            return store.get(param);            
        }
    }
    return retfun;
}

///* 2.3 */
//
 export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: (t: T) => boolean):() => Generator<T> {
    return function* newGen (): Generator<T> {
        let gen:Generator<T> = genFn();
        for (let x of gen) {
            if (filterFn(x)) {
                yield x;
            }
        } 
    };
 }


 export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: (t: T) => R):() => Generator<R> {
     return function* newGen(): Generator<R>{
         let gen:Generator<T> = genFn();
         for (let x of gen){
             yield(mapFn(x));
         }
     };
 }

/* 2.4 */
// you can use 'any' in this question

export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...((a: any) => Promise<any>)[]]): Promise<any> {
    // We get a list of async functions, and apply them one after the other, where the first function gets no
    // parameter, and the rest get as their parameter the return value of the prior function.
    // If a function failes (i.e rejects, we are dealing with promises), then we retry. We retry at most twice.
    // async function - a function that returns a Promise<T>. Can use await inside it's body.

   // Not sure about the syntax of the declaration of the array components types! See if that actually works. 
   // The meaning was that we want every other array component to be of the type: (any) => Promise<any>.

   const len: Number = fns.length;

   let last_val = await (fns[0])();
   //console.log("first val: ", last_val);

   for (let i = 1; i < len; i++){
        let last_val1 = await tryFirst(last_val, fns[i]);
        if (last_val1 === -1000){
            let last_val2 = await tryAgain(last_val, fns[i])
            if (last_val2 === -1000){
                last_val = await tryThird(last_val, fns[i]);
            }
            else{
                last_val = last_val2;
            }
        }
        else{
            last_val = last_val1;
        }



/*
    try{
        last_val = await fns[i](last_val);
        console.log("val after ", i, "computations: ", last_val);
    }
     catch{
         console.log("first error occured");
         setTimeout(() => {
                 try{
                     last_val = tryAgain(last_val, fns[i]);
                 }
                 catch{
                     setTimeout(() => {
                         last_val = tryThird(last_val, fns[i]);
                     }, 2000);
                 }
             }, 2000);
            // console.log(last_val);
     }
     */
    // console.log(last_val);
 }
    async function tryFirst (last_val: any, func: any) {
        try{
            const x = await func(last_val);
            return x;
        }
        catch{
            //console.log("First error occured");
            return -1000;
            //throw Error();
        }
    }   

   async function tryAgain (last_val: any, func: any) {
        try{
            const x = await func(last_val);
            return x;
        }
        catch{
            //console.log("second error occured");
            return -1000;
            //throw Error();
        }
    }   

    async function tryThird (last_val: any, func: any) {
        try{
            const x = await func(last_val);
            return x;
        }
        catch{
            //console.log("third error occured");
            throw Error();
        }
    }    

    return last_val;
}





















// export function makePromisedStore<K, V>(): PromisedStore<K, V> {
//     ???
//     return {
//         get(key: K) {
//             ???
//         },
//         set(key: K, value: V) {
//             ???
//         },
//         delete(key: K) {
//             ???
//         },
//     }
// }

// export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): ??? {
//     ???
// }

/* 2.2 */

// ??? (you may want to add helper functions here)
//
// export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
//     ???
// }

/* 2.3 */

// export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: ???): ??? {
//     ???
// }

// export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: ???): ??? {
//     ???
// }

/* 2.4 */
// you can use 'any' in this question

// export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...(???)[]]): Promise<any> {
//     ???
// }