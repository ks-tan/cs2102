const pg = require('pg');
const path = require('path');
const express = require('express');
const dbRouter = require('./routers/databaseRouter');
const constants = require('./constants');
const bodyParser = require('body-parser');

const app = express();
app.set('port', constants.PORT_CONNECTION);

//for retrieving form data
app.use(bodyParser.urlencoded({ extended: true }));

//set routers
app.use('/db', dbRouter);

app.listen(app.get('port'), function(){
	console.log("Server has started running....");
});