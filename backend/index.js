const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const db = require("./db/index.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(8000, () => {
  console.log("i am running");
});
