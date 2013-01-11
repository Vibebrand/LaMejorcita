
/*
 * MainViewController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <AppKit/CPViewController.j>
@import <AppKit/CPScrollView.j>
@import "../Views/MainView.j"
@import "../Controllers/MenuViewController.j"
@import "../Controllers/HeaderViewController.j"

@implementation MainViewController : CPViewController{
	HeaderViewController headerViewController @accessors;
	MenuViewController  menuViewController @accessors;
	CPScrollView containerView @accessors;
    id delegate @accessors;
}
- (id)initWithSize: (CGRect)aFrame{
    self = [super init];
    if (self){
    	var width = aFrame.size.width - 200;
    	var height = aFrame.size.height - 100;
    	containerView = [[CPScrollView alloc] initWithFrame: CGRectMake(200, 100, width, height)];
    	[containerView setAutoresizingMask:  CPViewWidthSizable | CPViewHeightSizable];
    	[containerView setAutohidesScrollers:YES];
    	[self setView: [[MainView alloc] initWithFrame: aFrame]];
    	[[self view] addSubview: containerView];
    }
    return self;
}
-(void) createStocksPage{
	console.log('createStocksPage');
}
-(void) changeHash: (CPArray) arguments{
	[[self delegate] changeHash: arguments];
}
@end
