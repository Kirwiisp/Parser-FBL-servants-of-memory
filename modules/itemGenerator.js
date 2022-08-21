
export let itemCreation(text)  wait the_actor_to_add_an_item_to.createEmbeddedDocuments("Item", array_of_object_data);


/*
type : gear
name = 'NOM',
data.effect ="DESCRIPTION",

type : armor
armure description : data.features
data.bonus.value
data.bonus.max

type : monsterAttack
data.dice : nombre de dé
data.damage : dégats
data.description : description
*/

//objet type attaque de monstre


// objet type armure

//objet type Equipement
{
    "_id": "H5yaULPFkxwwgH8I",
        "name": "Equipement",
            "type": "gear",
                "img": "icons/svg/item-bag.svg",
                    "data": {
        "bonus": {
            "value": 1,
                "max": 1
        },
        "rawMaterials": "",
            "time": "",
                "talent": "",
                    "tools": "",
                        "rollModifiers": { },
        "artifactBonus": "",
            "drawback": "",
                "description": "",
                    "appearance": "",
                        "effect": "<p>Description</p>\n<p>&nbsp;</p>",
                            "quantity": 1,
                                "cost": "",
                                    "supply": "",
                                        "weight": "regular"
    },
    "effects": [],
        "folder": null,
            "sort": 0,
                "permission": {
        "default": 0,
            "Ar3qgwOA4gMQxpwR": 3
    },
    "flags": { }
}

