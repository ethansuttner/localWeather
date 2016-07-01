$(document).ready(function() {
  var weatherURLs = {
    "Clouds": 0
  }

  console.log("ready!");
  $(".target").click(function() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(showPosition, showError);
    // } else {
    //   alert("Geolocation is not supported by this browser.");
    // }
    var url = "http://ip-api.com/json";
    $.getJSON(url, function(json) {
    getWeather(json.lat,json.lon);
  });
});


  $(".temp-button").click(function() {
    //$(".tempC").addClass("hide");
    if ($(".tempC").hasClass("hide")) {
      $(".tempF").addClass("hide");
      $(".tempC").removeClass("hide");
    } else {
      $(".tempC").addClass("hide");
      $(".tempF").removeClass("hide");
    }
  });
});

function showPosition(position) {
  if (position.coords.latitude && position.coords.longitude){
    getWeather(position.coords.latitude, position.coords.longitude);
  } else {
    alert("Problem getting your position!");
  }
}

function getWeather(latParam, longParam) {
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latParam + "&lon=" + longParam + "&appid=5b73a2541d59600c6c3a7e411a75bf44";
  $.getJSON(url, function(json) {
    var tempKelvin = json.main.temp;
    var tempF = 0;
    var tempC = 0;
    tempF = tempKelvin * 9 / 5 - 459.67;
    tempC = tempKelvin - 273.15;
    $(".weather-info").html(json.weather[0].main);
    $(".tempF").html("<h3>" + Math.floor(tempF) + String.fromCharCode(176) + "F</h3>");
    $(".tempC").html("<h3>" + Math.floor(tempC) + String.fromCharCode(176) + "C</h3>");

    if (json.weather[0].main == "Clouds") {
      $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2012/02/16/12/08/clouds-13388_960_720.jpg)');
      $('.temp').css({'color': 'black'});
      $('.weather-line').css({'color': 'black'});
      }
    else if (json.weather[0].main == "Thunderstorm"){
      $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2016/05/01/00/57/barn-1364280_960_720.jpg)');
      $('.temp').css({'color': 'red'});
      $('.weather-line').css({'color': 'red'});
    } else if (json.weather[0].main == "Snow"){
      $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2014/03/10/01/55/greater-snow-goose-284211_960_720.jpg)');
      $('.temp').css({'color': 'black'});
      $('.weather-line').css({'color': 'black'});
    } else {
      $('body').css('background-image', 'url(https://pixabay.com/static/uploads/photo/2016/02/21/14/31/wood-1213664_960_720.jpg)');
      $('.temp').css({'color': 'black'});
      $('.weather-line').css({'color': 'black'});

    }
  });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
