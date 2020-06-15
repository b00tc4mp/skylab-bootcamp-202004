const express = require('express');
const app = express();
const PORT = 8080;
require("gluttony-server-logic")

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));