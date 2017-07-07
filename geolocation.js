import DarkSkyApi from 'dark-sky-api';

DarkSkyApi.apiKey = 'b467d7a48dc59ca44295151f0de2d729';

DarkSkyApi.postProcessor = (item) => {
  item.day = item.dateTime.format('ddd');
  return item;
}
//const weather = "https://api.darksky.net/forecast/b467d7a48dc59ca44295151f0de2d729/"

//37.8267,-122.4233

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    const position = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    DarkSkyApi.loadCurrent(position)
        .then(result =>
          console.log(result)
          $("#data").html("Result: " + result);
        );
  })
}
