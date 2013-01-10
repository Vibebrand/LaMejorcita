
@import <AppKit/CPViewController.j>
@import <AppKit/CPView.j>
@import "../Views/MainView.j"
@import "../Controllers/MenuViewController.j"
@import "../Controllers/HeaderViewController.j"

@implementation MainViewController : CPViewController
{
	HeaderViewController _headerViewController;
	MenuViewController  _menuViewController;
	CPView containerView;
}
- (id)initWithSize: (CGRect)aFrame
{
    self = [super init];
    if (self){

    	var width = aFrame.size.width - 200;
    	var height = aFrame.size.height - 100;
    	containerView = [[CPView alloc] initWithFrame: CGRectMake(200, 100, width, height)];
    	[self setView: [[MainView alloc] initWithFrame: aFrame]];
    	[[self view] addSubview: containerView];
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
