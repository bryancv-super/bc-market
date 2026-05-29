const express = require('express');
const listsController = require('../controllers/lists.controller');

const router = express.Router();

router.get('/', listsController.getLists);
router.post('/', listsController.createList);
router.get('/:id', listsController.getList);
router.delete('/:id', listsController.deleteList);
router.post('/:id/items', listsController.addItem);
router.patch('/:id/items/:itemId', listsController.updateItem);
router.delete('/:id/items/:itemId', listsController.removeItem);

module.exports = router;
