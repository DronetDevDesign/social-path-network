const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  addFriend,
  updateUser,
  deleteUser,
  deleteFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/users/<userId>/friends/
router.route('/:userId/friends/').post(addFriend);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/<userId>/friends/<friendId>
router.route('/:userId/friends/:friendId').delete(deleteFriend);
  

module.exports = router;