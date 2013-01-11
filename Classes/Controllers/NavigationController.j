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
-(void) addStandardRoute:(CPString) urlpattern withCallback:(SEL) selector withParams:(id) params{
	var route = [[Route alloc] init];
	[route setUrlPatern: urlpattern];
	[route setCallback: selector];
	[route setParams: params];
	[standardRoutes addObject: route];
}
-(void) addLoggedRoute:(CPString) urlpattern withCallback:(SEL) selector withParams:(id) params{
	var route = [[Route alloc] init];
	[route setUrlPatern: urlpattern];
	[route setCallback: selector];
	[route setParams: params];
	[loggedRoutes addObject: route];
}
//Validation
-(void) validateHash{
	if([delegate validationRule] == true)
		[self validatePages: loggedRoutes];
	else
		[self validatePages: standardRoutes];
}
-(id) validatePages: (CPArray) routes{
	var sharedApplication = [CPApplication sharedApplication];
	var page              = [[sharedApplication arguments] componentsJoinedByString: @"/"];
	var cookiePage        = [cookie value];
	for (var i = 0; i < [routes count]; i++) {
		var route         = [routes objectAtIndex: i];
		var pattern       = new RegExp([self prepareUrlPattern: [route urlPatern]]);
		if(pattern.test(page)){
			var parameters = [self getParameters: page withPattern: [route urlPatern] withExtraParameters: [route params]];
			[[self delegate] performSelector:[route callback] withObject:parameters];
			return nil;
		}
	}
	for (var i = 0; i < [routes count]; i++) {
		var route         = [routes objectAtIndex: i];
		var pattern       = new RegExp([self prepareUrlPattern: [route urlPatern]]);
		if(pattern.test(cookiePage)){
			var parameters = [self getParameters: cookiePage withPattern: [route urlPatern] withExtraParameters: [route params]];
			[[self delegate] performSelector:[route callback] withObject:parameters];
			return nil;
		}
	}
	return nil;
}
-(CPString) prepareUrlPattern: (CPString) urlpattern{
	urlpattern =[urlpattern stringByTrimmingCharactersInSet:[CPCharacterSet whitespaceCharacterSet]];
	var mapparts = [urlpattern componentsSeparatedByString: @"/:"];
	var pattern = [@"^" stringByAppendingString: [mapparts objectAtIndex: 0]];
	for (var i = 1; i < [mapparts count]; i++)
		pattern = [pattern stringByAppendingString: @"/[a-zA-Z0-9_]*"];
	pattern = [pattern stringByAppendingString: @"/?$"];
	return pattern;
}
-(id) getParameters: (CPString)hash withPattern:(CPString) pattern withExtraParameters:(id) extra {
	var parameters = [[CPMutableDictionary alloc] init];
	var params     = [[CPMutableArray alloc] init];
	var hash       = [hash componentsSeparatedByString: @"/"];
	var pattern    = [pattern componentsSeparatedByString: @"/"];
	for (var i = 0; i < [hash count]; i++) {
		var patternpart = [[pattern objectAtIndex: i] stringByTrimmingCharactersInSet: [CPCharacterSet whitespaceCharacterSet]];
		if([patternpart hasPrefix: @":"])
			[params addObject: [hash objectAtIndex:i]];
	}
	if([params count] > 0 && extra){
		if([params count] == 1)
			params = [params objectAtIndex: 0];
		[parameters setObject:params forKey:@"params"];
		[parameters setObject:extra forKey:@"params"];
		return parameters;
	}
	if([params count] > 0 && !extra){
		if([params count] == 1)
			params = [params objectAtIndex: 0];
		return params;
	}
	if([params count] < 1 && extra)
		return extra;
	return nil;
}
-(void) deletePageCookie{
	[cookie setValue:nil expires:[CPDate date] domain: nil];
};
@end
