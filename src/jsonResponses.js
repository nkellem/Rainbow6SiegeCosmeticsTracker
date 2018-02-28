//pull in the necessary dependencies
const fs = require('fs');
const query = require('querystring');
const dataFile = fs.readFileSync(`${__dirname}/data.json`); // pull in json file
const data = JSON.parse(dataFile);

//writes json responses back to the client
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

//writes JSON responses for certain status codes/request types (204, HEAD, etc)
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

//processes POST requests to add data to the server
const addEntry = (request, response) => {
  let body = [];

  //loads the body of the request and stores it for later use
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  //when the body has finished loading, adds data to server
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    body = query.parse(bodyString);

    const responseJSON = {
      data: 'successful',
    };

    //checks for the required parameters
    if (!body.operator || !body.gun || !body.skin) {
      responseJSON.data = 'Bad request: Missing an operator, gun, or skin';
      responseJSON.id = 'badRequest';
      return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 201; // this is for creation of content

    //determines whether to keep the 201 or change to 204
    if (data[body.operator].skins[body.gun].length > 0) {
      responseCode = 204;
    }

    //adds the body from the request to the server's data
    data[body.operator].skins[body.gun].push(body.skin);

    //sends out appropriate responses based on status code
    if (responseCode === 201) {
      return respondJSON(request, response, responseCode, responseJSON);
    }

    return respondJSONMeta(request, response, responseCode);
  });
};

//handles GET and HEAD requests
//On GET, returns data from the server to client
const getEntries = (request, response, params) => {
  const responseJSON = {
    data: 'No data for this operator found',
  };

  //checks to see if server has the data client is looking for and adds it to the response
  if (data[params.operator]) {
    responseJSON.data = data[params.operator];
  }

  //sends out appropriate responses based on request type
  if (request.method === 'HEAD') {
    return respondJSONMeta(request, response, 200);
  }

  return respondJSON(request, response, 200, responseJSON);
};

//handles 404 errors for the client and sends back appropriate response
const notFound = (request, response) => {
  const responseJSON = {
    data: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

//exports methods for this module
module.exports = {
  addEntry,
  getEntries,
  notFound,
};
