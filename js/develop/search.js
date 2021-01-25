$(document).ready(function () {
    function formatState (state) {
        if (!state.id) {
            return state.text;
        }

        let image = 'https://static.coincap.io/assets/icons/'+ state.symbol.toLowerCase() +'@2x.png';

        let link = `${window.location.origin}/${state.symbol.toLowerCase()} `

        var $state = $(
            `<span>
                <span>
                    <a href="${link}" > 
                        <img src="${image}" width="20" class="img-coin" />
                        ${state.name} 
                    </a>
                </span>
            </span>`
        );


        return $state;
    };


    $('#searchCoins').select2({
        theme: "classic",
        width: '180px',
        minimumInputLength: 3,
        language:{
            inputTooShort:function (){
                return " הכנס את שם המטבע או סימול (לפחות 3 תווים באנגלית) "
            },
            searching:function (){
                return "מחפש..."
            },
            noResultsFound: "לא נמצאו תוצאות לחיפוש"
        },
        templateResult: formatState,
        allowClear: true,
        placeholder:"חיפוש מטבעות",
        ajax:{
            url:"https://api.coinpaprika.com/v1/search",
            delay: 250,
            cache: true,
            data: function (params){
                return {
                    q:params.term,
                    c:"currencies",
                    limit: 10
                }
            },
            processResults:function (data){
                return {
                    results:data.currencies.map(currency=>{
                        return {
                            ...currency,
                            text: `${currency.symbol}  ${currency.name}`
                        }
                    })
                }
            }


        }
    }).on('select2:select',function (e){
        let data = e.params.data;
        console.log(data);
        location.assign(window.location.origin+"/"+data.symbol.toLowerCase())
    });
});