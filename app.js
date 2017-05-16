
const CONDITIONS_URL = "http://api.wunderground.com/api/5ee6bff184de1362/conditions/q/"
const FORECAST_URL = "http://api.wunderground.com/api/5ee6bff184de1362/forecast/q/"
const IMAGES_URL = "http://api.wunderground.com/api/5ee6bff184de1362/webcams/q/"
const PROXY_URL = "https://cors-anywhere.herokuapp.com/"

$(clickButton);

navigator.geolocation.getCurrentPosition(function(position) {
  var latitude = (position.coords.latitude);
  var longitude = (position.coords.longitude)
  console.log(latitude, longitude)
});

function clickButton(){
  $('.btn').click(getWeather)
}

function getWeather(){
  let zipCode = $("#zip_code").val();
  $.get(PROXY_URL+CONDITIONS_URL+zipCode+".json")
    .then(showWeather);
    $.get(PROXY_URL+IMAGES_URL+zipCode+".json")
      .then(showImage)
      $.get(PROXY_URL+FORECAST_URL+zipCode+".json")
        .then(showForecast)
    $('.card').show();
}

function showWeather(data){
  let temp = data.current_observation.feelslike_f;
  let weather = data.current_observation.weather;
  $('#test4').text(temp+":   "+weather);

}

function showImage(images){
  let image = images.webcams[0].CURRENTIMAGEURL;
  $('body').css("background-image","url("+image+")");
}

function showForecast(forecast){
  var forecast = forecast.forecast.txt_forecast.forecastday[2].fcttext;
  $('#test5').text("Tomorrow: " + forecast);
}

//
// //
// $(document).ready(function(){
//
//
//
//   $('.btn').click(function(){
//     var zipCode = $("#zip_code").val()
//     $.get(FORECAST_URL+zipCode+".json")
//       .then(function(data){
//         console.log(data)
//       })
//
//   })
//
//
//
//
// })
