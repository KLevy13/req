const mongoose = require('mongoose');
const Schema = mongoose.Schema


const PostSchema = new Schema({
    title: {type: String, required: true},
    medium: {type: String, required: true},
    creator: {type: String, required: true},
    file: {type: String, required: true },
    writeUp: {type: String, required: true}
     
});

module.exports = mongoose.model('Post', PostSchema)
