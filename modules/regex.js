export let nomReg = /(?<=\*{9}\n)(?!special)(?!Dradkin Fleshpriest)[A-Z][a-z]+[A-z\,\s]*?(?=\n)|^[A-Z][a-z]+[A-z\,\s]*?(?=\n)|Ant Forager, Blight|Dradkin Fleshpriest(?! Rituals)|(?<=\n)Heelan Phib/gi;
let rangeTable = /(?<=\d )[A-Z](.*\n)*?(?=(\d))/;
/*
"ATTACK",
    "ATTACKS"
"MALFUNCTION",
    "SIGIL",
    "INFESTATION PROGRESS",
    "ANIMAL UNIQUE TRAITS",
    "ABILITY",

    /D6+ (ATTACKS?|MALFUNCTION|SIGIL|INFESTATION PROGRESS|ANIMAL UNIQUE TRAITS|ABILITY)/g
*/

export let attackReg = /\d+-*\d* [A-Z\s-]{2,}(:|!)(.*\n)*?(?=\d+-*\d*\s[A-Z]{2,}|[A-Z]{2,}\s[A-Z]|\d+\n\*{4}|Chitin Drake)/gm
