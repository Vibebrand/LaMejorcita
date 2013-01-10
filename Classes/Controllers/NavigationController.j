/*if (typeof window.onhashchange !== "undefined")
        {
            window.onhashchange = function() {
              [self updateLocation:nil];
            };
        }*/

/*
 * NavigationController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <Foundation/CPObject.j>

@implementation NavigationController : CPObject
{
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
	var sharedApplication = [CPApplication sharedApplication];
	var args = [sharedApplication arguments];
}
@end
