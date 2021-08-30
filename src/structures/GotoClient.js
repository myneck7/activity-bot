const { AkairoClient, CommandHandler } = require('discord-akairo');

module.exports = class GotoClient extends AkairoClient {
    constructor(config = {}) {
        super(
            { ownerID: '215894426231242753'},
            {
                allowedMentions:{
                    parse: ['roles', 'everyone', 'users'],
                    repliedUser: false
                },
                partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
                presence: {
                    status: 'dnd',
                    activities:[
                        {
                            name: 'unsuspicious',
                            type:'WATCHING',
                            url:'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                    ]

                },
                intents: 32767
            }
        );

        this.commandHandler = new CommandHandler(this, {
            allowMention:true,
            prefix: config.prefix,
            defaultCooldown: 2000,
            directory: './src/commands/'
        });

        this.commandHandler.loadAll();
    }
}