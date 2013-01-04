### showyCase: jQuery showcase that is managed using a JSON file.
====

showyCase dynamically generates a showcase based on a JSON file that categorizes items. The showcase displays items in the JSON files as thumbnails and allows user to navigate between different pages.


### Release info:

The current release is version 0.7. This is the inital release and more features and updates are planned.


### Examples:
----

Basic showyCase usuage on an empty element, the plugin will do the rest.

	$('#element').showyCase();

Add a JavaScript object to achieve additional functionality, some options are nested in objects.

	$('#element').showyCase({
		html5: false,
		pages: {
			show: 20
		},
		speed: {

			load: 400,
			transition: 300
		}
	});


### Options:
----

Here is a brief rundown of all the different options.

**ajax**: Accepts object, controls Ajax config settings, for more information consult the jQuery API.

	$('#element').showyCase({
		ajax: {
			cache: false,
			dataType: 'json',
			dataUrl: 'json/jquery.showyCase.json'
		}
	});

**classNames**: Accepts a object, holds all of the class names. Allows you to change the name of the classes for the gallery.

	$('#element').showyCase({
		classNames: {
			thumbs: 'sc-thumbs'
		}
	});

List of renameable CSS selectors with their default values:

	- ctn: 'sc-ctn'
	- ctrl: 'sc-ctrl'
	- ctrlPrev: 'sc-prev'
	- ctrlNext: 'sc-next'
	- thumbs: 'sc-thumbs'

**html5**: Accepts a boolean value, true creates articles/sections/nav elements, alternatively false creates divs, defaults to true.

	$('#element').showyCase({
		html5: true
	});

**onItemClick**: Accepts a string, determines the action to take place on thumb click, defaults to false

	$('#element').showyCase({
		onItemClick: false
	});

List of selectable strings (more options coming)

	- 'blurbGallery' : Sends to 'gallery.html' in same directory with PHP variable to be processed by blurbGallery plugin.

**pages**: Accepts a object, contains options for the pagination system, show controls if pages are used altogether, per controls how many items per page.

	$('#element').showyCase({
		pages: {
			show: start,
			per: false
		}
	});

**path**: Accepts a object, holds all of the paths for images. If full/thumb is set to false, it falls back to root path.

	$('#element').showyCase({
		path: {
			full: false,
			root: 'img/',
			thumbs: 'img/thumbs/'
		}
	});

List of editable paths:

	- full: false,
	- root: 'img/'
	- thumbs: 'img/thumbs/'

**speed**: Accepts an object, controls the speed of the fade and load transitions in milliseconds.

	$('#element').showyCase({
		load: 300,
		transition: 150
	});


### Build Contents:
----
Initial build contains source code in both uncompressed and minified versions. Additionally, a CSS, image, JavaScript, and JSON folder that contains examples and reccommended default settings.


### Requests and future expansion:
----
All feedback and updates can be found on the showyCase GitHub page:

https://github.com/carlthenimrod/showyCase