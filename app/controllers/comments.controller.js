const commentsModels = require('../models/post.models');

//Create comments for paritcular posts
exports.createComments = (req, res) => {
    console.log(req.params.pId)
    commentsModels.findOneAndUpdate({ "_id": req.params.pId}, { $push: { comments: req.body}}, {new: true}, function(err, update) {
        if (err) {
            return res.status(500).json({
                "status": "error",
                "result": "server error"
            });
        } else {
            return res.status(200).json({
                "status": "ok",
                "result": "free time Updated Successfully"
            });
        }
    });
};
// Delete the comments which means change the key isDelete
exports.deleteComments = (req, res) => {
     commentsModels.findOneAndUpdate({ "_id": req.body.pId, "comments._id": req.body.commentId }, { $set : { 'comments.$.name':"Takeitease" } }, {new:true},function(err,update){
         if (err) {
             return res.status(500).json({
                 "status": "error",
                 "result": "server error"
             });
         } else {
             console.log(update);
             return res.status(200).json({
                 "status": "Ok",
                 "result": "Deleted Successfully"
             });
         }
     });
}
/*commentsModels.findById(req.body.pId, function(err, post) {
    //console.log(post);
    var subDoc = post.comments.id(req.body.commentId);
    console.log(subDoc);
    /!*subDoc.set(req.body);

    // Using a promise rather than a callback
    post.save().then(function(savedPost) {
        res.send(savedPost);
    }).catch(function(err) {
        res.status(500).send(err);
    });*!/
});*/

// Find and update the comments using post id and comments Id
/*Folder.findOneAndUpdate(
    { "_id": folderId, "permissions._id": permission._id },
    {
        "$set": {
            "permissions.$": permission
        }
    },
    function(err,doc) {

    }
);*/

