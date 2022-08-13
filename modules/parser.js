import { sourceText } from './textSource.js';
import { listOfCreatures } from './textSource.js';

// creating an array of RegExp for creatures segments
let regArr = [];
listOfCreatures.forEach(e => regArr.push(new RegExp(`${e}\n`)));

// function to get Creature's name at i index
let textOfRegExp = (regExp) => regExp.toString().replace(/\/|\\n/g, "");


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


//function to get Creature Description
let getDescription = (text, reg) => {
    let descStartReg = new RegExp(`(?<=${textOfRegExp(reg)})`);
    return text.slice(text.search(descStartReg), text.search(attributesReg)).trim()
}

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

//function to get the list of skills with their value
let getSkills = (txt) => {
    let workText = txt;
    //check absence of skill
    if (!workText.match(/SKILLS/)) return {};
    //slice the texte to keep the skill section
    workText = workText.slice(workText.search(/SKILLS/), workText.search(/TALENTS|MOVEMENT/));
    //RegExp to match skill name
    let skillsNameReg = /(?<=SKILLS:|,)\s*\w+\b/mg;
    let skillsNameArr = workText.match(skillsNameReg);
    let skills = []
    for (let i = 0; i < skillsNameArr.length; i++) {
        workText = workText.slice(workText.search(skillsNameArr[i]));
        skills.push([skillsNameArr[i], parseInt(workText.match(/\d+/)[0])]);
    }
    return Object.fromEntries(new Map(skills));
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
        strength: getAttribute(strReg, text),
        agility: getAttribute(agiReg, text),
        wits: getAttribute(witReg, text),
        empathy: getAttribute(empReg, text)
    };
    let skills = getSkills(text);
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
console.log(creatureTable[2].name);
console.log(creatureTable[2].attributes);
console.log(creatureTable[2].skills)


