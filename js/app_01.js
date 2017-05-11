var app = angular.module("weatherForecast", ['chart.js']);
app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
    	colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      	chartColors: [, '#FF8A80'],
      	responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      	showLines: true
    });
}]);

app.controller("weatherCtrl", function($scope, $http){
	$scope.myVar = false;
	$scope.error = false;
	$scope.getWeather = function(city_zipcode){
		
		var api = "http://api.openweathermap.org/data/2.5/forecast/daily?zip=";
		var units = "&units=imperial";
		var appid = "&appid=fedb5f074f6b6256d41bb8cd72d8cc81";
		//var cb = "&callback=JSON_CALLBACK";
		var url = api + city_zipcode + units+ appid; //+ cb;
		$http.get(url).
		success(function(data){
			$scope.error = false;
			$scope.myVar = true;
			$scope.dataArray = [];
			var date = new Date();
			//yesterday
			date = new Date(date.getTime() - (1000*60*60*24));

			data.list.forEach(function (item){	
				$scope.Data = {};
				$scope.Data.date = date;
				$scope.Data.temp = item.temp.day;
				$scope.Data.minTemp = item.temp.min;
				$scope.Data.maxTemp = item.temp.max;
				$scope.Data.pressure = item.pressure;
				$scope.Data.humidity = item.humidity;
				$scope.Data.des = item.weather[0].description;
				$scope.Data.windSpeed = item.speed;
				$scope.dataArray.push($scope.Data);


				// Increase date by one
				date = new Date(date.getTime() + (1000*60*60*24));
			});

			$scope.labels = [];
			$scope.data = [[]];
			$scope.dataArray.forEach(function (obj){
				var month = obj.date.getUTCMonth() + 1;
				var day = obj.date.getUTCDate() - 1 ;
				var newdate = month + "/" + day;
				$scope.labels.push(newdate);
				$scope.data[0].push(obj.temp);
			});
			$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
			$scope.options = {
			    scales: {
			    	yAxes: [
			        	{
			          		id: 'y-axis-1',
			          		type: 'linear',
			          		display: true,
			          		position: 'left'
			        	}
			      	]
			    }
			};

			$scope.city_zipcode = "";
		}).
		error(function(data, status, statusText){
			$scope.myVar = false;
			$scope.error = true;
			console.log("Error " + status);
			console.log("Error " + statusText);
			$scope.errorMessage = "Error " + status;
		});
	}
});