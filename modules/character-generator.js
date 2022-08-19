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
        name: moduleData.moduleFolderNameDict['Servants of Memory actors'],
        type: "Actor"
    });
    let skillsNameArr = ["might", "endure", "melee", "crafting", "stealth", "sleight-of-hand", "move", "marksmanship", "scout", "lore", "survive", "insight", "manipulate", "performance", "healing", "animal"]

    creatureTable.forEach(async creature => {
        let actor = await Actor.create({
            name: creature.name,
            type: "monster",
            folder: game.folders.getName(moduleData.moduleFolderNameDict['Servants of Memory actors']),
            img: creature.img,
            data: {
                attribute: {
                    strength: {
                        value: creature.attributes.strength,
                        max: creature.attributes.strength
                    },
                    agility: {
                        value: creature.attributes.agility,
                        max: creature.attributes.agility
                    },
                    wits: {
                        value: creature.attributes.wits,
                        max: creature.attributes.wits
                    },
                    empathy: {
                        value: creature.attributes.empathy,
                        max: creature.attributes.empathy
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
                movement: { value: creature.movement },
                armor: {
                    value: creature.armor
                },
                bio: {
                    note: {
                        value: creature.text
                    }
                }
            },
            token: {
                name: creature.name,
                img: creature.imgToken
            }
        });
        if (creature.skills) {

            skillsNameArr.forEach(i => {
                if (creature.skills.hasOwnProperty(i)) {
                    let skillToFill = `data.skill.${i}.value`;
                    //handeling  exceptions
                    if (i == "animal") {
                        skillToFill = `data.skill.animal-handling.value`;
                    }
                    if (i == "scout") {
                        skillToFill = 'data.skill.scouting.value';
                    }
                    if (i == "manipulate") {
                        skillToFill = 'data.skill.manipulation.value';
                    }
                    if (i == "survive") {
                        skillToFill = 'data.skill.survival.value';
                    }
                    if (i == "endure") {
                        skillToFill = 'data.skill.endurance.value';
                    }

                    actor.update({ [skillToFill]: creature.skills[i] });
                }
            })
        }

    }
    )
})