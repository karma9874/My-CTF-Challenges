const fs = require('fs')
const path = require('path')
const crypto = require('crypto');
const utils = require('./Utils');
require('dotenv').config({path: path.resolve(__dirname,'../.env')})

class File{

	create_signature(fileName){
		var key = process.env.HASH_SECRET
		var hash = crypto.createHash('sha256').update(key+fileName,'ascii')
		var a = hash.digest('hex')
		return a 
	}

	read_file(filename){
		var filenameCleaned = utils.cleanString(filename)
		
		return new Promise(function(resolve,reject){
			if (filenameCleaned){
				var filePath = path.join(appRoot,filenameCleaned);
				fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    			if (!err) {
    				console.log(data);
        			return resolve(data)
				}else{
					console.log(err);
					return reject("File does not exists")
				}})
			}else{
				return reject("Filename too long")
			}
		})	
	}
}

module.exports = File;