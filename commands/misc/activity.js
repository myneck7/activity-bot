const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message) => {
    try {
        let act = await client.getAllActivity(message.guild);
        let listAct = "";
        let listScore = "";
        for (let value of Object.entries(act)) {
            value = String(value);
            value = value.split('\'');
            let test = value[2].split(' ');
            listAct += value[1] + "\n";
            listScore += test[2] + "\n";

        }
        if (listAct == "") {
            listAct = "null";
            listScore = "null";
        }
        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`Activity available: `)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                    .addField('Name of the activity', `${listAct}`, true)
                    .addField('Score given', `${listScore}`, true)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }

};

module.exports.help = MESSAGES.COMMANDS.MISC.ACTIVITY;