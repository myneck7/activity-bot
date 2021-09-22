const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message) => {
    try {
        let act = await client.getAllPlayer(message.guild);
        let listUser = "";
        let listScore = "";
        for (let value of Object.entries(act)) {
            value = String(value);
            value = value.split('\'');
            let score = value[2].split(':');
            let scoreFinal = score[1].split(',');
            let username = client.users.cache.get(value[1]);
            if (!username) {
                listUser += value[1] + "\n";
            } else {
                listUser += username.username + "\n";
            }
            console.log(scoreFinal[0]);
            listScore += scoreFinal[0] + "\n";
        }
        if (listUser == "") {
            listUser = "null";
            listScore = "null";
        }
        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`Leaderboard: `)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                    .addField('Name of the player', `${listUser}`, true)
                    .addField('Current score', `${listScore}`, true)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.LEADERBOARD;