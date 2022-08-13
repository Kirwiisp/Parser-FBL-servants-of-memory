import { sourceText } from './textSource.js';
import { listOfCreatures } from './textSource.js';

// creating an array of RegExp for creatures segments
let regArr = [];
listOfCreatures.forEach(e => regArr.push(new RegExp(`${e}\n`)));

// function to get Creature's name at i index
let textOfRegExp = (regExp) => regExp.toString().replace(/\/|\\n/g, "");

//function to get Creature RegExp
let getCreatureRegExp = (creatureName) => regArr[getCreatureIndex(creatureName)];

// function to get index of Creature in listOfCreatures
let getCreatureIndex = (creatureName) => listOfCreatures.indexOf(creatureName);

//function to get Next creature RegExp
let getNextRegExpCreature = (creatureRegExp) => regArr[regArr.indexOf(creatureRegExp) + 1];

//function to get creature text
let getCreatureText = (creatureRegExp, sourceText) => {
    let start = sourceText.search(creatureRegExp);
    //handeling last creature Case
    if (regArr.indexOf(creatureRegExp) == listOfCreatures.length - 1) return sourceText.slice(start);
    let end = sourceText.search(getNextRegExpCreature(creatureRegExp));

    return sourceText.slice(start, end);
};

//RegExp of attibutes 
let attributesReg = /ATTRIBUTES:/;
let strReg = /(?<=STRENGTH)\s*\d+/;
let agiReg = /(?<=AGILITY)\s*\d+/;
let witReg = /(?<=WITS)\s*\d+/;
let empReg = /(?<=EMPATHY)\s*\d+/;

//function to get attribute 
let getAttribute = (reg, txt) => {
    txt = txt.slice(txt.search(attributesReg));
    let resp = txt.match(reg);
    if (!resp) resp = 0;
    return parseInt(resp);
};

let getDescription = (text, reg) => {
    let descStartReg = new RegExp(`(?<=${textOfRegExp(reg)})`);
    return text.slice(text.search(descStartReg), text.search(attributesReg)).trim()
}


//fill textByCreatureArray
let creatureTable = [];
let i = 0;
regArr.forEach(e => {
    let text = getCreatureText(e, sourceText);
    let translatedText = ``;
    let name = textOfRegExp(e);
    let description = ``;
    description = getDescription(text, e);
    let attributes = {
        strength: 0,
        agility: 0,
        wits: 0,
        empathy: 0
    };
    attributes.strength = getAttribute(strReg, text);
    attributes.agility = getAttribute(agiReg, text);
    attributes.wits = getAttribute(witReg, text);
    attributes.empathy = getAttribute(empReg, text);
    let skills = {};
    let talents = {};
    let gears = {};
    let spe = ``;
    let tab = {};
    let notes = ``;

    creatureTable.push({
        text: text,
        translatedText: translatedText,
        name: name,
        description: description,
        attributes: attributes,
        skills: skills,
        talents: talents,
        gears: gears,
        spe: spe,
        tab: tab,
        notes: notes

    })

}
);
console.log(creatureTable[40].name);
console.log(creatureTable[40].attributes);



