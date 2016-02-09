$(function(){
    var initContainer = $('#initContainer');
    var btnCalculate = $('#btnCalculate');
    var canvasContainer = $('#canvasContainer');
    var myCanvas = $("#myCanvas")[0];
    var ctx = myCanvas.getContext("2d");
    var btnReset = $('#btnReset');
    
    //Create instance of object collection and add objects    
    var vehicleCollection = new VehicleCollection([
        new Vehicle({index: 0, year: 2014, make: 'Ford', model: 'Fiesta ST', selected: true}),
        new Vehicle({index: 1, year: 2012, make: 'Ford', model: 'Focus SEL'})
    ]);
    
    var storageZoneCollection = new StorageZoneCollection([
        new StorageZone({index: 0, a: 38, b: 14, c: 0, title: 'Trunk', selected: true}),
        new StorageZone({index: 1, a: 12, b: 30, c: 0, title: 'Front passenger seat'}),
        new StorageZone({index: 2, a: 38, b: 55, c: 0, title: 'Trunk with both rear seats folded'})       
    ]);
    
    var newPackage = new Package();
    
    var vehicleList = new VehicleListView({ el: $('#vehicleContainer'), model: vehicleCollection });
    vehicleList.render();
    
    var storageZoneList = new StorageZoneListView({ el: $('#storageZoneContainer'), model: storageZoneCollection });
    storageZoneList.render();
    
    var packageView = new PackageView({ el: $('#inputContainer'), model: newPackage });
    packageView.render();
    
    btnCalculate.click(function(){
        BuildCanvas()
        /*console.log('Currently selected vehicle: ' + vehicles.selectedIndex);
        console.log('Currently selected storage zone: ' + storageZones.selectedIndex);
        console.log('Package dimensions: ' + newPackage.get('width') + ' by ' + newPackage.get('length'));*/
        
        initContainer.fadeOut(function () {
            canvasContainer.fadeIn();
        });
    });
    
    btnReset.click(function () {
        vehicleList.setSelectedOption(0);
        storageZoneList.setSelectedOption(0);
        packageView.changeDOMWidth(0);
        packageView.changeDOMLength(0);
		ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        
		canvasContainer.fadeOut(function () {
			initContainer.fadeIn();
		});
	});
    
    function BuildCanvas() {
        var dimScale = 10;
        
        //Get storage zone variables
        var selectedStorageZone = storageZoneList.getSelectedStorageZone();
        //console.log(selectedStorageZone.get('index'));
        var szA = selectedStorageZone.get('a');
        var szB = selectedStorageZone.get('b');
        var szC = selectedStorageZone.get('c');
        var szAR = selectedStorageZone.aspectRatio();
        //console.log(szA + " " + szB + " " + szC + " " + szAR);
        
        //Get package variables
        var currentPackage = packageView.getPackage()
        var pW = currentPackage.get('width');
        var pL = currentPackage.get('length');
        var pH = currentPackage.get('height');
        var pAR = currentPackage.aspectRatio();
        //console.log(pW + " " + pL + " " + pH + " " + pAR);
        
        //Normalize package dimensions to storage zone
        if (szAR > 1) {
            if (pAR < 1) {
                //console.log("Package aspect ratios are different");
                currentPackage.set('width', pL);
                currentPackage.set('length', pW);
            }
        }
        else {
            if (pAR > 1) {
                //console.log("Package aspect ratios are different");
                currentPackage.set('width', pL);
                currentPackage.set('length', pW);
            }
        }
        
        //Refresh package variables
        pW = currentPackage.get('width');
        pL = currentPackage.get('length');
        pH = currentPackage.get('height');
        pAR = currentPackage.get('aspectRatio');
        
        var hardMaths = (2*pW*pL*szA + (Math.pow(pW, 2) - Math.pow(pL, 2)) * Math.sqrt(Math.pow(pW, 2) + Math.pow(pL, 2) - Math.pow(szA, 2)))/(Math.pow(pW, 2) + Math.pow(pL, 2));
        var flagRotated = false;
        
        if ((pW <= szA) && (pL <= szB)) {
            WriteMessage("It will fit!", 1);
        }
        else {
            if (pW > szA) {
                if (szB >= hardMaths) {
                    WriteMessage("It will fit when rotated!", 1);
                    flagRotated = true;
                }
                else {
                    WriteMessage("It won't fit.", 0);
                }
            }
            else {
                WriteMessage("It won't fit", 0);
            }
        }
        
        //var windowHeight = window.innerHeight;
        //var setCanvasHeight = (.8) * windowHeight;
        var setCanvasHeight = Math.max(szB * dimScale, pL * dimScale);
        var canvasContainerWidth = canvasContainer.width();
        //var windowWidth = window.innerWidth;
        ctx.canvas.height = setCanvasHeight;
        ctx.canvas.width = canvasContainerWidth;

        //Center canvas cursor on X axis
        var centerX = myCanvas.width / 2;
        //ctx.translate(0.5, 0.5);	//Can't use - affects resetting canvas
        ctx.moveTo(0,0);
        //Draw storage zone
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(centerX - (.5 * szA * dimScale), 0, szA * dimScale, szB * dimScale);
        //Draw package
        ctx.fillStyle = "#CB9D6C";
        ctx.fillRect(centerX - (.5 * pW * dimScale), 0, pW * dimScale, pL * dimScale);
    }
    
    function WriteMessage(messageText, messageTypeId) {
        var message = $("#message");
        var output = "";
        if (messageTypeId == 1) {
            output = "\u2714"; //Unicode checkmark
        }
        else if (messageTypeId == 0) {
            output = "\u2718"; //Unicode error 'x'
        }
        message.text(output + " " + messageText);
    }
    
    function BuildCanvasForStorageZone(storageZoneId) {
        var selectedStorageZone = storageZoneList[storageZoneId];
        var a = selectedStorageZone.get('a');
        var b = selectedStorageZone.get('b');
        var newPackage = new Package(txtWidth.val(), txtHeight.val());
        if (selectedStorageZone.aspectRatio > 1) {
            if (newPackage.aspectRatio < 1) {
                newPackage = new Package(txtHeight.val(), txtWidth.val());
            }
        }
        else {
            if (newPackage.aspectRatio > 1) {
                newPackage = new Package(txtHeight.val(), txtWidth.val());
            }
        }
        var p = newPackage.p;
        var q = newPackage.q;
        var hardMaths = (2*p*q*a + (Math.pow(p, 2) - Math.pow(q, 2)) * Math.sqrt(Math.pow(p, 2) + Math.pow(q, 2) - Math.pow(a, 2)))/(Math.pow(p, 2) + Math.pow(q, 2));

        if ((p <= a) && (q <= b)) {
            WriteMessage("It will fit!", 1);
        }
        else {
            if (p > a) {
                if (b >= hardMaths) {
                    WriteMessage("It will fit when rotated!", 1);
                    flagRotate = true;
                }
                else {
                    WriteMessage("It won't fit.", 0);
                }
            }
            else {
                WriteMessage("It won't fit", 0);
            }
        }

        //Set dimensions of canvas
        var windowHeight = window.innerHeight;
        var setCanvasHeight = (.8) * windowHeight;
        //var canvasContainerWidth = canvasContainer.width();
        var windowWidth = window.innerWidth;
        var setCanvasWidth = windowWidth;
        ctx.canvas.height = setCanvasHeight;
        ctx.canvas.width = setCanvasWidth;

        //Center canvas cursor on X axis
        var centerX = myCanvas.width / 2;
        //ctx.translate(0.5, 0.5);	//Can't use - affects resetting canvas
        ctx.moveTo(0,0);
        DrawStorageZone("#000000", centerX - (.5 * selectedStorageZone.a), 0, selectedStorageZone.a, selectedStorageZone.b);
        DrawPackage("#836446", centerX - (.5 * newPackage.p), 0, newPackage.p, newPackage.q);
    }
});