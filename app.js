const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('dotenv').config();
require('./services/passport');
const cors = require('cors');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true });
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// app.use(
//     cookieSession({
//         maxAge: 30*24*60*60*1000,
//         keys: 'iyitytdhdfsgffjhb,mbv bvhgfdgkjk'
//     })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 5000 ;
app.listen(PORT);
