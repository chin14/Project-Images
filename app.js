const express = require('express');
const app = express();
const fs = require('fs');
const port = 5000;
const path = require('path');
const imageSize = require('image-size');
const { error } = require('console');

app.use(express.static(path.join(__dirname, 'www/images')));
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

const getTimeChange = new Promise((resolve, reject) =>{
  const getFile = path.join(__dirname, './www/images');
  const stats = path.join(__dirname, './www/images')
  fs.readdir(getFile, (error, stats))
  if(error){
    console.log('Ups Something went wrong');
  }else{
    fs.stat(getFile, (err, stats) =>{
      if(err){
        console.log(err)
      }else{
        stats.forEach((stats)=>{
          if(stats !== '.DS_Store'){
            return console.log(stats) 
          }
        })
      }
    })
    // for (let i = 0; i < getFile.length; i++) {
    //   const stats = fs.stat(getFile[i]);
    //   if (stats !== '.DS_Store') {
    //       console.log(stats.mtime + stats.ctime)
    //   }
  }
 })


const Datainformation = new Promise((resolve, reject) =>{
  const fileName = path.join(__dirname, './www/images');

  fs.readdir(fileName, (err, files) =>{
    if(err){
      console.log('unable to get file' + err);
    } else{
      const Array = [];
      files.forEach((files)=>{
        if(files !== '.DS_Store'){
          return  console.log(Array.push({name: files, imageSize: imageSize('www/images/' + files ), getTimeChange })); 
        }
      })
        console.log(Array);
        //Neues Promise 
      
    }
 });
    
})







Promise.all([allSize, Datainformation, getTimeChange])
 .then(result => console.log(result))
 .catch(error => console.log(`Error in promises ${error}`))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });