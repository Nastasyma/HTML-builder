const fs = require('fs');
const path = require('path');
const { stdout } = require('process');
const direction = path.join(__dirname, 'secret-folder');

fs.readdir(direction, (err, files) => {
  if (err) return console.error(err);
  for (let i = 0; i < files.length; i++) {
    const file = path.parse(files[i]);
    fs.stat(path.join(__dirname, 'secret-folder', files[i]), (err, stats) => {
      if (err) {
        console.log("File doesn't exist");
      }
      if (!stats.isFile()) {
        return;
      } else {
        const size = `${stats.size / 1024}kb`;
        stdout.write(`${file.name} - ${file.ext.slice(1)} - ${size} \n`);
      }
    });
  }

});