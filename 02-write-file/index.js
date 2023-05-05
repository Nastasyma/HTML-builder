const fs = require("fs");
const path = require("path");
const { stdin, stdout } = process;

const file = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

stdout.write('Please, enter text here:\n');

const exit = () => {
  stdout.write('See you later!');
  process.exit();
}

process.on("SIGINT", exit);

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    exit();
  }
  file.write(data);
});