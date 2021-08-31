const {MessageEmbed} = require("discord.js");

module.exports.run = (client, message, args) => {

    let user = message.mentions.users.first();
    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('0xff0000')
                .setTitle(`${user.username}`)
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`Creation date : ${user.createdAt}`)
        ]});
};

module.exports.help = {
    name:"userinfo",
    aliases: ["userinfo"],
    description:"send the user infos",
    cooldown: 1,
    usage: "[user to mention]",
    args: true
};