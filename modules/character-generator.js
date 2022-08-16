import { creatureTable } from './parser.js'

creatureTable.forEach(e => {
    let actor = await Actor.create({
        name: e.name,
        type: "monster",
        img: e.img,
        data: {
            "attribute": {
                "strength": {
                    "label": "ATTRIBUTE.STRENGTH",
                    "value": e.attribute.strength,
                    "min": 0,
                    "max": e.attribute.strength
                },
                "agility": {
                    "label": "ATTRIBUTE.AGILITY",
                    "value": e.attribute.agility,
                    "min": 0,
                    "max": e.attribute.agility
                },
                "wits": {
                    "label": "ATTRIBUTE.WITS",
                    "value": e.attribute.wits,
                    "min": 0,
                    "max": e.attribute.wits
                },
                "empathy": {
                    "label": "ATTRIBUTE.EMPATHY",
                    "value": e.attribute.empathy,
                    "min": 0,
                    "max": e.attribute.empathy
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
            },
            "movement": {
                "label": "MOVEMENT",
                "value": 1
            },
            "armor": {
                "label": "MONSTER.ARMOR",
                "value": 0
            },
            "isMounted": false,
            "type": "monster",
            "bio": {
                "note": {
                    "value": "<p>zone text</p>\n<p>zon</p>"
                }
            }
        },
        "token": {
            "name": "*TestDev",
            "img": "systems/forbidden-lands/assets/fbl-monster.webp",
            "displayName": 0,
            "actorLink": false,
            "width": 1,
            "height": 1,
            "scale": 1,
            "mirrorX": false,
            "mirrorY": false,
            "lockRotation": false,
            "rotation": 0,
            "alpha": 1,
            "vision": false,
            "dimSight": 0,
            "brightSight": 0,
            "sightAngle": 0,
            "light": {
                "alpha": 0.5,
                "angle": 0,
                "bright": 0,
                "coloration": 1,
                "dim": 0,
                "gradual": true,
                "luminosity": 0.5,
                "saturation": 0,
                "contrast": 0,
                "shadows": 0,
                "animation": {
                    "speed": 5,
                    "intensity": 5,
                    "reverse": false
                },
                "darkness": {
                    "min": 0,
                    "max": 1
                }
            },
            "disposition": -1,
            "displayBars": 0,
            "bar1": {
                "attribute": null
            },
            "bar2": {
                "attribute": null
            },
            "flags": {},
            "randomImg": false
        },
        "items": [
            {
                "_id": "hyZ2p3xoftNQRTPv",
                "name": "New Talent",
                "type": "talent",
                "img": "icons/svg/item-bag.svg",
                "data": {
                    "rollModifiers": {},
                    "type": "general",
                    "rank": "1",
                    "description": ""
                },
                "effects": [],
                "folder": null,
                "sort": 0,
                "permission": {
                    "default": 0,
                    "SP8MEhsAcRpmUaO1": 3
                },
                "flags": {}
            }
        ],
        "effects": [],
        "folder": null,
        "sort": 0,
        "permission": {
            "default": 0,
            "SP8MEhsAcRpmUaO1": 3
        },
        "flags": {}
    });

})
