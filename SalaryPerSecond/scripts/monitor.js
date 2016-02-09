$(document).ready(function () {
    var initContainer = $("#initContainer");
    var summaryContainer = $("#summaryContainer");
    var btnGo = $("#btnGo");
    var txtSalary = $("#txtSalary");
    var txtPerWeek = $("#txtPerWeek");
    var txtPerDay = $("#txtPerDay");
    var txtPerHour = $("#txtPerHour");
    var txtPerMinute = $("#txtPerMinute");
    var txtPerSecond = $("#txtPerSecond");
    var txtAccruedSalary = $("#txtAccruedSalary");
    var btnReset = $("#btnReset");
    var salary = 0;
    var perWeek = 0;
    var perDay = 0;
    var perHour = 0;
    var perMinute = 0;
    var perSecond = 0;
    var counter = 1;
    var accruedSalary = 0;
    
    btnGo.click(function () {
		if (txtSalary.val() == "") {
			alert("Please enter a valid salary.");
		}
		if (txtSalary.val() != "") {
            salary = txtSalary.val();
            perWeek = (salary / 52);
            perDay = (perWeek / 5);
            perHour = (perDay / 8);
            perMinute = (perHour / 60);
            perSecond = (perMinute / 60);
            
            txtPerWeek.val(perWeek.toFixed(2));
            txtPerDay.val(perDay.toFixed(2));
            txtPerHour.val(perHour.toFixed(2));
            txtPerMinute.val(perMinute.toFixed(2));
            txtPerSecond.val(perSecond.toFixed(2));
            
			initContainer.fadeOut(function () {
				summaryContainer.fadeIn();
                calculateAccruedSalary();
			});
		}
	});

	btnReset.click(function () {
        txtSalary.val("");
        txtPerWeek.val("");
        txtPerHour.val("");
        txtPerMinute.val("");
        txtPerSecond.val("");
        txtAccruedSalary.val("");
        counter = 0;
		summaryContainer.fadeOut(function () {
			initContainer.fadeIn();
		});
	});
    
    function calculateAccruedSalary() {
        accruedSalary = perSecond * (counter/4);
        txtAccruedSalary.val(accruedSalary.toFixed(2));
        counter++
        setTimeout(calculateAccruedSalary, 250);
    }
});