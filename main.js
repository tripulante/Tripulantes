	/**
		* Starting point for the Tripulantes project. Creates the map, the main layout
		* and loads the files.
		*
		* @file main.js
		* @author John Palma
		*
		*/	

    	var chronoOverlay;

    	
    	var resizeMarker, resizeMarker2;
    	
    	var tiledOverlay;
	
	/**
       * Main method of the site
       * @method initialize
       * @return 
       */
      function initialize() {
		
		
			container = document.getElementById("map_canvas");
			container.width = window.innerWidth; 
			container.height = window.innerHeight; 
		
		
		
		
		var styledMap =  createStyles();
		
	  
        var mapOptions = createMapOptions(4.595589, -74.072571);
        
       
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
			
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
			
		
		
		var bikeLayer = new google.maps.BicyclingLayer();
// 		bikeLayer.setMap(map);
		
		var weatherLayer = new google.maps.weather.WeatherLayer({
			temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
		});
		weatherLayer.setMap(map);
		
		
		var cloudLayer = new google.maps.weather.CloudLayer();
		cloudLayer.setMap(map);
		
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

		$("#opacity").change(
			function(){
				var ch = $("#opacity").val();
				tiledOverlay.setOpacity(ch/100);
		});
		
		$("#cloudtoggle").change(
			function(){
				var ch = $("#cloudtoggle").val();
				if(ch == "on")
					cloudLayer.setMap(map);
				else
					cloudLayer.setMap(null);
		});
		
		$("#bikeswitch").change(
			function(){
				var ch = $("#bikeswitch").val();
				if(ch == "on")
					bikeLayer.setMap(map);
				else
					bikeLayer.setMap(null);
		});
		
		$("#weatherswitch").change(
			function(){
				var ch = $("#weatherswitch").val();
				if(ch == "on")
					weatherLayer.setMap(map);
				else
					weatherLayer.setMap(null);
		});
		
		$("#soundtrack")[0].play();
		
		$("#tools").hide();
		
		$("#btn_tools").click(function(){
			$("#tools").toggle();
		});
		
      }
      
      /**
       * Creates the map styles.
       * @method createStyles
       * @return styledMap
       */
      function createStyles(){
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
		
		return styledMap;
      };
      
      /**
       * Creates the map options
       * @method createMapOptions
       * @param {} lat
       * @param {} lng
       * @return mapOptions
       */
      function createMapOptions(lat, lng){
      
		var mapOptions = {
			  center: new google.maps.LatLng(lat, lng), // centrado en la candelaria
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
			  minZoom: 10,
			  scaleControl: false
		  
			};
		
		return mapOptions;
      
      };