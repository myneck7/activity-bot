const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        let user = message.mentions.users.first();
        if (!user) {
            user = message.author;
        }
        let newScore = args[1];
        if (!newScore || isNaN(newScore)) {
            newScore = 100;
        }

        await client.addPlayerScore(message.guild, user.id, newScore);

        try {
            await client.getEmbedLogsQuantity(client, message, user, "Adding score", newScore);

        }
        catch (e) {
            message.reply('No access to the channel \"logs\"');
        }

        let img = await client.getImg(message.guild, message.author.id);
        let score = await client.getPlayerScore(message.guild, user.id);
        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`${user.username}`)
                    .setThumbnail(user.displayAvatarURL())
                    .setTimestamp()
                    .addField('Score', `Current score : ${score}`)
                    .setImage(img)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.ADDSCORE;