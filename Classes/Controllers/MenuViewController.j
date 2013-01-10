@import <AppKit/CPViewController.j>
@import "../Views/OptionCell.j"

@implementation MenuViewController : CPViewController{
	CPCollectionView optionsList;
}
- (id)initWithSize: (CGRect)aFrame{
    self = [super init];
    if (self){
        var scrollView = [[CPScrollView alloc] initWithFrame: aFrame];
        var options    = [[CPCollectionView alloc] initWithFrame:CGRectMake(0, 0, 200, 0)];
        var content    = [[CPArray alloc] initWithObjects:@"Bodegas", @"Vendedores", @"Puntos de Venta", @"Venta"];
        var optionItem = [[CPCollectionViewItem alloc] init];

    	[scrollView setAutohidesScrollers:YES];
    	[scrollView setAutoresizingMask:CPViewHeightSizable];
    	[optionItem setView:[[OptionCell alloc] init]];

    	[options setVerticalMargin: 0.0];
    	[options setMinItemSize:CGSizeMake(20.0, 45.0)];
	    [options setMaxItemSize:CGSizeMake(1000.0, 45.0)];
	    [options setMaxNumberOfColumns:1];
    	[options setAllowsEmptySelection: false];
		[options setAllowsMultipleSelection: false];
    	[options setDelegate: self];
    	[options setContent: content];
    	[options setItemPrototype:optionItem];
        [options setSelectionIndexes:[CPIndexSet indexSetWithIndex: 0]];

    	[scrollView addSubview: options];
    	[self setView: scrollView];
    	optionsList = options;
    }
    return self;
}
- (void)collectionViewDidChangeSelection:(CPCollectionView)aCollectionView{
    console.log(aCollectionView);
}
@end
