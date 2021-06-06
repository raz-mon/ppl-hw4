
import * as R from "ramda";
import * as A from "./L51-ast";
import * as TC from "./L51-typecheck";
import * as V from "../imp/L5-value";
import * as E from "../imp/TEnv";
import * as T from "./TExp51";
import { allT, first, rest, isEmpty, cons } from "../shared/list";
import { isNumber, isString } from '../shared/type-predicates';
import { Result, makeFailure, makeOk, bind, safe2, zipWithResult, mapResult } from "../shared/result";
import * as TI from "./L51-typeinference"

/*
(define pair
    (class : Tpair
    ((a : number)
    (b : number))
    ((first (lambda () : number a))
    (second (lambda () : number b))
    (scale (lambda (k) : pair (pair (* k a) (* k b))))
    (sum (lambda () : number (+ a b))))))
    (define (p34 : Tpair) (pair 3 4))
    (define f
    (lambda ((x : Tpair))
    (* ((x 'first)) ((x 'second)))))
    (p34 'first) ; --> #<procedure>
    ((p34 'first)) ; --> 3
    ((p34 'sum)) ; --> 7
    ((p34 'scale) 2) ; --> #pair<6,8>
    (f p34) ; --> 12
*/

TI.inferTypeOf("(define pair (class : Tpair ((a : number) (b : number)) ((first (lambda () : number a)) (second (lambda () : number b)) (scale (lambda (k) : pair (pair (* k a) (* k b)))) (sum (lambda () : number (+ a b))))))")


console.log(TI.inferTypeOf("(define pair (class : Tpair ((a : number) (b : number)) ((first (lambda () : number a)) (second (lambda () : number b)) (scale (lambda (k) : pair (pair (* k a) (* k b)))) (sum (lambda () : number (+ a b))))))"))