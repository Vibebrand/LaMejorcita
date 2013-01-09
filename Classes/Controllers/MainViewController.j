@import <AppKit/CPViewController.j>
@import "../Views/MainView.j"
@import "../Controllers/MenuViewController.j"
@import "../Controllers/HeaderViewController.j"

@implementation MainViewController : CPViewController
{
	HeaderViewController _headerViewController;
	MenuViewController  _menuViewController;
}
- (id)initWithSize: (CGRect)aFrame
{
    self = [super init];
    if (self){
    	[self setView: [[MainView alloc] initWithFrame: aFrame]];
    }
    return self;
}

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
@end
