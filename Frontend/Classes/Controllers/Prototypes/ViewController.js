/**
	@class
	@author <a href="mailto:david.díaz.isei@gmail.com">David Díaz</a>
	@description View controller prototype.
*/
function ViewController(){
	/**
		@property
		@type Object
		@description Controller delegate.
	*/
	this.delegate = null;
	/**
		@function
		@description This function loads its controller view in a container sent as a parameter
		@param container Html element reference.
	*/
	this.createContent = function(container){
		var section = container.find('#'+this.id);
		if(section.length < 1)
			container.load(this.view, this.prepareView);
	};
	/**
		@function
		@description It creates a message of loading in its controller view.
		@param {Object} options Options of the loader.
		@example
viewController.createLoader({
	<span style="color:grey;">Text that will be displayed in the loader</span>
	text: 'Loading text',
	<span style="color:grey;">Url of the image that will be displayed in the loader</span>
	image: 'Image url'
});
	*/
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
};