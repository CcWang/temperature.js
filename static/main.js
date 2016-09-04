
$(document).ready(function () {
// body...
	

	var month=['January','February','March',"April",'May','June'];

	var currentMon = month[2];
	var tempType = 'f';
	var week=['A','B','C','D','E'];
	var data=[];
	for (var i=0;i<31;i++){
		if(i%7==0){
			data.push(week[i/7]);
		}else{
			data.push(i)
		}
	};

  $('#container').highcharts({
      chart: {
          type: 'area',
          backgroundColor:'#2C4B5D',
          ploar:true,
          type:'area'
      },
      title: {
          text: 'Area Chart',
          align:'center',
          style:{
          	color:'white',
          	fontFamily: 'Raleway', 
          	
          },
      },
      xAxis: {
          allowDecimals: false,
  				categories:data,
  				labels:{
  					style:{
  						color:'white'
  					},
  					y:-10,
  					x:5
  				},
  				gridLineWidth:1,
  				gridLineColor:'#456376',
  				tickPositions:[0,7,14,21,28],
  				tickWidth:0,
  				endOnTick:true,
          minorGridLineWidth: 0,
          lineColor: 'transparent',

      },
      yAxis: {
      	allowDecimals:true,
          title: {
              text: 'Temperature (˚' + tempType.toUpperCase() +')'
          },
          labels: {
              formatter: function () {
              		if(this.value !==0){

	                  return this.value;
              		}
              },
              align:'left',
              x:5,
              style:{
              	color:'#9EB6C9'
              }

          },
          gridLineColor:'transparent',
  

      },
      plotOptions: {
          areaspline: {
              marker: {
                  enabled: false,
                  
                  states: {
                      hover: {
                          enabled: true
                      }
                  }
              }
          }
      },
      series: [{
          name: '2015',
          data: [],
          color:'rgba(152, 97, 143,0.8)',
          opacity:0.5,
          type:'areaspline'
      }, {
          name: '2016',
          data:[],
          color:'rgba(106, 124, 185,0.8)',
          type:'areaspline'
      }],
      credits:{
      	enabled:false
      },
      exporting:{
      	buttons:{
      		exportButton:{
      			enabled:false
      		},
      		contextButton:{
      			enabled:false
      		},
      		printButton:{
      			enabled:false
      		}
      	}
      }
  });
  chart = $('#container').highcharts();

  var setSeries = function(current){
  	$.getJSON('https://raw.githubusercontent.com/CcWang/datas/master/temp.json#',function(data){
			 chart.series[0].update({
			 		data:data[current]['2015'][tempType]
			 });
			 chart.series[1].update({
			 		data:data[current]['2016'][tempType]
			 });
		});
  };
  setSeries(3);

  $('#pre').click(function(){
		var current = month.indexOf(currentMon);
		if(current >0){
			current -=1;
			currentMon = month[current];
		}else{
			current=month.length-1;
			currentMon=month[current];
		}
	$('#arrows h2').text(currentMon + ' 2016')
		setSeries(current+1);
	});

	$('#next').click(function(){
		var current = month.indexOf(currentMon);
		var l = month.length;
		if(current < l-1){
			current +=1;
			currentMon = month[current];
			
		}else{
			current=0;
			currentMon=month[0]
		}
		$('#arrows h2').text(currentMon + ' 2016')
		setSeries(current+1);
	});
	$('#toggleC').click(function(){
		if (tempType === 'c'){
			tempType = 'f'
		}else if(tempType ==='f'){
			tempType = 'c'
		}
		setSeries(month.indexOf(currentMon)+1);
		chart.yAxis[0].axisTitle.attr({
			text: 'Temperature (˚' + tempType.toUpperCase() +')'
		});  
	});

})