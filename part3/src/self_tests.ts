

import { expect } from "chai";
import { isNumExp, isBoolExp, isVarRef, isPrimOp, isProgram, isDefineExp, isVarDecl,
         isAppExp, isStrExp, isIfExp, isProcExp, isLetExp, isLitExp, isLetrecExp, isSetExp, 
         isClassExp, parseL5Exp, unparse, Exp, parseL5 } from "../src/L51-ast";
import { Result, bind, isOkT, makeOk } from "../shared/result";
import { parse as parseSexp } from "../shared/parser";
import { isSymbolSExp, makeSymbolSExp } from "../imp/L5-value";
import { isSymbolTExp, isPairTExp } from "../src/TExp51";


const pa = (x: string): Result<Exp> => bind(parseSexp(x), parseL5Exp);





console.log(pa("(class (a) ((first (lambda () : number a))))"))