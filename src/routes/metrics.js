const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Metrics = require('../models/Metrics');

// Get current metrics (if none, create defaults)
router.get('/', auth, async (req, res) => {
  try {
    let m = await Metrics.findOne().sort({ updatedAt: -1 });
    if (!m) {
      m = await Metrics.create({ traffic:78, aqi:42, energy:1.2, waste:85 });
    }
    res.json({ ok:true, metrics: m });
  } catch (err) {
    console.error(err); res.status(500).json({ error: 'server error' });
  }
});

// Endpoint to return Chart.js-friendly time series (demo simulated)
router.get('/chart-data', auth, async (req, res) => {
  try {
    // Simulate 12 points for the last 12 hours
    const labels = [];
    const traffic = [];
    const aqi = [];
    for (let i=11;i>=0;i--) {
      labels.push((new Date(Date.now() - i*3600*1000)).getHours() + ':00');
      traffic.push(Math.round(60 + Math.random()*40));
      aqi.push(Math.round(30 + Math.random()*80));
    }
    const datasets = [
      { label: 'Traffic Flow (%)', data: traffic, fill: false },
      { label: 'AQI', data: aqi, fill: false }
    ];
    res.json({ ok:true, labels, datasets });
  } catch (err) {
    console.error(err); res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
