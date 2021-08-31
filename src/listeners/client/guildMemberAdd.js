const { Listener } = require('discord-akairo');

class GuildMemberAddListener extends Listener {
    constructor() {
        super('GuildMemberAdd', {
            emitter: 'client',
            event: 'GuildMemberAdd'
        });
    }

    exec(member) {
        console.log(`Hello, i am ${member.user.username}!`);
    }
}

module.exports = GuildMemberAddListener;