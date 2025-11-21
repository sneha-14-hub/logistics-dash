const mongoose = require("mongoose");
const Shipment = require("./models/shipment");
const Warehouse = require("./models/warehouse");
const Fleet = require("./models/fleet");
const getCoordinates = require("./utils/geocode");

require("dotenv").config();

const MONGO_URL = "mongodb://127.0.0.1:27017/logistics";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Seeding DB..."))
  .catch((err) => console.error("DB error:", err));

async function seed() {
  await Shipment.deleteMany({});
  await Warehouse.deleteMany({});
  await Fleet.deleteMany({});

  const shipments = [
    { shipmentId: "SHIP100", origin: "Delhi", destination: "Mumbai", currentLocation: "Indore", status: "In Transit", estimatedArrival: "2025-07-01" },
    { shipmentId: "SHIP200", origin: "Kolkata", destination: "Bangalore", currentLocation: "Nagpur", status: "In Transit", estimatedArrival: "2025-07-02" }
  ];

  const fleets = [
    { vehicleId: "VEH100", driverName: "Raj", currentLocation: "Bhopal", status: "en route" },
    { vehicleId: "VEH200", driverName: "Simran", currentLocation: "Raipur", status: "idle" }
  ];

  const warehouses = [
    { name: "Mumbai Warehouse", location: "Mumbai", manager: "Amit", capacity: 100 },
    { name: "Delhi Storage", location: "Delhi", manager: "Nikita", capacity: 80 }
  ];

  for (let s of shipments) {
    s.coordinates = await getCoordinates(s.currentLocation);
    await Shipment.create(s);
  }

  for (let f of fleets) {
    f.coordinates = await getCoordinates(f.currentLocation);
    await Fleet.create(f);
  }

  for (let w of warehouses) {
    w.coordinates = await getCoordinates(w.location);
    w.currentLoad = 0;
    await Warehouse.create(w);
  }

  console.log("✅ Data seeded!");
  mongoose.connection.close();
}

seed();
