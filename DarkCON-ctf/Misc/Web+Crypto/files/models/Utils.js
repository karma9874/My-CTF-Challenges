exports.cleanString =  function(input) {
    var output = "";
    	for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127 && input.charCodeAt(i)>=65 || input.charCodeAt(i) <= 57 && input.charCodeAt(i)>=46) {
            output += input.charAt(i);
        }}
        if(output.length <= 30){
        	return output
        }else{
        	return false
        }      
}