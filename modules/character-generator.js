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
                },
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