import { text } from './textSource.js';
import { listOfCreatures } from './textSource.js';

// creating an array of RegExp for creatures segments
let regArr = [];
listOfCreatures.forEach(e => regArr.push(new RegExp(`${e}\n`)));

// creating an array with creatureTemplate{} to contain txt,translated text, name, stats,etc... 

let creatureTemplate = {
    text: ``,
    translatedText: ``,
    name: ``,
    description: ``,
    attributes: {
        strength: 0,
        agility: 0,
        wits: 0,
        empathy: 0,
    },
    skills: {},
    talents: {},
    gears: {},
    spe: ``,
    tab: {},
    notes: ``
};

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
let strReg = /(?<=STRENGTH )\d+/;
let agiReg = /(?<=AGILITY )\d+/;
let witReg = /(?<=WITS )\d+/;
let empReg = /(?<=EMPATHY)\d+/;

//function to get attribute 
let getAttribute = (reg, txt) => {
    txt = txt.slice(txt.search(attributesReg));
    let resp = txt.match(reg);
    if (!resp) resp = 0;
    return parseInt(resp);
};


//fill textByCreatureArray
let creatureTable = [];
regArr.forEach(e => {
    let creature = Object.create(creatureTemplate);
    creature.name = textOfRegExp(e);
    creature.text = getCreatureText(e, text);
    let descStartReg = new RegExp(`(?<=${textOfRegExp(e)})`);
    creature.description = creature.text.slice(creature.text.search(descStartReg), creature.text.search(attributesReg));
    creature.attributes.strength = getAttribute(strReg, creature.text);
    creature.attributes.agility = getAttribute(agiReg, creature.text);
    creature.attributes.wits = getAttribute(witReg, creature.text);
    creature.attributes.empathy = getAttribute(empReg, creature.text);
    creatureTable.push(creature);
});

console.log(creatureTable[0].description);


/*
for (let i = 0; i < listOfCreatures.length; i++) {
    if (i == listOfCreatures.length - 1) {
        txtByCreatureArray.push(text.slice(text.search(regArr[i]),));
        break;
    }
    txtByCreatureArray.push(text.slice(text.search(regArr[i]), text.search(regArr[i + 1])));
}
*/