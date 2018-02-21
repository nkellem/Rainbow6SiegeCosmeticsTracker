const http = require('http');
const query = require('querystring');
const url = require('url');
const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/newEntry': htmlHandler.getNewEntry,
  '/css/homeStyle.css': htmlHandler.getHomeStylesheet,
  '/css/addEntryStyle.css': htmlHandler.getAddEntryStylesheet,
  '/babel/bundle.js': htmlHandler.getJavaScript,
  '/addEntry': jsonHandler.addEntry,
  '/getEntries': jsonHandler.getEntries,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  console.dir(parsedUrl.pathname);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(PORT);

console.log(`Listening on 127.0.0.1: ${PORT}`);
