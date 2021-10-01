// Initialize the platform object:
let platform = new H.service.Platform({
  'apikey': '2DmoBh2lW0cHF_Y-LPlL0f_BnUmNzHlReJDWej2MED4'
});



function landmarkGeocode() {
  let naslov = document.querySelector('h1').textContent;
  var geocoder = platform.getSearchService(),
    landmarkGeocodingParameters = {
      q: naslov,
      at: '0,0',
      limit: 1
    };

  geocoder.discover(
    landmarkGeocodingParameters,
    showMap,
    (e) => console.log(e)
  );
}

function showMap(result) {
  let location = result.items[0].position;

  let defaultLayers = platform.createDefaultLayers();
  // Instantiate (and display) a map object:
  let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: { lat: location.lat, lng: location.lng }
    });
  //dodavanje markera
  let marker = new H.map.Marker({ lat: location.lat, lng: location.lng });
  map.addObject(marker);
  // za zumiranje
  var ui = H.ui.UI.createDefault(map, defaultLayers);

}

landmarkGeocode();


