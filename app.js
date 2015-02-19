
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars')

var index = require('./routes/index');
var add = require('./routes/add');
var club = require('./routes/club');
var myevent = require('./routes/myevent');
var match = require('./routes/match');
var my = require('./routes/my');
var project = require('./routes/project');
var contact = require('./routes/contact');

var nodemailer = require('nodemailer');
// Example route
// var user = require('./routes/user');

//defining some variables (local to application)

// app.locals.testUsername = 'testing123';
// app.locals.testPassword = 'testpassword';
// app.locals.testEmail = 'chris@email.com';

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
// app.get('/', index.view);
app.get('/', function(req,res) {
	res.render('home');
});
app.get('/add', add.addFriend);
app.get('/club', club.showAll);
app.get('/myevent', myevent.populate);
app.get('/match', match.findMatch);
app.get('/my', my.allEvents);
app.get('/project/:name', project.projectInfo);

app.post('/contact', contact.contactnow);
// app.get('/send',function(req,res){
// var mailOptions={
// to : req.query.to,
// subject : req.query.subject,
// text : req.query.text
// }
// console.log(mailOptions);
// smtpTransport.sendMail(mailOptions, function(error, response){
// if(error){
// console.log(error);
// res.end("error");
// }else{
// console.log("Message sent: " + response.message);
// res.end("sent");
// }
// });
// });


// Example route
// app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
