var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      },
}, {
    collection:'users',
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true 
    }
});

module.exports = mongoose.model('user', UserSchema);
console.log('user created!');