const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'styles');
const destFolder = path.join(__dirname, 'project-dist');

async function createStyles() {

  fs.readdir(srcFolder, (err, files) => {

    if (err) {
      console.error(err);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const srcFile = path.join(__dirname, 'styles', files[i]);
      const file = path.parse(files[i]);

      if (file.ext === '.css') {

        fs.readFile(srcFile, (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          data = data + '\n';
          fs.appendFile(path.join(destFolder, 'bundle.css'), data , (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
      }
    }
  });

  fs.readdir(destFolder, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    const destFile = path.join(__dirname, 'project-dist', 'bundle.css');
    fs.unlink(destFile, err => {
    if (err) {
      console.error(err);
      return;
    }
    });
  });
}
createStyles();