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

const store: PromisedStore<Number, string> = makePromisedStore();
store.set(0, "raz");
//console.log(store.get(0));
store.set(1, "almog");
console.log(getAll(store, [0,1]));





















/*

let n:Number = 1;

const simpleP = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        if (n === 0)
            resolve("raz is the boss.");
        else
            reject("just cause I want.");
    }, 5000)
    })

simpleP.then((res) => console.log(res)).catch((err) => console.log(err));

console.log("n's value: ", n);
n = 0;
console.log("n's value changes to: ", n);
*/