const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin','environment','utility','traffic'], default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);
