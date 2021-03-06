(function (p, z) {
    function q(a) {
        return !!("" === a || a && a.charCodeAt && a.substr)
    }

    function m(a) {
        return u ? u(a) : "[object Array]" === v.call(a)
    }

    function r(a) {
        return "[object Object]" === v.call(a)
    }

    function s(a, b) {
        var d, a = a || {}, b = b || {};
        for (d in b) b.hasOwnProperty(d) && null == a[d] && (a[d] = b[d]);
        return a
    }

    function j(a, b, d) {
        var c = [], e, h;
        if (!a) return c;
        if (w && a.map === w) return a.map(b, d);
        for (e = 0, h = a.length; e < h; e++) c[e] = b.call(d, a[e], e, a);
        return c
    }

    function n(a, b) {
        a = Math.round(Math.abs(a));
        return isNaN(a) ? b : a
    }

    function x(a) {
        var b = c.settings.currency.format;
        "function" === typeof a && (a = a());
        return q(a) && a.match("%v") ? {
            pos: a,
            neg: a.replace("-", "").replace("%v", "-%v"),
            zero: a
        } : !a || !a.pos || !a.pos.match("%v") ? !q(b) ? b : c.settings.currency.format = {
            pos: b,
            neg: b.replace("%v", "-%v"),
            zero: b
        } : a
    }

    var c = {
            version: "0.4.1",
            settings: {
                currency: {symbol: "$", format: "%s%v", decimal: ".", thousand: ",", precision: 2, grouping: 3},
                number: {precision: 0, grouping: 3, thousand: ",", decimal: "."}
            }
        }, w = Array.prototype.map, u = Array.isArray, v = Object.prototype.toString,
        o = c.unformat = c.parse = function (a, b) {
            if (m(a)) return j(a, function (a) {
                return o(a, b)
            });
            a = a || 0;
            if ("number" === typeof a) return a;
            var b = b || ".", c = RegExp("[^0-9-" + b + "]", ["g"]),
                c = parseFloat(("" + a).replace(/\((.*)\)/, "-$1").replace(c, "").replace(b, "."));
            return !isNaN(c) ? c : 0
        }, y = c.toFixed = function (a, b) {
            var b = n(b, c.settings.number.precision), d = Math.pow(10, b);
            return (Math.round(c.unformat(a) * d) / d).toFixed(b)
        }, t = c.formatNumber = c.format = function (a, b, d, i) {
            if (m(a)) return j(a, function (a) {
                return t(a, b, d, i)
            });
            var a = o(a), e = s(r(b) ? b : {precision: b, thousand: d, decimal: i}, c.settings.number), h = n(e.precision),
                f = 0 > a ? "-" : "", g = parseInt(y(Math.abs(a || 0), h), 10) + "", l = 3 < g.length ? g.length % 3 : 0;
            return f + (l ? g.substr(0, l) + e.thousand : "") + g.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + e.thousand) + (h ? e.decimal + y(Math.abs(a), h).split(".")[1] : "")
        }, A = c.formatMoney = function (a, b, d, i, e, h) {
            if (m(a)) return j(a, function (a) {
                return A(a, b, d, i, e, h)
            });
            var a = o(a),
                f = s(r(b) ? b : {symbol: b, precision: d, thousand: i, decimal: e, format: h}, c.settings.currency),
                g = x(f.format);
            return (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal))
        };
    c.formatColumn = function (a, b, d, i, e, h) {
        if (!a) return [];
        var f = s(r(b) ? b : {symbol: b, precision: d, thousand: i, decimal: e, format: h}, c.settings.currency),
            g = x(f.format), l = g.pos.indexOf("%s") < g.pos.indexOf("%v") ? !0 : !1, k = 0, a = j(a, function (a) {
                if (m(a)) return c.formatColumn(a, f);
                a = o(a);
                a = (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal));
                if (a.length > k) k = a.length;
                return a
            });
        return j(a, function (a) {
            return q(a) && a.length < k ? l ? a.replace(f.symbol, f.symbol + Array(k - a.length + 1).join(" ")) : Array(k - a.length + 1).join(" ") + a : a
        })
    };
    if ("undefined" !== typeof exports) {
        if ("undefined" !== typeof module && module.exports) exports = module.exports = c;
        exports.accounting = c
    } else "function" === typeof define && define.amd ? define([], function () {
        return c
    }) : (c.noConflict = function (a) {
        return function () {
            p.accounting = a;
            c.noConflict = z;
            return c
        }
    }(p.accounting), p.accounting = c)
})(this);

function moneyFormat(n) {
    return parseFloat(n).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
}


var getData;

let currency = {
    id:"USD",
    rate:"1",
    text:"USD",
    symbol:"$"
};

