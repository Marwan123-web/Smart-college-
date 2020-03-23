let express=require('express');
var session = require('express-session')
let app=express();
let bodyparser=require('body-parser');
let cors=require('cors');
require('./db.js');
let studentRouter=require('./routes/student');
let courseRouter=require('./routes/course');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))



app.use('/student',studentRouter);


app.use('/course',courseRouter);

app.listen(2000,()=>console.log('Welcome To Our Project'));

