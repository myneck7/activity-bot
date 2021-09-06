const mongoose = require("mongoose");
const {DEFAULTSETTINGS: defaults} = require("../util/config.json");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    guildName: String,
    prefix:{
        "type":String,
        "default": "$"
    },
    maxScore:{
        "type":Number,
        "default": 1000
    },
    dailyLoss:{
        "type":Number,
        "default":100
    },
    defaultScore:{
        "type":Number,
        "default": 500
    },
    img1:{
        "type": String,
        "default": 'https://i.imgur.com/oNklEOy.jpeg'
    },
    img2:{
        "type": String,
        "default": 'https://i.imgur.com/vG1yXbG.jpeg'
    },
    img3:{
        "type": String,
        "default": 'https://i.imgur.com/zIXZsux.jpeg'
    },
    img4:{
        "type": String,
        "default": 'https://i.imgur.com/Vf0FX2e.jpeg'
    }

});

module.exports = mongoose.model("Guild", guildSchema);