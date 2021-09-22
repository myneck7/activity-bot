const mongoose = require("mongoose");
const {Guild} = require('../models/index');

module.exports = async client => {
    client.createGuild = async guild =>{
        await client.deleteGuild(guild);
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save();
    }

    client.getGuild = async guild =>{
        const data = await Guild.findOne({ guildId: guild.id});
        return data;
    };
    client.deleteGuild = async guild =>{
        const data = await Guild.findOneAndDelete({ guildId: guild.id});
        return data;
    };

    client.getDefaultScore = async guild =>{
        const data = await Guild.findOne({ guildId: guild.id});
        return data.defaultScore;
    };

    client.updateGuild = async (guild, settings) =>{
        let data = await client.getGuild(guild);
        if(typeof data !== "object") data ={};
        for (const key in settings){
            if(data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    }
};