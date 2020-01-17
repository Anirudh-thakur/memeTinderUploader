const express = require("express");
const exphbr = require('express-handlebars');
const multer = require('multer');
const bodyParser = require('body-parser')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname); 
    }
});
const upload = multer({storage: storage}); // you can set limits by setting fileSize
// can also set up a fileFilter and che
const meme = require("./models/meme");


// initialise
const app = express();
const keys = require('./config/keys'); // key for connecting to mongodb database.
const mongoose = require('mongoose');

//create app engine 
app.engine('handlebars',exphbr(
    {
        defaultLayout: 'main'
    }
));
app.set('view engine', 'handlebars');


//port
const port = process.env.PORT || 3000;

//express static folder
app.use(express.static('public'));
app.use('/uploads' ,express.static('uploads'));

mongoose.connect(keys.MongoURI)
.then(() => {
    console.log('Connected to Remote Database....');
});

//handler
app.get('/',(req,res) => 
{
  //  res.send('Welcome to book finder');
  res.render('home.handlebars'); // res.render('home.handlebars'); change extension when rendering more files
});

app.get('/about',(req,res) =>
{
  res.render('about');
}
);
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.get('/contact',(req,res) =>
{
  res.render('contact');
}
);

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
       // res.json(req.file);
        console.log(req.body);
        var category = "";
        var tags = req.body.tags;
        var MemeImage = req.file.path;
        if(req.body.Hindi === 'on')
        {
            category = category + "Hindi Memes,"
        }
        if(req.body.Wholesome === 'on')
        {
            category = category + "Wholesome Memes,"
        }
        if(req.body.Deprecating === 'on')
        {
            category = category + "Self Deprecating Memes,"
        }
        if(req.body.Dark === 'on')
        {
            category = category + "Dark Memes,"
        }
        if(req.body.Sports === 'on')
        {
            category = category + "Sports Memes,"
        }
        if(req.body.Youtube === 'on')
        {
            category = category + "Youtube Memes,"
        }
        if(req.body.Celebrity === 'on')
        {
            category = category + "Celebrity Memes,"
        }
        if(req.body.Animal  === 'on')
        {
            category = category + "Animal Memes,"
        }
        if(req.body.TV  === 'on')
        {
            category = category + "TV Memes,"
        }
        if(req.body.Animated === 'on')
        {
            category = category + "Animated Memes,"
        }
        if(req.body.Political === 'on')
        {
            category = category + "Political Memes,"
        }
        if(req.body.Fitness === 'on')
        {
            category = category + "Fitness Memes,"
        }
        if(req.body.Nerd === 'on')
        {
            category = category + "Nerd Memes,"
        }
      console.log(category);
      console.log(tags);
      console.log(MemeImage);
      res.json(req.file);
    }
    else throw 'error';
});

//listen to port
app.listen(port, () =>
{
 // console.log('Server is running on port ${port}');
  
  console.log(`Server is running on port ${port}`);
}); 