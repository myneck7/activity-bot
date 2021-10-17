const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        let user = message.mentions.users.first();
        if (!user) {
            user = message.author;
        }
        let silver = args[1];
        if ( isNaN(silver)) {
             return message.reply('missing silver amount');
        }

        await client.addSilver(message.guild, user.id, silver);

        try {
            await client.getEmbedLogsQuantity(client, message, user, "Adding silvers", silver);
        }
        catch (e) {
            message.reply('No access to the channel \"logs\"');
        }

        await client.getEmbedPlayer(client, message, user);
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.ADDSILVER;