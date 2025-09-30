const mongoose = require("mongoose");

let usersConnection;
let locationsConnection;

async function connectDatabases() {
  const usersUri = process.env.MONGO_USERS_URI;
  const locationsUri = process.env.MONGO_LOCATIONS_URI;

  if (!usersUri || !locationsUri) {
    throw new Error("Missing MONGO_USERS_URI or MONGO_LOCATIONS_URI in .env");
  }

  // createConnection returns separate connection instances
  usersConnection = await mongoose.createConnection(usersUri, {
    dbName: new URL(usersUri).pathname?.replace("/", "") || undefined,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  locationsConnection = await mongoose.createConnection(locationsUri, {
    dbName: new URL(locationsUri).pathname?.replace("/", "") || undefined,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Optionally attach error handlers
  usersConnection.on("error", (err) => console.error("Users DB err", err));
  locationsConnection.on("error", (err) =>
    console.error("Locations DB err", err)
  );
}

function getUsersConnection() {
  if (!usersConnection) throw new Error("Users DB not connected");
  return usersConnection;
}

function getLocationsConnection() {
  if (!locationsConnection) throw new Error("Locations DB not connected");
  return locationsConnection;
}

module.exports = {
  connectDatabases,
  getUsersConnection,
  getLocationsConnection,
};
