const http = require('http');
const jsonHandler = require('./jsonResponses.js');
const url = require('url');
const query = require('querystring');
const nodeStatic = require('node-static');

//instantiates the node-static object to allow for file serving
const fileServer = new nodeStatic.Server(`${__dirname}/../client`, {
  cache: false,
  gzip: true,
});

//adds port for the app to listen on
const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

//processes/routes requests appropriately
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  //node-static tries to serve/route on its own
  //if it can't, defers to jsonHandler
  fileServer.serve(request, response, (err) => {
    if (err) {
      if (parsedUrl.pathname === '/getEntries') {
        jsonHandler.getEntries(request, response, params);
      } else if (parsedUrl.pathname === '/addNewEntry') {
        jsonHandler.addEntry(request, response);
      } else {
        jsonHandler.notFound(request, response);
      }
    }
  });
};

//starts the server
http.createServer(onRequest).listen(PORT);

console.log(`Listening on 127.0.0.1: ${PORT}`);
