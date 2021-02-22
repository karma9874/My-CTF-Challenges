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
var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
const isImageURL = require('image-url-validator').default;
var pdf = require('html-pdf');
var fs = require('fs');
var path = require('path')

var md5sum = crypto.createHash('md5');

var options = {
    width: '500px',
    height: '500px',
    phantomArgs: ["--web-security=no","--ignore-ssl-errors=yes"],
    renderDelay: 2000
}

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.set('view-engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res,next) {
	res.render('index.ejs')
})

app.post('/export',function(req,res,next){

	if(req.body.upper.length == 0 || req.body.bottom.length == 0 || req.body.url.length ==0){
		res.redirect("/");
    }
    else{

	let image_url = req.body.url
	let upper = req.body.upper
	let bottom = req.body.bottom
	console.log(req.body)
	isImageURL(image_url).then(is_image => {
    	if(!is_image)
    		res.send("Invalid Image URL")
	});
	var template = path.join(__dirname, 'template.html')
	var templateHtml = fs.readFileSync(template, 'utf8')
	templateHtml = templateHtml.replace('{{image}}', image_url)
	templateHtml = templateHtml.replace('{{upper}}', upper)
	templateHtml = templateHtml.replace('{{lower}}', bottom)
	pdf.create(templateHtml,options).toStream(function (err, buffer) {
		if(err){
			console.log(err);
			res.send("Something went bad :(")
		}else{
		res.type('pdf')	
		buffer.pipe(res)
		}
  	})
	}
});

app.listen(9999);
}
