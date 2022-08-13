import { sourceText } from './textSource.js';
import { listOfCreatures } from './textSource.js';

// creating an array of RegExp for creatures segments
let regArr = [];
listOfCreatures.forEach(e => regArr.push(new RegExp(`\n${e}\n`)));

// function to get Creature's name
let getCreatureName = (regExp) => regExp.toString().replace(/\/|\\n|\\s|\*|\\/g, "");

let textOfRegExp = (regExp) => regExp.toString().replace(/\/|\\n|\\s|\*/g, "");


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
    if (!workText.match(/SKILLS/)) return null;
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
};

//function to get mouvement value
let getMovement = (txt) => {
    if (!txt.search(/MOVEMENT/)) return null;
    txt = txt.slice(txt.search(/MOVEMENT:/));
    return txt.match(/\d+/);
};


//function to get talents
let getTalents = (txt) => {
    //check absence of skill
    if (!txt.match(/TALENTS/)) return null;
    //slice the texte to keep the skill section
    txt = txt.slice(txt.search(/TALENTS/), txt.search(/GEAR|ARMOR|MOVEMENT/));
    //RegExp to match skill name
    if (txt.match(/\-/)) return null;
    let talentsNameReg = /(?<=TALENTS:|,)[\s\w+]*(?=\d)/mg;
    let talentsNameArr = txt.match(talentsNameReg);
    let talents = []
    for (let i = 0; i < talentsNameArr.length; i++) {
        txt = txt.slice(txt.search(talentsNameArr[i]));
        talents.push([talentsNameArr[i], parseInt(txt.match(/\d+/)[0])]);
    }
    return Object.fromEntries(new Map(talents));
}

//function to get armor rating (do not parse the possible following description)
let getArmor = (txt) => {
    if (!txt.match(/ARMOR RATING:/)) return null;
    return parseInt(txt.match(/(?<=ARMOR RATING: )\d+/));
};

//function to get the gear
let getGear = (txt) => {
    if (!txt.search(/GEAR/)) return null;
    return txt.match(/(?<=GEAR:)(.*\n)*?(?=[A-Z]{2}|\*)/m)
}
//fill textByCreatureArray
let creatureTable = [];
regArr.forEach(e => {
    let text = getCreatureText(e, sourceText);
    let translatedText = ``;
    let name = getCreatureName(e);
    let description = getDescription(text, e);
    let attributes = {
        strength: getAttribute(strReg, text),
        agility: getAttribute(agiReg, text),
        wits: getAttribute(witReg, text),
        empathy: getAttribute(empReg, text)
    };
    let movement = getMovement(text);
    let skills = getSkills(text);
    let talents = getTalents(text);
    let armor = getArmor(text);
    let gears = getGear(text);
    let spe = ``;
    let tab = {};
    let notes = ``;

    creatureTable.push({
        text: text,
        translatedText: translatedText,
        name: name,
        description: description,
        attributes: attributes,
        movement: movement,
        skills: skills,
        talents: talents,
        armor: armor,
        gears: gears,
        spe: spe,
        tab: tab,
        notes: notes

    })

}
);

console.log(creatureTable[70].name);
console.log(regArr[70]);
//console.log(sourceText.search(regArr[0]));
//console.log(creatureTable[0].text);
console.log(`description = ${creatureTable[70].description}`)
console.log(creatureTable[70].attributes);
console.log(creatureTable[70].skills)
console.log(`mouvement = ${creatureTable[70].movement}`)
console.log(`talents = ${creatureTable[70].talents}`)
console.log(`armor = ${creatureTable[70].armor}`)
console.log(`gears = ${creatureTable[70].gears}`)



