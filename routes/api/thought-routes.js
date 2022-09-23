const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  addReaction,
  removeReaction,
  removeThought
} = require('../../controllers/thought-controller');

// /api/thoughts/ 
router.route('/').get(getAllThought);

// /api/thoughts/<thoughtId>
router.route('/:thoughtId').get(getThoughtById);

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought);

// /api/thoughts/<thoughtId>/reactions
router.route('thoughts/:thoughtId/reactions').post(addReaction);

// /api/thoughts/<thoughtId>/reactions
router.route('thoughts/:thoughtId/reactions').delete(removeReaction);


module.exports = router;