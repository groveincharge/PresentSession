const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const db = require('./../../../_helpers/db');
const passport = require('passport');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate(user) {
    console.log(`user from inside authenticate ${JSON.stringify(user)}`)
   return user;      
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email"' + userParam.email + '" is already taken';
    }

    const user = new User({
                         _id: new mongoose.Types.ObjectId(),
                   firstName: userParam.firstName,
                   lastName: userParam.lastName,
                   email: userParam.email,
                   password: bcrypt.hashSync(userParam.password, 10) // hash password
    });

    // save user
    await user.save();
 }

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}