const mongoose = require('mongoose');


const commentsSchema = mongoose.Schema({
    pId : {
        type : Number
    },
    comments: [{
        cId: {type: Number, required: true },
        img: String,
        name: String,
        commentTime: String,
        comments: String
    }]
});


module.exports  = mongoose.model('posts', commentsSchema);