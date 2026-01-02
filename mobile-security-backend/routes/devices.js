const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addDevice, getDevices } = require('../controllers/deviceController');

router.post('/add', auth, addDevice);
router.get('/', auth, getDevices);

module.exports = router;
