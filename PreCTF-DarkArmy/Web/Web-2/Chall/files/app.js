const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
var fs = require('fs')
const app = express()

const flag = "darkCTF{n07_4_900d_p14c3_f0r_prv473k3y}"

app.set('view-engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

var privateKey = fs.readFileSync('./private_key.key');
var publicKey = fs.readFileSync('./public_key.key');

const jwt_secret = "daCTFdaCTF"

app.get('/robots.txt', (req, res) => {
  res.render('pass.ejs')
});


app.get('/', (req, res) => {
  res.render('login.ejs')
});

app.get('/flag', (req, res) => {
  var cookie = req.cookies;
  jwt.verify(cookie['token'],publicKey,(err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      var decoded = jwt.decode(cookie['token']);
      if (decoded['user']=='admin'){
   		 res.send(flag);
  	  }else{
    		res.send("Not admin, no flag for you ");
  		}
    }
  });
  
});


app.post('/login',(req, res) => {
	var username = req.body.username
  	var password = req.body.password
	if(username && password){
	var token = jwt.sign({ 'user': 'guest' }, privateKey, { algorithm: 'RS256',noTimestamp:true});
    res.cookie('token',token, { maxAge: 900000, httpOnly: true });
    res.redirect(302,'/flag')
	}else{
		res.send("What are you doing?");
	}
});
app.listen(9999, () => console.log('Server started on port 9999'));