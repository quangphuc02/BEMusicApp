const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
      username: {
            type: String,
            required: true,
            maxlength: 15,
            minlength: 4,
            unique: true
      },
      password: {
            type: String,
            required: true,
            minlength: 4
      },
      email: {
            type: String,
            required: true
      },
      admin: {
            type: Boolean,
            default: false
      },
      verified: {
            type: Boolean,
      }
}, { timestamps: true }
);



module.exports = mongoose.model('users', UserSchema);
