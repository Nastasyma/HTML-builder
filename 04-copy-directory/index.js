const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(destFolder, { recursive: true }, err => {
    if (err) return console.error(err);
    console.log('The folder "files-copy" has been created');
  });

  fs.readdir(srcFolder, (err, files) => {

    if (err) return console.error(err);
    for (let i = 0; i < files.length; i++) {
      const srcFile = path.join(__dirname, 'files', files[i]);
      const destFile = path.join(__dirname, 'files-copy', files[i]);
      fs.stat(srcFile, (err, stats) => {
        if (err) return console.error(err);
        if (!stats.isFile()) {
          return;
        } else {
          fs.copyFile(srcFile, destFile, (err) => {
            if (err) return console.error(err);
            console.log(`${files[i]} was copied to "files-copy" folder`);
          });
        }
      });
    }
  });

  fs.readdir(destFolder, (err, files) => {

    if (err) return console.error(err);
    for (let i = 0; i<files.length; i++) {
      const srcFile = path.join(__dirname, 'files', files[i]);
      const destFile = path.join(__dirname, 'files-copy', files[i]);
      // console.log("Current file: ", destFile)
      fs.access(srcFile, function(err){
        if (err) {
          // console.log(`${files[i]} not found`);
          fs.unlink(destFile, err => {
            if (err) return console.error(err);
            console.log(`${files[i]} has been deleted`);
          });
        }
      });
    }
  });
}
copyDir();


