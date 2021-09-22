const MESSAGES = {
    COMMANDS:{
        MISC:{
            PING:{
                name:"ping",
                aliases: ["ping"],
                category:'misc',
                description:"send pong",
                cooldown: 5,
                usage: '',
                roles: true,
                args: false
            },
            ME:{
                name:"me",
                aliases: ["me"],
                category:'misc',
                description:"send user info",
                cooldown: 5,
                usage: '',
                roles: false,
                args: false
            },
            ACTIVITY:{
                name:"activity",
                aliases: ["activity", "a"],
                category:'misc',
                description:"send activity list",
                cooldown: 5,
                usage: '',
                roles: false,
                args: false
            },
            LEADERBOARD:{
                name:"leaderboard",
                aliases: ["leaderboard", "l"],
                category:'misc',
                description:"send player list",
                cooldown: 5,
                usage: '',
                roles: false,
                args: false
            },
            HELP:{
                name:"help",
                aliases: ["help", "h"],
                category:'misc',
                description:"send a list of commands or information about one",
                cooldown: 5,
                usage: '[command_name]',
                roles: false,
                args: false
            },
            USERINFO:{
                name:"userinfo",
                aliases: ["userinfo", "u"],
                category:'misc',
                description:"send the user infos",
                cooldown: 5,
                usage: "[user]",
                roles: true,
                args: true
            }
        },
        MANAGEMENT:{
            CHANNEL:{
                name:"channel",
                aliases: ["channel", "c"],
                category:'management',
                description:"create a channel for a user",
                cooldown: 5,
                usage:'[@user]',
                roles: true,
                args: true
            },
            SCORE:{
                name:"score",
                aliases: ["score", "s"],
                category:'management',
                description:"add score using activities",
                cooldown: 5,
                usage:'[activity_name] {occurrence}',
                roles: false,
                args: true
            },
            ADDPLAYER:{
                name:"addplayer",
                aliases: ["addplayer", "ap"],
                category:'management',
                description:"Add a player to the guild",
                cooldown: 5,
                usage:'[@user]',
                roles: true,
                args: true
            },
            BREAK:{
                name:"break",
                aliases: ["break", "b"],
                category:'management',
                description:"put a player on break",
                cooldown: 5,
                usage:'[@user]',
                roles: true,
                args: true
            },
            ADDACTIVITY:{
                name:"addactivity",
                aliases: ["addactivity", "ac"],
                category:'management',
                description:"Add an activity to the guild",
                cooldown: 5,
                usage:'[activity_name] {score}',
                roles: true,
                args: true
            },
            ADDSCORE:{
                name:"addscore",
                aliases: ["addscore", "as"],
                category:'management',
                description:"add score to a player",
                cooldown: 5,
                usage:'[@user] [score]',
                roles: true,
                args: true
            },
            DELETEPLAYER:{
                name:"deleteplayer",
                aliases: ["deleteplayer", "dp"],
                category:'management',
                description:`delete a player`,
                cooldown: 5,
                usage:'[@user]',
                roles: true,
                args: true
            },
            DELETEACTIVITY:{
                name:"deleteactivity",
                aliases: ["deleteactivity", "da"],
                category:'management',
                description:"delete an activity",
                cooldown: 5,
                usage:'[activity_name]',
                roles: true,
                args: true
            }
        },
        SETUP:{
            SETUP:{
                name:"setup",
                aliases: ["setup"],
                category:'setup',
                description:"setup",
                cooldown: 10,
                usage: '',
                roles: false,
                args: false
            }
        },
        CONFIG:{
            DAILYLOSS:{
                name:"dailyloss",
                aliases: ["dailyloss"],
                category:'config',
                description:"update the daily loss to a new number",
                cooldown: 10,
                usage: '[new_daily_loss]',
                roles: true,
                args: true
            },
            CONFIG:{
                name:"config",
                aliases: ["config"],
                category:'config',
                description:"list the config of the server",
                cooldown: 10,
                usage: '',
                roles: true,
                args: false
            },
            IMAGE:{
                name:"image",
                aliases: ["image"],
                category:'config',
                description:"update the selected image between 1 to 4",
                cooldown: 10,
                usage: '[number of the image] [new_url]',
                roles: true,
                args: true
            },
            MAXSCORE:{
                name:"maxscore",
                aliases: ["maxscore"],
                category:'config',
                description:"update the max score to a new number",
                cooldown: 10,
                usage: '[new_max_score]',
                roles: true,
                args: true
            },
            DEFAULTSCORE:{
                name:"defaultscore",
                aliases: ["defaultscore", "default"],
                category:'config',
                description:"update the default score for a new player",
                cooldown: 10,
                usage: '[new_default_score]',
                roles: true,
                args: true
            },
            PREFIX:{
                name:"prefix",
                aliases: ["prefix"],
                category:'config',
                description:"update the prefix",
                cooldown: 10,
                usage: '[new_prefix]',
                roles: true,
                args: true
            }
        }
    }
}

exports.MESSAGES = MESSAGES;