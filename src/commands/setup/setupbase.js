const { Command } = require('discord-akairo');

class setupBaseCommand extends Command {
    constructor() {
        super('setupbase', {
            aliases: ['setupbase', 'setup3', 'setupb']
        });
    }

    exec(message) {

        let c = message.guild.channels.cache.find(c => c.name == "activity" && c.type == "GUILD_CATEGORY")

        message.guild.channels.create('base', {
            parent: c
        });

        return message.reply('examination chamber renovated');
    }
}

module.exports = setupBaseCommand;