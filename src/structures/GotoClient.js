const {embed} = require("../util/functions");
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

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
                            name: 'YOU',
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

        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });

        //this.client.functions.embed()
        this.functions ={
            embed: embed
        }

        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
    }
}