const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        maxlength: 140,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        maxlength: 140,
    },
    dob: Date,
    //follow
    following: [{ type: Schema.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.ObjectId, ref: 'User' }],



}, {
    toJSON: {
        transform: (doc, ret, options) => {
            delete ret.password;
            return ret;
        },
    },
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});
userSchema.pre('findOneAndUpdate', function (next) {
    if (!this._update.password) {
        return;
    }
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);

};
//follow
// userSchema.methods.follow = function(id){
//     if(this.following.indexOf(id) === -1){
//       this.following.push(id);
//     }
  
//     return this.save();
//   };
//   //unfollow
//   userSchema.methods.unfollow = function(id){
//     this.following.remove(id);
//     return this.save();
//   };
const Usermodel = mongoose.model('User', userSchema);
module.exports = Usermodel;
