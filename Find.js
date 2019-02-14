var latitude;
var longitude;
var parkedLatitude;
var parkLongitude;
var storage;

function init(){
  document.addEventListener("deviceReady", onDeviceReady, false);
  storage = window.localStorage;
}
