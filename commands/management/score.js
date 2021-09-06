const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    let activityName = args[0];
    let repetition = args[1];
    if(repetition == null){
        repetition = 1;
    }
    let newScore = await client.getActivity(message.guild, activityName);
    newScore = newScore * repetition;
    await client.addPlayerScore(message.guild, message.author.id, newScore);

    let l = message.guild.channels.cache.find(c => c.name == "logs" && c.type == "GUILD_TEXT").id;
    const embedLogs =
        new MessageEmbed().setColor('#3ac433')
            .setTitle(`${message.author.username} (${message.author.id})`)
            .setThumbnail(message.author.avatarURL())
            .setDescription(`**Action** : adding score\n**Player** : ${message.author.username}\n**Activity** : ${activityName}\n**Occurrence** : ${repetition}\n**Score** : ${newScore}`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL());
    client.channels.cache.get(l).send({ embeds: [embedLogs]});

    let img = await client.getImg(message.guild, message.author.id);
    let score = await client.getPlayerScore(message.guild, message.author.id);
    return message.channel.send({ embeds: [
            new MessageEmbed().setColor('0xff0000')
                .setTitle(`${message.author.username}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .addField('Score',`Current score : ${score}`)
                .setImage(img)
        ]});
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.SCORE;