const fs = require('fs'); // pull in the file system module

// read in all the files that need to be delivered
const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const newEntry = fs.readFileSync(`${__dirname}/../client/newEntry.html`);
const homeStyle = fs.readFileSync(`${__dirname}/../client/css/homeStyle.css`);
const addEntryStyle = fs.readFileSync(`${__dirname}/../client/css/addEntryStyle.css`);
const getJSBundle = fs.readFileSync(`${__dirname}/../client/babel/bundle.js`);

// Send files from server to client
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getNewEntry = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(newEntry);
  response.end();
};

const getHomeStylesheet = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(homeStyle);
  response.end();
};

const getAddEntryStylesheet = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(addEntryStyle);
  response.end();
};

const getJavaScript = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(getJSBundle);
  response.end();
};

// export methods
module.exports = {
  getIndex,
  getNewEntry,
  getHomeStylesheet,
  getAddEntryStylesheet,
  getJavaScript,
};
