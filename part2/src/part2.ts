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
// export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: ???): ??? {
//     ???
// }
//
// export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: ???): ??? {
//     ???
// }
//
///* 2.4 */
//// you can use 'any' in this question
//
// export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...(???)[]]): Promise<any> {
//     ???
// }
//


















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