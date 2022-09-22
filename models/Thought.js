const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// Reaction schema ==> VIRTUAL
const ReactionSchema = new Schema(
  {
    reactionId: [
      {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
    ],
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true
    }
  }
);

// Thought schema:
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);

// add virtuals: Reaction schema
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = { Thought };


// let schema = new mongoose.Schema(
//   {
//     name: String,
//     dob: {
//       type: Date,
//       get: (date) => {
//         if (date) return date.toISOString().split("T")[0];
//       },
//     },

//     createdAt: {
//       type: Date,
//       get: (date) => timeSince(date),
//     }
//         updatedAt: {
//       type: Date,
//       get: (date) => timeSince(date),
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { getters: true, virtuals: true },
//   }
// );