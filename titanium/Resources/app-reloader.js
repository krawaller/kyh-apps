var K = require("kranium/init").init({
	queryable: true
});

var window = this;
Ti.include('/moment.min.js');

Ti.Geolocation.purpose = 'Show stuff on map';
Ti.UI.setBackgroundColor('#fff');


// Below this line is only the automatic updater.
// If you run this app locally, you should remove this

Ti.Gesture.addEventListener('shake', function(e) {
	initRemote();
});

var lastData;
function initRemote(){
	K.ajax({
		url: K.get('url'),
		dataType: 'text',
		success: function(data){
			if(data === lastData){
				return;
			}
			try {
				K('window').close();
				K('window').remove();
				K('tabgroup').close();
				K('tabgroup').remove();
			} catch(e){
				Ti.API.error(e);
			}
			
			var file = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'remote.js');
			file.write(data);
			lastData = data;
			
			if(K.is.android){
				try {
					Ti.include(file.nativePath);
				} catch(e){
					K.alert(e.toString(), 'Error');
					Ti.API.error(e);
				}
			} else {
				Ti.include(file.nativePath);
			}
			
		}
	});
}

function init(){
	initRemote();
	setInterval(initRemote, K.is.android ? 1000 : 1000);
}

if(!K.get('url')){
	var textfield = K.create({
		type: 'textfield',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: '10dp',
		height: '50dp',
		left: 10,
		right: 10,
		hintText: 'url to remote file',
		events: {
			"return": saveUrl
		}
	});
	
	function saveUrl(){
		K.set('url', textfield.value);
		init();
	}
	
	K({
		type: 'window',
		children: [
		textfield,
		{
			type: 'button',
			top: '70dp',
			height: '50dp',
			left: 10,
			right: 10,
			title: 'Skicka',
			click: saveUrl
		}]
	}).open();
} else {
	init();
}


