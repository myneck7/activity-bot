const {MESSAGES} = require('../../util/constants');

module.exports.run = (client, message, args) => {
    message.guild.roles.create({
        name: 'Spanish Inquisition',
        color: 'GOLD',
        reason: 'Nobody expect the spanish inquisition',
    });

    return message.reply('Nobody expect the spanish inquisition');
};

module.exports.help = MESSAGES.COMMANDS.SETUP.SETUPROLE;