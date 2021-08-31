const { Command } = require('discord-akairo');

class setupCategoryCommand extends Command {
    constructor() {
        super('setupcategory', {
            aliases: ['setupcategory', 'setup2', 'setupc']
        });
    }

    exec(message) {

        let role = message.guild.roles.cache.find(role => role.name === "Spanish Inquisition");
        message.guild.channels.create('activity', {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [
                {
                    id: role,
                    allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'ADD_REACTIONS', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                }
            ]
        });

        return message.reply('Interrogation building finished');
    }
}

module.exports = setupCategoryCommand;