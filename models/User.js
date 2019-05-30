const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema(
    {
        username:{ type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true }
    },
    { timestamps: true }
);
UserSchema.pre('save', function(next) {
   // check if document is new or anew password has been set
   if(this.isNew || this.isModified('password')){
       //saving reference to this because of changing scopes
       const document = this;
       bcrypt.hash(document.password, null, null,function(err, hashedPassword) {
           if(err) {
               return next(err);
           }else{
               document.password = hashedPassword;
               return next();
           }
       });
   } else{
       return next();
   }
});

UserSchema.methods.isCorrectedPassword = function(password, callback) {
    console.log(password);
  bcrypt.compare(password, this.password, function(err, same){
      if(err) {
          callback(err);
      }else{
          callback(err, same);
      }
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
