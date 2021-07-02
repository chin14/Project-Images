const express = require('express');
const app = express();
const fs = require('fs');
const port = 5000;
const path = require('path');


app.use(express.static(path.join(__dirname, 'view')));

//first promise
const imageSize = new Promise( (resolve, reject) =>{
  if('jpg'){
    const sizeOf = require('image-size');
    //Get size of every image
    const dimensionsFrau = sizeOf('www/images/frau.jpg');
    const dimensionsReh = sizeOf('www/images/reh.jpg');
    const dimensionsSchwarzweiß = sizeOf('www/images/schwarzweiß.jpg');
    const dimensionsPferd = sizeOf('www/images/pferd.jpg');
    //put it out
    console.log(JSON.stringify(dimensionsFrau.width, dimensionsFrau.height));
    console.log(JSON.stringify(dimensionsReh.width, dimensionsReh.height));
    console.log(JSON.stringify(dimensionsSchwarzweiß.width, dimensionsSchwarzweiß.height));
    console.log(JSON.stringify(dimensionsPferd.width, dimensionsPferd.height));



    resolve(sizeOf)
  }else{  
    const reason = new Error('something went wrong UPS');
    reject(reason);
  }
});

fs.stat('./www/images/', (err, stats) => {
  if(err) {
      throw err;
  }

  // print file last modified date
  console.log(`File Data Last Modified: ${stats.mtime}`);
  console.log(`File Status Last Modified: ${stats.ctime}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });
