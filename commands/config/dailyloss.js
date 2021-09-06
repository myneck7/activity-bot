const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args, settings) => {
    const newSetting = args[0];
    if (newSetting) {
        await client.updateGuild(message.guild, {dailyLoss: Number(newSetting)});
        return message.channel.send(`Daily loss updated: \`${settings.dailyLoss}\` -> \`${newSetting}\` `);
    }
    message.channel.send(`Daily loss: \`${settings.dailyLoss}\``);
};

module.exports.help = MESSAGES.COMMANDS.CONFIG.DAILYLOSS;