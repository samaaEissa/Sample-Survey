
$.ajax({
	type : 'GET',
	url : "/admin/Statistics/allRegionsCellularAverageSamples",
	success : function(response) {
		if (response.resultCode == 200) {			
			var regions = []
			for (i = 0; i < response.data.length; i++)
				 regions.push(response.data[i].region)
			for (i = 0; i < response.data.length; i++)	
				$("#ddlregion").append($("<option     />").val(response.data[i].region).text(response.data[i].region));
			
			var vodafoneData=[]
			var etisalatData=[]
			var orangeData=[]
			var weData=[]
			for (i = 0; i < response.data.length; i++) {
				vodafoneData.push(response.data[i].cellular_samples_vodafone_total)
				etisalatData.push(response.data[i].cellular_samples_etisalat_total)
				orangeData.push(response.data[i].cellular_samples_orange_total)
				weData.push(response.data[i].cellular_samples_we_total)
			}			
			var areaChartData = {
				labels : regions,
				datasets : [ {
					label : 'Etisalat',
					backgroundColor : '#008000',
					borderColor : 'rgba(60,141,188,0.8)',
					pointRadius : false,
					pointColor : '#3b8bba',
					pointStrokeColor : 'rgba(60,141,188,1)',
					pointHighlightFill : '#fff',
					pointHighlightStroke : 'rgba(60,141,188,1)',
					data : etisalatData
				}, {
					label : 'Vodafone',
					backgroundColor : '#FF0000',
					borderColor : 'rgba(210, 214, 222, 1)',
					pointRadius : false,
					pointColor : 'rgba(210, 214, 222, 1)',
					pointStrokeColor : '#c1c7d1',
					pointHighlightFill : '#fff',
					pointHighlightStroke : 'rgba(220,220,220,1)',
					data : vodafoneData
				}, {
					label : 'Orange',
					backgroundColor : '#f39c12',
					borderColor : 'rgba(210, 214, 222, 1)',
					pointRadius : false,
					pointColor : 'rgba(210, 214, 222, 1)',
					pointStrokeColor : '#c1c7d1',
					pointHighlightFill : '#fff',
					pointHighlightStroke : 'rgba(220,220,220,1)',
					data : orangeData
				}, {
					label : 'WE',
					backgroundColor : '#8B008B',
					borderColor : 'rgba(210, 214, 222, 1)',
					pointRadius : false,
					pointColor : 'rgba(210, 214, 222, 1)',
					pointStrokeColor : '#c1c7d1',
					pointHighlightFill : '#fff',
					pointHighlightStroke : 'rgba(220,220,220,1)',
					data : weData
				}, ]
			}
			// - BAR CHART -
			// -------------
			var barChartCanvas = $('#allRegionsAverageSamplesbarChart').get(0).getContext('2d')
			var barChartData = jQuery.extend(true, {}, areaChartData)
			var temp0 = areaChartData.datasets[0]
			var temp1 = areaChartData.datasets[1]
			barChartData.datasets[0] = temp1
			barChartData.datasets[1] = temp0

			var barChartOptions = {
				responsive : true,
				maintainAspectRatio : false,
				datasetFill : false
			}

			var barChart = new Chart(barChartCanvas, {
				type : 'bar',
				data : barChartData,
				options : barChartOptions
			})
		}
	}
});
//-------------------------------------------------------------------------------------------------
$('#ddlregion').change(function() {
	var selectedregion=$(this).val();
	if(selectedregion=="0")
		return ;
	$('cellularSamplesPerRegionCardTitle').text("Cellular Samples Per Region - " + selectedregion )
	$.get('/admin/Statistics/cellularSamplesPerRegion/'+selectedregion, function (response) {
    if (response.resultCode == 200 && response.data != null) {       
       var cities = []
		for (i = 0; i < response.data.length; i++)
			cities.push(response.data[i].city)
		var vodafoneData=[]
		var etisalatData=[]
		var orangeData=[]
		var weData=[]
		for (i = 0; i < response.data.length; i++) {
			vodafoneData.push(response.data[i].cellular_samples_vodafone)
			etisalatData.push(response.data[i].cellular_samples_etisalat)
			orangeData.push(response.data[i].cellular_samples_orange)
			weData.push(response.data[i].cellular_samples_we)
		}			
		var areaChartData = {
			labels : cities,
			datasets : [ {
				label : 'Etisalat',
				backgroundColor : '#008000',
				borderColor : 'rgba(60,141,188,0.8)',
				pointRadius : false,
				pointColor : '#3b8bba',
				pointStrokeColor : 'rgba(60,141,188,1)',
				pointHighlightFill : '#fff',
				pointHighlightStroke : 'rgba(60,141,188,1)',
				data : etisalatData
			}, {
				label : 'Vodafone',
				backgroundColor : '#FF0000',
				borderColor : 'rgba(210, 214, 222, 1)',
				pointRadius : false,
				pointColor : 'rgba(210, 214, 222, 1)',
				pointStrokeColor : '#c1c7d1',
				pointHighlightFill : '#fff',
				pointHighlightStroke : 'rgba(220,220,220,1)',
				data : vodafoneData
			}, {
				label : 'Orange',
				backgroundColor : '#f39c12',
				borderColor : 'rgba(210, 214, 222, 1)',
				pointRadius : false,
				pointColor : 'rgba(210, 214, 222, 1)',
				pointStrokeColor : '#c1c7d1',
				pointHighlightFill : '#fff',
				pointHighlightStroke : 'rgba(220,220,220,1)',
				data : orangeData
			}, {
				label : 'WE',
				backgroundColor : '#8B008B',
				borderColor : 'rgba(210, 214, 222, 1)',
				pointRadius : false,
				pointColor : 'rgba(210, 214, 222, 1)',
				pointStrokeColor : '#c1c7d1',
				pointHighlightFill : '#fff',
				pointHighlightStroke : 'rgba(220,220,220,1)',
				data : weData
			}, ]
		}
		// - BAR CHART -
		// -------------
		var barChartCanvas = $('#samplesPerRegionbarChart').get(0).getContext('2d')
		var barChartData = jQuery.extend(true, {}, areaChartData)
		var temp0 = areaChartData.datasets[0]
		var temp1 = areaChartData.datasets[1]
		barChartData.datasets[0] = temp1
		barChartData.datasets[1] = temp0

		var barChartOptions = {
			responsive : true,
			maintainAspectRatio : false,
			datasetFill : false
		}

		var barChart = new Chart(barChartCanvas, {
			type : 'bar',
			data : barChartData,
			options : barChartOptions
		})
	}

});

});

