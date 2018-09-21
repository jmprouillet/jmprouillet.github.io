//var map;
//var pointarray;
//var heatmap;
var MY_MAPTYPE_ID = 'custom_style';

var featureOpts = [
    {
      stylers: [
        { color: '#333333' },
      ]
    },
    {
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'road.local',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
        featureType: 'road.arterial',
        stylers: [
          { visibility: 'off' }
        ]
      },


    {
      featureType: 'water',
      stylers: [
        { color: '#000000' }
      ]
    }
];


function Heatmap(mapDOMId, cityLocation,dataPoints){
  //  build map
  // ---------------------------------
  var myLatlng = new google.maps.LatLng(cityLocation.latitude, cityLocation.longitude);
  var myOptions = {
    zoom: 10,
    center: myLatlng,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };
  var map = new google.maps.Map(document.getElementById(mapDOMId), myOptions);


  //  customize map
  // ---------------------------------
  var styledMapOptions = {
      name: 'Custom Style'
  };
  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);


  //  build array of latLng
  // ---------------------------------
  var data = [];
  var obj = null;
  counter = 0;
  dataPoints.forEach(function(point){
      // check for crimes with no latLng
      if ( point.latitude && point.longitude ){
          obj = new google.maps.LatLng(point.latitude, point.longitude);
          data.push(obj);
          counter++;
      }
  });

  //  build heat layer
  // ---------------------------------
  var pointArray = new google.maps.MVCArray(data);
  var heatmap = new google.maps.visualization.HeatmapLayer({
      data: pointArray,
      radius : 15
  });
  heatmap.setMap(map);
  return heatmap;
}

function initialize(){
  chicagoMap = Heatmap('map-canvas-chicago',{latitude:41.886903 ,longitude :-87.722740 },chicagoPoints);
  bostonMap = Heatmap('map-canvas-boston', {latitude:42.34840576 ,longitude :-71.08688339}, bostonPoints);
}

google.maps.event.addDomListener(window, 'load', initialize);
