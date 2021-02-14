<?php get_header(); ?>
<?php
$baseApi = "https://api.coinpaprika.com/v1/";
$coin_name = strtolower(str_replace(" ","-", trim(get_field('post_name'))));
$coin_symbol = strtolower(explode("-",get_field('post_short_name_connected_to_api'))[0]);
$coin_id = $coin_symbol."-".$coin_name;
?>
<?php setPostViews(get_the_ID()); ?>
    <!-- MAIN -->
    <div class="main">
        <!-- add partials here -->
        <script>
            const time =new Date().getTime();
            const secondsInDay = (24*60*60*1000);
            const coinName ='<?php echo $coin_name ?>';
            const baseApiUrl = '<?php echo $baseApi;?>';
            const coin = '<?php echo $coin_id; ?>'
            const urlDataText = baseApiUrl+'tickers/'+coin;
            const urlDataGraph = `${urlDataText}/historical?start=${getHistorical()}&interval=2h`;


            function getHistorical(){
                let d= new Date();
                d.setMonth(d.getMonth()-1);
                return d.toISOString();
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
                                <script src="https://changelly.com/static/payment-button-widget/widget-modal.js"></script>

                                <iframe src="https://changelly.com/static/payment-button-widget/index.html?paymentButtonTheme=desert&buttonTextId=002&widgetLink=https%3A%2F%2Fwidget.changelly.com%3Ffrom%3Dbtc%252Cusd%252Ceur%252Cils%252Ceth%26to%3D*%26amount%3D1000%26address%3D%26fromDefault%3Dils%26toDefault%3D<?php echo $coin_symbol;?>%26theme%3Ddefault%26merchant_id%3Di3ff3bxfjcosysmt%26payment_id%3D%26v%3D3&isPopUp=true" width="180" height="48" frameborder="0"></iframe>
                                <link rel="stylesheet" href="https://changelly.com/static/payment-button-widget/widget-modal.css"/>
                                <div id="changellyModal"></div>
                            </div>
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
                                                        function buildApiUrl($parameters){
                                                            global $baseApi,$coin_id;

                                                            return $baseApi."tickers/$coin_id/historical$parameters";
                                                        }
                                                        function getParameters($interval,$from){

                                                            $start = new DateTime();
                                                            try {
                                                                $start = $start->sub(new DateInterval("P" . $from . "D"))->format('Y-m-d');
                                                            } catch (Exception $e) {

                                                            }

                                                            return "?start=$start&interval=$interval";
                                                        }

                                                    ?>
                                                    <a href="<?php echo buildApiUrl(getParameters("1h",1)  );  ?>" class="day small-butt ">יום</a>
                                                    <a href="<?php echo buildApiUrl(getParameters("1h",7)  );  ?>" class="day small-butt">שבוע</a>
                                                    <a href="<?php echo buildApiUrl(getParameters("2h",30) );  ?>" class="day small-butt active"> חודש</a>
                                                    <a href="<?php echo buildApiUrl(getParameters("1d",90) );  ?>" class="day small-butt"> 3 חודשים </a>
                                                    <a href="<?php echo buildApiUrl(getParameters("1d",180));  ?>" class="day small-butt">6 חודשים</a>
                                                    <a href="<?php echo buildApiUrl(getParameters("1d",356));  ?>" class="day small-butt"> שנה </a>
                                                </div>

                                            </div>
                                            <div class="top-line">
                                                <div class="name-graph">  גרף <?php the_field('post_name_translate') ?> </div>
                                            </div>

                                            <div id="curve_chart" style="width: 100%;height: 400px"></div>
                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li class="">
                                <div class="content-widjet">
                                    <div class="siders-wid">
                                        <div class="copytext">
                                            <div class="textarea-place">

                                                <textarea readonly="" name="text">&lt;div id="coindex-vidjet"&gt;&lt;div id="<?php echo $coin_id; ?>"&gt;&lt;/div&gt;&lt;/div&gt;&lt;script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/coindex-vidjet-plugin.js" &gt;&lt;/script&gt;</textarea>
                                                <div class="button-for-copy-row">
                                                    <button class="button-for-copy butt">
                                                        <span> העתק </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="prsentation">
                                            <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/coindex-vidjet-plugin.js"></script>
                                            <div id="coindex-vidjet">
                                                <div id="<?php echo $coin_id; ?>"></div>
                                            </div>
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

                            <div class="row-bye" style="direction: ltr">
                                <iframe src="https://changelly.com/static/payment-button-widget/index.html?paymentButtonTheme=desert&buttonTextId=002&widgetLink=https%3A%2F%2Fwidget.changelly.com%3Ffrom%3Dbtc%252Cusd%252Ceur%252Cils%252Ceth%26to%3D*%26amount%3D1000%26address%3D%26fromDefault%3Dils%26toDefault%3D<?php echo $coin_symbol;?>%26theme%3Ddefault%26merchant_id%3Di3ff3bxfjcosysmt%26payment_id%3D%26v%3D3&isPopUp=true" width="180" height="48" frameborder="0"></iframe>
                            </div>
                            <div class="row-after-all create-next-button">
                                <a data-curmin="<?php echo $coin_id; ?>" href="<?php echo site_url(); ?>/" rel="next">למעבר למטבע הבא</a>
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

<?php get_footer(); ?>
