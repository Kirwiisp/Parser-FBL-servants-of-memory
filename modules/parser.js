import { text } from './textSource.js';
import { listOfCreatures } from './textSource.js';

// creating an array of RegExp for creatures segments
let regArr = [];
listOfCreatures.forEach(e => regArr.push(new RegExp(`${e}\n`)));

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

// function to get Creature's name at i index
let getName = (i) => regArr[i].toString().replace(/\/|\\n/g, "");

// function to get index of Creature in listOfCreatures
let getCreatureIndex = (creatureName) => listOfCreatures.indexOf(creatureName);

//function to get next creature name in the listOfCreature
let getNextCreatureName = (creatureName) => {
    let index = listOfCreatures.indexOf(creatureName) + 1;
    return getName(index);
};

//function to get Creature RegExp
let getCreatureRegExp = (creatureName) => regArr[getCreatureIndex(creatureName)];

//function to get creature text
let getCreatureText = (creatureName, sourceText) => {
    let start = sourceText.search(getCreatureRegExp(creatureName));
    //handeling last creature Case
    if (getCreatureIndex(creatureName) == listOfCreatures.length - 1) return sourceText.slice(start);
    let end = sourceText.search(getCreatureRegExp(getNextCreatureName(creatureName)));

    return sourceText.slice(start, end);
};



let creatureTest = getName(68);
console.log(creatureTest);
let textTemp = getCreatureText(creatureTest, text);
console.log(textTemp);

for (let i = 0; i < listOfCreatures.length; i++) {
    if (i == listOfCreatures.length - 1) {
        txtByCreatureArray.push(text.slice(text.search(regArr[i]),));
        break;
    }
    txtByCreatureArray.push(text.slice(text.search(regArr[i]), text.search(regArr[i + 1])));
}
