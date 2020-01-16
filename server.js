const express = require("express");
const exphbr = require('express-handlebars');
const multer = require('multer');
const upload = multer({dest: __dirname + 'public/images'});

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

app.get('/contact',(req,res) =>
{
  res.render('contact');
}
);

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
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