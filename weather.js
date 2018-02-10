$(document).ready(function(){
  var lat,long;

  //function to show loading that ajax request is going on
  var showLoading = function(selector){
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader(1).gif'></img></div>";
    selector.innerHTML=html;
  }
  //end of loading function

  if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       lat = position.coords.latitude;
       long = position.coords.longitude;

  var selector = document.querySelector("#loading");
  showLoading(selector);

  var url = 'http://ip-api.com/json';
  $.getJSON(url,function(data){

  url = 'https://cors-anywhere.herokuapp.com/' + 'https://api.darksky.net/forecast/4fa59bc637d52f0ffc6612c294109040/' + lat + ',' + long;
  $.getJSON(url,function(result){

    console.log(data);
    var x = "<div class='text-center'>";
    x += data.city + ',' + data.country + ',' + data.countryCode + "</div>";
    //$('#location').html(data.city + ',' + data.country + ',' + data.countryCode);

    console.log(result);

    x += "<div class='text-center'>" + ((result.currently.temperature-32)*5/9).toFixed(2) + ' &#8451;' + "</div>";
    //$('#weather').html(((result.currently.temperature-32)*5/9).toFixed(2) + ' &#8451;');
    x += "<div class='text-center'>" + result.currently.summary + "</div>";
    //$('#summary').html(result.currently.summary);
    selector.innerHTML=x;
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
    });
  }
});
