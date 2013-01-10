/*
 * NavigationController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <Foundation/CPObject.j>

@implementation NavigationController : CPObject{
	id _delegate;
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
	if([_delegate validationRule] == true)
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
	[_delegate loadPage: 'stocks'];
}

-(void) changeHash: (CPArray) arguments{
	var sharedApplication = [CPApplication sharedApplication];
	[sharedApplication setArguments:arguments];
}

//Getters && Setters
-(void)setDelegate:(id)delegate{
    _delegate = delegate;
}
-(id) delegate{
    return _delegate;
}
@end
