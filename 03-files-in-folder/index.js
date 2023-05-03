const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const direction = path.join(__dirname, 'secret-folder');
// console.log(direction)

fs.readdir(direction, (err, files) => {

  if (err) {
    console.error(err);
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = path.parse(files[i]);
    // console.log(file);
    // console.log(file.name);

    fs.stat(path.join(__dirname, 'secret-folder', files[i]), (err, stats) => {
      if (err) {
        console.log("File doesn't exist");
      }

      if (!stats.isFile()) {
        return;
      } else {
        // console.log(`${stats.size} bytes`);
        const size = `${stats.size / 1024}kb`;
        // console.log(size);
        stdout.write(`${file.name} - ${file.ext.slice(1)} - ${size} \n`);
      }
    });
  }

});