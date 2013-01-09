
@import <Foundation/CPObject.j>
@import <AppKit/CPViewController.j>

@implementation MasterControl : CPObject{
	CPView _mainViewController;
}
-(void) setMainViewController: (CPViewController)aViewController{
	_mainViewController = aViewController;
}
-(void) mainViewController{
	return _mainViewController;
}
@end