//--------------------------------------------------------------------------------------------------------

$.ajax({
	type : 'GET',
	url : "/admin/Statistics/allRegionsCellularAverageDownloadSpeed",
	success : function(response) {
		if (response.resultCode == 200) {			
			var regions = []
			for (i = 0; i < response.data.length; i++)
				 regions.push(response.data[i].region)		
			var vodafoneData=[]
			var etisalatData=[]
			var orangeData=[]
			var weData=[]
			for (i = 0; i < response.data.length; i++) {
				vodafoneData.push(response.data[i].cellular_download_speed_vodafone_avg)
				etisalatData.push(response.data[i].cellular_download_speed_etisalat_avg)
				orangeData.push(response.data[i].cellular_download_speed_orange_avg)
				weData.push(response.data[i].cellular_download_speed_we_avg)
			}			
			var areaChartData = {
				labels : regions,
				datasets : [ {
					label : 'Etisalat',
					backgroundColor : '#008000',
					borderColor : 'rgba(60,141,188,0.8)',
					pointRadius : false,
					pointColor : '#3b8bba',
					pointStrokeColor : 'rgba(60,141,188,1)',
					pointHighlightFill : '#fff',
					pointHighlightStroke : 'rgba(60,141,188,1)',
					data : etisalatData
				}, {
					label : 'Vodafone',
					backgroundColor : '#FF0000',
					borderColor : 'rgba(210, 214, 222, 1)',
					pointRadius : false,
					pointColor : 'rgba(210, 214, 222, 1)',
					pointStrokeColor : '#c1c7d1',
					pointHighlightFill : '#fff',
					pointHighlightStroke : 'rgba(220,220,220,1)',
					data : vodafoneData
				}, {
					label : 'Orange',
					backgroundColor : '#f39c12',
					borderColor : 'rgba(210, 214, 222, 1)',
					pointRadius : false,
					pointColor : 'rgba(210, 214, 222, 1)',
					pointStrokeColor : '#c1c7d1',
					pointHighlightFill : '#fff',
					pointHighlightStroke : 'rgba(220,220,220,1)',
					data : orangeData
				}, {
					label : 'WE',
					backgroundColor : '#8B008B',
					borderColor : 'rgba(210, 214, 222, 1)',
					pointRadius : false,
					pointColor : 'rgba(210, 214, 222, 1)',
					pointStrokeColor : '#c1c7d1',
					pointHighlightFill : '#fff',
					pointHighlightStroke : 'rgba(220,220,220,1)',
					data : weData
				}, ]
			}
			// - BAR CHART -
			// -------------
			var barChartCanvas = $('#allRegionsDownloadspeedbarChart').get(0).getContext('2d')
			var barChartData = jQuery.extend(true, {}, areaChartData)
			var temp0 = areaChartData.datasets[0]
			var temp1 = areaChartData.datasets[1]
			barChartData.datasets[0] = temp1
			barChartData.datasets[1] = temp0

			var barChartOptions = {
				responsive : true,
				maintainAspectRatio : false,
				datasetFill : false
			}

			var barChart = new Chart(barChartCanvas, {
				type : 'bar',
				data : barChartData,
				options : barChartOptions,			    
			})
		}
	}
});
//------------------------------------------------------------------------------------------------
$('#ddlregion').change(function() {
	var selectedregion=$(this).val();
	if(selectedregion=="0")
		return ;
	$('#cellularDownloadSpeedPerRegionCardTitle').text("Cellular Download Speed Per Region - " + selectedregion )
	$.get('/admin/Statistics/cellularDownloadSpeedPerRegion/'+selectedregion, function (response) {
    if (response.resultCode == 200 && response.data != null) {      
       var cities = []
		for (i = 0; i < response.data.length; i++)
		{
		    var city=response.data[i].city;			  
			cities.push(city)
		}
		var vodafoneData=[]
		var etisalatData=[]
		var orangeData=[]
		var weData=[]
		for (i = 0; i < response.data.length; i++) {
			vodafoneData.push(response.data[i].cellular_download_speed_vodafone)
			etisalatData.push(response.data[i].cellular_download_speed_etisalat)
			orangeData.push(response.data[i].cellular_download_speed_orange)
			weData.push(response.data[i].cellular_download_speed_we)
		}			
		var areaChartData = {
			labels : cities,
			datasets : [ {
				label : 'Etisalat',
				backgroundColor : '#008000',
				borderColor : 'rgba(60,141,188,0.8)',
				pointRadius : false,
				pointColor : '#3b8bba',
				pointStrokeColor : 'rgba(60,141,188,1)',
				pointHighlightFill : '#fff',
				pointHighlightStroke : 'rgba(60,141,188,1)',
				data : etisalatData
			}, {
				label : 'Vodafone',
				backgroundColor : '#FF0000',
				borderColor : 'rgba(210, 214, 222, 1)',
				pointRadius : false,
				pointColor : 'rgba(210, 214, 222, 1)',
				pointStrokeColor : '#c1c7d1',
				pointHighlightFill : '#fff',
				pointHighlightStroke : 'rgba(220,220,220,1)',
				data : vodafoneData
			}, {
				label : 'Orange',
				backgroundColor : '#f39c12',
				borderColor : 'rgba(210, 214, 222, 1)',
				pointRadius : false,
				pointColor : 'rgba(210, 214, 222, 1)',
				pointStrokeColor : '#c1c7d1',
				pointHighlightFill : '#fff',
				pointHighlightStroke : 'rgba(220,220,220,1)',
				data : orangeData
			}, {
				label : 'WE',
				backgroundColor : '#8B008B',
				borderColor : 'rgba(210, 214, 222, 1)',
				pointRadius : false,
				pointColor : 'rgba(210, 214, 222, 1)',
				pointStrokeColor : '#c1c7d1',
				pointHighlightFill : '#fff',
				pointHighlightStroke : 'rgba(220,220,220,1)',
				data : weData
			}, ]
		}
		// - BAR CHART -
		// -------------
		var barChartCanvas = $('#cellularDownloadSpeedPerRegionbarChart').get(0).getContext('2d')
		var barChartData = jQuery.extend(true, {}, areaChartData)
		var temp0 = areaChartData.datasets[0]
		var temp1 = areaChartData.datasets[1]
		barChartData.datasets[0] = temp1
		barChartData.datasets[1] = temp0

		var barChartOptions = {
			responsive : true,
			maintainAspectRatio : false,
			datasetFill : false
		}

		var barChart = new Chart(barChartCanvas, {
			type : 'bar',
			data : barChartData,
			options : barChartOptions
		})
	}

});

});
//------------------------------------------------------------------------------------------------
$('#downloadPdf').click(function(event) {
	  // get size of report page
	  var reportPageHeight = $('#reportPage').innerHeight();
	  var reportPageWidth = $('#reportPage').innerWidth();
	  
	  // create a new canvas object that we will populate with all other canvas objects
	  var pdfCanvas = $('<canvas />').attr({
	    id: "canvaspdf",
	    width: reportPageWidth,
	    height: reportPageHeight
	  });
	  
	  // keep track canvas position
	  var pdfctx = $(pdfCanvas)[0].getContext('2d');
	  var pdfctxX = 0;
	  var pdfctxY = 0;
	  var buffer = 100;
	  
	  // for each chart.js chart
	  $("canvas").each(function(index) {
	    // get the chart height/width
	    var canvasHeight = $(this).innerHeight();
	    var canvasWidth = $(this).innerWidth();
	    
	    // draw the chart into the new canvas
	    pdfctx.drawImage($(this)[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
	    pdfctxX += canvasWidth + buffer;
	    
	    // our report page is in a grid pattern so replicate that in the new canvas
	    if (index % 2 === 1) {
	      pdfctxX = 0;
	      pdfctxY += canvasHeight + buffer;
	    }
	  });
	  
	  // create new pdf and add our new canvas as an image
	  var pdf = new jsPDF('l', 'pt', [reportPageWidth, reportPageHeight]);
	  pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);
	  
	  // download the pdf
	  pdf.save('filename.pdf');
	});