// DAlb le barde
{
    "_id": "W0KE5vIcuNp5CAIQ",
        "name": "Dalb le barde",
            "type": "character",
                "img": "modules/fbl-core-game/assets/creature-art/dalb-the-bard.webp",
                    "data": {
        "attribute": {
            "strength": {
                "label": "ATTRIBUTE.STRENGTH",
                    "value": 3,
                        "min": 0,
                            "max": 3
            },
            "agility": {
                "label": "ATTRIBUTE.AGILITY",
                    "value": 4,
                        "min": 0,
                            "max": 4
            },
            "wits": {
                "label": "ATTRIBUTE.WITS",
                    "value": 6,
                        "min": 0,
                            "max": 6
            },
            "empathy": {
                "label": "ATTRIBUTE.EMPATHY",
                    "value": 6,
                        "min": 0,
                            "max": 6
            }
        },
        "skill": {
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
                    "value": 5,
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
        },
        "type": "",
            "bio": {
            "kin": {
                "label": "BIO.KIN",
                    "value": ""
            },
            "profession": {
                "label": "BIO.PROFESSION",
                    "value": ""
            },
            "pride": {
                "label": "BIO.PRIDE",
                    "value": ""
            },
            "darkSecret": {
                "label": "BIO.DARK_SECRET",
                    "value": ""
            },
            "age": {
                "label": "BIO.AGE",
                    "value": 0
            },
            "reputation": {
                "label": "BIO.REPUTATION",
                    "value": 0
            },
            "face": {
                "label": "BIO.FACE",
                    "value": ""
            },
            "body": {
                "label": "BIO.BODY",
                    "value": ""
            },
            "clothing": {
                "label": "BIO.CLOTHING",
                    "value": ""
            },
            "note": {
                "label": "BIO.NOTE",
                    "value": "<p>L’homme âgé d’une cinquantaine d’années possède une chevelure grisonnante en bataille. Il porte une tunique verte, des braies grises et des gants tricotés qui le protègent du froid. Sa pipe ne quitte jamais le coin de sa bouche. Dalb est capable de captiver n’importe quel public sans autre artifice que ses yeux verts et sa voix rauque. Le barde (dont l’apparence est trompeuse, voyez l’encadré « Qui est Dalb ? » dans la section concernant sa rencontre avec les aventuriers) a établi son camp à l’extérieur d’Âprepierre pour entraîner les voyageurs vers le destin fatal qui les attend à l’intérieur de la forteresse. Cette nuit, la chance lui sourit puisque deux groupes se succèdent en peu de temps dans son campement.</p>"
            },
            "experience": {
                "label": "BIO.EXPERIENCE",
                    "value": 0
            },
            "willpower": {
                "label": "BIO.WILLPOWER",
                    "value": 0,
                        "min": 0,
                            "max": 10
            }
        },
        "condition": {
            "sleepy": {
                "label": "CONDITION.SLEEPY",
                    "value": false
            },
            "thirsty": {
                "label": "CONDITION.THIRSTY",
                    "value": false
            },
            "hungry": {
                "label": "CONDITION.HUNGRY",
                    "value": false
            },
            "cold": {
                "label": "CONDITION.COLD",
                    "value": false
            }
        },
        "consumable": {
            "food": {
                "label": "CONSUMABLE.FOOD",
                    "value": 0
            },
            "water": {
                "label": "CONSUMABLE.WATER",
                    "value": 0
            },
            "arrows": {
                "label": "CONSUMABLE.ARROWS",
                    "value": 0
            },
            "torches": {
                "label": "CONSUMABLE.TORCHES",
                    "value": 0
            }
        },
        "currency": {
            "gold": {
                "label": "CURRENCY.GOLD",
                    "value": 0
            },
            "silver": {
                "label": "CURRENCY.SILVER",
                    "value": 0
            },
            "copper": {
                "label": "CURRENCY.COPPER",
                    "value": 0
            }
        },
        "subtype": {
            "type": "npc"
        },
        "items": [
            {
                "key": "MryW7xeAChcZS7O6",
                "value": {
                    "_id": "MryW7xeAChcZS7O6",
                    "name": "Luth",
                    "type": "gear",
                    "img": "modules/fbl-core-game/assets/game-icons/swap-bag.svg",
                    "data": {
                        "bonus": {
                            "value": 1,
                            "max": 1
                        },
                        "rawMaterials": "1 bois, 1/4 tissu",
                        "time": "un jour",
                        "talent": "Voie du Chant",
                        "tools": "Couteau",
                        "rollModifiers": {},
                        "artifactBonus": "",
                        "drawback": "",
                        "description": "",
                        "appearance": "",
                        "effect": "Bonus d’équipement de +1 aux jets de REPRÉSENTATION.",
                        "quantity": 1
                    }
            null
        ]
    },
    "items": [
        {
            "_id": "MryW7xeAChcZS7O6",
            "name": "Luth",
            "type": "gear",
            "data": {
                "bonus": {
                    "value": 1,
                    "max": 1
                },
                "rawMaterials": "1 bois, 1/4 tissu",
                "time": "un jour",
                "talent": "Voie du Chant",
                "tools": "Couteau",
                "rollModifiers": {},
                "artifactBonus": "",
                "drawback": "",
                "description": "",
                "appearance": "",
                "effect": "Bonus d’équipement de +1 aux jets de REPRÉSENTATION.",
                "quantity": 1,
                "cost": "3 pièces d’argent",
                "supply": "Courant",
                "weight": "regular"
            },
            "sort": 3000000,
            "flags": {
                "journal-links": {},
                "core": {
                    "sourceId": "Item.vdeWDwqOh3dmadH5"
                },
                "babele": {
                    "translated": true,
                    "hasTranslation": true,
                    "originalName": "Lute"
                }
            },
            "img": "modules/fbl-core-game/assets/game-icons/swap-bag.svg",
            "effects": [],
            "folder": null,
            "permission": {
                "default": 0
            },
            "translated": true,
            "hasTranslation": true,
            "originalName": "Lute"
        },
        {
            "_id": "pTWfcooLz4sMthxc",
            "name": "Pipe",
            "type": "gear",
            "img": "modules/fbl-core-game/assets/game-icons/cash.svg",
            "data": {
                "bonus": {
                    "value": 0,
                    "max": 0
                },
                "rawMaterials": "",
                "time": "",
                "talent": "",
                "tools": "",
                "rollModifiers": {},
                "artifactBonus": "",
                "drawback": "",
                "description": "",
                "appearance": "",
                "effect": "<p>For smoking</p>",
                "quantity": 1,
                "cost": "",
                "supply": "",
                "weight": "light"
            },
            "effects": [],
            "folder": "Pu5YpG8WBN1fuzaH",
            "sort": 400000,
            "permission": {
                "default": 0,
                "QIPPs5GkUEG0G4jy": 3,
                "6f3NS5sCErm3Q7Zt": 3
            },
            "flags": {
                "core": {
                    "sourceId": "Item.OyWHKLLa78Bk4rCr"
                }
            }
        }
    ],
        "effects": [],
            "folder": null,
                "sort": 0,
                    "permission": {
        "default": 0,
            "Ar3qgwOA4gMQxpwR": 3
    },
    "flags": {
        "babele": {
            "translated": true,
                "hasTranslation": true,
                    "originalName": "Dalb The Bard"
        },
        "core": {
            "sourceId": "Compendium.fbl-core-game.core-game-actors.DS2H9G8O7nxN467h"
        }
    }
}