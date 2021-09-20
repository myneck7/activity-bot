const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args, settings) => {
    try {
        const newSetting = args[0];
        if (newSetting) {
            await client.updateGuild(message.guild, {prefix: newSetting});
            return message.channel.send(`Prefix updated: \`${settings.prefix}\` -> \`${newSetting}\` `);
        }
        message.channel.send(`Prefix: \`${settings.prefix}\``);
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.CONFIG.PREFIX;