var tabGroup = Ti.UI.createTabGroup(),
	win = Ti.UI.createWindow({
		title: 'Contacts'
	}),
	tab = Ti.UI.createTab({
		title: 'Contacts',
		window: win
	});
	
var data = [];
data.push({
	title: 'Exempelrad'
});
	
	
var	contactsTable = Ti.UI.createTableView({
	data: data
});

win.add(contactsTable);

tabGroup.addTab(tab);
tabGroup.open();