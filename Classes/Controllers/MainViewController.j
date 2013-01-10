
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
	HeaderViewController _headerViewController;
	MenuViewController  _menuViewController;
	CPScrollView containerView;
    id _delegate;
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
//Get && Set
-(void) setHeaderViewController: (HeaderViewController) aViewController{
	 if (_headerViewController)
	      [[_headerViewController view] removeFromSuperview];
	_headerViewController = aViewController;
	[[self view] addSubview: [_headerViewController view]];
}
-(HeaderViewController) headerViewController{
	return _headerViewController;
}
-(void) setMenuViewController: (MenuViewController) aViewController{
	if (_menuViewController)
	      [[_menuViewController view] removeFromSuperview];
	_menuViewController = aViewController;
	[[self view] addSubview: [_menuViewController view]];
}
-(MenuViewController) menuViewController{
	return _menuViewController;
}
-(void)setDelegate:(id)delegate{
    _delegate = delegate;
}
-(id) delegate{
    return _delegate;
}
@end
