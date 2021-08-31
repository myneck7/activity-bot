// Require the necessary discord.js classes
const { TOKEN, PREFIX } = require('./src/util/config.json');
const {readdirSync} = require("fs");

const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for(const file of commands){
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`commande chargée: ${getFileName.help.name}`);
        };
    });
};

loadCommands();

client.on("ready", () => {
    console.log("I'm ready !");
});

client.on('messageCreate', async message =>{
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if(!command) return;


    if (command.help.args && !args.length){
        let noArgs = `missing arguments ${message.author}`;

        if(command.help.usage) {
            noArgs += `\nHow to use : \`${PREFIX}${command.help.name} ${command.help.usage}\``;
        }

        return message.channel.send(noArgs);
    }
    if(!client.cooldowns.has(command.help.name)){
        client.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 1) * 1000;

    if(tStamps.has(message.author.id)){
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if(timeNow < cdExpirationTime){
            let timeLeft = (cdExpirationTime - timeNow) / 1000;
            return message.reply(`Cooldown of ${timeLeft.toFixed(0)} seconds before using \`${command.help.name}\` `);
        }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    command.run(client, message, args);
});

client.login(TOKEN);