const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = (client, message, args) => {

    let user = message.mentions.users.first();
    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('0xff0000')
                .setTitle(`${user.username}`)
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`Creation date : ${user.createdAt}`)
        ]});
};

module.exports.help = MESSAGES.COMMANDS.MISC.USERINFO;