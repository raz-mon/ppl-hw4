

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