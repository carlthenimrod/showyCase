/*!
 * jQuery showyCase Plugin
 * Author: Carl Dawson
 * Version: 0.5
 */
;(function($, win, doc, undefined){

	var showyCase = {
	
		init: function(options, elem){

			var that = this;
	 
			//mix in the passed-in options with the default options
			that.config = $.extend({}, that.defaults, options);
	 
			//save the element reference, both as a jQuery
			//reference and a normal reference
			that.elem  = elem;
			that.$elem = $(elem);

			//build the DOM's initial structure
			$.when(that.load()).then(function(){

				//build html
				$.when(that.build()).then(function(){

					//create events
					that.events();

					//fade in ctn
					that.modules.ctn.fadeIn(that.config.speed.load);					

				}, function(){

					alert('Error: Failed to build HTML.');
				});

			}, function(){

				//alert error
				alert('Error: Failed to load data.');
			});		
	
			//return that so that we can chain and use the bridge with less code.
			return that;
		},
	
		defaults: {

			ajax: {
				cache: false,
				dataType: 'json',
				dataUrl: 'json/jquery.showyCase.json'
			},
			
			classNames: {

				ctn: 'sc-ctn',
				ctrl: 'sc-ctrl',
				ctrlPrev: 'sc-prev',
				ctrlNext: 'sc-next',
				thumbs: 'sc-thumbs'
			},

			html5: true,

			pages: {

				show: 18,
				start: 0
			},

			path: {
				full: false,
				root: 'img/',
				thumbs: 'img/thumbs/'
			},

			speed: {

				load: 300,
				transition: 150
			}		
		},

		load: function(){

			var that = this,
				dfd = $.Deferred();

			//perform ajax, load config
			$.ajax({

				//ajax config
				cache: that.config.ajax.cache,
				dataType: that.config.ajax.dataType,
				url: that.config.ajax.dataUrl
			})
			.then(function(data){

				//set data variable
				that.data = data.showyCase;

				//find all items, store in items
				that.items = that.utils.findAllItems(that.data);

				//resolve deferred
				dfd.resolve();

			}, function(){

				//reject deferred
				dfd.reject();
			});

			return dfd.promise();
		},
	
		build: function(){
		
			var that = this,
				dfd = $.Deferred();

			//when done rendering
			$.when(that.render()).then(function(){			
				
				//fade in $elem
				that.$elem.fadeIn(that.config.speed.load, function(){

					dfd.resolve();
				});

			}, function(){

				dfd.reject();
			});

			return dfd.promise();
		},

		events: function(){

			var that = this;

			that.modules.ctrlPrev.on('click', function(){

				if((!that.animating) || (that.animating.state() !== 'pending')){

					if(that.pages.current !== 0){

						--that.pages.current;

						//refresh thumbs
						that.eventRefreshThumbs();
					}
				}
			});

			that.modules.ctrlNext.on('click', function(){

				if((!that.animating) || (that.animating.state() !== 'pending')){				

					if(that.pages.current !== (that.pages.total - 1)){

						++that.pages.current;

						//refresh thumbs
						that.eventRefreshThumbs();
					}
				}
			});

			that.modules.thumbs.on('hover', 'li', function(){

				//create pop-up
				that.eventCreatePopUp();
			});	
		},

		eventCreatePopUp: function(){

		},

		eventRefreshThumbs: function(){

			var that = this, 
				ul, 
				li,
				img,
				a,
				srcs = [],
				active,
				start,
				end,
				items;

			that.animating = $.Deferred();

			that.modules.thumbs.fadeOut(that.config.speed.transition, function(){

				//empty thumbs
				that.modules.thumbs.empty();

				//find start and end
				start = (that.pages.current * that.pages.show),
				end = (start + that.pages.show);

				//slice items
				items = that.items.slice(start, end);

				ul = $('<ul>');

				(function(){

					var i,
						l,
						href,
						src;

					for(i = 0, l = items.length; i < l; ++i){

						//if thumbs image path exists
						if(that.config.path.thumbs){

							src = that.config.path.thumbs + items[i].img;
						}
						else{

							src = that.config.path.root + items[i].img;
						}

						href = that.config.path.root + items[i].img;

						li = $('<li>');

						a = $('<a/>',{
							'alt': items[i].title,
							'title': items[i].title
						}).attr('href', href);

						img = $('<img/>', {

							'alt': items[i].title,
							'title': items[i].title
						}).attr('src', src);

						a.append(img);

						li.append(a);

						ul.append(li);

						//add to src array for preloading
						srcs.push(src);
					}

				})();

				that.utils.preload(srcs).done(function(){

					that.modules.thumbs.append(ul);

					that.modules.thumbs.fadeIn(that.config.speed.transition, function(){

						that.animating.resolve();
					});
				});				
			});
		},

		render: function(){

			var that = this,
				modules = [],
				dfd = $.Deferred();

			//create modules object
			that.modules = {};

			//add necessary modules
			modules.push(that.renderContainer());
			modules.push(that.renderControls());
			modules.push(that.renderThumbs());

			//when modules loaded
			$.when.apply(that, modules).then(function(){

				//module successfully loaded
				dfd.resolve();

			}, function(){

				//reject, modules failed to load
				dfd.reject();
			});

			return dfd.promise();
		},

		renderContainer: function(){

			if(this.config.html5){

				this.modules.ctn = $('<section>');
			}
			else{

				this.modules.ctn = $('<div>');
			}

			this.modules.ctn.attr({

				'class': this.config.classNames.ctn
			});

			this.$elem.append(this.modules.ctn);
		},

		renderControls: function(){

			if(this.config.html5){

				this.modules.ctrl = $('<section>');
			}
			else{

				this.modules.ctrl = $('<div>');
			}

			this.modules.ctrl.attr({

				'class': this.config.classNames.ctrl
			});

			this.modules.ctrlPrev = $('<div>', {

				'alt': 'Previous',
				'class': this.config.classNames.ctrlPrev,
				'title': 'Previous'
			});

			this.modules.ctrlNext = $('<div>', {

				'alt': 'Next',
				'class': this.config.classNames.ctrlNext,
				'title': 'Next'
			});

			this.modules.ctrl.append(this.modules.ctrlPrev);
			this.modules.ctrl.append(this.modules.ctrlNext);

			this.modules.ctn.append(this.modules.ctrl);
		},

		renderThumbs: function(){

			var that = this, 
				dfd = $.Deferred(), 
				ul, 
				li,
				img,
				a,
				srcs = [],
				active,
				start,
				end,
				items;

			that.createPages();

			//find start and end
			start = (that.pages.current * that.pages.show),
			end = (start + that.pages.show);

			//slice items
			items = that.items.slice(start, end);			
			
			if(that.config.html5){

				that.modules.thumbs = $('<nav>');
			}
			else{

				that.modules.thumbs = $('<div>');
			}

			that.modules.thumbs.attr({

				'class': that.config.classNames.thumbs
			});

			that.modules.ctn.append(that.modules.thumbs);

			ul = $('<ul>');

			(function(){

				var i,
					l,
					href,
					src;				

				for(i = 0, l = items.length; i < l; ++i){

					//if thumbs image path exists
					if(that.config.path.thumbs){

						src = that.config.path.thumbs + items[i].img;
					}
					else{

						src = that.config.path.root + items[i].img;
					}

					href = that.config.path.root + items[i].img;

					li = $('<li>');

					a = $('<a/>',{
						'alt': items[i].title,
						'title': items[i].title
					}).attr('href', href);

					img = $('<img/>', {

						'alt': items[i].title,
						'title': items[i].title
					}).attr('src', src);

					a.append(img);

					li.append(a);

					ul.append(li);

					//add to src array for preloading
					srcs.push(src);
				}

			})();

			that.utils.preload(srcs).done(function(){

				that.modules.thumbs.append(ul);

				dfd.resolve();
			});

			return dfd.promise();
		},

		createPages: function(){

			var that = this;

			//create pages object
			that.pages = {

				current: that.config.pages.start,
				show: that.config.pages.show,
				count: that.items.length,
				total: undefined
			}

			//find total pages
			that.pages.total = Math.ceil( that.pages.count / that.pages.show );
		},

		utils: {

			findAllItems: function(data){

				var i,
					l,
					item,
					items = [];

				for(i = 0, l = data.length; i < l; ++i){

					//store item
					item = data[i].item;

					(function(){

						var i,
							l;

						for(i = 0, l = item.length; i < l; ++i){

							//add item to items array
							items.push(item[i]);
						}

					})();
				}

				//return items array
				return items;
			},

			formatText: function(str){

				//create string for id, make lowercase
				str = str.toLowerCase();

				//replace spaces with underscore, remove other misc characters
				str = str.replace(/ /g, '_');
				str = str.replace(/&/g, 'and');
				str = str.replace(/[^a-z_]/g, '');

				return str;
			},

			preload: function(srcs) {

				var dfd = $.Deferred(),
					promises = [],
					img,
					l,
					p;

				if (!$.isArray(srcs)) {
					srcs = [srcs];
				}

				l = srcs.length;

				for (var i = 0; i < l; i++) {
					p = $.Deferred();
					img = $("<img />");

					img.load(p.resolve);
					img.error(p.resolve);

					promises.push(p);

					img.get(0).src = srcs[i];
				}

				$.when.apply(this, promises).done(dfd.resolve);

				return dfd.promise();
			}
		}
	};
	
	//Object.create support test, and fallback for browsers without it
	if (typeof Object.create !== 'function'){
	
		Object.create = function (o){
	
			function F() {}
	 
			F.prototype = o;
	
			return new F();
		};
	}
	
	//create a plugin based on a defined object
	$.plugin = function(name, object){
	
		$.fn[name] = function(options){
	
			return this.each(function(){
	
				if (!$.data(this, name)){
	
					$.data( this, name, Object.create(object).init(options, this));
				}
			});
		};
	};
	
	// Usage:
	$.plugin('showyCase', showyCase);

})(jQuery, window, document);