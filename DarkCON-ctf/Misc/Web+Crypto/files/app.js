var cluster = require('cluster');
if (cluster.isMaster) {
   var i = 0;
   for (i; i< 4; i++){
     cluster.fork();
   }
   cluster.on('exit', function(worker){
      console.log('Worker ' + worker.id + ' died..');
      cluster.fork();
   });
}
else{

const express = require('express')
const bodyParser = require('body-parser')
var User = require('./models/User');
var File = require('./models/File');
var path = require('path');
const app = express()
app.set('view-engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

global.appRoot = path.resolve(__dirname);

app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.post('/register',(req,res)=>{
  var username = req.body.username
  var password = req.body.password
  if(username && password){
    var userobj = new User()
    userobj.register(username,password).then(function(token){
      console.log(token);
      res.send({"msg":"success"})
    }).catch(function(err){
      res.send({"err":err})
    }) 
  }else{
    res.json({"err":"Invalid request"})
  }
});

app.post('/login',(req,res)=>{
  var username = req.body.username
  var password = req.body.password
  if(username && password){
    var userobj = new User()
    console.log(username,password);
    userobj.login(username,password).then(function(token){
      var encoded_token = userobj.encrypter(token)
      res.json({"token":encoded_token})
    }).catch(function(err){
      console.log(err);
      res.json({"err":err})
    });
  }else{
    res.json({"err":"Invalid request"})
  }
});

app.post('/readfile',(req,res)=>{
  var token = req.body.token
  var sig = req.body.sig
  var name = req.body.filename
  console.log(token+sig+name)
  if(token && sig && name){
    var userobj = new User().decrypter(token).then(function(obj){
      filename = Buffer.from(name,'hex').toString('binary')
      new User().access_file(filename,sig).then(function(data){
        res.json({"filedata":data})
      }).catch(function(err){
        res.json({"err":err})
      })
    }).catch(function(err){
        res.json({"err":err})
      });
  }else{
    res.json({"err":"Invalid request"})
  }
});

app.listen(9999, () => console.log('Server started on port 9999'));
}
