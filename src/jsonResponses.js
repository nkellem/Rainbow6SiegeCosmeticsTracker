const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const addEntry = (request, response) => {

};

const getEntries = (request, response, params) => {

};

module.exports = {
  addEntry,
  getEntries,
};
