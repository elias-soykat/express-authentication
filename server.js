const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const { errorHandler, notFound } = require("./src/middleware/errorMiddleware");
const routes = require("./src/routes");

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => res.json("working!"));

// err middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server listening on ${port}`));
