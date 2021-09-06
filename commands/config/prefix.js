const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args, settings) => {
    const newSetting = args[0];
    if (newSetting) {
        await client.updateGuild(message.guild, {prefix: newSetting});
        return message.channel.send(`Prefix updated: \`${settings.prefix}\` -> \`${newSetting}\` `);
    }
    message.channel.send(`Prefix: \`${settings.prefix}\``);

};

module.exports.help = MESSAGES.COMMANDS.CONFIG.PREFIX;