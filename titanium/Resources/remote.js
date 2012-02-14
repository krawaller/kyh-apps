var tabGroup = Ti.UI.createTabGroup({
	backgroundColor: '#fff'
});
	win = Ti.UI.createWindow({
		title: 'Contacts'
	}),
	tab = Ti.UI.createTab({
		title: 'Contacts',
		window: win
	});
	
	
var data = [{
	title: 'Första raden'
}];
data.push({
	title: 'Exempelrad'
});
	
var	contactsTable = Ti.UI.createTableView({
	data: data
});

win.add(contactsTable);

tabGroup.addTab(tab);
tabGroup.open();