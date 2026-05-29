const authService = require('../services/auth.service');

function signup(req, res, next) {
  try {
    const result = authService.signup(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

function login(req, res, next) {
  try {
    const result = authService.login(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

function recoverPassword(req, res, next) {
  try {
    const result = authService.recoverPassword(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

function resetPassword(req, res, next) {
  try {
    const result = authService.resetPassword(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

function me(req, res, next) {
  try {
    const user = authService.getUserProfile(req.user.id);
    res.json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
}

function changePassword(req, res, next) {
  try {
    const result = authService.changePassword(req.user.id, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
  recoverPassword,
  resetPassword,
  me,
  changePassword,
};
