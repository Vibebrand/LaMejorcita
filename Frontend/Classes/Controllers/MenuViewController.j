/*
 * MenuViewController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <AppKit/CPViewController.j>
@import "../Views/OptionCell.j"

@implementation MenuViewController : CPViewController
{
    id delegate @accessors;
	CPCollectionView optionsList;
    CPCookie currentOption;
    CPArray hashurls;
}
- (id)initWithSize: (CGRect)aFrame{
    self = [super init];
    if (self){
        var scrollView = [[CPScrollView alloc] initWithFrame: aFrame];
        var options    = [[CPCollectionView alloc] initWithFrame:CGRectMake(0, 0, 200, 0)];
        var content    = [@"Bodegas", @"Vendedores", @"Puntos de Venta", @"Venta"];
        var optionItem = [[CPCollectionViewItem alloc] init];
        var initial = Number([currentOption value]);
        currentOption  = [[CPCookie alloc] initWithName: @"lamejorcita.menuoption"];
        hashurls = [[@"",@"Stocks"],[@"",@"Sellers"],[@"",@"Points"],[@"",@"Sales"]];

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

        [options setSelectionIndexes:[CPIndexSet indexSetWithIndex: initial]];

    	[scrollView addSubview: options];
    	[self setView: scrollView];
    	optionsList = options;
    }
    return self;
}
- (void)collectionViewDidChangeSelection:(CPCollectionView)aCollectionView{
    var selectedId = [[aCollectionView selectionIndexes] firstIndex];
    [currentOption setValue:selectedId expires:nil domain: nil];
    [[self delegate] changeHash: [hashurls objectAtIndex: selectedId]];
}
@end
