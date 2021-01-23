const mongoose = require('mongoose');
const { Schema } = mongoose;
const blogSchema = new Schema({
    title: {
        type: String,
        maxlength: 256,
        required: true,
    },
    tags: [String],
    createdAT: {
        type: Date,
        default: Date.now(),
    },
    ubdatedAt: Date,
    autherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    auther: String,
    body: String,
    imgurl: String,
    photo: {
        data: Buffer,
        contentType: String,
    },


})
const blogModle = mongoose.model('Blog', blogSchema);
module.exports = blogModle;