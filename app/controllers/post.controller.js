const postModels = require('../models/post.models');


// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    console.log(req.body);

    // Create a Post
    const post = new postModels({
        pId : req.body.pId,
        name : req.body.name,
        img : req.body.img,
        postTime : req.body.postTime,
        postImg :req.body.postImg,
        postdescp : req.body.postdescp,
        likeCount : req.body.likeCount,
        commentCount: req.body.commentCount,
        isComment: req.body.isComment,
        isDelete: req.body.isDelete,
        isHide: req.body.isHide,
        comments: req.body.comments
    });

    // Save Note in the database
    post.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};


exports.findAll = (req, res) => {
    postModels.find()
        .then(posts => {
            res.status(200);
            res.json({ status : res.statusCode,data: posts});
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}

// Find a single post with a post Id
exports.findOne = (req, res) => {
    console.log(req.params);
    postModels.findById(req.params.pId)
        .then(posts => {
            if(!posts) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.pId
                });
            }
            res.send(posts);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.pId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.pId
        });
    });
};


// Update a post identified by the post id in the request
exports.update = (req, res) => {

    // Find note and update it with the request body
    postModels.findByIdAndUpdate(req.params.pId, {
        pId : req.body.pId,
        name : req.body.name,
        img : req.body.img,
        postTime : req.body.postTime,
        postImg :req.body.postImg,
        postdescp : req.body.postdescp,
        likeCount : req.body.likeCount,
        commentCount: req.body.commentCount,
        isComment: req.body.isComment,
        isDelete: req.body.isDelete,
        isHide: req.body.isHide,
        comments: req.body.comments
    }, {new: true})
        .then(posts => {
            if(!posts) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.pId
                });
            }
            res.send(posts);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.pId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.pId
        });
    });
};

// Delete a posts with the specified post id in the request
exports.delete = (req, res) => {
    postModels.findOneAndUpdate({ "_id": req.body.id}, { $set : { 'isDelete':true } }, {new:true},function(err,update){
        if (err) {
            return res.status(500).json({
                "status": "error",
                "result": "server error"
            });
        } else {
            console.log(update);
            return res.status(200).json({
                "status": "ok",
                "result": "Deleted  Successfully"
            });
        }
    });
};


// Delete a posts with the specified post id in the request
exports.hide = (req, res) => {
    postModels.findOneAndUpdate({ "_id": req.body.id}, { $set : { 'isHide':true } }, {new:true},function(err,update){
        if (err) {
            return res.status(500).json({
                "status": "error",
                "result": "server error"
            });
        } else {
            console.log(update);
            return res.status(200).json({
                "status": "ok",
                "result": "Hide Successfully"
            });
        }
    });
};