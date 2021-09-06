const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    const act = args[0];
    const score = args[1];
    let newActivity;
    if(score && !isNaN(score)) {
        newActivity = {guildId: message.guild.id, activityName: act, score: score};
    }
    else{
        newActivity = {guildId: message.guild.id, activityName: act};
    }
    await client.createActivity(newActivity);

    let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
    const embedLogs =
        new MessageEmbed().setColor('#03c2fc')
            .setTitle(`${message.author.username} (${message.author.id})`)
            .setThumbnail(message.author.avatarURL())
            .setDescription(`**Action** : add an activity\n**Name** : ${act}\n**Score** : ${score}`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL());
    client.channels.cache.get(l).send({ embeds: [embedLogs]});

    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('GREEN')
                .setTitle(`${message.author.username}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(`**Action** : activity creation\n**Status** : Done`)
        ]});


};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.ADDACTIVITY;