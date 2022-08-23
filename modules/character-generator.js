import { creatureTable } from './parser.js'
const moduleData = {
    moduleFlag: "servants-of-memory-parser",
    moduleKey: "fbl-servants-of-memory-npc-parser",
    moduleTitle: "FBL The Servants of Memory NPC Parser",
    moduleFolderNameDict: {
        "Servants of Memory actors": "Servants of Memory"
    }
};

// class required by the registerMenu method.
class ImportFormWrapper extends FormApplication {
    render() {
        if (!game?.data) return ui.notifications.error("Can't access game version, be careful with importing content.");
        if (game.data?.version > "0.7.9") return ModuleImport.filterDialog(moduleData);
        return ui.notifications.warn("This version of the core module is not compatible with 0.7.9");
    }
}

let welcome = async (data) => {

    //game.settings.set(data.moduleKey, "initialized", true);
    const dialog = new Dialog({
        title: `Import ${data.moduleTitle}`,
        content: await getTemplate(`modules/${data.moduleKey}/modules/import.html`),
        buttons: {
            initialize: {
                label: "Begin!",
                callback: async () => {

                    await createFolder();
                    generateCreatures();

                }
            },

            cancel: {
                label: "Cancel",
                callback: () => console.log("import cancel")
            }
        }
    }
    );
    dialog.render(true);

}
//Creation of Servant of Memory folder
let createFolder = async () => {
    console.log("///Folder creaation/////")
    await Folder.create({
        name: moduleData.moduleFolderNameDict['Servants of Memory actors'],
        type: "Actor"
    });
}

let skillsNameArr = ["might", "endure", "melee", "crafting", "stealth", "sleight-of-hand", "move", "marksmanship", "scout", "scouting", "lore", "survive", "insight", "manipulate", "performance", "healing", "animal"]
let generateCreatures = () => {
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
        //update skills if specified
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

        //update gears

            if(creature.gears){
                creature.gears.forEach( async e=>
                   actor.createEmbeddedDocuments("Item",[e])
                )
            }


    }
    )
}
Hooks.once("ready", async () => {
    welcome(moduleData);
})