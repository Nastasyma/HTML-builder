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

async function copyDir(src, dest) {
  try {
    await fs.promises.mkdir(dest, { recursive: true })

    const files = await fs.promises.readdir(src, {withFileTypes: true});
    for (let i = 0; i < files.length; i++) {
    const srcPath = path.join(src, `${files[i].name}`)
    const destPath = path.join(dest, `${files[i].name}`)
      if (!files[i].isFile()) {
        copyDir(srcPath, destPath);
      }
      else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }

    const destFiles = await fs.promises.readdir(dest, {withFileTypes: true});
    for (let i = 0; i < destFiles.length; i++) {
      const srcPath = path.join(src, `${destFiles[i].name}`)
      const destPath = path.join(dest, `${destFiles[i].name}`)
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
  } catch(err) {
    return console.error(err);
  }
}

async function createHtml() {
  fs.rm(destFile, { recursive: true, force: true }, err => {
    if (err) return console.error(err);
  });

  const components = await fs.promises.readdir(srcComponents, {withFileTypes: true });
  let htmlTemplate = await fs.promises.readFile(srcTemplate, 'utf-8');

  for (let i = 0; i < components.length; i++) {
    let text = await fs.promises.readFile(path.join(__dirname,'components', `${components[i].name}`), 'utf-8');
    let ext = path.extname(components[i].name);
    let name = path.basename(components[i].name, ext);
    if (ext === '.html') {
      htmlTemplate = htmlTemplate.replace(`{{${name}}}`, `${text}`)
    }
  }

  fs.appendFile(destFile, htmlTemplate, (err) => {
    if (err) return console.error(err);
  });
}


function buildHTML() {
  createFolder();
  createStyles();
  copyDir(srcAssets, destAssets);
  createHtml();
}
buildHTML();




