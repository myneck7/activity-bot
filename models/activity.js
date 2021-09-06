const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    activityName: String,
    score:{
        "type":Number,
        "default": 100
    }
});

module.exports = mongoose.model("Activity", activitySchema);