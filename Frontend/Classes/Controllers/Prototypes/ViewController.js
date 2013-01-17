
function ViewController(){
	this.view = new View();
	this.delegate = null;
	this.viewDidLoad = function(){};
	this.createLoader = function(options){
		var options = $.extend({},{text:'loading ... ',image: ''}, options);
		if(typeof section != "undefined" && typeof section.find === "function"){
			var loader      = $('<div class="loader-wrapper"></div>');
			var loaderText  = $('<span></span>');
			var loaderImage = $('<img/>');
			section.find('*:first').before(loader);
			loader.append(loaderImage);
			loader.append(loaderText);
			loaderText.text(options.text);
			loaderImage.attr('src', options.image);
		};
	};
	ViewController.prototype._init_.call(this);
};
ViewController.prototype._init_ = function(){
	this.view.controller = this;
};
