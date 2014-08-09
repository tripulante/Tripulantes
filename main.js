    	var chronoOverlay;
    	
    	chronoMap.prototype = new google.maps.OverlayView();
    	
    	var resizeMarker, resizeMarker2;
    	
    	var tiledOverlay;
	
	/**
       * Main method of the site
       * @method initialize
       * @return 
       */
      function initialize() {
		// Create an array of styles.
		var styles = [
			{
				stylers: [
					{ hue: "#00ffe6" },
					{ saturation: -70 }
					//{ lightness: 50 }
				]
			},
			{
				featureType: "road",
				stylers: [
					{ visibility: "on" },
					{ hue: "#ff0000" }
					//{ lightness: 50 },
					//{ saturation: -50 }
				]
			},
			{
				featureType: "road",
				elementType: "labels",
				stylers: [
					{ visibility: "off" }
				]
			},
			
			{
				featureType: "transit.station.rail",
				elementType: "labels",
				stylers: [
					{ hue: "#ff0000"},
					{ saturation: 30},
					{ visibility: "simplified" }
				]
			},
			{
				featureType: "administrative",
				elementType: "geometry.fill",
				stylers: [
					{ hue: "#ff0000" },
					{ saturation: 40 },
					{ visibility: "on" }
				]
			}
			
		];
		
		var styledMap = new google.maps.StyledMapType(styles, {
			name: "Nuevo!"
		})
		
	  
        var mapOptions = {
          center: new google.maps.LatLng(4.595589, -74.072571), // centrado en la candelaria
          zoom: 15,
		  mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		  },
		  streetViewControl: true,
		  streetViewControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		  },
		  maxZoom: 15,
		  scaleControl: false
		  
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
			
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
			
		var luccaIco = "images/ct/LuccaMap.gif";
		var cronoIco = "images/ct/CronoWait.gif";
		var marker = new google.maps.Marker({
			position: map.getCenter(),
			map: map,
			//animation: google.maps.Animation.BOUNCE,
			icon: luccaIco, 
			title: 'Click me!'
		});
		
		
		var cronoLatLen = new google.maps.LatLng(map.getCenter().lat()+0.05, map.getCenter().lng())
		var cronoMarker = new google.maps.Marker({
			position: cronoLatLen,
			map: map,
			icon: cronoIco,
			optimized: false,
			title: 'Click me too!'
		});
		
		
		/*var bikeLayer = new google.maps.BicyclingLayer();
		bikeLayer.setMap(map);*/
		
		//var weatherLayer = new google.maps.weather.WeatherLayer({
		//  temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
		//});
		//weatherLayer.setMap(map);
		
		
		//find a way to scale
		//4.772660, -74.086046
		var bogMax = new google.maps.LatLng(4.872660,-73.95934);
		var bogMin = new google.maps.LatLng(4.407008,-74.289155);
		
		var nbNe = new google.maps.LatLng(4.798079048890717,-73.9952802658081);
		var nbSw = new google.maps.LatLng(4.455875696796786,-74.25483226776123);
		
		var imageBounds = new google.maps.LatLngBounds(
			nbSw,
			nbNe
		);
		
		
// 		chronoOverlay = new chronoMap(imageBounds, "../Mapa/mapabogota.png", map);
		
		tiledOverlay = new google.maps.ImageMapType({
			/**
			 * Description
			 * @method getTileUrl
			 * @param {} coord
			 * @param {} zoom
			 * @return BinaryExpression
			 */
			getTileUrl: function(coord, zoom){
				return './out/' + zoom + '/' + coord.x + '/' + coord.y+'.png';
			},
			tileSize: new google.maps.Size(256, 256)
		});
		
		map.overlayMapTypes.push(tiledOverlay);
		
		$("#opacity").slider({
			min: 0,
			max: 100,
			value: 100,
			/**
			 * Description
			 * @method slide
			 * @param {} event
			 * @param {} ui
			 * @return 
			 */
			slide: function(event, ui){
				tiledOverlay.setOpacity(ui.value/100);
			}
		});
		
      }