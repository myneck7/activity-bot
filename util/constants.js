const MESSAGES = {
    COMMANDS:{
        MISC:{
            PING:{
                name:"ping",
                aliases: ["ping"],
                category:'misc',
                description:"send pong",
                cooldown: 1,
                usage: '',
                roles: true,
                args: false
            },
            EMBED:{
                name:"embed",
                aliases: ["embed"],
                category:'misc',
                description:"send an embed",
                cooldown: 1,
                usage: '',
                roles: false,
                args: false
            },
            HELP:{
                name:"help",
                aliases: ["help", "h"],
                category:'misc',
                description:"send a list of commands or information about one",
                cooldown: 1,
                usage: '[command_name]',
                roles: false,
                args: false
            },
            USERINFO:{
                name:"userinfo",
                aliases: ["userinfo"],
                category:'misc',
                description:"send the user infos",
                cooldown: 1,
                usage: "[user]",
                roles: true,
                args: true
            }
        },
        DEV:{
            RESTART:{
                name:"restart",
                aliases: ["restart"],
                category:'dev',
                description:"Restart the bot",
                cooldown: 1,
                usage: '',
                roles: true,
                args: false
            },
            EVAL:{
                name:"eval",
                aliases: ["eval"],
                category:'dev',
                description:"renvoie un code js testé",
                cooldown: 1,
                usage: '[code_to_test]',
                roles: true,
                args: true
            }
        },
        MANAGEMENT:{
            CREATE:{
                name:"create",
                aliases: ["create", "c"],
                category:'management',
                description:"create a channel for a user",
                cooldown: 5,
                usage:'[@user]',
                roles: true,
                args: true
            }
        },
        SETUP:{
            SETUPBASE:{
                name:"setupbase",
                aliases: ["setupbase", "setupB", "setup3"],
                category:'setup',
                description:"setup the base channel",
                cooldown: 5,
                usage: '',
                roles: true,
                args: false
            },
            SETUPCATEGORY:{
                name:"setupcategory",
                aliases: ["setupcategory", "setupc", "setup2"],
                category:'setup',
                description:"setup the category",
                cooldown: 5,
                usage: '',
                roles: true,
                args: false
            },
            SETUPROLE:{
                name:"setuprole",
                aliases: ["setuprole", "setupr", "setup1"],
                category:'setup',
                description:"setup the role",
                cooldown: 5,
                usage: '',
                roles: true,
                args: false
            }
        }
    }
}

exports.MESSAGES = MESSAGES;