const jsonHandler = require('./jsonResponses.js');
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
//const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');


//instantiates the node-static object to allow for file serving
/*const fileServer = new nodeStatic.Server(`${__dirname}/../client`, {
  cache: false,
  gzip: true,
});*/

//TODO: Add redis and MONGODB

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/R6S';

mongoose.connect(dbURL, err => {
  if (err) {
    console.log('Could not connect to Database');
    throw err;
  }
});
/*
let redisURL = {
  hostname: 'localhost',
  port: 6379,
};

let redisPASS;

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPASS = redisURL.auth.split(':')[1];
}
*/

const router = require('./router.js');

//adds port for the app to listen on
const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));
//app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
/*app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS,
  }),
  secret: 'Domo Arigato',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));*/
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
/*app.use(cookieParser());

// csurf must come AFTER app.use(cookieParser())
// and app.use(session{...})
// BEFORE router
app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  console.log('Missing CSRF token');
  return false;
});*/

router(app);

//starts the server
app.listen(PORT, err => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${PORT}`);
});
