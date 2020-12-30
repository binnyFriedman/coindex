$(document).ready(function(){
    if ( $('#topper-line').length ){
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const topper_line_stats =  document.querySelectorAll("#topper-line .infos .item");
        fetch("https://api.coinpaprika.com/v1/global",requestOptions).then(result=>result.json()).then(marketGlobal=>{
            topper_line_stats[1].querySelector('.data').innerHTML = accounting.formatMoney(marketGlobal.market_cap_usd);

        })
        fetch("https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/today/",requestOptions).then(result=>result.json()).then(bitCoinMarket=>{
            topper_line_stats[2].querySelector('.data').innerHTML = accounting.formatMoney(bitCoinMarket[0].market_cap);

        })
        fetch("https://api.coinpaprika.com/v1/coins/ltc-litecoin/ohlcv/today/",requestOptions).then(result=>result.json()).then(bitCoinMarket=>{
            topper_line_stats[3].querySelector('.data').innerHTML = accounting.formatMoney(bitCoinMarket[0].market_cap);

        })
        fetch("https://api.coinpaprika.com/v1/tickers/btc-bitcoin",requestOptions).then(result=>result.json()).then(bitCoinMarket=>{
            topper_line_stats[4].querySelector('.data').innerHTML = accounting.formatMoney(bitCoinMarket.quotes.USD.price);

        })

    }

});