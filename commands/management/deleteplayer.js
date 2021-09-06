const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message) => {
    const user = message.mentions.users.first();
    await client.deletePlayer(message.guild.id, user.id);

    let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
    const embedLogs =
        new MessageEmbed().setColor('#2c29d6')
            .setTitle(`${user.username} (${user.id})`)
            .setThumbnail(user.avatarURL())
            .setDescription(`**Action** : delete a player\n**Name** : ${user.username}`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL());
    client.channels.cache.get(l).send({ embeds: [embedLogs]});

    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('GREEN')
                .setTitle(`${message.author.username}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`**Action** : delete player\n**Status** : Done`)
        ]});


};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.DELETEPLAYER;