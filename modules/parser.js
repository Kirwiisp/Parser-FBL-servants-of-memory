import { sourceText} from './textSource.js';

let modulePath = `modules/fbl-servants-of-memory-npc-parser`;
let assetsPath = `${modulePath}/assets`;
let defaultImgPath = `${assetsPath}/Base Token.png`;

/*
Functions 
*/

//remove Name + order
let sourceTextMod =""
try{
    if(sourceText.match(/.*\(Order #\d*\)/gm).length <180) {sourceTextMod == null;
    }else sourceTextMod = sourceText.replace(/.*\(Order #\d*\)/gm,"**********");
}catch{
    console.log("***********************************");
    console.log("ERROR : your text isn't the right length or isn't legal");
    console.log("***********************************");
}
//handeling issue with gear RegEx
sourceTextMod = sourceTextMod.replace(/ARMOR\nRATING/,"ARMOR RATING");

let getListOfCreatures = () =>{
     let test = sourceTextMod.match(/(?<=\.\.\.\.5)(.*\n)*?(?=Rarities)/)[0];
    test = test.replace(/\**/g,"")
    .replace(/\.*\d+/g,"/").replace(/\(/,"\\(")
    .replace(/\)/,"\\)")
    .split("/")
    .map(e=>e.trim())
    .filter(e => e !='');
    return test;
} 

let listOfCreatures = getListOfCreatures();

// creating an array of RegExp for creatures segments
let regArr = [];
listOfCreatures.forEach(e => regArr.push(new RegExp(`\n${e}\n`)));

// function to get Creature's name
let getCreatureName = (regExp) => regExp.toString().replace(/\/|\\n|\\s|\*|\\/g, "");

let textOfRegExp = (regExp) => regExp.toString().replace(/\/|\\n|\\s|\*/g, "");


//function to get Next creature RegExp
let getNextRegExpCreature = (creatureRegExp) => regArr[regArr.indexOf(creatureRegExp) + 1];



//function to get creature text
let getCreatureText = (creatureRegExp, sourceTextMod) => {
    let start = sourceTextMod.search(creatureRegExp);
    //handeling last creature Case
    if (regArr.indexOf(creatureRegExp) == listOfCreatures.length - 1) return sourceTextMod.slice(start,sourceTextMod.search("Rarities"));
    let end = sourceTextMod.search(getNextRegExpCreature(creatureRegExp));
    let resp = sourceTextMod.slice(start, end);
    return resp;
};


//function to get Creature Description
let getDescription = (text, reg) => {
    let descStartReg = new RegExp(`(?<=${textOfRegExp(reg)})`);
    return text.slice(text.search(descStartReg), text.search(attributesReg)).trim()
}

//RegExp of attibutes 
let attributesReg = /ATTRIBUTES:/;
let strReg = /(?<=STRENGTH)\s*\d+-*\d*/;
let agiReg = /(?<=AGILITY)\s*\d+-*\d*/;
let witReg = /(?<=WITS)\s*\d+-*\d*/;
let empReg = /(?<=EMPATHY)\s*\d+-*\d*/;

//function to get attribute 
let getAttribute = (reg, txt) => {
    txt = txt.slice(txt.search(attributesReg));
    let resp = txt.match(reg);
    //keep higher attribut
    if (resp) resp = resp[0].match(/\d+$/)
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
    let gearArr = txt.match(/(?<=GEAR:)(.*\n*)*?(?=[A-Z]{4}|\d{3,}|\*{10}|Special Attac|$|Orc)/gm);
    gearArr = gearArr.map(e=>e.split(/(?<!spear),(?! can)/g))
    let resp =[];
    gearArr = gearArr.filter(e=> e !='');
    gearArr= gearArr.map(e => e.map(
        e => {
            if(e.search("ARMOR") != -1){
                resp.push(getGearArmorData(e));
            }else resp.push({name : e.trim(),type:"gear"})
        }
    ))
    return resp;
}

let getGearArmorData = (txt)=>{
    let armorData={
        name:"",
            type:"",
            data:{
                bonus: {
                    "value": 0,
                    "max": 0
                }
            }
        };
        armorData.type = "armor"
        armorData.name = txt.match(/^.*(?=\n*\(ARMOR)/)[0];
        try{
            armorData.data.bonus.max= txt.match(/\d+/)[0];
        }catch{
            console.log("***** ERROR ****")
            console.log(txt);
    }
        armorData.data.bonus.value = armorData.data.bonus.max; 
        return armorData;
    }
    


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
    await fetch(`${assetsPath}/${name} Token.png`)
    .then(res => {
        if (res.ok) tokenPath = `${assetsPath}/${name} Token.png`;
        else throw new Error();
    })
    .catch((e) => { console.log(`Image de ${name} non trouvée. Chargement du Token par défaut`) });
    return tokenPath;
}

//Get attacks

let getAttacks = async (txt) => {
    txt = txt.slice(txt.search(/ATTACK|ABILITY/m));
    let attackReg = /\d+-*\d* [A-Z\s-]{2,}(:|!)(.*\n)*?(?=\d+-*\d*\s[A-Z]{2,}|[A-Z]{2,}\s[A-Z]|\d+\n\*{4}|Chitin Drake)/gm
    if (txt.search(attackReg) == -1) return null;
    let attackArr = txt.match(attackReg);

    let resp =[];
    attackArr = attackArr.filter(e=> e !='');
    attackArr= attackArr.map(
        e => {
                let attackData={
                    name:"",
                        type:"monsterAttack",
                        data:{
                            dice:0,
                            damage:0,
                            description:""
                            }
                        };
            
            attackData.name = e.match(/(?<=\d |\d\d )[A-Z\s]*/)[0];
            attackData.data.description = e.slice(e.search(attackData.name)+attackData.name.length);
            if(e.search(/Damage \d/i) !=-1 ){
                attackData.data.damage = e.match(/(?<=Damage )\d/)[0];
            } 
            if(e.search(/\d+(?= Base Dice)/i) != -1 ) attackData.data.dice = e.match(/\d+(?= Base Dice)/)[0];
        console.log()
            resp.push(attackData);            
        }
        
    )
    return resp;
}
/*
Main generation of creatures
*/

//fill textByCreatureArray
let creatureTable = [];
regArr.forEach(async e => {
    let text = getCreatureText(e, sourceTextMod);
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
    let attacks = await getAttacks(text);
    let description = getDescription(text, e);
    let notes = ``;

    creatureTable.push({
        text: text.replace(/\d*\n*\*{10}/g,''),
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
        attacks : attacks,
        notes: notes

    })
}
);
export { creatureTable };




