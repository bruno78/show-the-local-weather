var skyconType = function(icon) {
  if (icon === 'rain')
    return Skycons.RAIN
  else if(icon === 'snow')
    return Skycons.SNOW
  else if (icon === 'sleet')
    return Skycons.SLEET
  else if (icon === 'wind')
    return Skycons.WIND
  else if (icon === 'fog')
    return Skycons.FOG
  else if (icon === 'cloudy')
    return Skycons.CLOUDY
  else if (icon === 'partly-cloudy-day')
    return Skycons.PARTLY_CLOUDLY_DAY
  else if (icon === 'partly-cloudy-night')
    return Skycons.PARTLY_CLOUDLY_NIGHT
  else if (icon === 'clear-day')
    return Skycons.CLEAR_DAY
  else if (icon === 'clear-night')
    return Skycons.CLEAR_NIGHT

  return Skycons.CLOUDY
}

$(document).ready(function(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude
      var data = "https://api.darksky.net/forecast/b467d7a48dc59ca44295151f0de2d729/" + latitude + "," + longitude + "?callback=?";

      $.getJSON(data, function(data){

        var isCelsius = true;
        var temperature = Math.floor(JSON.stringify(data.currently.temperature)) // + "&deg;";
        var inCelsius = Math.floor((temperature - 32) / 1.8);
        var summary = JSON.parse(JSON.stringify(data.currently.summary));
        var next = JSON.parse(JSON.stringify(data.hourly.summary));
        var nextHour = JSON.parse(JSON.stringify(data.minutely.summary));
        var skycons = new Skycons({"color":"white"});
        var icon = JSON.stringify(data.currently.icon);

        skycons.add("icon", skyconType(icon));
        $(".temperature").html(temperature);
        $(".summary").html(summary);
        $(".next").html(next);
        $(".next-hour").html(nextHour);

        if(!$("#celsius").hasClass("shaded")){
          $("#celsius").addClass("shaded");
        }

        $("#convert").click(function() {
          if(isCelsius===false) {
            $(".temperature").html(inCelsius);
            $("#celsius").removeClass("shaded");
            $("#fahrenheit").addClass("shaded");
            isCelsius = true;
          }
          else {
            $(".temperature").html(temperature);
            $("#celsius").addClass("shaded");
            $("#fahrenheit").removeClass("shaded");
            isCelsius= false;
          }
        })
      })
    })
  }
});
