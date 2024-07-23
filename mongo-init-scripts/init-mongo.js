/* global connect */ // This tells ESLint that `connect` is a global function

let db = connect("mongodb://localhost:27017/admin");

db.createUser({
  user: "user",
  pwd: "user",
  roles: [
    {
      role: "readWrite",
      db: "weather"
    }
  ]
});

db = db.getSiblingDB('weather');
db.createCollection('weather');

print("Initialization script executed successfully");
