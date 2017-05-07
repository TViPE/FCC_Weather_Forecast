var app = angular.module("weatherForecast",[]);

app.factory('WeatherApi', function($http){
	var obj = {};
	obj.getLoc = function(){
		return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
	};
	obj.getCurrent = function(city){
		var api = "http://api.openweathermap.org/data/2.5/weather?q=";
		var units = "&units=metric";
		var appid = "&APPID=fedb5f074f6b6256d41bb8cd72d8cc81";
		var cb = "&callback=JSON_CALLBACK";

		return $http.jsonp(api + city + units+ appid + cb);

	};
	return obj;
});

app.controller('weatherCtrl', function($scope, WeatherApi){
	$scope.Data = {};
	$scope.Data.unit = 'C';
	// WeatherApi.getLoc().success(function(data){
	// 	$scope.Data.city = data.city;
	// 	$scope.Data.region = data.region;
	// 	$scope.Data.country = data.country;
	// 	$scope.Data.postal = data.postal;
	// 	WeatherApi.getCurrent(city).success(function(data){
	// 		CurrentWeather(data);
	// 	});
	// });
	
	WeatherApi.getCurrent($scope.Data.zipcode).success(function(data){
		CurrentWeather(data);
	});
	function CurrentWeather(data) {
		$scope.Data.tempInC =  Math.round(data.main.temp);
		$scope.Data.pressure = data.main.pressure;
		$scope.Data.humidity = data.main.humidity;
		$scope.Data.temp_min = data.main.temp_min;
		$scope.Data.temp_max = data.main.temp_max;
		$scope.Data.des = data.weather[0].main;
		$scope.Data.tempInF = Math.round($scope.Data.tempInC * 1.8) + 32;

		return IconGen($scope.Data.des);
	}

	function IconGen(city) {
		var city =  city.toLowerCase();
		switch(city) {
			case 'drizzle':
				addIcon(city);
				break;
			case 'clouds':
				addIcon(city);
				break;
			case 'rain':
				addIcon(city);
				break;
			case 'snow':
				addIcon(city);
				break;
			case 'clear':
				addIcon(city);
				break;
			case 'thunderstom':
				addIcon(city);
				break;
			default:
				break;
		}
	}
});