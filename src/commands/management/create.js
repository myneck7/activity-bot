const { Command } = require('discord-akairo');

class CreateCommand extends Command {
    constructor() {
        super('create', {
            aliases: ['create', 'c'],
            typing: true,
            args: [
                { id: 'member', type: 'member'},
            ]
        });
    }

    async exec(message, args) {

        let c = message.guild.channels.cache.find(c => c.name == "activity" && c.type == "GUILD_CATEGORY")
        let role = message.guild.roles.cache.find(role => role.name === "Spanish Inquisition");
        let name = args.member.displayName;

        await message.guild.channels.create(name, {
            parent: c,
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: role,
                    allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'ADD_REACTIONS', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: args.member.user.id,
                    allow: ['VIEW_CHANNEL']
                }
            ]
        });

        return message.channel.send({ embeds: [
                this.client.functions.embed()
                    .setTitle(`${args.member.displayName}`)
                    .setThumbnail(args.member.user.displayAvatarURL())
                    .setDescription(`Creation date : ${args.member.user.createdAt}`)
            ]});
    }
}

module.exports = CreateCommand;