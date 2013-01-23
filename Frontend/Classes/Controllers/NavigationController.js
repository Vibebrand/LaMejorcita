/**
	@class
	@author <a href="mailto:david.díaz.isei@gmail.com">David Díaz</a>
	@description This class controls the page hash navigation of a web site.
*/
function NavigationController(){
	var self = this;
	var loggedUrls = [];
	var unloggedUrls = [];
	var reload = true;
	var options ={
		cookiePrefix: "",
		loginValidation: function(){return false;}
	};
	/**
		@property
		@type Object
		@description Controller delegate.
	*/
	this.delegate = null;
	$(window).bind('hashchange.navigation', function(){self.load();});
	/**
		@function
		@description Sets the initial options of page navegation.
		@param {Object} _options Initial options.
		@example
navigationController.setOptions({
	<span style="color:grey;">Prefix of the cookie for saving the actual page.</span>
	cookiePrefix    : 'Cookie prefix', 
	<span style="color:grey;">function that will be executed for a proper validation of 
	login in the system.</span>
	loginValidation : function(){return true} 
});
	*/
	this.setOptions = function(_options){
		options.cookiePrefix = (typeof _options.cookiePrefix === "string" && $.trim(_options.cookiePrefix) != "")?
								 _options.cookiePrefix+"." : options.cookiePrefix;
		options.loginValidation = typeof _options.loginValidation === "function"? _options.loginValidation: options.loginValidation;
	};
	/**
		@function
		@description Inserts a hash and function that will be called when an user is logged and the applications hash matches with the saved hash.
		@param {String} url Hash.
		@param {Function} callback Function that will be called when the applications hash matches with the saved hash.
		@param {String} param Function parameters.
	*/
	this.addLoggedUrl = function(url, callback, param){
		var map = {"url":  url, "callback": callback , "param": param};
		loggedUrls.push(map);
	};
	/**
		@function
		@description Inserts a hash and function that will be called when there's not user logged and the applications hash matches with the saved hash.
		@param {String} url Hash.
		@param {Function} callback Function that will be called when the applications hash matches with the saved hash.
		@param {String} param Function parameters.
	*/
	this.addUnloggedUrl = function(url, callback, param){
		var map = {"url":  url, "callback": callback , "param": param};
		unloggedUrls.push(map);
	};
	/**
		@event
		@description This function changes pages depending of the application hash.
	*/
	this.load = function(){
		if(options.loginValidation.call())
			validateUrls(loggedUrls);
		else
			validateUrls(unloggedUrls);
	};
	/**
		@private
	*/
	function validateUrls(urlList){
		var defaultCall;
		var hash = window.location.hash;
		var page = hash.split('#')[1]? hash.split('#')[1]: '';
		var cookiePage = $.cookie(options.cookiePrefix+'page');

		for (var i = 0; i < urlList.length; i++) {
			var map  = urlList[i];
			var pattern  = prepareUrlPattern(map.url);
			if(pattern.test(page)){
				var params = getParameters(page , map.url, map.param);
				map.callback.call(null, params);
				$.cookie(options.cookiePrefix+'prevPage', $.cookie(options.cookiePrefix+'page'));
				$.cookie(options.cookiePrefix+'page', ($.trim(page) === "" ? null: page));
				return;
			};
			if($.trim(map.url) === "")
				defaultCall = map;
		};
		for (var i = 0; i < urlList.length; i++) {
			var map  = urlList[i];
			var pattern  = prepareUrlPattern(map.url);
			if(pattern.test(cookiePage)){
				var params = getParameters(cookiePage , map.url, map.param);
				map.callback.call(null, params);
				return;
			};
		};
		if($.trim(page) != ""){
			defaultCall.callback.call(null,defaultCall.param);
			$.cookie(options.cookiePrefix+'prevPage', $.cookie(options.cookiePrefix+'page'));
			$.cookie(options.cookiePrefix+'page', null);
			return;
		};
	};
	/**
		@private
	*/
	function prepareUrlPattern(url){
		var mapparts = url.split('/:');
		var pattern  = '^'+mapparts[0];
		for (var i = 1; i < mapparts.length; i++)
			pattern+='/[a-zA-Z0-9_]*';
		pattern+="/?$";
		pattern = new RegExp(pattern);
		return pattern;
	};
	/**
		@private
	*/
	function getParameters(hash , url, extraParam){
		var param = {};
		hash = hash.split('/').clean('');
		url = url.split('/').clean('');

		for (var i =0; i < url.length ; i++) {
			if(url[i].indexOf(":") != -1){
				var ident = url[i].split(":")[1];
				param[ident] = hash[i];
			};
		};
		if(extraParam)
			param.extra = extraParam;

		if(Object.keys(param).length == 1){
			for (var i in param)
				param = param[i];
			return param;
		}
		if(Object.keys(param).length < 1)
			return undefined;
		return param;
	};
	this.changePage = function(hashurl) {
		window.location.hash = hashurl;
	};
};
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    };
  };
  return this;
};