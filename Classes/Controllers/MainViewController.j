@import <AppKit/CPViewController.j>
@import "../Views/MainView.j"

@implementation MainViewController : CPViewController
{
}
- (id)initWithSize: (CGRect)aFrame
{
    self = [super init];
    if (self){
    	self.view = [[MainView alloc] initWithFrame: aFrame];
    }
    return self;
}
@end
