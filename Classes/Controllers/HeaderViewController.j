@import <AppKit/CPViewController.j>
@import "../Views/HeaderView.j"

@implementation HeaderViewController : CPViewController
{
}
- (id)initWithSize: (CGRect)aFrame
{
    self = [super init];
    if (self){
    	[self setView: [[HeaderView alloc] initWithFrame: aFrame] ];
    }
    return self;
}
@end
