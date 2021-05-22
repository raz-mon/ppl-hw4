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
            retarr = retarr.concat(val)).catch((err) => reject(MISSING_KEY)))
        resolve(retarr);
    })
    // This contains a mutation on retarr!! If this works, find a way to do it without mutation.
 }

/* 2.2 */

//  ??? (you may want to add helper functions here)

// export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
//     ???
// }
//
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