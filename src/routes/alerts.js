const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(20);
    res.json({ ok:true, alerts });
  } catch (err) {
    console.error(err); res.status(500).json({ error: 'server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { type, message, severity, location } = req.body;
    const a = await Alert.create({ type, message, severity, location });
    res.json({ ok:true, alert: a });
  } catch (err) {
    console.error(err); res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
