var latitude;

var longitude;

var parkedLatitude;

var parkedLongitude;

var storage;

function init(){
  document.addEventListener("deviceReady", onDeviceReady, false);
  storage = window.localStorage;
}

function onDeviceReady(){
  var node = document.createElement('Link');
    node.setAttributes('rel','stylesheet');
    node.setAttributes('type','text/css');
      if(cordova.platformId == 'ios'){
        node.setAttributes('href','parkitios.css');
        window.StatusBar.overlaysWebview(false);
        window.StautsBar.styleDefault();
      }else{
        node.setAttributes('href','parkitandoird.css');
        window.StatusBar.backgroundColorByHeString('#0024E0');

      }
      document.getElementsByTagName('head')[0].appendChild(node);
}

function setCss(elm,prop,val){
  var node = document.getElementById(elm).style;
  node.setProperty(prop,val);
}

function setParkingLocation(){
  navigator.geolocation.getCurrentPosition(setParkingLocationSuccess, locationError, {enableHighAccuracy:true});
}

function setParkingLocationSuccess(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  storage.setItem('parkedLatitude',latitude);
  storage.setItem('parkedLongitude',longitude);
  navigator.notification.alert("Parking Location was successfully saved here.");
  showParkingLocation();
}

function locationError(){
  navigator.notification.alert("Error Code: " + error.code + "\nError Message: " + error.message);
}

function showParkingLocation(){
  setCss('directions','visibility','hidden');
  setCss('instructions','display','none');
  var latLong = new google.maps.LatLong(latitude, longitude);
  var map = new google.maps.Map(document.getElementById('map'));
  map.setZoom(16);
  map.setCenter(latLong);
  var marker = new google.maps.Market({
    position: latLong,
    map: map
  });
  setCss('map','visibility','visible');
}

function getParkingLocation(){
  navigator.geolocation.getCurrentPosition(getParkingLocationSuccess, loactionError, {enableHighAccuracy:true});
}

function getParkingLocationSuccess(){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  parkedLatitude = storage.getItem('parkedLatitude');
  parkedLongitude = storage.getItem('parkedLongitude');
  showDirections();
}

function showDirections(){
  var dRenderer = new google.maps.DirectionsRenderer;
  var dService = new google.maps.DirectionsService;
  var curLatLong = new google.mpas.LatLong(latitiude,longitude);
  var parkedLatLong = new google.maps.LatLong(parkedLatitude, parkedLongitude);
  var map = new google.maps.Map(document.getElementById('map'));
  map.setZoom(16);
  map.setCenter(curLatLong);
  drendereer.setMap(map);
  dService.rout({
    origin: curLatLong,
    destination: parkedLatLong,
    travelMode: 'DRIVING'
  },function(response,status){
    if(status == 'OK'){
      dRenderer.setDirections(response);
      document.getElementById('directions').innerHtml = '';
      dRenderer.setPanel(document.getElementById('directions'));
    }else{
      navigator.notification.alert("directions failed due to: " + status);
    }
    });
  setCss('map','visibility','visible');
  setCss('directions','visibility','visible');
  setCss('instructions','display','none');
}
