const express = require('express');
const app = express();
const fs = require('fs');
const port = 5000;
const path = require('path');


app.use(express.static(path.join(__dirname, 'view')));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
