const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {

    try {
        let user = message.mentions.users.first();
        let img = await client.getImg(message.guild, message.author.id);

        let score = await client.getPlayerScore(message.guild, user.id);
        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`${user.username}`)
                    .setThumbnail(user.displayAvatarURL())
                    .addField('Score', `Current score : ${score}`)
                    .setImage(img)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t send the userinfo');
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.USERINFO;