const { addRow, getRows } = require('../googleSheets');

exports.createNotification = async (req, res) => {
    try {
        const { title, message } = req.body;
        const rows = await getRows('notifications');
        const id = rows.length + 1;
        const date = new Date().toISOString();
        await addRow('notifications', { id, userId: req.user.id, title, message, date });
        res.status(201).json({ id, userId: req.user.id, title, message, date });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const rows = await getRows('notifications');
        const notifications = rows.filter(r => r.userId == req.user.id);
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
