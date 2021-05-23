/* 2.1 */

import { isGeneratorFunction } from "util/types";

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

/* 2.3 */
export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: ???): Generator<T> {
    // Don't quite understand the meaning of "don't convert the generator to an array".
    // Is this because it supposidly holds some numbers that I can treat as an array?
    // If so, all I need to do is compute the computation one-by-one. The returned generator takes a T from the given generator, 
    // performs the filter on it, and then returns it or not apropriatly. Isn't that exactly what we did in class??
    
    // If it is indeed identical to what we saw in class, then this should do the job:
    return function* newGen (): Generator<T> {
        for (let x of genFn()) {
            if (filterFn(x)) {
                yield x;
            }
        } 
    }
}
export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: ???): Generator<T> {
    // If the written above is correct, it is relevant to this section too.
    return function* newGen (): Generator<T> {
        for (let x of genFn()) {
            yield mapFn(x);
        }
    }
}

/* 2.4 */
// you can use 'any' in this question

 export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...(???)[]]): Promise<any> {
     ???
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