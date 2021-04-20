const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const postModel = mongoose.model('postModel', postSchema);

module.exports = postModel;