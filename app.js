
const CONDITIONS_URL = "http://api.wunderground.com/api/5ee6bff184de1362/conditions/q/"
const FORECAST_URL = "http://api.wunderground.com/api/5ee6bff184de1362/forecast/q/"
const IMAGES_URL = "http://api.wunderground.com/api/5ee6bff184de1362/webcams/q/"
const PROXY_URL = "https://cors-anywhere.herokuapp.com/"
const ALMANAC_URL = "http://api.wunderground.com/api/5ee6bff184de1362/almanac/q/"
const RADAR_URL = "http://api.wunderground.com/api/5ee6bff184de1362/animatedradar/q/"
const RADAR_URL2 = ".gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50"
const ALERT_URL = "http://api.wunderground.com/api/5ee6bff184de1362/alerts/q/"
const JOKES_URL = "http://api.icndb.com/jokes/random/"
var zipCode;

$(clickButton);

$('.parallax').parallax();

$('.modal').modal()

$('#modal2').modal('open');

function clickButton(){
  $('form').submit(getWeather)
}

function getWeather(){
    zipCode = $("input").val();
    event.preventDefault();
    getImage();
    getTemp();
    getRain();
    getForecast();
    getAverage();
    getRadar();
    getAlert();
}

function getTemp(){
  $.get(PROXY_URL+CONDITIONS_URL+zipCode+".json")
    .then(showWeather);
}

function getImage(){
  $.get(PROXY_URL+IMAGES_URL+zipCode+".json")
    .then(showImage)
}

function getForecast(){
  $.get(PROXY_URL+FORECAST_URL+zipCode+".json")
    .then(showForecast)
}

function getRain(){
  $.get(PROXY_URL+FORECAST_URL+zipCode+".json")
    .then(showPrecipitation)
}

function getAverage(){
  $.get(PROXY_URL+ALMANAC_URL+zipCode+".json")
    .then(showAverage)
}

function getRadar(){
  $("#radar").attr("src", RADAR_URL+zipCode+RADAR_URL2)
}

function getAlert(){
  $.get(PROXY_URL+ALERT_URL+zipCode+".json")
    .then(showAlert)
}


function showWeather(data){
  let temp = data.current_observation.feelslike_f;
  let weather = data.current_observation.weather;
  $('#test4').text(temp+"℉: "+weather);
}

function showImage(images){
  let image1 = images.webcams[0].CURRENTIMAGEURL;
  let image2 = images.webcams[1].CURRENTIMAGEURL;
  let image3 = images.webcams[2].CURRENTIMAGEURL;
  $('.img1').attr("src", image1);
  $('.img2').attr("src", image2);
  $('.img3').attr("src", image3)
}

function showForecast(data){
  let forecast = data.forecast.txt_forecast.forecastday[2].fcttext;
  $('#test5').text("Tomorrow: " + forecast);
}

function showPrecipitation(data){
  let precipitation = data.forecast.simpleforecast.forecastday[0].qpf_allday.in;
    if (precipitation > 0){
    $('#test6').text("YES, Precipitation Today. Approx: " + precipitation+" inches");
  }if(precipitation==0){
    $('#test6').text("No rain today")
  }
}

function showAverage(temps){
  let avgHigh = temps.almanac.temp_high.normal.F;
  let avgLow = temps.almanac.temp_low.normal.F;
  let recordHigh = temps.almanac.temp_high.record.F;
  let recordLow = temps.almanac.temp_low.record.F;
  $('#test7').text(`Average: ${avgHigh} <--> ${avgLow}
        Record: ${recordHigh} <--> ${recordLow}`);
}

function showAlert(data){
  if(data.alerts[0] == undefined){
    $("#alerts").text("No Weather Alerts In Your Area")
  }else{
    let alert = data.alerts[0].message
    $("#alerts").text(alert)
  }
}
