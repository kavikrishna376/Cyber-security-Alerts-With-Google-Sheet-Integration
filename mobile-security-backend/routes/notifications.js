const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createNotification, getNotifications } = require('../controllers/notificationController');

router.post('/create', auth, createNotification);
router.get('/', auth, getNotifications);

module.exports = router;
