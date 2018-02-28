const fs = require('fs');
const query = require('querystring');
// pull in the file system module
const dataFile = fs.readFileSync(`${__dirname}/data.json`); // pull in json file
const data = JSON.parse(dataFile);

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const addEntry = (request, response) => {
  let body = [];

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    body = query.parse(bodyString);

    const responseJSON = {
      data: 'successful',
    };

    if (!body.operator || !body.gun || !body.skin) {
      responseJSON.data = 'Bad request: Missing an operator, gun, or skin';
      responseJSON.id = 'badRequest';
      return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 201; // this is for creation of content

    if (data[body.operator].skins[body.gun].length > 0) {
      responseCode = 204;
    }

    data[body.operator].skins[body.gun].push(body.skin);

    if (responseCode === 201) {
      return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
  });
};

const getEntries = (request, response, params) => {
  const responseJSON = {
    data: 'No data for this month found',
  };

  if (data[params.operator]) {
    responseJSON.data = data[params.operator];
  }

  if (request.method === 'HEAD') {
    return respondJSONMeta(request, response, 200);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    data: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};


module.exports = {
  addEntry,
  getEntries,
  notFound,
};
