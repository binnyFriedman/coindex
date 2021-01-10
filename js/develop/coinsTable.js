window.onload = async function () {
    const paprikaUrl = "https://api.coinpaprika.com/v1/";

    const table = document.querySelector("#coins-content");
    // Do not proceed with execution on unrelated pages.
    if (!table) return;
    // The data as key base value for quick price updates.
    let dataObjected = {};

    //set fetchCoins default value
    let fetchCoinIds = false;
    if(typeof window.fetchCoinIds!=="undefined" && window.fetchCoinIds===true){
        fetchCoinIds = true;
    }

    // Api filters
    let offset = 0, limit = 100;

    // Table parts that need to be re attached after table population.
    const tableHeader = table.querySelector(".table-row");
    const tableButton = table.querySelector(".load-more");

    //Posts array used for table population and query filter.
    let coinPosts = {};

    // Set Loading while we fetch data from api.
    table.innerHTML = tableHeader.outerHTML += `<div className="contein-empty">
        בטעינה
    </div>`;


    function onSort(el) {
        const key = el.target.dataset.sort;
        const column = el.target;
        let descending = false;
        table.querySelectorAll(".active").forEach(el => el.classList.remove("active"))
        if (column.classList.contains("down")) {
            column.classList.remove("down");
            column.classList.add("up", "active");
        } else {
            descending = true;
            column.classList.remove("up");
            column.classList.add("down", "active");
        }
        populateTable(sortTableByKey(key, ["quotes","USD"],Object.values(dataObjected).slice(0,limit), descending))
    }

    async function fetchHomePosts() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const posts = await fetch(`${location.origin}/wp-json/wp/v2/posts?categories=21&per_page=100`, requestOptions).then(response => response.json())

        posts.forEach(post => {
            let coinName =  post.acf.post_name.trim().replaceAll(" ","-");
            let coinId = post.acf.post_short_name_connected_to_api.split("-")[0] +"-" + coinName;
            coinPosts[coinId] = post
        });
    }

    async function fetchAssets() {
        if (fetchCoinIds) {
            await fetchHomePosts();
        }
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${paprikaUrl}tickers`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                let manipulatedData = data;
                if(Object.keys(coinPosts).length>0){
                    manipulatedData = data.filter(function (coin){
                        return !!coinPosts[coin.id];

                    })
                }
                manipulatedData.forEach(coin => {
                    dataObjected[coin.id.split("-")[1]] = coin;
                })
                populateTable(manipulatedData,limit)
            }).then(()=>{
            initWebsocket()
        })
            .catch(error => console.log('error', error));
    }

    function populateTable(data,limit=100) {
        let populatedHtml = table.querySelector(".table-row").outerHTML;

        function getTranslatedColumn(coin) {
            const includeTranslateColumn = tableHeader.querySelector(".translate");
            if (includeTranslateColumn) {
                return `<div class="translate">
                    <div>${coinPosts[coin.id].acf.post_name_translate}</div>
                </div>`;
            }
            return  ""
        }

        function getCoinImage(coin) {
            if (coin.id && fetchCoinIds===true && coinPosts[coin.id] ) {
                const image = coinPosts[coin.id].acf.post_image;
                return `<div style="display: flex"><img src="${image}" height="30"  /><span style="margin: auto 0.3rem">${coin.name}</span></div>`
            }
            return `<div>${coin.name}</div>`;
        }

        function getWrapperLink(placement, coin) {
            if (coin && fetchCoinIds===true && coinPosts[coin.id]) {
                return placement === "up" ?
                    `<a href="${coinPosts[coin.id].link}" >`
                    : "</a>"
            }
            return  ""
        }

        for (let i = 0; i <= limit&&i<Object.keys(dataObjected).length; i++) {
            const coin = data[i];
            const priceData = coin.quotes.USD;
            populatedHtml += `
                  
                    <div class="table-row ">
                            <div class="content">
                                <div class="counter">
                                               <div>${i + 1}</div>
                                               
                                </div>
                                <div class="long">
                                  ${getWrapperLink("up", coin)}
                                               ${getCoinImage(coin)}
                                ${getWrapperLink("down", coin)}
                                </div>
                                <div class="short">
                                               <div>${coin.symbol}</div>
                                </div>
                                ${getTranslatedColumn(coin)}
                                <div class="price" data-coin="${coin.id.split("-")[1]}">
                                               <div>${accounting.toFixed(priceData.price, 3)} </div>

                                </div>
                                <div class="mktcap">
                                                <div>${accounting.toFixed(priceData.market_cap, 2)} </div>

                                </div>
                                <div class="usdVolume">
                                                <div>${accounting.toFixed(priceData.volume_24h, 2)} </div>

                                </div>
                                <div class="cap24hrChange">
                                    <div style="direction: ltr;text-align: right">${accounting.toFixed(priceData.percent_change_24h, 2)}% </div>
                                </div>
                            </div>
                        </div>
           

            `;
        }

        if (tableButton) {

            populatedHtml += tableButton.outerHTML;
        }
        table.innerHTML = populatedHtml;

        table.querySelectorAll(".sort").forEach(function (el) {
            el.addEventListener("click", onSort)
        })
        const loadMoreBtn =  table.querySelector(".load-more > div.butt");
        if(loadMoreBtn){

            loadMoreBtn.addEventListener("click", fetchMore);
        }


    }

    await fetchAssets();



    function initWebsocket(){

        function getAssetsString(){
            return   Object.keys(dataObjected).join();
        }


        const pricesString = `wss://ws.coincap.io/prices?assets=${Object.keys(coinPosts).length ? getAssetsString() : "ALL"}`;
        const pricesWs = new WebSocket(pricesString)
        //
        pricesWs.onmessage = function (msg) {
            for (const [key, value] of Object.entries(JSON.parse(msg.data))) {
                const coinPrice = table.querySelector(`[data-coin='${key}']`);
                if (coinPrice) {
                    let oldValue;
                    if (dataObjected && dataObjected[key]) {
                        oldValue = dataObjected[key].priceUsd;
                        dataObjected[key] = {
                            ...dataObjected[key],
                            priceUsd: value
                        }
                    }

                    coinPrice.innerHTML = `<div>${accounting.toFixed(value, 3)} </div>`;
                    if (oldValue) {
                        const upColor = "rgba(24, 198, 131, 0.19) none repeat scroll 0% 0%";
                        const downColor = "rgba(244, 67, 54, 0.19) none repeat scroll 0% 0%";
                        priceChangeNotice(coinPrice.parentNode, value > oldValue ? upColor : downColor);
                    }
                }
            }

        }

        function priceChangeNotice(element, backgroundColor) {
            if (element) {
                element.classList.add("flash", "transition")
                element.style.background = backgroundColor;
                setTimeout(function () {
                    element.classList.remove("flash", "transition")

                    element.style.backgroundColor = "";
                }, 750)
            }
        }
    }



    function sortTableByKey(key,depth, data, descending) {

        if (!key) return data;

        data.sort(function (a, b) {
            let a_loc = a, b_loc =b;
            if(depth&&depth.length){
                depth.forEach(d=>{
                    a_loc = a_loc[d];
                    b_loc = b_loc[d];
                })
            }
            return descending ? a_loc[key] - b_loc[key] : b_loc[key] - a_loc[key];
        })
        return data;
    }


    function fetchMore() {
        limit += 100;
        populateTable(Object.values(dataObjected),limit)
        // fetchAssets()
    }


}