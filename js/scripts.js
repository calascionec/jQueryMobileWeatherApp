var icons = {"clear-day": "A",
            "clear-night": "C",
            "rain": "R",
            "snow": "W",
            "sleet": "X",
            "wind": "S",
            "fog": "M",
            "cloudy": "N",
            "partly-cloudy-day": "H",
            "partly-cloudy-night": "4"};

var cities = {
            "portland, or" : {coords : {latitude:45.523062, longitude:-122.676482}},
            "chapel hill, nc" : {coords : {latitude:35.913200, longitude:-79.055845}},
            "new york, ny" : {coords : {latitude:40.712784, longitude:-74.005941}},
            "chicago, il" : {coords : {latitude:41.878114, longitude:-87.629798}},
            "current location": ''
}
function loadWeather(cityCoords){
    var latlng = cityCoords.coords.latitude + "," + cityCoords.coords.longitude;
    var forecastUrl = "https://api.forecast.io/forecast/8b1671d2992a156e3e87f664e97e338e/" +latlng;

    $.ajax({
        url: forecastUrl,
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            console.log(json);
            $("#current_temp").html(Math.round(json.currently.temperature) + "&#176;F");
            $("#summary").html(json.currently.summary);
            $("#current_temp").attr("data-icon", icons[json.currently.icon]);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}

function loadCity(city) {
    $("#location").html(city);
    if (city.toLowerCase() === "current location"){
        if( navigator.geolocation){
            navigator.geolocation.getCurrentPosition(loadWeather, loadDefaultCity);
        } else {
            loadDefaultCity();
        }
    } else {
        loadWeather(cities[city.toLowerCase()]);
    }
}

function loadDefaultCity() {
    loadCity("New York, New York")
}

$(document).ready(function(){
    loadCity("Chicago, IL");
    $("a.city").bind("click", function() {
        loadCity($(this).html());
    });
});
