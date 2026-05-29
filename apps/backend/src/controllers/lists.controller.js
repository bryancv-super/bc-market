const listsService = require('../services/lists.service');

async function getLists(req, res, next) {
  try {
    res.json({ success: true, data: { lists: await listsService.getLists(req.user) } });
  } catch (error) {
    next(error);
  }
}

async function getList(req, res, next) {
  try {
    res.json({ success: true, data: { list: await listsService.getList(req.params.id, req.user) } });
  } catch (error) {
    next(error);
  }
}

async function createList(req, res, next) {
  try {
    const list = await listsService.createList(req.body, req.user);
    res.status(201).json({ success: true, data: { list } });
  } catch (error) {
    next(error);
  }
}

async function addItem(req, res, next) {
  try {
    const list = await listsService.addItem(req.params.id, req.body, req.user);
    res.json({ success: true, data: { list } });
  } catch (error) {
    next(error);
  }
}

async function updateItem(req, res, next) {
  try {
    const list = await listsService.updateItem(req.params.id, req.params.itemId, req.body, req.user);
    res.json({ success: true, data: { list } });
  } catch (error) {
    next(error);
  }
}

async function removeItem(req, res, next) {
  try {
    const list = await listsService.removeItem(req.params.id, req.params.itemId, req.user);
    res.json({ success: true, data: { list } });
  } catch (error) {
    next(error);
  }
}

async function deleteList(req, res, next) {
  try {
    await listsService.deleteList(req.params.id, req.user);
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
