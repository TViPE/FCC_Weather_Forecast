var app = angular.module("weatherForecast", []);

// app.factory("WeatherApi", function($http){
// 	var obj = {};
// 	obj.getCurrent = function(city_zipcode){
// 		var api = "https://api.openweathermap.org/data/2.5/forecast/daily?zip=";
// 		var units = "&units=metric";
// 		var appid = "&appid=fedb5f074f6b6256d41bb8cd72d8cc81";
// 		var cb = "&callback=JSON_CALLBACK";

// 		return $http.jsonp(api + city_zipcode + units+ appid + cb);
// 	};

// 	return obj;
// });

app.controller("weatherCtrl", function($scope, $http){
	
	
	$scope.getWeather = function(city_zipcode){
		var api = "http://api.openweathermap.org/data/2.5/forecast/daily?zip=";
		var units = "&units=metric";
		var appid = "&appid=fedb5f074f6b6256d41bb8cd72d8cc81";
		//var cb = "&callback=JSON_CALLBACK";
		var url = api + city_zipcode + units+ appid; //+ cb;
		$http.get(url).
		success(function(data){
			$scope.dataArray = [];
			console.log(data);
			console.log(data.city);
			data.list.forEach(function(item){
				$scope.Data = {};
				$scope.Data.temp = item.temp.day;
				$scope.Data.minTemp = item.temp.min;
				$scope.Data.maxTemp = item.temp.max;
				$scope.Data.pressure = item.pressure;
				$scope.Data.humidity = item.humidity;
				$scope.Data.des = item.weather[0].description;
				$scope.Data.windSpeed = item.speed;
				$scope.dataArray.push($scope.Data);
			})
		}).
		error(function(data, status){
			console.log("Error " + status);
		})
	}
	// $scope.Data = {};
	// WeatherApi.getCurrent($scope.city_zipcode).success(function(data){
	// 	currentWeather(data);
	// });

	// function currentWeather(data){
	// 	$scope.dataArray = data.list;
	// 	$scope.dataArray.forEach(function(obj){
	// 		$scope.Data.temp = obj.temp.day;
	// 		$scope.Data.minTemp = obj.temp.min;
	// 		$scope.Data.maxTemp = obj.temp.max;
	// 		$scope.Data.pressure = obj.pressure;
	// 		$scope.Data.humidity = obj.humidity;
	// 		$scope.Data.des = obj.weather[0].description;
	// 		$scope.Data.windSpeed = obj.speed;

	// 		// May add conversion from C deg to F deg later
	// 	})
		


	// }
});