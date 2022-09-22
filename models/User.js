const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// FRIEND schema ==> VIRTUAL
const FriendSchema = new Schema(
  {
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ]
  },
  {
    timestamps: true,
    toJSON: {
      getters: true
    }
  }
);

// USER schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate: [validateEmail, 'Please enter a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      },
    ],
    friends: [FriendSchema]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
      timestamps: true,
    },
    id: false
  }
);

// adding virtual
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = { User };