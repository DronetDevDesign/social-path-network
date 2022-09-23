const { User } = require('../models/User');

const userController = {
  // GET all users: > GET /api/users <
  getAllUser(req, res) {
    User.find({})
      .populate({ path: 'thoughts', select: '-__v' })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET one user by id: > GET /api/users/:id <
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => {
        // if no user is found send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST a new user > POST /api/users <
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // ================ ADD FRIEND =================
  // POST a new friend > POST /api/users/friends <
  // addFriend({ body }, res) {
  //  Friend.create(body)
  //     .then(dbUserData => res.json(dbUserData))
  //     .catch(err => res.status(400).json(err));
  // },
  // ================ ADD FRIEND =================
  // addFriend({ params, body }, res) {
  //   console.log(body);
  //   Friend.create(body)
  //     .then(friendResponse => {
  //       const friendId = friendResponse.reactionId
  //       console.log(friendId);
  //       user.findOneAndUpdate(
  //         { _id: req.params.userId },
  //         { $push: { friends: friendId } },
  //         { new: true })
  //         .then(userData => {
  //           res.json(userData)
  //         })
  //         .catch((err) => res.status(500).json(err));
  //     })
  //     .catch((err) => res.status(500).json(err));
  // },
  // ================ ADD FRIEND =================
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: body } },
      { new: true }
    )
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },
  // ================ ADD FRIEND =================

  // PUT update user by id > PUT /api/users/:id <
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE user from the database > DELETE /api/users/:id <
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE friend from the database > DELETE /api/users/:id/friends <
  deleteFriend({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
}

module.exports = userController;