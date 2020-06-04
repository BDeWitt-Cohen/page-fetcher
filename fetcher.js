const request = require('request');
const fs = require('fs');
let args = process.argv.slice(2);

let domainName = args[0];
let dlPath = args[1];
// /vagrant/w2/d3-net/page-fetcher


request(domainName, (error, response, body) => {
  if (error) {
    console.log(`Looks like that there was this error: ${error}`);
  }
  // if (dlPath){
  //   fs.access('./index.html', (err) => {
  //     fs.writeFile(dlPath, body, function(err) {
  //       fs.stat(dlPath, (err, stat) => {
  //         console.log(`File already existed but we Downloaded and saved ${stat.size} bytes to ${dlPath}`);
  //       })
  //     });
  // });
  // }
  if (!dlPath) {
    console.log("Sorry, your download path doesn't work");
  } else
    fs.writeFile(dlPath, body, function(err) {
      fs.stat(dlPath, (err, stat) => {
        console.log(`Downloaded and saved ${stat.size} bytes to ${dlPath}`);
      });
    });
});



