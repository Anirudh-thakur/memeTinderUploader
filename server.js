const express = require("express");
const exphbr = require('express-handlebars');
const multer = require('multer');
const bodyParser = require('body-parser');
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

//importing schema 
//const meme = require("./models/meme");


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
const schema = mongoose.Schema;
const memeSchema = new schema(
  {
    category: {
      type: String,
      default: ''
    },
    tags: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  }
);
app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
       // res.json(req.file);
        console.log(req.body);
        var Category = "";
        if(req.body.Hindi === 'on')
        {
            Category = Category + "Hindi Memes,"
        }
        if(req.body.Wholesome === 'on')
        {
            Category = Category + "Wholesome Memes,"
        }
        if(req.body.Deprecating === 'on')
        {
            Category = Category + "Self Deprecating Memes,"
        }
        if(req.body.Dark === 'on')
        {
            Category = Category + "Dark Memes,"
        }
        if(req.body.Sports === 'on')
        {
            Category = Category + "Sports Memes,"
        }
        if(req.body.Youtube === 'on')
        {
            Category = Category + "Youtube Memes,"
        }
        if(req.body.Celebrity === 'on')
        {
            Category = Category + "Celebrity Memes,"
        }
        if(req.body.Animal  === 'on')
        {
            Category = Category + "Animal Memes,"
        }
        if(req.body.TV  === 'on')
        {
            Category = Category + "TV Memes,"
        }
        if(req.body.Animated === 'on')
        {
            Category = Category + "Animated Memes,"
        }
        if(req.body.Political === 'on')
        {
            Category = Category + "Political Memes,"
        }
        if(req.body.Fitness === 'on')
        {
            Category = Category + "Fitness Memes,"
        }
        if(req.body.Nerd === 'on')
        {
            Category = Category + "Nerd Memes,"
        }
      console.log(Category);
      var Meme = mongoose.model("Meme",memeSchema);
      var newMeme = new Meme({
        category: Category,
        tags:req.body.tags,
        img:req.file.path
      });
      newMeme.save(function(error) {
            console.log("Your meme has been saved!");
              if (error) {
             console.error(error);
          }
        });
      //res.json(req.file);
        res.render('contact.handlebars');
    }
    else throw 'error';
});

//listen to port
app.listen(port, () =>
{
 // console.log('Server is running on port ${port}');
  
  console.log(`Server is running on port ${port}`);
}); 