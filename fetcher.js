const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getHTML = (arg) => {
  let url = arg[2];
  let file = arg[3];

  request(url, (error, response, body) => {
    if (error) {
      console.log("Error:", error);
    }
    // checks if the file exists and asks to overwrite if it does
    if (fs.existsSync(file)) {
      rl.question('File already exists. Would you like to overwrite it? Y/N ', (answer) => {
        if (answer.toUpperCase() === 'Y') {
          writeToFile(file, body);
        }
        rl.close();
      });
    } else {
      writeToFile(file, body);
    }
  });

};

const writeToFile = (file, content) => {
  fs.writeFile(file, content, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Downloaded and saved ${content.length} bytes to ${file}`);
    }
  });
};



getHTML(process.argv);