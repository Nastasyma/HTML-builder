const fs = require('fs');
const path = require('path');

const destFolder = path.join(__dirname, 'project-dist');
const srcStylesFolder = path.join(__dirname, 'styles');
const destStylesFile = path.join(__dirname, 'project-dist', 'style.css');
const srcAssets = path.join(path.dirname(__filename),'assets');
const destAssets = path.join(path.dirname(__filename), 'project-dist', 'assets');
const srcTemplate = path.join(path.dirname(__filename),'template.html');
const destFile = path.join(__dirname, 'project-dist', 'index.html');
const srcComponents = path.join(path.dirname(__filename),'components');

async function createFolder() {
  await fs.promises.mkdir(destFolder, { recursive: true }, err => {
    if (err) return console.error(err);
    console.log('The folder "project-dist" has been created');
  });
}
createFolder();

async function createStyles() {
  fs.rm(destStylesFile, { recursive: true, force: true }, err => {
    if (err) return console.error(err);
  });

  const files = await fs.promises.readdir(srcStylesFolder);
  for (let i = 0; i < files.length; i++) {
    const srcFile = path.join(__dirname, 'styles', files[i]);
    const file = path.parse(files[i]);
    fs.stat(srcFile, (err, stats) => {
      if (file.ext === '.css' && stats.isFile()) {
        if (err) return console.error(err);
        fs.readFile(srcFile, (err, data) => {
          if (err) return console.error(err);
          data = data + '\n';
          fs.appendFile(destStylesFile, data , (err) => {
            if (err) return console.error(err);
          });
        });
      }
    })
  }
}
createStyles();

async function copyDir(src, dest) {

  await fs.promises.mkdir(dest, { recursive: true })

  let files = await fs.promises.readdir(src, {withFileTypes: true});
  for (let i = 0; i < files.length; i++) {
  let srcPath = path.join(src, `${files[i].name}`)
  let destPath = path.join(dest, `${files[i].name}`)
    if (files[i].isDirectory()) {
      copyDir(srcPath, destPath);
    }
    else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }

  let destFiles = await fs.promises.readdir(dest, {withFileTypes: true});
  for (let i = 0; i < destFiles.length; i++) {
    let srcPath = path.join(src, `${destFiles[i].name}`)
    let destPath = path.join(dest, `${destFiles[i].name}`)
    fs.access(srcPath, function(err){
      if (err) {
        console.log(`${destFiles[i].name} not found`);
        fs.unlink(destPath, err => {
          if (err) return console.error(err);
          console.log(`${destFiles[i].name} has been deleted`);
        });
      }
    });
  }
}
copyDir(srcAssets, destAssets);




