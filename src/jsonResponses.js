const fs = require('fs');
// pull in the file system module
const dataFile = fs.readFileSync(`${__dirname}/data.json`); // pull in json file
const data = JSON.parse(dataFile);
console.dir(data);

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const addEntry = (request, response) => {
  // unimplemented
  response.end();
};

const getEntries = (request, response, params) => {
  const responseJSON = {
    data: 'No data for this month found',
  };

  if (data[params.month]) {
    responseJSON.data = data[params.month];
  }

  return respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  addEntry,
  getEntries,
};
