/*
 * NavigationController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <Foundation/CPObject.j>

@implementation NavigationController : CPObject{
	id delegate @accessors;
}
-(void) init{
	self = [super init];
	if(self){
		if (typeof window.onhashchange !== "undefined")
			 window.onhashchange = function() {[self validateHash];};
	};
	return self;
}
-(void) validateHash{
	if([delegate validationRule] == true)
		[self validateLoggedPages];
	else
		[self validateStandarPages];
}
-(void) validateStandarPages{
	var sharedApplication = [CPApplication sharedApplication];
	var args = [sharedApplication arguments];
}
-(void) validateLoggedPages{
	var sharedApplication = [CPApplication sharedApplication];
	var args = [sharedApplication arguments];
	[delegate loadPage: 'stocks'];
}

-(void) changeHash: (CPArray) arguments{
	var sharedApplication = [CPApplication sharedApplication];
	[sharedApplication setArguments:arguments];
}
-(CPString) prepareUrlPattern: (CPString) urlpattern{
	/*var mapparts = [urlpattern componentsSeparatedByString: @"/:"]];
	var pattern = [@"^" stringByAppendingString: mapparts];

	console.log(mapparts);
	var mapparts = url.split('/:');
		var pattern  = '^'+mapparts[0];
		for (var i = 1; i < mapparts.length; i++)
			pattern+='/[a-zA-Z0-9_]*';
		pattern+="/?$";
		pattern = new RegExp(pattern);*/
	return '';
}

	/*
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
		@function
		@description Obtiene los parametros de la url.
		@param {String} hash Url actualmente en la aplicación.
		@param {String} url Url a comparar.
		@param {String} extraParam Parametros extra.
		@returns {Object} Parámetros obtenidos.

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
	};*/
@end
