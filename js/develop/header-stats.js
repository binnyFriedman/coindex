window.availableCurrencies = [];
window.currentCurrency = {
    id:"USD",
    rate:"1",
    text:"USD",
    symbol:"$"
}
$(document).ready(function () {

    const supportedCurrencies = {
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
    let headerStats = {};


    function formatState(state) {

        if (!state.id) {
            return state.text;
        }
        var $state = $(
            `<span>${state.symbol} </span>`
        );
        return $state;
    }

    function populateStats() {
        populateSpecificStat(1, headerStats.marketCap);
        populateSpecificStat(2, headerStats.bitCoinMarketCap);
        populateSpecificStat(3, headerStats.liteCoinCap);
        populateSpecificStat(4, headerStats.bitcoinPrice);
    }

    function populateSpecificStat(index, unformattedValue) {
        const topper_line_stats = getTopperLineStats();
        topper_line_stats[index].querySelector('.data').innerHTML = formatMoney(unformattedValue);
    }

    function getTopperLineStats() {
        const topper_line_stats = document.querySelectorAll("#topper-line .infos .item");
        if (!topper_line_stats) {
            throw new Error('Topper line stats not defined');
        }
        return topper_line_stats;
    }

    function formatMoney(amount) {
        return accounting.formatMoney(convertToCurrency(amount), window.currentCurrency.symbol);
    }

    function convertToCurrency(priceInUsd) {
        return parseFloat(priceInUsd) * parseFloat(window.currentCurrency.rate);
    }

    function headerStatsUiExists() {
        return $('#topper-line').length;
    }

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    function fetchJson(endpoint, callback) {
        validateCallback(callback);
       return fetch(endpoint, requestOptions).then(response => response.json()).then(data => callback(data));
    }

    function fetchMarketCap() {
       return fetchJson("https://api.coinpaprika.com/v1/global", marketGlobal => {
            headerStats.marketCap = marketGlobal.market_cap_usd;
            populateSpecificStat(1, headerStats.marketCap)
        })
    }

    function fetchBitcoinMarketCap() {
       return fetchJson("https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/latest", bitCoinMarket => {
            headerStats.bitCoinMarketCap = bitCoinMarket[0].market_cap;
            populateSpecificStat(2, headerStats.bitCoinMarketCap)
        })
    }

    function fetchLiteCoinMarketCap() {
       return  fetchJson("https://api.coinpaprika.com/v1/coins/ltc-litecoin/ohlcv/latest", liteCoinStats => {
            headerStats.liteCoinCap = liteCoinStats[0].market_cap;
            populateSpecificStat(3, headerStats.liteCoinCap)
        })
    }

    function fetchCryptocurrency(symbol, callback) {
        if (typeof symbol === "string" && typeof callback === "function") {
            return fetchJson("https://api.coinpaprika.com/v1/tickers/" + symbol, callback);
        } else {
            throw new Error(`Received wrong parameters: symbol="${symbol}" and callback="${callback}"`);
        }
    }

    function fetchCurrentBitcoinPrice() {
        return fetchCryptocurrency("btc-bitcoin", bitCoinPrice => {
            const usdPrice = bitCoinPrice.quotes.USD.price;
            addSupportedCurrency({
                id: bitCoinPrice.symbol,
                rate: 1 / usdPrice,
                text: bitCoinPrice.name,
                symbol: bitCoinPrice.symbol,
                name: bitCoinPrice.name
            })
            headerStats.bitcoinPrice = usdPrice;
            populateSpecificStat(4, headerStats.bitcoinPrice)
        });

    }

    function fetchCurrentLiteCoinPrice() {
      return fetchCryptocurrency("eth-ethereum", ethCoin => {
            const usdPrice = ethCoin.quotes.USD.price;
            addSupportedCurrency({
                id: ethCoin.symbol,
                rate: 1 / usdPrice,
                text: ethCoin.name,
                symbol: ethCoin.symbol,
                name: ethCoin.name
            })
            headerStats.litecoinPrice = usdPrice;
        });
    }

    function fetchExchangeRates(callback) {
        validateCallback(callback);
        return fetchJson('https://api.exchangerate.host/latest?base=USD', data => {
            callback(data.rates)
        });
    }

    function validateCallback(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Type error: callback must be a function');
        }
    }

    function addSupportedCurrency({id, rate, text, symbol, name}) {
        makeSureAvailableCurrenciesAreDefined();
        window.availableCurrencies.push({
            id,
            rate,
            text,
            symbol,
            name
        })

    }

    function makeSureAvailableCurrenciesAreDefined() {
        if (typeof window.availableCurrencies === "undefined") {
            window.availableCurrencies = [];
        }
    }


    function addLocalCurrenciesAndInitializeCurrentSelector(rates) {
        Object.entries(rates).forEach(([key, value]) => {
            if (typeof supportedCurrencies[key] !== 'undefined') {
                addSupportedCurrency({
                    id: key,
                    rate: value,
                    text: key,
                    symbol: supportedCurrencies[key].symbol_native,
                    name: supportedCurrencies[key].name
                });
            }
        })
        initializeCurrencySelector();
    }

    function initializeCurrencySelector() {
        $("select#currencySelector").select2({
            theme: "classic",
            width: '4rem',
            templateResult: formatState,
            dir: "rtl",
            allowClear: false,
            placeholder: "$",
            data: window.availableCurrencies.reverse()
        }).on('select2:select', function (e) {
            var data = e.params.data;
            window.currentCurrency = data;
            document.dispatchEvent(new Event('currencyChange'));
            populateStats();
        });
    }

    if (headerStatsUiExists()) {
        fetchMarketCap();
        fetchBitcoinMarketCap();
        fetchLiteCoinMarketCap();
        fetchCurrentBitcoinPrice().then(fetchCurrentLiteCoinPrice).finally(()=>{
         fetchExchangeRates(addLocalCurrenciesAndInitializeCurrentSelector)
        }
        )
    }


});