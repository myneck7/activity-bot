const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        let user = message.mentions.users.first();
        if (!user) {
            user = message.author;
        }

        let res = await client.updateBreak(message.guild, user.id);
        let display;
        if(res){
            display = "On a break"
        }
        else{
            display = "Available"
        }
        try {
            await client.getEmbedLogsQuantity(client, message, user, "Putting on break", display);

        }
        catch (e) {
            message.reply('No access to the channel \"logs\"');
        }

        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('GREEN')
                    .setTitle(`${message.author.username}`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`**Action** : edit break\n**Status** : Done`)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.BREAK;