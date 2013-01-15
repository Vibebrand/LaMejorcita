
@import <AppKit/CPTableView.j>
@import <AppKit/CPViewController.j>
@implementation StocksViewController : CPViewController
{
	id delegate @accessors;
	CPArray data;
}
-(void) init{
	self = [super init];
	if(self){
		data = [[CPArray alloc] init];
	}
	return self;
};
-(void) loadView
{
	var tableView    = [[CPTableView alloc] initWithFrame:CGRectMakeZero()];
	var name         = [[CPTableColumn alloc] initWithIdentifier:@"name"];
	var businessName = [[CPTableColumn alloc] initWithIdentifier:@"businessName"];
	var address      = [[CPTableColumn alloc] initWithIdentifier:@"address"];
	var manager      = [[CPTableColumn alloc] initWithIdentifier:@"manager"];
	var bounds       = [[delegate view] bounds];
	var width        = bounds.size.width/7;
	[[name headerView] setFont: [CPFont boldSystemFontOfSize:14.0]];
	[[businessName headerView] setFont: [CPFont boldSystemFontOfSize:14.0]];
	[[address headerView] setFont: [CPFont boldSystemFontOfSize:14.0]];
	[[manager headerView] setFont: [CPFont boldSystemFontOfSize:14.0]];

	[name setWidth: width];
	[businessName setWidth: width];
	[address setWidth: width];
	[manager setWidth: width];

	[[name headerView] setStringValue: @"Nombre"];
	[[businessName headerView] setStringValue: @"Razón Social"];
	[[address headerView] setStringValue: @"Dirección"];
	[[manager headerView] setStringValue: @"Responsable"];
	[tableView setUsesAlternatingRowBackgroundColors:YES];

    [tableView addTableColumn:name];
	[tableView addTableColumn:businessName];
	[tableView addTableColumn:address];
	[tableView addTableColumn:manager];

	[tableView setDataSource:self];
	[tableView setDelegate: self];
	[self setView: tableView];
}
-(void) viewDidLoad{
	[delegate getStocksData];
}
- (int)numberOfRowsInTableView:(CPTableView)aTableView {
    return [data count];
}
- (id)tableView:(CPTableView)aTableView objectValueForTableColumn:(CPTableColumn)aTableColumn row:(int)rowIndex {
	var identifier = [aTableColumn identifier];
	var stock      = [data objectForKey: rowIndex];
	var text       = [stock objectForKey: identifier];
    return text;
}
-(void)setStockData: (CPArray) stocks{
	data = stocks;
	[[self view] reloadData];
}
@end
