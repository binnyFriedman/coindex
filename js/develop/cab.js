function drowGraphInCabinet(){

    getDataIn = steakTime;
    var steak2 = [ ['Month', 'שווי תיק'] ];

    //console.log( getData.price.length );

    var today = new Date();
    var priorDate = new Date().setDate(today.getDate() - countsDays );
    var todayTime = Date.now();

    var clusterTime = ( todayTime - priorDate ) / getDataIn.length ;

    for( var i = 0; i < getDataIn.length - 3 ; i++ ){

        var summ = 0;
        getDataIn[i].forEach( (item) => {
            summ += item;
        })

        steak2[steak2.length] = [  new Date( priorDate + i * clusterTime ) ,  summ ];
    }

    //console.log( steak2 );

    var data2 =  google.visualization.arrayToDataTable( steak2 );

    var options = {
        chartArea:{left:0,top:0,width:'100%',height:'80%'},
        title: '',
        colors: ['#F76B1C'],
        backgroundColor: '#FFFFFF',
        hAxis: {
            titleTextStyle: {color: '#2f2f2f'},
            
        },
        vAxis: { fontSize: 60 },
        legend: {position: 'top'}
    };

    var chart2 = new google.visualization.AreaChart(document.getElementById('curve_chart_cab'));
    chart2.draw(data2, options);

}

var steakTime = [];
var date = '';
var countsDays = 1;



function getParams( item , date , index2 , counter  ){
    var urlGet = 'http://coincap.io/history'
    var dataGet;

    if ( date == '' ){
        urlGet += '/30day/'
    } else {
        urlGet += date;
    }

    urlGet += item;
    
    $.ajax({
        url : urlGet,
        method:'GET',
        success : function(data){

            (data.price).forEach((item, index) => {
                if ( steakTime[index] === undefined ){
                    steakTime[index] = [];
                }
                steakTime[index].push( counter * item[1] );
            });

            if ( steakTime[0].length == steakNames.length ){

                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback( drowGraphInCabinet  );
                //drowGraphInCabinet( steakTime );
            }
        }
    });

}

$(document).ready(function(){
    /* cab */

        if ( $('.cab-infos').length && steakNames.length > 0 ){

            steakNames.forEach( (item, index ) => {
                getParams( item, date ,  index , steakCounts[ index ] );
            });

        }

        $('.cab-infos .drowing .small-butt').on('click', function(e){
            e.preventDefault();
            var currPer = $(this).attr('href');

            if ( !$(this).hasClass('active') ){
                $('.drowing .small-butt').removeClass('active');
                $(this).addClass('active');

                if ( $(this).index() == 0 ){
                    countsDays = 1;
                }
                if ( $(this).index() == 1 ){
                    countsDays = 7;
                }
                if ( $(this).index() == 2 ){
                    countsDays = 30;
                }
                if ( $(this).index() == 3 ){
                    countsDays = 90;
                }
                if ( $(this).index() == 4 ){
                    countsDays = 180;
                }
                /*
                if ( $(this).index() == 5 ){
                    countsDays = 365;
                }
                */
            

                if ( steakNames.length > 0 ){
                    steakTime = [];
                    steakNames.forEach( (item, index ) => {
                        getParams( item, currPer ,  index , steakCounts[ index ] );
                    });
        
                }
            }

        })

    /* cab */
});