const mongoose = require("mongoose");

const fleetSchema = new mongoose.Schema({
  vehicleId: String,
  driverName: String,
  currentLocation: String,
  status: {
    type: String,
    enum: ["idle", "en route", "maintenance"],
    default: "idle"
  },
  coordinates: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.models.Fleet || mongoose.model("Fleet", fleetSchema);
