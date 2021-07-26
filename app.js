const express = require('express');
const app = express();
const fs = require('fs');
const port = 5000;
const path = require('path');
const imageSize = require('image-size');
const { resolve } = require('path');


app.use('/images', express.static('www/images'));
app.use(express.static(path.join(__dirname, 'view')));

//first promise
const allSize = new Promise( (resolve, reject) =>{
  if('jpg'){
    const imageSize = require('image-size');
    //Get size of every image
    const dimensionsFrau = imageSize('www/images/frau.jpg');
    const dimensionsReh = imageSize('www/images/reh.jpg');
    const dimensionsSchwarzweiß = imageSize('www/images/schwarzweiß.jpg');
    const dimensionsPferd = imageSize('www/images/pferd.jpg');
    //put it out
    console.log(dimensionsFrau.width, dimensionsFrau.height);
    console.log(dimensionsReh.width, dimensionsReh.height);
    console.log(dimensionsSchwarzweiß.width, dimensionsSchwarzweiß.height);
    console.log(dimensionsPferd.width, dimensionsPferd.height);



    resolve(imageSize)
  }else{  
    const reason = new Error('something went wrong UPS');
    reject(reason);
  }
});


const Datainformation = new Promise((resolve, reject) =>{
  const fileName = path.join(__dirname, './www/images');
  fs.readdir(fileName, (err, files) =>{
    if(err){
      console.log('unable to get file' + err);
    } else{
      const Array = [];
      files.forEach((files)=>{
        if(files !== '.DS_Store'){
          return console.log(Array.push({name: files, imageSize: imageSize('www/images/' + files)})); 
        }
      })
        console.log(Array);
        //Neues Promise 
      
    }
 });
})




 const getTimeChange = new Promise((resolve, reject)=>{
 const getFile = path.join(__dirname, './www/images');
 if(err){
   console.log('Ups Something went wrong');
 }else{
  
   fs.stat(getFile, (err, file) =>{
     if(err){
        console.log(err);
     }else{
       const ArrayOne = [];
       file.forEach((file)=>{
       if(file === 'jpg'){
        return console.log(ArrayOne.push(`File Data Last Modified: ${stats.mtime} ${stats.ctime}` ));
      }
    })
    console.log(ArrayOne);
     }
   })

 }
});

// fs.stat('./www/images/', (err, stats) => {
//   if(err) {
//       throw err;
//   }

//   // print file last modified date
//   console.log(`File Data Last Modified: ${stats.mtime}`);
//   console.log(`File Status Last Modified: ${stats.ctime}`);
// });
Promise.all([allSize, Datainformation, getTimeChange])
 .then(result => console.log(result))
 .catch(error => console.log(`Error in promises ${error}`))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

module.export = {allSize, Datainformation, getTimeChange};