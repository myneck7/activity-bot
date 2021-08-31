const { Command } = require('discord-akairo');

class setupRoleCommand extends Command {
    constructor() {
        super('setuprole', {
            aliases: ['setuprole', 'setup1', 'setupr']
        });
    }

    exec(message) {
        message.guild.roles.create({
            name: 'Spanish Inquisition',
            color: 'GOLD',
            reason: 'Nobody expect the spanish inquisition',
        });

        return message.reply('Nobody expect the spanish inquisition');
    }
}

module.exports = setupRoleCommand;