const { Command } = require('discord-akairo');

class EmbedCommand extends Command {
    constructor() {
        super('embed', {
            aliases: ['embed']
        });
    }

    exec(message) {

        message.channel.send({ embeds: [ this.client.functions.embed().setDescription('hello') ]});
    }
}

module.exports = EmbedCommand;