module.exports = (app) => {
    const postController = require('../controllers/post.controller');
    const commentController = require('../controllers/comments.controller');


    // Create a new Note
    app.post('/createPost', function (req ,res) {
        postController.create(req,res);
    });

    // Retrieve all Notes
    app.get('/viewPost', function (req ,res) {
        postController.findAll(req,res);
    });

    // Retrieve a single Note with noteId
    app.get('/viewPostById/:pId',  function (req ,res) {
        postController.findOne(req,res);
    });

    // Update a Note with noteId
    app.put('/updatePostById/:pId', function (req ,res) {
        postController.update(req,res);
    });

    // Delete a Note with noteId
    app.post('/removePostById', function (req ,res) {
        postController.delete(req,res);
    });
    // Hide a Note with noteId
    app.post('/hidePostById', function (req ,res) {
        postController.hide(req,res);
    });

    // Comments manipulations

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