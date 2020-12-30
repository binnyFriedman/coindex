<?php get_header(); ?>
<?php
$baseApi = "https://api.coincap.io/v2/";

?>
<?php setPostViews(get_the_ID()); ?>
    <!-- MAIN -->
    <div class="main">
        <!-- add partials here -->
        <script>
            const time =new Date().getTime();
            const secondsInDay = (24*60*60*1000);
            const coin = location.pathname.replaceAll("\/","");
            const urlDataText = 'https://api.coincap.io/v2/assets/'+coin;
            const urlDataGraph = `https://api.coincap.io/v2/assets/${coin}/history?interval=h1&start=${time-(secondsInDay*30)}&end=${time}`;
            const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${coin}`)

            pricesWs.onmessage = function (msg) {
                const coinUdate = document.querySelector(`.head-stats .price .value`);
                const price = JSON.parse(msg.data)
                if(coinUdate){
                    coinUdate.innerHTML = "$"+ accounting.formatNumber(price[coin], 3, ",", ".")
                }
            }
        </script>


        <?php
            $current_user = wp_get_current_user();
            $userID = $current_user->ID;

            $curr = get_field('post_short_name_connected_to_api') ;
            $arr = get_field('user_coins_list', 'user_'.$userID) ;
            $connect = false ;

        ?>

        <?php
            $current_user = wp_get_current_user();
            $userID = $current_user->ID;
            $arr = array();
            $counts = array();
            if( have_rows('user_coins_list', 'user_'.$userID) ):
                $i = 0;

                while ( have_rows('user_coins_list', 'user_'.$userID) ) : the_row();

                    // Your loop code

                    $curr = get_sub_field('user_coins_list_name');

                    if ( in_array( $curr , $arr ) ){
                        $indexer = array_search( $curr , $arr );
                        $arr[ $indexer ] = get_sub_field('user_coins_list_name');
                        $counts[ $indexer ] = get_sub_field('user_coins_list_count');
                    } else {

                        $arr[$i] = get_sub_field('user_coins_list_name');
                        $counts[$i] = get_sub_field('user_coins_list_count');
                        $i++;
                    }


                endwhile;
            endif;


        ?>

        <?php
                $connect = false;
                $curr = get_field('post_short_name_connected_to_api');
                
               // echo in_array( $curr , $arr ) ;
                if ( in_array( $curr , $arr )  ) {

                    $indexer = array_search( $curr , $arr );
                    

                    if ( $counts[ $indexer ] != 0 ){
                        $connect = true ;
                    }

                }

            //echo  $connect;
        ?>

        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>


        <div class="breadcrums">
            <div class="mbox">
                <ul>
                    <li><a href="/"> דף הבית </a></li>
                    <li><span> <?php the_field('post_name') ?>  </span></li>
                </ul>
            </div>
        </div>

        <div class="info-wrap">
            <div class="mbox">
                <div class="convert">
                    <div class="sides">
                        <div class="named">
                            <div class="convert">
                                <div class="con">
                                    <img src="<?php the_field('post_image') ?>" alt="">
                                </div>
                                <div class="name">
                                    <?php the_field('post_name') ?>
                                    <?php if ( get_field('post_name_translate' ) != '' ){ ?>
                                        <br />
                                        ( <?php the_field('post_name_translate') ?>  )
                                        </span>
                                    <?php } ?>

                                </div>

                            </div>
                        </div>
                        <div class="numbers">
                            <div class="top-row">
                                <div class="head-stats">
                                    <div class="price">
                                        <div class="value"></div>
                                    </div>
                                    <div class="cap24hrChange">
                                        <div class="value green"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="bot-row">
                                <div class="info">
                                    <div class="parametr mktcap">
                                        <div class="name">שווי שוק</div>
                                        <div class="value"></div>
                                    </div>
                                    <div class="parametr usdVolume">
                                        <div class="name price"> מחזור 24 ש </div>
                                        <div class="value" data-price="coin"></div>
                                    </div>
                                    <div class="parametr supply">
                                        <div class="name">   מטבעות </div>

                                        <div class="value"></div>
                                    </div>

                                    <div class="parametr rank">
                                        <div class="name">דרוג</div>
                                        <div class="value"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="buttons">
                            <div class="contein">

                                <?php if ( get_field('post_short_name_connected_to_api') == 'BTC' || get_field('post_short_name_connected_to_api') == 'ETH' ) : ?>

                                <link rel="stylesheet" href="https://shiftlly.com/widget/popup.css">


                                    <a id="shiftllyButton" href="https://shiftlly.com/widget/?lang=he&fromCcy=USD&toCcy=<?php echo strtoupper( get_field('post_short_name_connected_to_api') ); ?>&primaryColor=%23FFB438&secondaryColor=%234A90E2&amount=500&refId=YqEpJAeV" class="butt type4" onclick="openShiftllyPopup(this);return false;">
                                        <span>
                                            קנה
                                            <?php echo strtoupper( get_field('post_short_name_connected_to_api') ); ?>
                                            עכשיו
                                        </span>
                                    </a>

                                    <script type="text/template" id="shiftllyModalTemplate"><div class="shiftllyModal-content"><span class="shiftllyModal-close">&times;</span><iframe src="" width="600" height="520" class="shiftlly" scrolling="no"></iframe></div></script><script type="text/javascript">var template = document.getElementById("shiftllyModalTemplate");var modal = document.createElement("div");modal.setAttribute("id", "shiftllyModal");modal.innerHTML = template.innerHTML;document.body.append(modal);var closeButton = document.getElementsByClassName("shiftllyModal-close")[0];closeButton.onclick = function () {modal.style.display = "none";};function openShiftllyPopup (button) {var iframe = modal.getElementsByTagName('iframe')[0];if (iframe.getAttribute("src") !== button.getAttribute("href")) iframe.setAttribute("src", button.getAttribute("href"));modal.style.display = "block";};</script>


                                <?php else:?>

                                    <link rel="stylesheet" href="https://shiftlly.com/widget/popup.css">


                                    <a id="shiftllyButton" href="https://shiftlly.com/widget/?lang=he&fromCcy=BTC&toCcy=<?php echo strtoupper( get_field('post_short_name_connected_to_api') ); ?>&primaryColor=%23FFB438&secondaryColor=%234A90E2&amount=1&refId=YqEpJAeV" class="butt type4" onclick="openShiftllyPopup(this);return false;">
                                        <span>
                                            קנה
                                            <?php echo strtoupper( get_field('post_short_name_connected_to_api') ); ?>
                                            עכשיו
                                        </span>
                                    </a>

                                    <script type="text/template" id="shiftllyModalTemplate"><div class="shiftllyModal-content"><span class="shiftllyModal-close">&times;</span><iframe src="" width="600" height="520" class="shiftlly" scrolling="no"></iframe></div></script><script type="text/javascript">var template = document.getElementById("shiftllyModalTemplate");var modal = document.createElement("div");modal.setAttribute("id", "shiftllyModal");modal.innerHTML = template.innerHTML;document.body.append(modal);var closeButton = document.getElementsByClassName("shiftllyModal-close")[0];closeButton.onclick = function () {modal.style.display = "none";};function openShiftllyPopup (button) {var iframe = modal.getElementsByTagName('iframe')[0];if (iframe.getAttribute("src") !== button.getAttribute("href")) iframe.setAttribute("src", button.getAttribute("href"));modal.style.display = "block";};</script>


                                <?php endif; ?>


                                <?php if (is_user_logged_in()) : ?>

                                    <?php if($connect) : ?>
                                        <div class=" butt-to-remove">
                                            <a  data-fancybox="" data-src="#remove-popup" href="javascript:;" class="butt type5"><span>הסר מתיק אישי</span></a>
                                        </div>
                                    <?php else : ?>
                                        <div class="butt-to-add">
                                            <a href="javascript:;" class="butt type6"><span>הוסף לתיק אישי</span></a>
                                        </div>
                                    <?php endif;?>
                                <?php endif;?>

                                <?php if ( !is_user_logged_in()) : ?>


                                    <div class="butt-to-add">
                                        <a data-fancybox="" data-src="#popup-login" href="javascript:;" class="butt type5"><span>הוסף לתיק אישי</span></a>
                                    </div>

                                <?php endif;?>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tabs-wrap">
            <div class="mbox">
                <div class="contein-tabs">
                    <div class="navigate-tabs">
                        <ul>
                            <li class="active">
                                <a href="#">
                                    כל המידע
                                </a>
                            </li>
                            <li class="">
                                <a href="#">
                                    ווידג'ט
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="content-tabs">
                        <ul>
                            <li class="active">
                                <div class="loading-description">
                                    <div class="siders">

                                        <div class="drowing">
                                            <div class="top-line">
                                                <div class="links">
                                                    <?php
                                                        function getParameters($interval,$from,$to=0){
                                                            $timeInMiliseconds = round(microtime(true) * 1000);
                                                            $dayInMiisec = (24*60*60)*1000;

                                                            $start = $timeInMiliseconds - ($from * $dayInMiisec);
                                                            $end = $timeInMiliseconds - ($to * $dayInMiisec);

                                                            return "?interval=$interval&start=$start&end=$end";
                                                        }

                                                    ?>
                                                    <a href="<?php echo $baseApi."assets/".$post->post_name."/history".getParameters("h1",1) ?>" class="day small-butt ">יום</a>
                                                    <a href="<?php echo $baseApi."assets/".$post->post_name."/history".getParameters("h1",7) ?>" class="day small-butt">שבוע</a>
                                                    <a href="<?php echo $baseApi."assets/".$post->post_name."/history".getParameters("h2",30) ?>" class="day small-butt active"> חודש</a>
                                                    <a href="<?php echo $baseApi."assets/".$post->post_name."/history".getParameters("d1",90) ?>" class="day small-butt"> 3 חודשים </a>
                                                    <a href="<?php echo $baseApi."assets/".$post->post_name."/history".getParameters("d1",180)  ?>" class="day small-butt">6 חודשים</a>
                                                    <a href="<?php echo $baseApi."assets/".$post->post_name."/history".getParameters("d1",356)  ?>" class="day small-butt"> שנה </a>
                                                </div>

                                            </div>
                                            <div class="top-line">
                                                <div class="name-graph">  גרף <?php the_field('post_name_translate') ?> </div>
                                            </div>

                                            <div id="curve_chart"></div>
                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li class="">
                                <div class="content-widjet">
                                    <div class="siders-wid">
                                        <div class="copytext">
                                            <div class="textarea-place">
                                                <textarea readonly="" name="text">&lt;div id="coindex-vidjet"&gt;&lt;div id="<?php the_field('post_short_name_connected_to_api') ?>"&gt;&lt;/div&gt;&lt;/div&gt;&lt;script type="text/javascript" src="https://www.coindex.co.il/coindex-vidjet-plugin.js" &gt;&lt;/script&gt;</textarea>
                                                <div class="button-for-copy-row">
                                                    <button class="button-for-copy butt">
                                                        <span> העתק </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="prsentation">
                                            <div id="coindex-vidjet">
                                                <div id="<?php the_field('post_short_name_connected_to_api') ?>"></div>
                                            </div>
                                            <script type="text/javascript" src="/coindex-vidjet-plugin.js"></script>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="texter-part" >
            <div class="mbox">

                <div class="parters" >
                    <div class="convert-stick cfix" data-sticky-container data-sticky_parent >

                        <?php include( TEMPLATEPATH . '/partials/socials.php' );  ?>

                        <div class="text-part" data-sticky_column>
                            <div class="texter">
                                <!--
                                <p>
                                    כל מה שרציתם לדעת על
                                    <?php the_field('post_name_translate'); ?> ( <?php the_field('post_name'); ?>, <?php the_field('post_short_name_connected_to_api'); ?> ) – באתר COINDEX
                                    תוכלו למצוא מידע מקיף ועדכני על המטבע <?php the_field('post_name'); ?>  , כולל שער עדכני להיום ובהשוואה לשנה האחרונה
                                    , שווי שוק, מחזור ביממה האחרונה, מספר מטבעות ורקע כללי על המטבע. כאן גם תוכלו לקנות <?php the_field('post_name'); ?> במקום אחד.

                                </p>
                                <br/>
                                <br/>
                                -->

                                <?php the_field('post_description'); ?>

                            </div>

                            <div class="row-bye">
                                <?php if ( get_field('post_short_name_connected_to_api') == 'BTC' || get_field('post_short_name_connected_to_api') == 'ETH' ) : ?>

                                    <!--
                                    <a href="https://www.coinmama.com/?ref=shay" target="_blank" >
                                        <span> קנה <?php the_field('post_name') ?>   </span>
                                    </a>
                                    -->

                                    <a id="shiftllyButton" href="https://shiftlly.com/widget/?lang=he&fromCcy=USD&toCcy=<?php echo strtoupper( get_field('post_short_name_connected_to_api') ); ?>&primaryColor=%23FFB438&secondaryColor=%234A90E2&amount=500&refId=YqEpJAeV" onclick="openShiftllyPopup(this);return false;">
                                        <span>
                                            קנה
                                            <?php echo strtoupper( get_field('post_short_name_connected_to_api') ); ?>
                                            עכשיו
                                        </span>
                                    </a>


                                <?php else:?>

                                    <!--
                                    <a data-fancybox="" data-src="#pop-bye" href="javascript:;" class="butt type4">
                                        <span> קנה <?php the_field('post_name') ?>   </span>
                                    </a>
                                -->

                                    <a id="shiftllyButton" href="https://shiftlly.com/widget/?lang=he&fromCcy=BTC&toCcy=<?php echo strtoupper( get_field('post_short_name_connected_to_api') ); ?>&primaryColor=%23FFB438&secondaryColor=%234A90E2&amount=1&refId=YqEpJAeV" onclick="openShiftllyPopup(this);return false;">
                                        <span>
                                            קנה
                                            <?php echo strtoupper( get_field('post_short_name_connected_to_api') ); ?>
                                            עכשיו
                                        </span>
                                    </a>


                                <?php endif; ?>

                                <!--
                                <a data-fancybox="" data-src="#pop-bye" href="javascript:;"> קנה <?php  the_field('post_name' ) ?> </a>
                                -->
                            </div>

                            <div class="row-after-all create-next-button">
                                <a data-curmin="<?php the_field('post_short_name_connected_to_api'); ?>" href="https://www.coindex.co.il/" rel="next">למעבר למטבע הבא</a>
                            </div>
                            <div class="texter">
                                <p>חשוב לדעת: כל ההסברים על המטבעות השונים מבוססים על פרסומים של יוצריהם. אין לראות במידע כהמלצה, או כייעוץ.השימוש באתר על אחיות המשתמש/ת בלבד.</p>

                                <p>
                                    <a data-fancybox="" data-src="#find-error" href="javascript:;" class="pop-error">מצאת טעות? כתוב לנו</a>
                                </p>
                            </div>

                        </div>

                        <?php include( TEMPLATEPATH . '/partials/blog.php' ); ?>

                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- /MAIN -->

    <div class="hidden-block">

        <div id="pop-bye" class="curr-class">
            <div class="cont">
                <div class="title-part">
                    <h3>
                        עליך להחזיק ארנק ביטקויין, על מנת שתוכל לקנות מטבע מסוג <?php the_field('post_name') ?>
                    </h3>
                </div>
                <div class="buttons-row">

                    <?php if (get_field('post_short_name_connected_to_api' ) == 'BTC' ) : ?>

                        <a href="https://www.coinmama.com/?ref=shay" class="butt type2" target="_blank">
                            <span>  להמרת ביטקויין ל<?php  the_field('post_name' ) ?></span>
                        </a>

                    <?php else :?>

                        <a  href="https://changelly.com/?ref_id=f9f7373bf362" class="butt type2" target="_blank">
                            <span>  להמרת ביטקויין ל<?php  the_field('post_name' ) ?></span>
                        </a>
                        <a href="https://www.coinmama.com/?ref=shay" class="butt type3" target="_blank">
                            <span> להמרת ש״ח לביטקויין </span>
                        </a>

                    <?php endif;?>

                </div>
            </div>
        </div>

        <div id="find-error" class="curr-class" >
            <div class="cont">
                <div class="title-part">
                    <h3>מצאת טעות? כתוב לנו</h3>
                </div>
                <form action="" class="contein-popup form-part">
                    <input type="hidden" name="action" value="send_mail">
                    <div class="inputer">
                        <input type="text" required name="name" value="" placeholder="שם (לא חובה)">
                    </div>
                    <div class="inputer">
                        <textarea name="error" placeholder="פירוט הטעות שמצאת" required ></textarea>
                    </div>
                    <div class="submiter">
                        <button class="butt type2">
                            <span>שלח</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div id="call_success" class="popup curr-class">
            <div class="call-success contein-popup">
                <div class="call_success">
                    <div class="call-title">
                        תודה רבה על העזרה!
                        <br />
                        ננסה להשתפר
                    </div>
                </div>
            </div>
        </div>

    </div>

<?php if (is_user_logged_in()) : ?>

    <div class="hidden-pop-for-add" style="display: none;">
        

        <div class="contein-for-custom">
            <div id="popup-add" class="curr-class">
                <div class="closer-pop"><span></span> <span></span></div>
                <form class="cont errorForm conteiner-pop">
                    <input type="hidden" name="apiname" value="<?php the_field('post_short_name_connected_to_api') ?>">
                    <input type="hidden" name="price" value="" >

                    <div class="title-part"><h3>  הזן כמות מניות <span> <?php the_field('post_short_name_connected_to_api') ?> </span></h3></div>
                    <div class="form-part">
                        <div class="inputer">
                            <input type="text" name="count">
                        </div>
                        <div class="submiter"><button class="butt type2"><span>שמור</span></button></div>
                    </div>

                </form>
            </div>
        </div>
    </div>
<!--
    <div class="hidden-pop-for-add" style="display: none;">
        <form class="conteiner-pop">
            <input type="hidden" name="apiname" value="<?php the_field('post_short_name_connected_to_api') ?>">
            <input type="hidden" name="price" value="" >
            <div class="closer-pop">
                <span></span>
                <span></span>
            </div>
            <div class="title-line">
                <span>   הזן מספר מטבעות
                </span> <?php the_field('post_short_name_connected_to_api') ?>
            </div>
            <div class="former-part">
                <input type="text" name="count">
            </div>
            <div class="submiter">
                <button type="submit" class="butt"> שמור </button>
            </div>
        </form>
    </div>
-->

    <div id="remove-popup" class="curr-class" style="display: none;">

        <div class="cont">
            <div class="title-part">
                <h3>
                האם אתה בטוח שאתה רוצה להסיר   <?php the_field('post_name') ?>
                </h3>
            </div>
            <div class="chooser buttons-row">

                <a href="#" class="butt type2 delete">
                    <span> כן </span>
                </a>
                <a href="#" class="butt type3 close-popup">
                    <span> לא </span>
                </a>

            </div>
        </div>

    </div>

<?php endif;?>

<?php get_footer(); ?>
