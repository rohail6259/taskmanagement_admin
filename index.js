const express = require("express");
require('dotenv').config()
const app = express();

require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port ${port}`));
