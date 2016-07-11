$(document).ready(function () {
	var months = {
		"Jan": 0,
		"Feb": 1,
		"Mar": 2,
		"Apr": 3,
		"May": 4,
		"Jun": 5,
		"Jul": 6,
		"Aug": 7,
		"Sept": 8,
		"Oct": 9,
		"Nov": 10,
		"Dec": 11
	};
	var timeframes = $(".timeframe");
	
	$.each(timeframes, function(index, value) {
		var dateStringArray = $(this).parent().text().split(" - ");
		var dateArray = [1];
		$.each(dateStringArray, function (index, value) {
			if (value.trim() != "Present") {
				var monthString = value.substr(0, value.indexOf(" "));
				var numericMonth = getNumericMonthFromString(monthString);
				var numericYear = value.substr(value.indexOf(" "), value.length);
				if (index > 0) {
					dateArray[index] = new Date(numericYear, numericMonth + 1, 1, 0, 0, 0, 0);
				}
				else {
					dateArray[index] = new Date(numericYear, numericMonth, 1, 0, 0, 0, 0);
				}
			}
			else {
				var today = new Date();
				today.setMonth(today.getMonth() + 1);
				dateArray[index] = today;
			}
		});
		var monthCount = monthDiff(dateArray[0], dateArray[1]);
		var finalDateString = getFinalDateString(monthCount);
		
		$(this).text("(" + finalDateString + ")");
	});
	
	function getNumericMonthFromString(monthString) {
		return months[monthString];
	}
	
	function monthDiff(d1, d2) {
		var months;
		months = (d2.getFullYear() - d1.getFullYear()) * 12;
		months -= d1.getMonth() + 1;
		months += d2.getMonth();
		return months <= 0 ? 0 : months;
	}
	
	function getFinalDateString(monthCount) {
		var years = Math.floor(monthCount / 12);
		var months = monthCount % 12;
		
		var monthDiffString = "";
		
		if (years > 0) {
			monthDiffString += years + " years";
		}
		if ((years > 0) && (months > 0)) {
			monthDiffString += " ";
		}
		if (months > 0) {
			monthDiffString += months + " months";
		}
		return monthDiffString;
	}
});