document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=0e316911f52c2ac1c9835422fbef60ec";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {	
      let results = "";
      results += '<div class="today">';
      results += '<h2>Weather in ' + json.name + "</h2>";
      results += '<div class="row">'
      results += '<div class="col-lg">'
      for (let i=0; i < json.weather.length; i++) {
	      results += '<img src="https://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      for (let i=0; i < json.weather.length; i++) {
	      results += json.weather[i].description
	      if (i !== json.weather.length - 1)
	        results += ", "
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += '</div>'
      results += '<div class="col-lg">'
      results += '<h4>Feels Like: ' + json.main.feels_like + '<h4>';
      results += '<h4>Low: ' + json.main.temp_min + '<h4>';
      results += '<h4>High: ' + json.main.temp_max + '<h4>';
      results += '</div>'
      results += '<div class="col-lg">'
      results += '<h4>Humidity: ' + json.main.humidity + '%<h4>';
      results += '<h4>Wind: ' + json.wind.speed + 'mph at ' + json.wind.deg + '&deg;<h4>';
      results += '</div>'
      results += '</div>'
      results += '</div>'
      document.getElementById("weatherResults").innerHTML = results;
    });
});

document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  
  const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=0e316911f52c2ac1c9835422fbef60ec";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "";
      forecast += '<div class="forecast">';
      forecast += '<h1>5 Day Forecast</h1></br>';
      for (let i=0; i < json.list.length; i++) {
      	forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
	      forecast += "<p>Temperature: " + json.list[i].main.temp + " &deg;F</p>";
	      forecast += "<p>Feels Like: " + json.list[i].main.feels_like + " &deg;F</p>";
	      forecast += '<img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      }
      forecast += '</div>'
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
