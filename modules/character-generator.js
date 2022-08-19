import { creatureTable } from './parser.js'
const moduleData = {
    moduleFlag: "servants-of-memory-parser",
    moduleKey: "fbl-servants-of-memory-parser",
    moduleTitle: "FBL The Servants of Memory NPC Parser",
    moduleFolderNameDict: {
        "Servants of Memory actors": "Servants of Memory"
    }
};
console.log("///Folder creaation/////")

Hooks.once("ready", async () => {
    await Folder.create({
        name: "TestParser",
        type: "Actor"
    });

    creatureTable.forEach(e => {
        let actor = Actor.create({
            name: e.name,
            type: "monster",
            folder: game.folders.getName("TestParser"),
            img: e.img,
            data: {
                attribute: {
                    strength: {
                        value: e.attributes.strength,
                        max: e.attributes.strength
                    },
                    agility: {
                        value: e.attributes.agility,
                        max: e.attributes.agility
                    },
                    wits: {
                        value: e.attributes.wits,
                        max: e.attributes.wits
                    },
                    empathy: {
                        value: e.attributes.empathy,
                        max: e.attributes.empathy
                    }
                }
                /*,
                skill: {
                    "might": {
                        "label": "SKILL.MIGHT",
                        "value": 0,
                        "min": 0,
                        "attribute": "strength"
                    },
                    "endurance": {
                        "label": "SKILL.ENDURANCE",
                        "value": 0,
                        "min": 0,
                        "attribute": "strength"
                    },
                    "melee": {
                        "label": "SKILL.MELEE",
                        "value": 0,
                        "min": 0,
                        "attribute": "strength"
                    },
                    "crafting": {
                        "label": "SKILL.CRAFTING",
                        "value": 0,
                        "min": 0,
                        "attribute": "strength"
                    },
                    "stealth": {
                        "label": "SKILL.STEALTH",
                        "value": 0,
                        "min": 0,
                        "attribute": "agility"
                    },
                    "sleight-of-hand": {
                        "label": "SKILL.SLEIGHT_OF_HAND",
                        "value": 0,
                        "min": 0,
                        "attribute": "agility"
                    },
                    "move": {
                        "label": "SKILL.MOVE",
                        "value": 0,
                        "min": 0,
                        "attribute": "agility"
                    },
                    "marksmanship": {
                        "label": "SKILL.MARKSMANSHIP",
                        "value": 0,
                        "min": 0,
                        "attribute": "agility"
                    },
                    "scouting": {
                        "label": "SKILL.SCOUTING",
                        "value": 0,
                        "min": 0,
                        "attribute": "wits"
                    },
                    "lore": {
                        "label": "SKILL.LORE",
                        "value": 0,
                        "min": 0,
                        "attribute": "wits"
                    },
                    "survival": {
                        "label": "SKILL.SURVIVAL",
                        "value": 0,
                        "min": 0,
                        "attribute": "wits"
                    },
                    "insight": {
                        "label": "SKILL.INSIGHT",
                        "value": 0,
                        "min": 0,
                        "attribute": "wits"
                    },
                    "manipulation": {
                        "label": "SKILL.MANIPULATION",
                        "value": 0,
                        "min": 0,
                        "attribute": "empathy"
                    },
                    "performance": {
                        "label": "SKILL.PERFORMANCE",
                        "value": 0,
                        "min": 0,
                        "attribute": "empathy"
                    },
                    "healing": {
                        "label": "SKILL.HEALING",
                        "value": 0,
                        "min": 0,
                        "attribute": "empathy"
                    },
                    "animal-handling": {
                        "label": "SKILL.ANIMAL_HANDLING",
                        "value": 0,
                        "min": 0,
                        "attribute": "empathy"
                    }
                }
                */,
                movement: { value: e.movement },
                armor: {
                    value: e.armor
                },
                bio: {
                    note: {
                        value: e.txt
                    }
                }
            },
            token: {
                name: e.name,
                img: e.imgToken
            }
        });
    })
})