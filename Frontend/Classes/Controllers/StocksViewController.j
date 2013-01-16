
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
	var detail      = [[CPTableColumn alloc] initWithIdentifier:@"detail"];
	var remove      = [[CPTableColumn alloc] initWithIdentifier:@"remove"];

	var bounds       = [[delegate view] bounds];
	var width        = CGRectGetWidth(bounds)/7;

	var removeBtn = [CPButton buttonWithTitle:@"-"];
	var detailBtn = [CPButton buttonWithTitle:@"Detalle"];
	[removeBtn setTarget: self];
	[removeBtn setAction: @selector(removeStock:)];

	[[name headerView] setFont: [CPFont boldSystemFontOfSize:14.0]];
	[[businessName headerView] setFont: [CPFont boldSystemFontOfSize:14.0]];
	[[address headerView] setFont: [CPFont boldSystemFontOfSize:14.0]];
	[[manager headerView] setFont: [CPFont boldSystemFontOfSize:14.0]];

	[name setWidth: width];
	[businessName setWidth: width];
	[address setWidth: width];
	[manager setWidth: width];
	[detail setWidth: (width/6)*3];
	[remove setWidth: (width/6)];

	[detail setDataView: detailBtn];
	[remove setDataView: removeBtn];

	[[name headerView] setStringValue: @"Nombre"];
	[[businessName headerView] setStringValue: @"Razón Social"];
	[[address headerView] setStringValue: @"Dirección"];
	[[manager headerView] setStringValue: @"Responsable"];
	[tableView setUsesAlternatingRowBackgroundColors:YES];

    [tableView addTableColumn:name];
	[tableView addTableColumn:businessName];
	[tableView addTableColumn:address];
	[tableView addTableColumn:manager];
	[tableView addTableColumn: detail];
	[tableView addTableColumn: remove];

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
    return [[data objectForKey: rowIndex] objectForKey: identifier];
}
-(void)setStockData: (CPArray) stocks{
	data = stocks;
	[[self view] reloadData];
}
//Action
-(void) removeStock: (id)sender
{
	alert('remove');
}
@end
