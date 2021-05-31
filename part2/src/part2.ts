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
 }

/* 2.2 */

export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
    const store: PromisedStore<T, R> = makePromisedStore();
    const retfun = async (param: T): Promise<R> => {
        try{
            const val = await store.get(param);     // check if the function has already been called with this parameter.
            return val;
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

export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...((a: any) => Promise<any>)[]]): Promise<any> {
   const len: Number = fns.length;
   let last_val = await (fns[0])();
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
 }
    async function tryFirst (last_val: any, func: any) {
        try{
            const x = await func(last_val);
            return x;
        }
        catch{
            return -1000;
        }
    }   

   async function tryAgain (last_val: any, func: any) {
        try{
            const x = await func(last_val);
            return x;
        }
        catch{
            return -1000;
        }
    }   

    async function tryThird (last_val: any, func: any) {
        try{
            const x = await func(last_val);
            return x;
        }
        catch{
            throw Error();      // No more tolarence for errors (no more nice guy)!!
        }
    }
    return last_val;
}