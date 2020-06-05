const request = require('request');
const fs = require('fs');
let args = process.argv.slice(2);
// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

let domainName = args[0];
let dlPath = args[1];
// /vagrant/w2/d3-net/page-fetcher

request(domainName, (error, response, body) => {
  if (error) {
    console.log('There was an error downloading from the domainName: ', error);
  }

  fs.access(dlPath, (err) => {
    if (err) {
      console.log('Unable to save file to download path.', err);
    }

    fs.exists(`${dlPath}index.html`, (fileExists) => {
      if (fileExists) {
        fs.writeFile(`${dlPath}index.html`, body, function(err) {
          if (err) {
            console.log('There was an error saving the file: ', err);
          }
          fs.stat(dlPath, (err, stat) => {
            console.log(`File overwritten and saved ${stat.size} bytes to ${dlPath}index.html`);
          });
        });
      } else {
        fs.writeFile(`${dlPath}index.html`, body, function(err) {
          if (err) {
            console.log('There was an error saving the file: ', err);
          }
          fs.stat(dlPath, (err, stat) => {
            console.log(`File downloaded and saved ${stat.size} bytes to ${dlPath}index.html`);
          });
        });
      }
    });
  });
});

