

export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...((a: any) => Promise<any>)[]]): Promise<any> {
    // We get a list of async functions, and apply them one after the other, where the first function gets no
    // parameter, and the rest get as their parameter the return value of the prior function.
    // If a function failes (i.e rejects, we are dealing with promises), then we retry. We retry at most twice.
    // async function - a function that returns a Promise<T>. Can use await inside it's body.

   // Not sure about the syntax of the declaration of the array components types! See if that actually works. 
   // The meaning was that we want every other array component to be of the type: (any) => Promise<any>.

   const len: Number = fns.length;

   let last_val = await (fns[0])();
   console.log("first val: ", last_val);

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
            console.log("First error occured");
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
            console.log("second error occured");
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
            console.log("third error occured");
            throw Error();
        }
    }    

    return last_val;
}

async function t1 () {
    //const v = await asyncWaterfallWithRetry([async () => 1, async v => v + 1, async v => v * 2 ])
    let attempt = 1;
    const v = await asyncWaterfallWithRetry([async () => 1, async v => {
        if (attempt == 3)
            return v + 1
        attempt += 1
        throw Error()
    }, async v => v * 2 ]);
    console.log(v);
} 
t1();




           
//                            const prom:Promise<any> = new Promise((resolve, reject) => {
//                                    try{
//                                        last_val = fns[i](last_val);
//                                    }
//                                    catch{
//                                        console.log("second error occured");
//                                        reject();
//                                    }
//                                resolve(last_val);
//
//                            });














/*
function* myGenerator() {
    for(let i = 0; i < 5; i++)
        yield i;
    return;
  }
  let gen = myGenerator();
  let it2 = gen.next();
while (!it2.done){
    console.log(it2.value);
    it2 = gen.next();
  }
*/





/*
// An infinite generator
function* naturalNumbers() {
    for (let n=0;; n++) {
        yield n;
    }
}

function* take<T>(n: number, generator: Generator<T>): Generator<T> {
    for (let x of generator) {
        if (n <= 0) return;
        n--;
        yield x;
    }
}

// A filter operator adapted to generators
function* filterGen<T>(generator: Generator<T>, filterFunc: (x: T) =>
boolean): Generator<T> {
    for (let x of generator) {
        if (filterFunc(x)) {
            yield x;
        }
    }
}

for (let n of take(4, filterGen(naturalNumbers(), (x: number) => (x %
2) === 0))) {
    console.log(n);
}

const gen: Generator = take(4, filterGen(naturalNumbers(), (x: number) => (x %
    2) === 0))
const it2 = gen.next();
while(!it2.done)
    console.log(it2.value);
*/






  /*
  var iterator = myGenerator();
  var result = iterator.next().value;
  console.log(result); // { value: "Yo!", done: false }
*/
/*
function* testing () {
    let ind = 0;
    while (ind < 3)
        yield(ind++);
}

const gen = testing();

for (let v of gen)
    console.log(v)
*/
/*
let curr = gen.next();
while (!curr.done){
    console.log(curr.value);
    curr = gen.next();
}
*/



/*
function* naturalNumbers() {
    for (let n=0;; n++) {
        yield n;
    }
}

function* take(n: any, generator: Generator<Number>) {
    for (let x of generator) {
        if (n <= 0) return;
        n--;
        yield x;
    }
}

for (let n of take(3, naturalNumbers())) {
    console.log(n);
}
*/






/*
function* testing () {
    let ind = 0;
    while (ind < 3)
        yield(ind++);
}

const gen = testing();

for (let v of testing()){
    console.log(v);
}

function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for ( let v of foo() ) {
    console.log(v);
}

function* range(start: Number, end: Number) {
    for (let n:Number=start; n < end; n++) {
        yield n;
    }
}

for (let n of range(1,5)) 
    console.log(n);
*/



























/*
type Resolver<T,R> = (value: T) => R;

// wait ms milliseconds
const wait = (ms: number) : Promise<string> => 
    new Promise((r : Resolver<string, void>) => setTimeout(r, ms));

const hello = async () : Promise<string> => {
    await wait(500);
    return 'world';
}

const world = async () : Promise<void> => 
    console.log(await hello());

world();
*/
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