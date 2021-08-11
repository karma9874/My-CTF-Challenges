const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const bot = require('./bot');
var crypto = require('crypto');
var base64url = require('base64url');

function randomStringAsBase64Url(size) {
  return base64url(crypto.randomBytes(size));
}


app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
app.set('view-engine', 'ejs')
app.use(cookieParser())


let db = new sqlite3.Database('./karma.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});


function authenticated(username,password){
	return new Promise(function(resolve,reject){
	let sql = `SELECT secret FROM secrets where username = ? and password = ?`;
		db.all(sql,[username,password], (err, rows) => {if (err) {throw err;}
  		console.log(rows.length)
  		if(rows.length>0){
  			return resolve(true)
  		}else{
  			return resolve(false)
  		}
  	});	
	});
}

//v3ry53cr3tP4ssw0rdddd
// CREATE TABLE IF NOT EXISTS secrets (
//                 id         INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
//                 username  VARCHAR(255) NOT NULL UNIQUE ,
//                 password    VARCHAR(255) NOT NULL,
//   				secret    VARCHAR(255) NOT NULL,
//                 created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
//             );


function addUser(username,password){
	return new Promise(function(resolve,reject){
	let sql = `INSERT into secrets (username,password,secret) VALUES (?,?,?)`;
		db.all(sql,[username,password,"Very Basic notepad, paste your notes and share with everyone."], (err, rows) => {if (err) {console.log(err);return resolve(false)}
  		console.log(rows)
  		if(!err){
  			return resolve(true)
  		}else{
  			return resolve(false)
  		}
  	});	
	});
}

function get_secret(username){
	return new Promise(function(resolve,reject){
		let sql = `SELECT secret FROM secrets where username = ?`;
		db.all(sql,[username], (err, rows) => {if (err) {throw err;}
  		if(rows.length>0){
  			return resolve(rows[0].secret)
  		}else{
  			return resolve(false)
  		}
  	});	
	})
}

app.use(function(req,res,next){
	if(req.cookies.auth){
		auth = Buffer.from(req.cookies.auth, 'base64').toString('ascii').split(	":")
		authenticated(auth[0],auth[1]).then(function(data){
				if(data){
				 	return next();
				}
				else{
					res.redirect('/')
			}
		})
	}else{
		return next()
	}
})

app.post("/login",function(req,res){
	authenticated(req.body.user,req.body.pass).then(function(data){
			if(data){
				var token = Buffer.from(req.body.user+":"+req.body.pass).toString('base64')
				res.cookie('auth',token,{ maxAge: 900000, httpOnly: false })
				res.redirect("/edit")
			}
			else{
				res.redirect("/?msg=101")
			}
		});
})


app.post("/register",function(req,res){
	addUser(req.body.user,req.body.pass).then(function(data){
		if(data){
			var token = Buffer.from(req.body.user+":"+req.body.pass).toString('base64')
			res.cookie('auth',token,{ maxAge: 900000, httpOnly: false })
			res.redirect("/edit")
			}
			else{
				res.redirect("/?msg=102")
			}
		});

})

app.get('/edit',function(req,res){
	if(req.cookies.auth){
		auth = Buffer.from(req.cookies.auth, 'base64').toString('ascii').split(":")
		console.log(auth)
		authenticated(auth[0],auth[1]).then(function(data1){
			if(data1){
				get_secret(auth[0],auth[1]).then(function(data){
				if(data){
					console.log(data)
					if(auth[0]=='admin'){
						res.render('index.ejs',{edit:data,data:null,status:null,bytes:null,ad:true})	
					}else{
					if(req.query.status == "shared"){
						res.render('index.ejs',{edit:data,data:null,status:"<script >alert('Successfully Saved')</script>",bytes:"bjBuY2U=",ad:false})	
					}else{
						res.render('index.ejs',{edit:data,data:null,status:null,bytes:null,ad:false})
					}
					}
				}
		});
			}
			else{
				res.redirect("/?msg=incorrect")
			}
		});
	}else{
		res.redirect("/")
	}	
});


app.get('/', (req, res,next) => {
  	if(req.cookies.auth){
			auth = Buffer.from(req.cookies.auth, 'base64').toString('ascii').split(":")
			authenticated(auth[0],auth[1]).then(function(data){
				if(data){
				 res.redirect('/edit')
				}
				else{
					res.render('login.ejs',{msg:null})
			}
		})
	}else{
		if(req.query.msg == 101)
				res.render('login.ejs',{msg:101})
		if(req.query.msg == 102)
				res.render('login.ejs',{msg:102})
		else
			res.render('login.ejs',{msg:null})
	}	
});


app.post('/review',function(req,res){
	var rstring = randomStringAsBase64Url(16)
	
	if(req.cookies.auth){
		auth = Buffer.from(req.cookies.auth, 'base64').toString('ascii').split(":")
		authenticated(auth[0],auth[1]).then(function(data){
			if(data){
				data = req.body.msg
				res.redirect("/review?msg="+base64url(data)+"&token="+rstring)
			}else{
				res.redirect("/")
			}
		})
	}else{
		res.redirect("/")
	}
});


app.get('/review',function(req,res){
	
	if(req.query.token && req.query.msg){
		res.setHeader("Content-Security-Policy", "script-src 'none'; object-src 'none'; base-uri 'none'; script-src-elem 'none'; report-uri /report/"+req.query.token);
		try{
			res.render('index.ejs',{edit:null,data:base64url.decode(req.query.msg),status:null,bytes:req.query.token,ad:false})			
		}catch(ex){
			res.redirect("/")
		}
	}else{
		res.redirect("/")
	}
})


app.post('/edit',function(req,res){
	res.redirect("/edit")
});

app.post('/share',function(req,res){
	if(req.cookies.auth){
		authenticated(auth[0],auth[1]).then(function(kata){
			if(kata){
				data = req.body.msg
				tok = req.body.token
				bot.visit(base64url(data),tok)
				res.redirect('/edit?status=shared')
			}else{
				res.redirect("/")
			}
		})
	}else{
		res.redirect("/")
	}
});

app.listen(9999, () => console.log('Server started on port 9999'));