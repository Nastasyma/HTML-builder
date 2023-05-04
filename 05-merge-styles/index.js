const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'styles');
const destFolder = path.join(__dirname, 'project-dist');

function createStyles() {

  fs.readdir(srcFolder, (err, files) => {

    if (err) return console.error(err);

    for (let i = 0; i < files.length; i++) {
      const srcFile = path.join(__dirname, 'styles', files[i]);
      const file = path.parse(files[i]);
      fs.stat(srcFile, (err, stats) => {
        if (file.ext === '.css' && stats.isFile()) {
          if (err) return console.error(err);
          fs.readFile(srcFile, (err, data) => {
            if (err) return console.error(err);
            data = data + '\n';
            fs.appendFile(path.join(destFolder, 'bundle.css'), data , (err) => {
              if (err) return console.error(err);
            });
          });
        }
      })
    }
  });

  const destFile = path.join(__dirname, 'project-dist', 'bundle.css');
  fs.access(destFile, function(err){
    if (!err) {
      fs.unlink(destFile, err => {
        if (err) return console.error(err);
      });
    }
  });
}
createStyles();