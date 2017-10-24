//app/models/blogs.js
//grab the mongoose module

var mongoose = require('mongoose');
var Schema      = mongoose.Schema;

// define our blog model
// module.exports allows us to pass this to other files when it is called
var PostModel = new Schema({
	title: {type: String, required: true},
    body: {type: String, required: true},
    publishedby: {type: String, required: true},
    //image: {type: Schema.Types.Mixed, required: true},
    //morePictures: Schema.Types.Mixed, // this is not required
    createdAt: {type: Date, default: Date.now},
  	published: { type: Boolean, default: false }
});

// Sets the createdAt parameter equal to the current time
PostModel.pre('save', function(next){
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// Exports the SuperheroSchema for use elsewhere.
module.exports = mongoose.model('postModel', PostModel);