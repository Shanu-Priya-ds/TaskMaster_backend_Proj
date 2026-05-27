const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT
const db = require("./config/connection");
const routes = require("./routes");
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//routes
app.use(routes);

//
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
}); 