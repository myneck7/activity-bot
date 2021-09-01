module.exports = async (client, guild) => {
    const newGuild = {
        guildId: guild.id,
        guildName: guild.name
    };

    await client.createGuild(newGuild);
}