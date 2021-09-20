const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    userId: String,
    score: {
        "type": Number,
        "default": 500
    },
    onBreak:{
        "type": Boolean,
        "default": false
    },
    exp:{
        "type": Number,
        "default": 0
    },
    level:{
        "type":Number,
        "default":0
    }
});

module.exports = mongoose.model("Player", playerSchema);