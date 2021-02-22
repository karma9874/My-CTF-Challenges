var db = require('./db');
var mysql = require('mysql');
var crypto = require('crypto');
var serialize = require('node-serialize')
const path = require('path')
var File = require('./File')
require('dotenv').config({path: path.resolve(__dirname,'../.env')})

class User{

	constructor(t1,t2){
		this.uname = t1;
    this.id = t2;
	}

	encrypter(user) {
    var shasum = crypto.createHmac('sha1',process.env.AUTH_SECRET);
    var data = Buffer.from(serialize.serialize(user)).toString('base64') 
		return data+"--"+shasum.update(data).digest('base64'); 
    }

  decrypter(token) {
    return new Promise(function(resolve,reject){
    var data = token.split("--")
    var shasum = crypto.createHmac('sha1',process.env.AUTH_SECRET);
    if(data[1] === shasum.update(data[0]).digest('base64')){
        try{
          return resolve(serialize.unserialize(Buffer.from(data[0], 'base64').toString()))
        }catch(err){
		console.log("decryter error")
          return reject(err.message);
        }
    }else{
    	return reject("Trying to hack? lol")
    }});
  }

	register(username_,password_){
		return new Promise(function(resolve,reject){
      console.log(db.escape(username_));
      let data = {username:db.escape(username_),password:db.escape(password_)}
			db.query('insert into u53r5 set ?',data,(err, results, fields) => {
        if (err){
          if(err.code == "ER_DUP_ENTRY"){
            return reject("user already exists");
          }else{
            return reject(err.code);
          }    
      			
    		}
    		if (results.affectedRows == 1) {
            console.log(results.insertId);
      			console.log("Successfully registered");
      			return resolve("Successfully Registered")
    		} else {
      			console.log("strange error");
      			return reject("User already exists")
    		}


        });

		});
	}

	login(username,password){
		return new Promise(function(resolve,reject){
			db.query(`select * from u53r5 where username="${db.escape(username)}" and password="${db.escape(password)}"`, (err, results, fields) => {
            if (err){
              console.log(err);
      			return reject(err.code);
    		}
    		if (results.length == 1) {
            console.log(results);
      			console.log("logined");
      			return resolve(new User(username,results[0].id))
    		} else {
      			console.log("strange error");
      			return reject("User not found or wrong credentials")
    		}
        });
		});
	}

  access_file(filename,sig){
    var fileobj = new File()
    return new Promise(function(resolve,reject){
      if(fileobj.create_signature(filename) === sig){
        fileobj.read_file(filename).then(function(data){
          return resolve(data)
        }).catch(function(err){
          console.log(err);
          return reject(err)
        })
      }else{
        return reject("error")
      }
    })
  }

}
module.exports = User;
