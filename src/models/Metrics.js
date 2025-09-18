const mongoose = require('mongoose');
const metricsSchema = new mongoose.Schema({
  traffic: Number,
  aqi: Number,
  energy: Number,
  waste: Number,
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Metrics', metricsSchema);
