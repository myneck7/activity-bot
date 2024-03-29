const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args, settings) => {
    try {
        const newSetting = args[0];
        if (newSetting) {
            await client.updateGuild(message.guild, {defaultScore: Number(newSetting)});
            return message.channel.send(`max score updated: \`${settings.defaultScore}\` -> \`${newSetting}\` `);
        }
        message.channel.send(`Max score: \`${settings.defaultScore}\``);
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }

};

module.exports.help = MESSAGES.COMMANDS.CONFIG.DEFAULTSCORE;