const { URLSearchParams } = require('url');
global.URLSearchParams = URLSearchParams;
var mysql = require('mysql');
const cookieParser = require("cookie-parser");

var con = mysql.createConnection({
  host: "graphql_mysql",
  user: "root",
  password: "scammer@123",
  database: "darkcon"
});


var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const SW_SDL = `
  type Query {
    Challs: [Challs]
    allUsers: [users]
    hint(chall_id: String!): hints
    flag(chall_id: String!): flags
  }

  type Challs{
    id: String
    title: String
    description: String
    category: String
    author: String
    points: Int
    flag: flags
  }

  type hints{
    chall_id: String
    chall_title: String
    take_hint: String
  }

  type users{
    id: String
    username: String
    password: String
  }

  type flags{
    chall_id: String
    chall_title: String
    chall_flag: String
  }

  type Mutation {
    login(username: String!, password: String!): String!
  }
`;


class Query {

  flag(args,context){
  var auth = context.request.cookies['auth']
  if(auth != null){
    if(Buffer.from(auth, 'base64').toString('ascii') != 'admin:is_this_visible_to_you?')
      return context.response.json({"Err":"Not Authorized"});
  }else{
      return context.response.json({"Err":"Not Authorized"});
  }
  
  var chall_id = mysql.escape(args.chall_id)
  return new Promise(function(resolve,reject){
    let sql = `SELECT * FROM flags WHERE chall_id = ${chall_id}`;
    console.log(sql);
        con.query(sql, (err, results) => {
            if (err) reject(err);
            results.forEach(function(value){
              if(value.chall_title === "DarkCON Challs"){
                value.chall_flag = "<REDACTED>"
              }
            })
            resolve(results);
        });
    }).then(rows => new flags(rows[0]))
  }

  allUsers(_,context){
    return new Promise(function(resolve,reject){
      let sql = `SELECT * FROM users`;
          con.query(sql, (err, results) => {
              if (err) reject(err);
              console.log(results);
              resolve(results);
          });
    }).then(function(rows){
      return rows.map(row => new user(row))
      });
  }

  hint(args,context){

  var auth = context.request.cookies['auth']
  if(auth != null){
      if(Buffer.from(auth, 'base64').toString('ascii') != 'admin:is_this_visible_to_you?')
        return context.response.json({"Err":"Not Authorized"});
  }else{
      return context.response.json({"Err":"Not Authorized"});
  }
    
    var chall_id = args.chall_id
    return new Promise(function(resolve,reject){
      let sql = `SELECT * FROM hints WHERE chall_id = ${chall_id}`;
      console.log(sql);
          con.query(sql, (err, results) => {
              if (err) reject(err);
              console.log(results);
              resolve(results);
          });
    }).then(rows => new hints(rows[0]));
    
  }

  Challs(_,context){
  var auth = context.request.cookies['auth']
  if(auth != null){
      if(Buffer.from(auth, 'base64').toString('ascii') != 'admin:is_this_visible_to_you?' && Buffer.from(auth, 'base64').toString('ascii') != 'guest:karma9874')
        return context.response.json({"Err":"Not Authorized"});
  }else{
      return context.response.json({"Err":"Not Authorized"});
  }

    return new Promise(function(resolve,reject){
      let sql = `SELECT * FROM challs`;
          con.query(sql, (err, results) => {
              if (err) reject(err);
              resolve(results);
          });
    }).then(function(rows){
      return rows.map(row => new Challs(row))
      });  
  }

  login(args,context){
    let username = mysql.escape(args.username)
    let password = mysql.escape(args.password)
    let encoded = Buffer.from(username+":"+password).toString('base64')
    return new Promise(function(resolve,reject){
      let sql = `SELECT * FROM users where username=${username} and password=${password}`;
      console.log(sql);
          con.query(sql, (err, results) => {
              if (err) reject(err);
              console.log(results);
              resolve(results);
          });
    }).then(function(rows){
      if(rows.length>0){
        return "Success"
      }else{
        return "Nope wrong creds";
      }
      });

  }

}

class flags {
  constructor(row) {
    this.chall_id = row.chall_id;
    this.chall_title = row.chall_title;
    this.chall_flag = row.chall_flag;
  }

}

class user{
  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.password = row.password;
  }

}

class hints {
  constructor(row) {
    this.chall_id = row.chall_id;
    this.chall_title = row.chall_title;
    this.take_hint = row.take_hint;
  }
}

class Challs{
  constructor(row){
    this.id = row.id;
    this.title = row.title;
    this.description = row.description
    this.category = row.category
    this.author = row.author
    this.points = row.points
    this._flagger1 = row.id
  }

  flag(_, context) {
    var id = this._flagger1;

    var auth = context.request.cookies['auth']
    console.log(auth);
    if(auth != null){
      if(Buffer.from(auth, 'base64').toString('ascii') != 'admin:is_this_visible_to_you?')
        return new flags({chall_id: "Not Authorized",chall_title: 'Not Authorized',chall_flag: 'Not Authorized'});
      }else{
        return new flags({chall_id: "Not Authorized",chall_title: 'Not Authorized',chall_flag: 'Not Authorized'});
    }

    return new Promise(function(resolve,reject){
      let sql = `SELECT * FROM flags WHERE chall_id = ${id}`
          con.query(sql, (err, results) => {
              if (err) reject(err);
              results.forEach(function(value){
              if(value.chall_title === "DarkCON Challs"){
                value.chall_flag = "<REDACTED>"
              }
            })
              resolve(results);
          });
      }).then(rows => new flags(rows[0]) )
  }
}

const app = express();
app.set('view-engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(cookieParser())
app.use('/graphql', graphqlHTTP(async (request, response, graphQLParams) => ({
  schema: buildSchema(SW_SDL),
  rootValue: new Query(),
  graphiql: false,
  context: { con, request,response}
})),);

app.get("/", function (req, res,next) {
  if(req.cookies['auth']=='YWRtaW46aXNfdGhpc192aXNpYmxlX3RvX3lvdT8=' || req.cookies['auth']=='Z3Vlc3Q6a2FybWE5ODc0')
      res.redirect('/dashboard')
    res.redirect('/login')
})

app.get('/robots.txt',function(req,res){
 res.redirect("https://www.youtube.com/watch?v=IQH-Urubcvw&feature=youtu.be") 
})

app.get('/login',function(req,res){
  res.render('login.ejs')
});

app.get('/dashboard',function(req,res){
  if(req.cookies['auth']=='YWRtaW46aXNfdGhpc192aXNpYmxlX3RvX3lvdT8=' || req.cookies['auth']=='Z3Vlc3Q6a2FybWE5ODc0')
    res.render('index.ejs')
  res.redirect('/login')
  
});

app.listen(9999);
console.log('http://localhost:5000/graphql');
