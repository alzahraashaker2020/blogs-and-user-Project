const User = require('../models/User');
const { use } = require('../routes/blog');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);
//register user
const create = (user) => { return User.create(user) };

//login user
const login = async ({ username, password }) => {
    const user = await User.findOne({ username }).exec();
    if (!user) {

        throw Error('Not_AUTHNTICATED');

    }
    console.log(user);
    const isValidPass = user.validatePassword(password);

    if (!isValidPass) {
        throw Error('Not_AUTHNTICATED');

    }
    const token = await asyncSign({
        username: user.username,
        id: user.id,
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
    return { ...user.toJSON(), token };
};
//get All User
const getAll = () => User.find({}).exec();
//edit user
const editone = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();

//follow function
const follow = (id, trgetid) => User.update(
    { "_id": id },
    {
        $push: {
            following: trgetid,
        }
    }
      
);
//followes
const followes = (id, trgetid) => User.update(
    { "_id": trgetid },
    {
        $push: {
            followers: id,
        }
    }
);
//unfollow function
const unfollow = (id, trgetid) => User.update(
    { "_id": id },
    {
        $pull: {
            following: trgetid,
        }
    }
);
//unfollowes
const unfollowes = (id, trgetid) => User.update(
    { "_id": trgetid },
    {
        $pull: {
            followers: id,
        }
    }
);

//delete
const removeAcc = (id) =>  User.findByIdAndDelete(id).exec();





module.exports = {
    create,
    login,
    getAll,
    editone,
    follow,
    unfollow,
    followes,
    unfollowes,
    removeAcc,

};