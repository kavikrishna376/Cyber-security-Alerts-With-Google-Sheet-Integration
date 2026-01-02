const { addRow, getRows } = require('../googleSheets');

exports.addDevice = async (req, res) => {
    try {
        const { name, type, osVersion } = req.body;
        const rows = await getRows('devices');
        const id = rows.length + 1;
        const lastUpdate = new Date().toISOString();
        await addRow('devices', { id, userId: req.user.id, name, type, osVersion, lastUpdate });
        res.status(201).json({ id, userId: req.user.id, name, type, osVersion, lastUpdate });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDevices = async (req, res) => {
    try {
        const rows = await getRows('devices');
        const devices = rows.filter(r => r.userId == req.user.id);
        res.json(devices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
