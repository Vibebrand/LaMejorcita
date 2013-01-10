
@import <Foundation/CPObject.j>
@import <AppKit/CPViewController.j>
@import "../Controllers/NavigationController.j"

@implementation MasterControl : CPObject{
	CPView _mainViewController;
	NavigationController _navigationControler;
}
-(void) setMainViewController: (CPViewController)aViewController{
	_mainViewController = aViewController;
}
-(void) mainViewController{
	return _mainViewController;
}

-(void)setNavigationController: (NavigationController) aController{
	_navigationControler = aController;
}
-(void)navigationController{
	return _navigationControler;
}
@end
