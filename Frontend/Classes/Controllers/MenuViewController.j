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
    CPCookie currentOption;
    CPArray hashurls;
}
- (id)init{
    self = [super init];
    if (self){

        hashurls       = [[@"",@"Stocks"],[@"",@"Sellers"],[@"",@"Points"],[@"",@"Sales"]];
        currentOption  = [[CPCookie alloc] initWithName: @"lamejorcita.menuoption"];

        var optionsList    = [[CPCollectionView alloc] initWithFrame:CGRectMake(0, 0, 185, 0)];
        var content    = [@"Bodegas", @"Vendedores", @"Puntos de Venta", @"Venta"];
        var optionItem = [[CPCollectionViewItem alloc] init];

    	[optionItem setView:[[OptionCell alloc] init]];
    	[optionsList setVerticalMargin: 0.0];
    	[optionsList setMinItemSize:CGSizeMake(20.0, 40.0)];
	    [optionsList setMaxItemSize:CGSizeMake(185.0, 40.0)];
	    [optionsList setMaxNumberOfColumns:1];
    	[optionsList setAllowsEmptySelection: false];
		[optionsList setAllowsMultipleSelection: false];
    	[optionsList setDelegate: self];
    	[optionsList setContent: content];
    	[optionsList setItemPrototype:optionItem];
        [self setView: optionsList];
    }
    return self;
}
- (void)collectionViewDidChangeSelection:(CPCollectionView)aCollectionView{
    var selectedId = [[aCollectionView selectionIndexes] firstIndex];
    [currentOption setValue:selectedId expires:nil domain: nil];
    [[self delegate] changeHash: [hashurls objectAtIndex: selectedId]];
}
-(void) updateMenu{
    var initial    = Number([currentOption value]);
    [[self view] setSelectionIndexes:[CPIndexSet indexSetWithIndex: initial]];
}
@end
