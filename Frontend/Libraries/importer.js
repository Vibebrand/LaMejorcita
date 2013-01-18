var Importer = {
	imports: [],
	count: 0,
	callback: function(){},
	importfile: function importfile(filename){
		if(Importer.trim(filename) === "")
			return false;
		for (var i = 0; i < Importer.imports.length; i++) {
	 		if(Importer.imports[i] == filename)
	 			return false;
	 	};
	 	Importer.imports.push(filename);
	 	return true;
	},
	loadImports: function loadImports (callback) {
		if(typeof callback == "function")
			Importer.callback = callback;
		Importer.makeImport();
	},
	makeImport: function makeImport() {
		var filename =  Importer.imports[Importer.count];
		if(typeof filename != "undefined"){
			var fileref = document.createElement('script');
			fileref.setAttribute("type","text/javascript");
			fileref.setAttribute("src", filename);
			fileref.onload = fileref.onreadystatechange = function(){
				Importer.count++;
				Importer.loadImports();
			};
			if (typeof fileref!="undefined")
			  document.getElementsByTagName("head")[0].appendChild(fileref);
		}else
			Importer.callback.call();
	},
	trim : function trim(stringToTrim) {
		return stringToTrim.replace(/^\s+|\s+$/g,"");
	}
};