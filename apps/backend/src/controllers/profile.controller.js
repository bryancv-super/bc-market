const authService = require('../services/auth.service');

function getProfile(req, res, next) {
  try {
    const user = authService.getUserProfile(req.user.id);
    res.json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
}

function updateProfile(req, res, next) {
  try {
    const user = authService.updateUserProfile(req.user.id, req.body);
    res.json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
}

function uploadAvatar(req, res, next) {
  try {
    if (!req.file) {
      const error = new Error('Avatar file is required');
      error.status = 400;
      throw error;
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    const user = authService.updateUserProfile(req.user.id, { profileImage: avatarUrl });
    res.json({ success: true, data: { user, avatarUrl } });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProfile, updateProfile, uploadAvatar };
