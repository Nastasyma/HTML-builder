const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'styles');
const destFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function createStyles() {
  fs.rm(destFile, { recursive: true, force: true }, err => {
    if (err) return console.error(err);
  });

  const files = await fs.promises.readdir(srcFolder);
  for (let i = 0; i < files.length; i++) {
    const srcFile = path.join(__dirname, 'styles', files[i]);
    const file = path.parse(files[i]);
    fs.stat(srcFile, (err, stats) => {
      if (file.ext === '.css' && stats.isFile()) {
        if (err) return console.error(err);
        fs.readFile(srcFile, 'utf-8', (err, data) => {
          if (err) return console.error(err);
          data = data + '\n';
          fs.appendFile(destFile, data , (err) => {
            if (err) return console.error(err);
          });
        });
      }
    })
  }
}
createStyles();