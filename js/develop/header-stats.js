window.availableCurrencies = [];
window.currentCurrency = {
    id:"USD",
    rate:"1",
    text:"USD",
    symbol:"$"
}
$(document).ready(function(){

    var currencies = {
        "ILS": {
            "symbol": "₪",
            "name": "Israeli New Sheqel",
            "symbol_native": "₪",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "ILS",
            "name_plural": "Israeli new sheqels"
        },
        "USD": {
            "symbol": "$",
            "name": "US Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "USD",
            "name_plural": "US dollars"
        },
        "EUR": {
            "symbol": "€",
            "name": "Euro",
            "symbol_native": "€",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "EUR",
            "name_plural": "euros"
        }
    };
    var headerStats = {};


    function formatState (state) {

        if (!state.id) {
            return state.text;
        }
        var $state = $(
            `<span>${state.symbol} </span>`
        );
        return $state;
    }
    function populateStats(){
        const topper_line_stats =  document.querySelectorAll("#topper-line .infos .item");
        const ctc = convertToCurrency;
        const symbol  = window.currentCurrency.symbol;
        topper_line_stats[1].querySelector('.data').innerHTML = accounting.formatMoney(ctc(headerStats.marketCap),symbol);
        topper_line_stats[2].querySelector('.data').innerHTML = accounting.formatMoney(ctc(headerStats.bitCoinMarketCap),symbol);
        topper_line_stats[3].querySelector('.data').innerHTML = accounting.formatMoney(ctc(headerStats.liteCoinCap),symbol);
        topper_line_stats[4].querySelector('.data').innerHTML = accounting.formatMoney(ctc(headerStats.bitcoinPrice),symbol);
    }

    function convertToCurrency(priceInUsd){
        return parseFloat(priceInUsd) * parseFloat(window.currentCurrency.rate);
    }
    if ( $('#topper-line').length ){

        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        // add btc and eth to currency base list.
        // so we first need to get currencies of ils and euro
         fetch("https://api.coinpaprika.com/v1/global",requestOptions).then(result=>result.json()).then(marketGlobal=>{
             headerStats.marketCap =  marketGlobal.market_cap_usd;
         })
        fetch("https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/today/",requestOptions).then(result=>result.json()).then(bitCoinMarket=>{
             headerStats.bitCoinMarketCap = bitCoinMarket[0].market_cap;
        })

         fetch("https://api.coinpaprika.com/v1/coins/ltc-litecoin/ohlcv/today/",requestOptions).then(result=>result.json()).then(liteCoinStats=>{
             headerStats.liteCoinCap = liteCoinStats[0].market_cap;
        })

        fetch("https://api.coinpaprika.com/v1/tickers/btc-bitcoin",requestOptions).then(result=>result.json()).then(bitCoinMarket=>{
            const  usdPrice =bitCoinMarket.quotes.USD.price;
            window.availableCurrencies.push({
                id:bitCoinMarket.symbol,
                rate:1/usdPrice,
                text:bitCoinMarket.name,
                symbol: bitCoinMarket.symbol,
                name:bitCoinMarket.name
            })

        headerStats.bitcoinPrice = usdPrice;
        }).then(()=>{

        fetch("https://api.coinpaprika.com/v1/tickers/eth-ethereum",requestOptions).then(result=>result.json()).then(ethCoin=>{
            const  usdPrice =ethCoin.quotes.USD.price;
            window.availableCurrencies.push({
                id:ethCoin.symbol,
                rate:1/usdPrice,
                text:ethCoin.name,
                symbol: ethCoin.symbol,
                name:ethCoin.name
            })
        headerStats.litecoinPrice = usdPrice;

        }).then(
            ()=>{
                fetch('https://api.ratesapi.io/api/latest?base=USD&symbols=EUR,ILS,USD',requestOptions).then(result=>result.json()).then(data=>{

                    populateStats()
                    try{
                        Object.entries(data.rates).forEach(([key,value])=>{
                            window.availableCurrencies.push({
                                id:key,
                                rate:value,
                                text:key,
                                symbol: currencies[key].symbol_native,
                                name:currencies[key].name
                            })
                        })

                        $("select#currencySelector").select2({
                            theme: "classic",
                            width: '4rem',
                            templateResult: formatState,
                            dir: "rtl",
                            allowClear: true,
                            placeholder:"$",
                            data:window.availableCurrencies.reverse()
                        }).on('select2:select', function (e) {
                            var data = e.params.data;
                            window.currentCurrency = data;
                            document.dispatchEvent(new Event('currencyChange'));

                            populateStats();
                        });

                    }catch (e) {
                        throw new Error(e.message);
                    }
                })
            }
        )
        })









    }



});