(function(window, document, undefined){
    document.addEventListener("DOMContentLoaded", function(){
        init()
    });
    function init(){


        var plug = document.getElementById("coindex-vidjet");
        if ( plug != null ){
            plug.innerHTML += '<div class="last-row"><a href="https://www.coindex.co.il/" target="_blank">Powered by coindex</a></div>';
            var steak = plug.querySelectorAll("div");

            for ( var i=0; i < steak.length; i++ ){

                if ( steak[i].getAttribute("id")!= null ) {
                    getDataFromApi(steak[i].getAttribute("id"), steak[i]);
                }
            }

            var divNode = document.createElement("div");
            divNode.innerHTML = '<style> ' +
                '#coindex-vidjet{ /*background-image: url(https://www.coindex.co.il/logo-ico.png);background-position: 98% 5px; background-size: 20px; background-repeat: no-repeat;*/ width: 340px; max-width: 100%; border-radius: 0px; border: 1px solid #D2D2D2; box-sizing: content-box; }   ' +
                '#coindex-vidjet * { direction: ltr; box-sizing: border-box; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;}        ' +
                '#coindex-vidjet table{width: 100%;}        ' +
                '#coindex-vidjet table td{ vertical-align: middle; padding: 10px;  }        ' +
                '#coindex-vidjet table td:first-child{text-align: center; width: 33%;}        ' +
                '#coindex-vidjet table tr:nth-child(1) td{ padding-bottom: 20px; padding-top: 20px;}        ' +
                '#coindex-vidjet table tr:nth-child(2) td{border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;}        ' +
                '#coindex-vidjet table tr:nth-child(2) td{border-left: 1px solid #ccc; text-align: center; }        ' +
                '#coindex-vidjet table tr:nth-child(2) td:nth-child(1){border-left: none;}        ' +
                '#coindex-vidjet .botter{ text-align: start; padding-top: 10px;}   ' +
                '#coindex-vidjet .name { text-align: start;}     ' +
                '#coindex-vidjet .name a{display: inline-block; text-align: start; text-transform: capitalize;  text-decoration: none; color: #000; font-size: 24px;}        ' +
                '#coindex-vidjet .botter .price{display: inline-block; text-align: start; margin-right: 5px; font-size: 20px; font-weight: 400;  color: #000; }        ' +
                '#coindex-vidjet .botter .percent{display: inline-block;  font-size: 20px; font-weight: 400; color: #000; }        ' +
                '#coindex-vidjet .botter .percent.down{color: #C42424;}        ' +
                '#coindex-vidjet .botter .percent.up{color: #27AE60;}        ' +
                '#coindex-vidjet .named{padding-bottom: 10px; font-size: 14px; text-transform: uppercase; font-weight: 300;  color: #000; }        ' +
                '#coindex-vidjet .val{font-size: 16px; font-weight: 400; color: #000;}        ' +
                '#coindex-vidjet .last-row{padding: 5px 10px; text-align: center;}        ' +
                '#coindex-vidjet .last-row a{text-decoration: none; font-size: 12px; font-weight: 400;color:#000 ; }' +
                '</style>';
            document.body.appendChild(divNode);
        }
    }


    function getDataFromApi(name , conteiner ) {
        const baseUrl = "https://api.coinpaprika.com/v1/";

        fetch(baseUrl +"tickers/"+ name )
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var classData = '';
                var priceData = data.quotes.USD;
                if ( priceData.market_cap_change_24h > 0 ){
                    classData = 'up';
                } else {
                    classData = 'down';
                }
                var coin = '<table cellspacing="0">'+
                    '<tr>'+
                    '<td>'+
                    '<img src="https://static.coincap.io/assets/icons/'+ data.symbol.toLowerCase() +'@2x.png" alt="">'+
                    '</td>'+
                    '<td colspan="2">'+
                    '<div class="topper">'+
                    '<div class="name">'+
                    '<a href="https://www.coindex.co.il/'+ data.id.toLowerCase() +'/" target="_blank">'+
                    data.name + ' &nbsp(' + data.id +  ')</a>'+
                    '</div>'+
                    '</div>'+
                    '<div class="botter">'+
                    '<div class="price">$ '+ (Math.round(priceData.price*1000) / 1000) +' </div>'+
                    '<div class="percent ' + classData +'">('+ priceData.market_cap_change_24h +'%)</div>'+
                    '</div>'+
                    '</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>'+
                    '<div class="named">דרוג</div>'+
                    '<div class="val">'+ data.rank +'</div>'+
                    '</td>'+
                    '<td>'+
                    '<div class="named">שווי שוק</div>'+
                    '<div class="val"> $'+ correctionToPresent(priceData.market_cap) +'</div>'+
                    '</td>'+
                    '<td>'+
                    '<div class="named">מחזור 24ש</div>'+
                    '<div class="val"> $'+ correctionToPresent(priceData.volume_24h) + '</div>'+
                    '</td>'+
                    '</tr>'+
                    '</table>';
                conteiner.innerHTML = coin;
            })
            .catch( );
    }

    function correctionToPresent( numberos ) {

        var curr = Math.round( numberos);
        var lenSlice = curr.toString().length ;

        var bigger = '';

        if ( Math.floor(lenSlice/3) == 1 ){

            bigger = '';

        } else if(Math.floor(lenSlice/3) == 2 ){

            bigger = 'T';

        }else if(Math.floor(lenSlice/3) == 3 ){

            bigger = 'M';

        }else if(Math.floor(lenSlice/3) == 4 ){

            bigger = 'B';

        }else if(Math.floor(lenSlice/3) == 5 ){

            bigger = 'B+';

        }

        var slicer = Math.pow( 10 , lenSlice - (3 - lenSlice % 3 ) );
        return  Math.round(10*curr/ slicer )/10 + ' ' + bigger ;

    }

})(window, document, undefined);