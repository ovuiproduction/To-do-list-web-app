const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    task:{
        type:String
    }
});

module.exports = mongoose.model('Task',listSchema);