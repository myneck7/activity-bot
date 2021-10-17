const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {

    try {
        let user = message.mentions.users.first();
        await client.getEmbedPlayer(client, message, user);
    }
    catch (e) {
        message.reply('Couldn\'t send the userinfo');
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.USERINFO;