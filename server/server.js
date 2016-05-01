const express = require('express');
const app = express();
const path = require("path");

app.use(express.static('client'));

app.listen(3000, () => console.log("Listening on port 3000"));