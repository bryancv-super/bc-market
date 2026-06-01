const express = require('express');
const multer = require('multer');
const path = require('path');
const profileController = require('../controllers/profile.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = express.Router();
const uploadDir = path.join(__dirname, '../../uploads/avatars');

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, callback) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
    callback(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

router.get('/', requireAuth, profileController.getProfile);
router.patch('/', requireAuth, profileController.updateProfile);
router.post('/avatar', requireAuth, upload.single('avatar'), profileController.uploadAvatar);

module.exports = router;
