$(document).ready(function(){
  var lat,lon;

  if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       lat = position.coords.latitude;
       long = position.coords.longitude;

  var url = 'http://ip-api.com/json';
  $.getJSON(url,function(data){
    console.log(data);
    $('#location').html(data.city + ',' + data.country + ',' + data.countryCode);
  });

  url = 'https://cors-anywhere.herokuapp.com/' + 'https://api.darksky.net/forecast/4fa59bc637d52f0ffc6612c294109040/' + lat + ',' + long;
  $.getJSON(url,function(result){
    console.log(result);
    $('#weather').html(((result.currently.temperature-32)*5/9).toFixed(2) + ' &#8451;');
    $('#summary').html(result.currently.summary);
    function getIcon(info) {
              switch (info){
                case "clear-day":
                  return Skycons.CLEAR_DAY;
                case "clear-night":
                  return Skycons.CLEAR_NIGHT;
                case "partly-cloudy-day":
                  return Skycons.PARTLY_CLOUDY_DAY;
                case "partly-cloudy-night":
                  return Skycons.PARTLY_CLOUDY_NIGHT;
                case "cloudy":
                  return Skycons.CLOUDY;
                case "rain":
                  return Skycons.RAIN;
                case "sleet":
                  return Skycons.SLEET;
                case "snow":
                  return Skycons.SNOW;
                case "wind":
                  return Skycons.WIND;
                case "fog":
                  return Skycons.FOG;
              }
            }

    var skycons = new Skycons({"color":"white"});
        skycons.add("icons", getIcon(result.currently.icon));
        skycons.play();
  });
    });
  }
});
