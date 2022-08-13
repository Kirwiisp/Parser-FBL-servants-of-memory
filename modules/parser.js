import { text } from './textSource.js';
import { listOfCreatures } from './textSource.js';

// creating an array of RegExp for creatures segments
let regArr = [];
listOfCreatures.forEach(e => regArr.push(new RegExp(`${e}`)));

// creating an array with creatureTemplate{} to contain txt,translated text, name, stats,etc... 
let txtByCreatureArray = [];
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

//function to get next creature name in the listOfCreature

let getNextCreatureName = (creatureName) => {
    let index = listOfCreatures.indexOf(creatureName) + 1;
    return getName(index);
};

//function to get creature text
let getCreatureText = (creatureName, sourceText) => "";

// function to get Creature's name at i index
let getName = (i) => regArr[i].toString().replace(/\//g, "");

let creatureTest = getName(50);
console.log(creatureTest);
console.log(`Créature suivante = ${getNextCreatureName(creatureTest)}`);

for (let i = 0; i < listOfCreatures.length; i++) {
    if (i == listOfCreatures.length - 1) {
        txtByCreatureArray.push(text.slice(text.search(regArr[i]),));
        break;
    }
    txtByCreatureArray.push(text.slice(text.search(regArr[i]), text.search(regArr[i + 1])));
}
