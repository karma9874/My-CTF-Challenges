const express = require('express')
const AdmZip = require('adm-zip');
const upload = require('express-fileupload')
const libxmljs = require("libxmljs");
const session = require('express-session')
const pdf = require('pdf-parse');
const fs = require('fs');
const app = express()

app.set('view-engine', 'ejs')
app.use(session({secret: 'darkCTFKarma@'}));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}))
app.use(upload())

app.get('/', (req, res) => {
	console.log(req.session.data);
  	res.render('index.ejs',{data:req.session.data})
});


app.post('/upload', function(req, res) {
  var data = {}
  if (!req.files || Object.keys(req.files).length === 0) {
    			return res.status(400).send('No files were uploaded.');
  	}	
  let sp = req.files.file;
  if(req.files.file.size < 1000000 ){

  		let uploadPath = __dirname + '/uploads/' + sp.md5; 
  		sp.mv(uploadPath, function(err) {
    	if (err) {
      		return res.status(500).send(err);
    	}else{

    		data.size = sp.size
    		data.name = sp.name
    		data.type = sp.mimetype
    		
    		if(data.type == "application/pdf"){
    				pdf(sp.data).then(function(pdfData) {
    					console.log(pdfData.numpages);
    					data.number = pdfData.numpages
    					req.session.data = data; 
    					return res.redirect('/')
				});	
    		}else{
    			try{
    			var zip = new AdmZip(uploadPath);
				var zipEntries = zip.getEntries();
				zipEntries.forEach(function(zipEntry) {
				if (zipEntry.entryName == "docProps/app.xml") {
					var d = zipEntry.getData().toString('utf8');
					console.log(d); 
					var dataXML = libxmljs.parseXml(d,{noent:true,noblanks:true})
					let defNS = dataXML.root().namespace().href(); 
					let nop = dataXML.get('xmlns:Pages',defNS)
					console.log(nop.text());
					data.number = nop.text()
					}
					});
    			}catch(err){
    			return res.status(400).send('Only Pdf and docx file are allowed');
    			}
    			if(!data.number){
						data.number = "Not available"
					}
    			req.session.data = data; 
    			return res.redirect('/')
    		}
    }
  });
  }else{
  	return res.status(400).send('File too large, limit 2mb');
  }
});

app.listen(9999, () => console.log('Server started on port 9999'));
