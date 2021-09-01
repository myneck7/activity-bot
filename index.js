// Require the necessary discord.js classes
const { TOKEN, PREFIX } = require('./util/config.json');
const {loadCommands, loadEvents} = require('./util/loader');

const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require("./util/functions")(client);
client.mongoose = require('./util/mongoose');
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

loadCommands(client);
loadEvents(client);
client.mongoose.init();

client.login(TOKEN);