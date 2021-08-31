const { Command } = require('discord-akairo');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo'],
            description: 'Affiche les informations de l\'utilisateur',
            typing: true,
            args: [
                { id: 'member', type: 'member', default: message => message.member},
            ]
        });
    }

    exec(message, args) {
        return message.channel.send({ embeds: [
            this.client.functions.embed()
                .setTitle(`${args.member.displayName}`)
                .setThumbnail(args.member.user.displayAvatarURL())
                .setDescription(`Creation date : ${args.member.user.createdAt}`)
            ]})
    }
}

module.exports = UserInfoCommand;