// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const userRouter = require('./src/routes/user.route.js');
const bodyParser = require('body-parser');
const mailService = require('./src/services/mail.service.js');

app.use(bodyParser());

app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.render('index');
});

app.use(userRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  // setInterval(() => {mailService.checkList()}, 15000);
});
