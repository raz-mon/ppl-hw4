
function* myGenerator() {
    yield "Yo!";
  }
  
  var iterator = myGenerator();
  var result = iterator.next();
  console.log(result); // { value: "Yo!", done: false }
  

function* testing () {
    let ind = 0;
    while (ind < 3)
        yield(ind++);
}

const gen = testing();

let curr = gen.next();

while (!curr.done){
    console.log(curr.value);
    curr = gen.next();
}

for (let v of gen)
    console.log(v)
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