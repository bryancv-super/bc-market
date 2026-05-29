const authService = require('../services/auth.service');

async function getProfile(req, res, next) {
  try {
    const user = await authService.getUserProfile(req.user.id);
    res.json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const user = await authService.updateUserProfile(req.user.id, req.body);
    res.json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
}

async function uploadAvatar(req, res, next) {
  try {
    if (!req.file) {
      const error = new Error('Avatar file is required');
      error.status = 400;
      throw error;
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    const user = await authService.updateUserProfile(req.user.id, { profileImage: avatarUrl });
    res.json({ success: true, data: { user, avatarUrl } });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProfile, updateProfile, uploadAvatar };
