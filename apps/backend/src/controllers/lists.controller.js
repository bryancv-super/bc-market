const listsService = require('../services/lists.service');

function getLists(req, res) {
  res.json({ success: true, data: { lists: listsService.getLists() } });
}

function getList(req, res, next) {
  try {
    res.json({ success: true, data: { list: listsService.getList(req.params.id) } });
  } catch (error) {
    next(error);
  }
}

function createList(req, res, next) {
  try {
    const list = listsService.createList(req.body);
    res.status(201).json({ success: true, data: { list } });
  } catch (error) {
    next(error);
  }
}

function addItem(req, res, next) {
  try {
    const list = listsService.addItem(req.params.id, req.body);
    res.json({ success: true, data: { list } });
  } catch (error) {
    next(error);
  }
}

function updateItem(req, res, next) {
  try {
    const list = listsService.updateItem(req.params.id, req.params.itemId, req.body);
    res.json({ success: true, data: { list } });
  } catch (error) {
    next(error);
  }
}

function removeItem(req, res, next) {
  try {
    const list = listsService.removeItem(req.params.id, req.params.itemId);
    res.json({ success: true, data: { list } });
  } catch (error) {
    next(error);
  }
}

function deleteList(req, res, next) {
  try {
    listsService.deleteList(req.params.id);
    res.json({ success: true, data: { message: 'List deleted' } });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLists,
  getList,
  createList,
  addItem,
  updateItem,
  removeItem,
  deleteList,
};
