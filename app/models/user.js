var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var bcrypt                = require('bcrypt-nodejs');
var titlize               = require('mongoose-title-case');
var validate              = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'matches',
    arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
    message: 'Name must be at least 3 characters, Max 30, no special characters or numbers, must have space in betweeen name.'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 20],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'It is not a valid email .'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 25],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
];

var usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 25],
    message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    message:'Username should contain letters and numbers only'
  })
];

var passwordValidator = [
  validate({
    validator: 'matches',
    arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\w]).{8,35}$/,
    message: 'Password needs to have at least one lower case, one upper case, one number,one special character and must be at least not less than 8 characters buts must be more than 35 characters.'
  }),
  validate({
    validator: 'isLength',
    arguments: [8, 35],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
];

var UserSchema = new Schema({
  name: {type: String, required: true, validate: nameValidator},
  username: {type: String,unique: true,required: true,lowercase:true, validate:usernameValidator},
  email: {type: String,unique: true,required: true,lowercase:true, validate:emailValidator},
  password: {type: String,required: true, validate:passwordValidator}
});

UserSchema.pre("save",function(next){
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash){
    if(err) {
    	return console.error(err);
    };
    user.password = hash;
      next();
  });
});

UserSchema.plugin(titlize,{paths:['name']});

UserSchema.methods.comparePassword = function(password){
 return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);

