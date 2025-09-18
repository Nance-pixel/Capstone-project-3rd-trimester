const mongoose = require('mongoose');
const alertSchema = new mongoose.Schema({
  type: String,
  message: String,
  severity: { type: String, enum: ['low','medium','high'], default: 'low' },
  location: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Alert', alertSchema);
