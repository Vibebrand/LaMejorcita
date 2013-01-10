/*
 * NavigationController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <Foundation/CPObject.j>
@import <AppKit/CPCookie.j>
@import "../Models/Route.j"

@implementation NavigationController : CPObject{
	id delegate @accessors;
	CPMutableArray standardRoutes;
	CPMutableArray loggedRoutes;
	CPCookie cookie;
}
-(void) initWithCookiePrefix: (CPString) prefix{
	self = [super init];
	if(self){
		prefix =  [prefix stringByTrimmingCharactersInSet:[CPCharacterSet whitespaceCharacterSet]];
		if (typeof window.onhashchange !== "undefined")
			 window.onhashchange = function() {[self validateHash];};
		if(![prefix isEqualToString: @""]);
			prefix = [prefix stringByAppendingString: @"."];
		standardRoutes = [[CPMutableArray alloc] init];
		loggedRoutes   = [[CPMutableArray alloc] init];
		cookie = [[CPCookie alloc] initWithName: [prefix stringByAppendingString: @"page"]];
	};
	return self;
}
-(void) changeHash: (CPArray) arguments{
	var sharedApplication = [CPApplication sharedApplication];
	[sharedApplication setArguments:arguments];
}
//Add routes
-(void) addStandardRoute:(CPString) urlpattern withCallback:(SEL) selector{
	var route = [[Route alloc] init];
	[route setUrlPatern: urlpattern];
	[route setCallback: selector];
	[standardRoutes addObject: route];
}
-(void) addLoggedRoute:(CPString) urlpattern withCallback:(SEL) selector{
	var route = [[Route alloc] init];
	[route setUrlPatern: urlpattern];
	[route setCallback: selector];
	[loggedRoutes addObject: route];
}
//Validation
-(void) validateHash{
	if([delegate validationRule] == true)
		[self validatePages: loggedRoutes];
	else
		[self validatePages: standardRoutes];
}
-(void) validatePages: (CPArray) routes{
	var sharedApplication = [CPApplication sharedApplication];
	var args = [sharedApplication arguments];
}
-(CPString) prepareUrlPattern: (CPString) urlpattern{
	var mapparts = [urlpattern componentsSeparatedByString: @"/:"];
	var pattern = [@"^" stringByAppendingString: mapparts];

	console.log(mapparts);
	/*var mapparts = url.split('/:');
		var pattern  = '^'+mapparts[0];
		for (var i = 1; i < mapparts.length; i++)
			pattern+='/[a-zA-Z0-9_]*';
		pattern+="/?$";
		pattern = new RegExp(pattern);*/
	return @"";
}
-(void) deletePageCookie{
	[cookie setValue:nil expires:[CPDate date] domain: nil];
};
@end
