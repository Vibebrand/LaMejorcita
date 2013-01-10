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
	return @"";
}
@end
