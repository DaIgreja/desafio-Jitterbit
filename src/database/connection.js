const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ordersdb")
  .then(() => console.log("📦 MongoDB conectado"))
  .catch(err => console.error("❌ Erro ao conectar Mongo:", err));