function drawChart() {

    var steak = [['Date', 'מחיר']];
    for (var i = 0; i < getData.length; i++) {
        steak[steak.length] = [new Date(getData[i].timestamp),convertToCurrency( parseFloat(getData[i].price))];
    }
    var data = google.visualization.arrayToDataTable(steak);

    var options = {
        chartArea: {
            height:'90%'
        },
        title: '',
        colors: ['#F76B1C'],
        backgroundColor: '#FFF',
        hAxis: {
            titleTextStyle: {color: '#2f2f2f'},

        },


    };

    var chart = new google.visualization.AreaChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}

$(document).ready(function () {
    let currentPrice =0;
    let rawData = {}


    // add cookie for default currency

    if(typeof window.currentCurrency!=='undefined' && window.currentCurrency){
        currency = window.currentCurrency;
    }

    document.addEventListener('currencyChange',function (){
        currency = window.currentCurrency;
        if(Object.keys(rawData).length>0){

            populateCoinFields(rawData);
            updateChart(getData);
        }
    })

    function populateCoinFields(data) {
        let formatMoneyConfig =(price)=> {
            return {
                symbol: currency.symbol,
                precision: price>1?2:7
            }
        }
            const priceData = data.quotes.USD;
            currentPrice = priceData.price;
            let displayPrice = convertToCurrency(currentPrice);
            $('.parametr.usdVolume .value').html(accounting.formatMoney(convertToCurrency(priceData.volume_24h), formatMoneyConfig(convertToCurrency(priceData.volume_24h))));
            $('.parametr.vwap_h24 .value').html('' + accounting.formatNumber(priceData.volume_24h_change_24h, 3, ",", "."));
            $('.parametr.supply .value').html(accounting.formatNumber(data.total_supply, 0, ",", "."));

            $('.parametr.mktcap .value').html( accounting.formatMoney(convertToCurrency(priceData.market_cap),formatMoneyConfig(convertToCurrency(priceData.market_cap))));

            $('.parametr.rank .value').html(data.rank);

            $('.hidden-stats .price .value').html(accounting.formatMoney(displayPrice, formatMoneyConfig(displayPrice)));

            $('.hidden-pop-for-add form input[name=price]').val(displayPrice);

            $('.head-stats .price .value').html(accounting.formatMoney(displayPrice,formatMoneyConfig(displayPrice)));
            const changePercent24hr =accounting.toFixed(priceData.percent_change_24h,5);
            $('.head-stats .cap24hrChange .value').html(changePercent24hr+'%');

            if (changePercent24hr < 0) {

                $('.hidden-stats .cap24hrChange .value').addClass('red');
                $('.head-stats .cap24hrChange .value').addClass('red');
                $('.parametr.cap24hrChange .value').addClass('red');

                $('.parametr.cap24hrChange .value').html(changePercent24hr + '%');
                $('.hidden-stats .cap24hrChange .value').html(changePercent24hr + '%');
                $('.head-stats .cap24hrChange .value').html(changePercent24hr + '%');

            } else {
                $('.parametr.cap24hrChange .value').html('+' + changePercent24hr + '%');
                $('.hidden-stats .cap24hrChange .value').html('+' + changePercent24hr + '%');
                $('.head-stats .cap24hrChange .value').html('+' + changePercent24hr + '%');

                $('.hidden-stats .cap24hrChange .value').addClass('green');
                $('.head-stats .cap24hrChange .value').addClass('green');
                $('.parametr.cap24hrChange .value').addClass('green');
            }
    }

    function updateChart(data){
        getData = data;
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
    }

    if ($('#curve_chart').length) {
        $.ajax({
            url: urlDataText,
            method: 'GET',
            success: function (data) {
                rawData = data;
                populateCoinFields(data);
            }
        });

        $.ajax({
            url: urlDataGraph,
            method: 'GET',
            success: function (data) {
                updateChart(data);
            }
        });

        var pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinName}`)

        pricesWs.onmessage = function (msg) {

            let formatMoneyConfig =(price)=> {
                return {
                    symbol: currency.symbol,
                    precision: price>1?2:7
                }
            }

            const price = JSON.parse(msg.data)

            let p = $('.head-stats .price .value');

            $(p).html(accounting.formatMoney(convertToCurrency(price[coinName]),formatMoneyConfig(convertToCurrency(price[coinName])) ));
            let className = currentPrice>price[coinName]?"#fe5a6e":"#16debb";
            currentPrice = price[coinName];
            $(p).css("color",className);
        }

    }


    $('.tabs-wrap .loading-description .small-butt').on('click', function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            $('.loading-description .small-butt').removeClass('active');
            $(this).addClass('active');

            var curr = $(this).attr('href');
            $.ajax({
                url: curr,
                method: 'GET',
                success: function (data) {
                    getData = data;
                    google.charts.load('current', {
                        'packages': ['corechart', 'timeline']
                    });
                    google.charts.load('current', {'packages': ['timeline']});
                    google.charts.setOnLoadCallback(drawChart);
                    // drawChart( data );
                }
            });
        }
    });


})

    function convertToCurrency(priceInUsd){
        return parseFloat(priceInUsd) * parseFloat(currency.rate);
    }
