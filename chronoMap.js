	/**
	 * Description
	 * @method chronoMap
	 * @param {} bounds
	 * @param {} image
	 * @param {} map
	 * @return 
	 */
	function chronoMap(bounds, image, map){
			this.bounds_ = bounds;
			this.image_ = image;
			this.map_ = map;
			
			this.div_ = null;
			this.setMap(map);
		}
	/**
	 * Specifies behavior when object is added
	 * @method onAdd
	 * @return 
	 */
	chronoMap.prototype.onAdd = function() {
		var div = document.createElement('div');
		div.style.border = 'none';
		div.style.borderWidth = '0px';
		div.style.position = 'absolute';

// Create the img element and attach it to the div.
		var img = document.createElement('img');
		img.src = this.image_;
		img.style.width = '100%';
		img.style.height = '100%';
		
		div.appendChild(img);
		jQuery(div).draggable();
		jQuery(div).resizable(
			{
// 					aspectRatio: true,
				/**
				 * Description
				 * @method resize
				 * @param {} event
				 * @param {} ui
				 * @return 
				 */
				resize: function(event, ui){
					console.log(ui.size);
					
					// console.log(this.div_.style.height);
// 						console.log(this.div_.style.width);
				}	
			});
		
		
		this.div_ = div;

// Add the element to the "overlayImage" pane.
		var panes = this.getPanes();
		panes.overlayImage.appendChild(this.div_);
	};
		
		
	/**
	 * Specifies behavior when map is drawn
	 * @method draw
	 * @return 
	 */
	chronoMap.prototype.draw = function() {

		// We use the south-west and north-east
		// coordinates of the overlay to peg it to the correct position and size.
		// To do this, we need to retrieve the projection from the overlay.
		var overlayProjection = this.getProjection();

		// Retrieve the south-west and north-east coordinates of this overlay
		// in LatLngs and convert them to pixel coordinates.
		// We'll use these coordinates to resize the div.
		var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
		var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

		// Resize the image's div to fit the indicated dimensions.
		var div = this.div_;
		div.style.left = sw.x + 'px';
		div.style.top = ne.y + 'px';
		div.style.width = (ne.x - sw.x) + 'px';
		div.style.height = (sw.y - ne.y) + 'px';
	};
	/**
	 * Hides map
	 * @method hide
	 * @return 
	 */
	chronoMap.prototype.hide = function() {
		if (this.div_) {
		// The visibility property must be a string enclosed in quotes.
		this.div_.style.visibility = 'hidden';
		}
	};
	/**
	 * Shows map
	 * @method show
	 * @return 
	 */
	chronoMap.prototype.show = function() {
		if (this.div_) {
		this.div_.style.visibility = 'visible';
		}
	};
	/**
	 * Toggles map
	 * @method toggle
	 * @return 
	 */
	chronoMap.prototype.toggle = function() {
		if (this.div_) {
			if (this.div_.style.visibility == 'hidden') {
			  this.show();
			} else {
			  this.hide();
			}
		}
	};
	/**
	 * Changes map opacity
	 * @method opacity
	 * @return 
	 */
	chronoMap.prototype.opacity = function(){
		if(this.div_.style.opacity == 1)
			this.div_.style.opacity = 0.7;
		else if(this.div_.style.opacity == 0.7)
			this.div_.style.opacity = 0.2;
		else
			this.div_.style.opacity = 1;
	};
	
	/**
	 * Prints coordinates of current map position
	 * @method print
	 * @return 
	 */
	chronoMap.prototype.print = function(){
		console.log(this.bounds_.getSouthWest());
		console.log(this.bounds_.getNorthEast());
		var projection = this.getProjection();
		var pos = jQuery(this.div_).position();
		var l = pos.left;
		var t = pos.top;
		var w = jQuery(this.div_).width();
		var h = jQuery(this.div_).height();
		
		var sw = projection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
		var ne = projection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
		
		console.log(sw);
		console.log(ne);
		console.log(l);
		console.log(t);
		console.log(w);
		console.log(h);
		console.log(pos);
		
		sw.x = l;
		sw.y = t+h;
		ne.x = l+w;
		ne.y = t;
		
		console.log(sw);
		console.log(ne);
		
		console.log(projection.fromDivPixelToLatLng(sw));
		console.log(projection.fromDivPixelToLatLng(ne));
	};