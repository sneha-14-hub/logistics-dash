const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: String,
  location: String,
  manager: String,
  capacity: Number,
  currentLoad: {
    type: Number,
    default: 0
  },
  coordinates: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.models.Warehouse || mongoose.model("Warehouse", warehouseSchema);
