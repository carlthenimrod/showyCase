### showyCase: jQuery showcase that is managed using a JSON file.
====

showyCase dynamically generates a showcase based on a JSON file that categorizes items. The showcase displays items in the JSON files as thumbnails and allows user to navigate between different pages.


### Release info:

The current release is version 0.85. This is the inital release and more features and updates are planned.


### Examples:
----

Basic showyCase usuage on an empty element, the plugin will do the rest.

	$('#element').showyCase();

Add a JavaScript object to achieve additional functionality.

	$('#element').showyCase({
		html5: false,
	});


### Options:
----

Here is a brief rundown of all the different options.

**ajaxCache**: Accepts a boolean, controls whether to cache the Ajax request, for more information consult the jQuery API.

	$('#element').showyCase({
		ajaxCache: false
	});

**ajaxDataType**: Accepts a string, controls the data type to be used by the Ajax request, for more information consult the jQuery API.

	$('#element').showyCase({
		ajaxDataType: 'json'
	});

**ajaxDataUrl**: Accepts a string, holds location of file to be used, for more information consult the jQuery API.

	$('#element').showyCase({
		ajaxDataUrl: 'json/jquery.items.json'
	});			

**class Options**: Accepts a string, holds CSS class names. Allows you to change the name of the classes.

	$('#element').showyCase({
		classCtn: 'sc-ctn',
		classCtrl: 'sc-ctrl',
		classPrev: 'sc-prev',
		classNext: 'sc-next',
		classThumbs: 'sc-thumbs'
	});

List of renameable CSS selectors with their default values:

	- classCtn: 'sc-ctn',
	- classCtrl: 'sc-ctrl',
	- classPrev: 'sc-prev',
	- classNext: 'sc-next',
	- classThumbs: 'sc-thumbs'

**html5**: Accepts a boolean value, true creates articles/sections/nav elements, alternatively false creates divs, defaults to true.

	$('#element').showyCase({
		html5: true
	});

**multiJSON**: Accepts a boolean, defaults to false which causes plugin to search for a single JSON file. If set to true, plugin searchs for multiple files that are linked by the inital JSON file. 

	$('#element').showyCase({
		multiJSON: false
	});	

**onItemClick**: Accepts a string, determines the action to take place on thumb click, defaults to false

	$('#element').showyCase({
		onItemClick: false
	});

List of selectable strings (more options coming)

	- 'blurbGallery' : Sends to 'gallery.html' in same directory with PHP variable to be processed by blurbGallery plugin.

**Page Options**: Accepts a number, contains options for the pagination system, pageShow controls if pages are used altogether, pagePer controls how many items per page.

	$('#element').showyCase({
		pageShow: 18,
		pageStart: 0
	});

List of adjustable options:

	- pageShow: 18,
	- pageStart: 0

**Path Options**: Accepts a string, holds all of the paths for images. If full/thumb is set to false, it falls back to root path.

	$('#element').showyCase({
		pathFull: false,
		pathRoot: 'img/',
		pathThumbs: 'img/thumbs/'
	});

List of editable paths:

	- pathFull: false
	- pathRoot: 'img/'
	- pathThumbs: 'img/thumbs/'

**Speed Options**: Accepts a number, sets the speeds in milliseconds for the animations.

	$('#element').showyCase({
		speedLoad: 300,
		speedTransition: 150
	});

List of adjustable speeds:
	- speedLoad: 300
	- speedTransition: 150


### Build Contents:
----
Initial build contains source code in both uncompressed and minified versions. Additionally, a CSS, image, JavaScript, and JSON folder that contains examples and reccommended default settings.


### Requests and future expansion:
----
All feedback and updates can be found on the showyCase GitHub page:

https://github.com/carlthenimrod/showyCase