
import { bind, makeOk } from "../shared/result";
import { isToken, isSexpString } from "../shared/parser";

import p, { Sexp, SexpString, Token, CompoundSexp } from "s-expression";


let a = p(': Numby (one one) (two (three three))');
/*
bind(a, (a_sexp: Sexp) => {
    console.log(a_sexp)
    return makeOk("raz");
});
*/
console.log(a);