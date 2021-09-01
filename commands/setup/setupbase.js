const {MESSAGES} = require('../../util/constants');

module.exports.run = (client, message, args) => {
    let c = message.guild.channels.cache.find(c => c.name == "activity" && c.type == "GUILD_CATEGORY")

    message.guild.channels.create('base', {
        parent: c
    });

    message.guild.channels.create('logs', {
        parent: c
    });

    return message.reply('examination chamber renovated');
};

module.exports.help = MESSAGES.COMMANDS.SETUP.SETUPBASE;