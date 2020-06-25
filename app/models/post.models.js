const mongoose = require('mongoose');

const postContentSchema = mongoose.Schema({
    pId : {
        type : Number
    },
    name : String,
    img : String,
    postTime : String,
    postImg : [
        { data : String }
    ],
    postdescp : String,
    likeCount : {type:Number,default:0},
    commentCount: {type:Number,default:0},
    isComment: Boolean,
    isDelete: Boolean,
    isHide: Boolean,
    comments: [{
        cId: {type: Number, required: true },
        img: String,
        name: String,
        commentTime: String,
        comments: String
    }]
});

module.exports  = mongoose.model('posts', postContentSchema);