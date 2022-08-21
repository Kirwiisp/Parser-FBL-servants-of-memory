import { sourceText, listOfCreatures, sourceTextFr, listOfCreaturesFr } from './textSource.js';

let modulePath = `modules/fbl-servants-of-memory-npc-parser`;
let assetsPath = `${modulePath}/assets`;
let defaultImgPath = `${assetsPath}/Base Token.png`;

/*
Functions 
*/

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
    workText = workText.slice(workText.search(/SKILLS/), workText.search(/TALENTS|MOVEMENT|ARMOR/));
    //RegExp to match skill name
    let skillsNameReg = /(?<=SKILLS:|,)\s*\w+\b/mg;
    // create an array of all skills possesed and trim the names
    let skillsNameArr = workText.match(skillsNameReg);
    skillsNameArr = skillsNameArr.map(e => e.trim().toLowerCase());
    let skills = {};
    for (let i = 0; i < skillsNameArr.length; i++) {
        workText = workText.slice(workText.search(new RegExp(skillsNameArr[i], 'i')));
        skills[skillsNameArr[i]] = parseInt(workText.match(/\d+/)[0]);
    }

    return skills;
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
    if (txt.search(/GEAR:/) == -1) return null;
    let gearArr = [];
    txt = txt.match(/(?<=GEAR:)(.*\n*)*?(?=[A-Z]{4}|\d{3,}|$)/gm)[0];
    if (txt.search(/(?<=GEAR:.*),/) == -1) {
        gearArr.push(txt);
        return gearArr;
    }
    gearArr = txt.split(",");
    gearArr = gearArr.map(e => e = e.trim())
    return gearArr
}

//variables and functions to get creatures tables
let tableStartReg = /D6+ (ATTACKS?|MALFUNCTION|SIGIL|INFESTATION PROGRESS|ANIMAL UNIQUE TRAITS|ABILITY)/g;
let rangeStartReg = /1|11/;

//Images fetching
let getImg = async (name) => {
    let path = defaultImgPath;
    await fetch(`${assetsPath}/${name}.png`)
        .then(res => {
            if (res.ok) path = `${assetsPath}/${name}.png`;
            else throw new Error();
        })
        .catch((e) => { console.log(`Image de ${name} non trouvée. Chargement de l'image par défaut`) });
    return path;
}

let getTokenImg = async (name) => {
    let tokenPath = defaultImgPath;
    return await fetch(`${assetsPath}/${name} Token.png`)
        .then(res => {
            if (res.ok) tokenPath = `${assetsPath}/${name} Token.png`;
            else throw new Error();
        })
        .catch((e) => { console.log(`Image de ${name} non trouvée. Chargement du Token par défaut`) })
}

/*
Main generation of creatures
*/

//fill textByCreatureArray
let creatureTable = [];
regArr.forEach(async e => {
    let text = getCreatureText(e, sourceText);
    let translatedText = ``;
    let name = getCreatureName(e);


    let img = await getImg(name);
    let imgToken = await getTokenImg(name);
    let attributes = {
        strength: getAttribute(strReg, text),
        agility: getAttribute(agiReg, text),
        wits: getAttribute(witReg, text),
        empathy: getAttribute(empReg, text)
    };
    let skills = getSkills(text);
    let movement = getMovement(text);
    let armor = getArmor(text);
    let talents = getTalents(text);
    let gears = await getGear(text);
    let description = getDescription(text, e);
    let notes = ``;

    creatureTable.push({
        text: text,
        translatedText: translatedText,
        img: img,
        imgToken: imgToken,
        name: name,
        description: description,
        attributes: attributes,
        movement: movement,
        skills: skills,
        talents: talents,
        armor: armor,
        gears: gears,
        notes: notes

    })
}
);
console.log("*****************************************");
console.log(creatureTable);
export { creatureTable };




