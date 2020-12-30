window.onload = function(){
    const paprikaUrl = "https://api.coinpaprika.com/v1/";
    const coincapUrl = "https://api.coincap.io/v2/";

    const table= document.querySelector("#coins-content");
    if(!table) return;
    let dataObjected = {};
    let offset = 0,limit =100;


    table.innerHTML = table.querySelector(".table-row").outerHTML+=`<div className="contein-empty">
        בטעינה
    </div>`;
    function  onSort(el){
        const key = el.target.dataset.sort;
        const column = el.target;
        let descending = false;
        table.querySelectorAll(".active").forEach(el=>el.classList.remove("active"))
        if(column.classList.contains("down")){
            column.classList.remove("down");
            column.classList.add("up","active");
        }else{
            descending =true;
            column.classList.remove("up");
            column.classList.add("down","active");
        }
        populateTable(sortTableByKey(key,Object.values(dataObjected),descending))
    }

    function fetchAssets(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${coincapUrl}assets?offset=${offset}&limit=${limit}`, requestOptions)
            .then(response => response.json())
            .then(({data}) => {
                 data.forEach(coin=>{
                    dataObjected[coin.id] = coin;
                })
                populateTable(data)
            })
            .catch(error => console.log('error', error));
    }

    function populateTable(data){

        let populatedHtml =  table.querySelector(".table-row").outerHTML;

        data.forEach(function (coin,index){
            populatedHtml+= `
                    <div class="table-row ">
                            <div class="content">
                                <div class="counter">
                                               <div>${index+1}</div>

                                </div>
                                <div class="long">
                                               <div>${coin.name}</div>

                                </div>
                                <div class="short">
                                               <div>${coin.symbol}</div>

                                </div>
                                <div class="translate">
                                     <div>${coin.name} he</div>
                                </div>
                                <div class="price" data-coin="${coin.id}">
                                               <div>${accounting.toFixed(coin.priceUsd,2)} </div>

                                </div>
                                <div class="mktcap">
                                                <div>${accounting.toFixed(coin.marketCapUsd,2)} </div>

                                </div>
                                <div class="usdVolume">
                                                <div>${accounting.toFixed(coin.volumeUsd24Hr,2)} </div>

                                </div>
                                <div class="cap24hrChange">
                                    <div style="direction: ltr;text-align: right">${ accounting.toFixed(coin.changePercent24Hr,2)}% </div>
                                </div>
                            </div>
                        </div>

            `;
        });

        populatedHtml+= ` <div class="load-more">
                    <div class="butt"><span>הצג 100 נוספים</span></div>
                </div>`
        table.innerHTML = populatedHtml;

        table.querySelectorAll(".sort").forEach(function (el){
            el.addEventListener("click",onSort)
        })
        table.querySelector(".load-more").addEventListener("click",fetchMore);


    }

    fetchAssets();

    const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')
    //
    pricesWs.onmessage = function (msg) {
        for (const [key, value] of Object.entries(JSON.parse(msg.data))) {
            const coinPrice = table.querySelector(`[data-coin='${key}']`);
            if(coinPrice){
                if (dataObjected&&dataObjected[key]) {
                    dataObjected[key] = {
                        ...dataObjected[key],
                        priceUsd: value
                    }
                }
                coinPrice.innerHTML = `<div>${accounting.toFixed(value,2)} </div>`
            }
        }

    }

    function sortTableByKey(key,data,descending){

        if(!key) return data;
        data.sort(function (a,b){
            return descending? a[key]-b[key]:b[key]-a[key];
        })
        return  data;
    }


    function fetchMore(){
        limit+=100;
        fetchAssets()
    }



}