const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });
fs = require('fs-extra');




// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Fix deprication warning for modify
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);




// define a simple route
app.get('/', (req, res) => {
    res.status(200).json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});




var schema = mongoose.Schema({
    img: { data: Buffer, contentType: String }
});





var A = mongoose.model('A', schema);

app.get('/photos', (req, res) => {
    A.find()
        .then(imgs => {
            console.log()
            console.log(imgs[0].img.data.buffer);
            const imgArray= imgs.map(element => element._id);
            console.log(imgArray);
            res.status(200);
            res.contentType(imgs[0].img.contentType);
            res.send(imgs[0].img.data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
});
app.post('/postImg',upload.single('file'), (req,res) => {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    console.log(mongoose.collection);
    const result = {
        contentType: req.file.mimetype,
        data:  encode_image
    };
    const a = new A( {img : result } );
    // Save Note in the database
    a.save()
        .then(data => {
            res.contentType('json');
            res.status(200).send(a);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
});
require('./app/routes/post.route')(app);

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});
