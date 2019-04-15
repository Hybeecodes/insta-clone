const express = require('express');

const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secret = 'gdyghfdjgdghd';
const ensureAuth = require('../middlewares/ensureAuth');

router.post('/register', (req,res) => {
   const { email, password } = req.body;
   const user = new User({email, password});
   user.save((err) => {
      if(err) {
          console.log(err);
          res.status(500)
              .send("Error registering new user please try again.");
      } else{
          res.status(200)
              .send("Welcome to club");
      }
   });
});

router.post('/authenticate', function(req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectedPassword(password, function(err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true })
                        .sendStatus(200);
                }
            });
        }
    });
});

router.get('/checkToken',ensureAuth, (req,res) => {
   res.sendStatus(200);
});

module.exports = router;
