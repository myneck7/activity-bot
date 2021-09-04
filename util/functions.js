const mongoose = require("mongoose");
const {Guild, Player} = require('../models/index');

module.exports = async client => {
    client.createGuild = async guild =>{
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`Nouveau serveur -> ${g.guildName}`));
    }

    client.getGuild = async guild =>{
        const data = await Guild.findOne({ guildId: guild.id});
        if(data) return data;
        return client.config.DEFAULTSETTINGS;
    };

    client.updateGuild = async (guild, settings) =>{
        let data = await client.getGuild(guild);
        if(typeof data !== "object") data ={};
        for (const key in settings){
            if(data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    }
    client.createPlayer = async (player) =>{
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, player);
        const createPlayer = await new Player(merged);
        createPlayer.save().then(g => console.log(`Nouveau joueur -> ${g.userId}`));
    }
    client.getPlayer = async (guild, player) =>{
        const data = await Player.findOne({ userId: player, guildId: guild.id});
        return data;
    };

    client.addPlayerScore = async (guild, player, newScore) =>{
        let data = await client.getPlayer(guild, player);
        let ns = Number(newScore);
        console.log("+");
        return data.updateOne({$inc: {score: ns}});

    }
    client.minusPlayerScore = async (guild, player, newScore) =>{
        let data = await client.getPlayer(guild, player);
        let ns = Number(newScore);
        console.log("-");
        return data.updateOne({$inc: {score: -ns}});
    }
};