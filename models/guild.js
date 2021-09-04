const mongoose = require("mongoose");
const {DEFAULTSETTINGS: defaults} = require("../util/config.json");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    prefix:{
        "type":String,
        "default": defaults.prefix
    }
});

module.exports = mongoose.model("Guild", guildSchema);