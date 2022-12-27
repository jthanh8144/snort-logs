const { Schema, model } = require('mongoose');

const LogSchema = new Schema(
  {
    dateTime: { type: Date, required: true },
    srcAddress: { type: String, required: true },
    destAddress: { type: String, required: true },
    message: { type: String, required: true },
    priority: { type: Number, required: true },
  },
  { collection: 'Snort' }
);

module.exports = model('Log', LogSchema);
