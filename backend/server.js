require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const organizationRoutes = require("./routes/organizations");
const userRoutes = require("./routes/user");
const biotopesRoutes = require("./routes/biotopesRoutes");
const eventRoutes = require("./routes/event");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/organizations", organizationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/biotopes", biotopesRoutes);
app.use("/api/events", eventRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
