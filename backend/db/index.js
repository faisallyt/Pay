const mongoose = require("mongoose");

const connection = mongoose
  .connect("mongodb+srv://anony6905:pass123@cluster0.zwdgraw.mongodb.net/Pay", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });
