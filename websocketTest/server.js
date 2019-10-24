const WebSocket = require('ws');
const util = require('util')
const wss = new WebSocket.Server({ port: 8180 });
 
var history = ["test", "test2"];
 
const STATE_STOPPED = 1;
const STATE_STARTED = 2;
const STATE_STARTING = 3;
const STATE_STOPPING = 4;


 
wss.on('connection', function connection(ws) {
	console.log("client connected");
	
	
	//sending server state
	let state = {type: 2, body: STATE_STARTED};
	ws.send(JSON.stringify(state));
	
	// sending console history
	let test = {type: 1, body: ""};
	history.forEach(function(his) {
		test.body += his + "\n";
	});
	ws.send(JSON.stringify(test));
	
	ws.on('message', function incoming(msg) {
		let message = JSON.parse(msg);
		console.log(message.type);
		
		switch(message.type){
			case 1:
				console.log("Recveived cmd: " + message.body);
				history.push(message.body);
				let test = {type: 10, body: message.body + "\n"};
				ws.send(JSON.stringify(test));
			break;
		}
		
	});

	ws.on('close', function incoming(msg) {
		console.log("client disconnected");
	});

                

  
});



var express = require('express');
var app = express();
var session = require('express-session')

app.use(session({
  secret: 'asdasdasd asdasd tttcat',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: new Date(Date.now() + (30 * 86400 * 1000)) }
}))
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://10.150.11.73:8081"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
	if (req.session.loggedIn) {
		res.send("You are logged in");
	} else {
		res.send("Please login");
	}
});

app.get('/api/v1/logout', function (req, res) {
	req.session.destroy(function(err) {
		let test = {loggedIn: false};
		res.send(test);
	})
});

app.get('/api/v1/auth', function (req, res) {
	if (!req.session.loggedIn) {
		res.status(401);
		res.send();
	} else {
		let test = {loggedIn: true};
		res.send(test);
	}
});

app.get('/api/v1/management/start', async function (req, res) {
	if (!req.session.loggedIn) {
		res.status(401);
		res.send();
	} else {
		await Sleep(1000);
		let test = {started: true};
		res.send(test);
		
		let state = {type: 2, body: STATE_STARTING};
		sendToAll(JSON.stringify(state));
	}
});


function sendToAll(msg) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
}

function Sleep(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
}

app.post('/api/v1/login', function (req, res) {
	const login = req.body;
	console.log("Login attempt: ", login);
	if(typeof login.name !== 'undefined' && typeof login.password !== 'undefined' && login.name === 'admin' && login.password === 'test')
	{
		req.session.loggedIn = true;
		let test = {loggedIn: true};
		res.send(test);
		return;
	}
	res.status(401);
	res.send();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
