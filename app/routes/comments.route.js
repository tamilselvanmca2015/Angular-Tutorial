module.exports = (app) => {
    const commentController = require('../controllers/comments.controller');

    // Create a new Note
    app.put('/createCommentById/:pId', function (req ,res) {
        commentController.createComments(req,res);
    });
    // Update a Note with noteId
    app.put('/updateCommentById/:pId', function (req ,res) {
        commentController.update(req,res);
    });

    // Delete a Note with noteId
    app.put('/deleteCommentById/', function (req ,res) {
        commentController.deleteComments(req,res);
    });
}