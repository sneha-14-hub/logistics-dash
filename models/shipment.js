const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  shipmentId: String,
  origin: String,
  destination: String,
  currentLocation: String,
  status: String,
  estimatedArrival: String,
  coordinates: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema);
