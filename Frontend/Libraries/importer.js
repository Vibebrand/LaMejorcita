var Importer = {
	imports: 0,
	count: 0,
	importfile: function importfile(filename){
	 	if(Importer.trim(filename) != ""){
	 		if(Importer.validateFiles(filename))
	 			Importer.makeImport(filename);
		 }
	},
	validateFiles: function validateFiles(filename){
		var scripts = document.getElementsByTagName("script");
		for (var i = 0; i < scripts.length; i++) {
	 			var script =  scripts[i];
	 			var oldFilename =  script.getAttribute('src')
	 		if(oldFilename == filename)
	 			return false;
	 	};
	 	return true;
	},
	makeImport: function makeImport(filename){
		var fileref = document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);
		fileref.onload = fileref.onreadystatechange = function(){
			if(!this.readyState || this.readyState ==="loaded" || this.readyState ==="complete")
				Importer.count++;
		};
		if (typeof fileref!="undefined"){
		  document.getElementsByTagName("head")[0].appendChild(fileref);
		  Importer.imports++;
		};
	},
	makeLoad :function  makeLoad (callback) {
		if(Importer.count < Importer.imports)
			window.setTimeout(function(){Importer.makeLoad(callback);},50);
		else
			callback.call();
	},
	loadImports: function loadImports (callback){
		setTimeout(function(){
			Importer.makeLoad(callback);
		}, 50);
	},
	trim : function trim(stringToTrim) {
		return stringToTrim.replace(/^\s+|\s+$/g,"");
	}
};