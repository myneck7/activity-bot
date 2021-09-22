const mongoose = require("mongoose");
const {Activity} = require('../models/index');

module.exports = async client => {
    client.createActivity = async (activity) =>{
        await client.deleteGuild(activity.guildId, activity.activityName);
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, activity);
        const createActivity = await new Activity(merged);
        createActivity.save();
    }
    client.deleteActivity = async (guild, activityName) =>{
        await Activity.findOneAndDelete({ guildId: guild, activityName: activityName});
    }
    client.getActivity = async (guild, activityName) =>{
        const data = await Activity.findOne({ activityName: activityName, guildId: guild.id});
        return data.score;
    };
    client.getAllActivity = async (guild) =>{
        const data = await Activity.find({ guildId: guild.id}).select('-guildId -_id -__v');
        return data;
    };
};