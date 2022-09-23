const { Thought, User, Reaction } = require('../models');


const thoughtController = {
  addReaction(req, res) {
    Reaction.create(req.body)
    .then(reactionResponse => {
      const reactionId = reactionResponse.reactionId
      console.log(reactionId);
      thought.findOneAndUpdate({ _id: req.params.thoughtId }, {
        // read docs
        $push: {reactions: reactionId}
      }, {new: true}).then(thoughtData => {
        res.json(thoughtData)
      }).catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
  },

  getAllThought(req, res) {
    Thought.find({})
      .populate({ path: 'reactions', select: '-__v' })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // add thought to USER
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;