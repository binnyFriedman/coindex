<?php header('Access-Control-Allow-Origin: *'); ?><!DOCTYPE html>
<html lang="hebrew">
<head>
    <?php
        $blog_url= get_bloginfo( 'template_directory' );
        $url = get_home_url();
    ?>
    <meta charset="UTF-8">


    <link rel="shortcut icon" href="<?php echo $blog_url; ?>/images/favicon.ico" type="image/x-icon">
    <link rel="icon" href="<?php echo $blog_url; ?>/images/favicon.ico" type="image/x-icon">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

    <?php if ( is_singular( 'post' ) ) { ?>

            <title>

                מידע עדכני ומקיף על שער המטבע |  COINDEX
                <?php the_field('post_name_translate'); ?> ( <?php the_field('post_name'); ?>, <?php the_field('post_short_name_connected_to_api'); ?> ) –
            </title>

        <?php

        } else {

            echo "<title>" . wp_get_document_title() . "</title>";

        }

    ?>


    <?php wp_head(); ?>
    <!-- build:css -->
    <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700&amp;subset=hebrew" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Assistant:200,300,400,600,700,800&amp;subset=hebrew" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.0.47/jquery.fancybox.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo $blog_url; ?>/css/znormalize.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $blog_url; ?>/css/select2.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $blog_url; ?>/css/slick.css">
    <!-- add new file here -->

    <link rel="stylesheet" type="text/css" href="<?php echo $blog_url; ?>/css/basic.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $blog_url; ?>/css/main_styles.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $blog_url; ?>/css/main_adapt.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $blog_url; ?>/css/Xcustom.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $blog_url; ?>/css/Xcustom_adapt.css">
    <!-- endbuild -->

    <!--[if lt IE 10]>
    <link rel="stylesheet" type="text/css" href="https://rawgit.com/codefucker/finalReject/master/reject/reject.css" media="all" />
    <script type="text/javascript" src="https://rawgit.com/codefucker/finalReject/master/reject/reject.min.js"></script>
    <![endif]-->
    <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <?php if ( is_singular( 'post' ) && get_post_meta(get_the_ID(), '_yoast_wpseo_metadesc', true) == '' ){ ?>

        <?php

        echo get_post_meta(get_the_ID(), '_yoast_wpseo_metadesc', true);

        ?>

        <meta name="description" content="
        כל מה שרציתם לדעת על
        <?php the_field('post_name_translate'); ?> ( <?php the_field('post_name'); ?>, <?php the_field('post_short_name_connected_to_api'); ?> ) – באתר COINDEX
        תוכלו למצוא מידע מקיף ועדכני על המטבע <?php the_field('post_name'); ?>  , כולל שער עדכני להיום ובהשוואה לשנה האחרונה
        , שווי שוק, מחזור ביממה האחרונה, מספר מטבעות ורקע כללי על המטבע. כאן גם תוכלו לקנות <?php the_field('post_name'); ?> במקום אחד." />


        <meta name="twitter:description" content="
        כל מה שרציתם לדעת על
        <?php the_field('post_name_translate'); ?> ( <?php the_field('post_name'); ?>, <?php the_field('post_short_name_connected_to_api'); ?> ) – באתר COINDEX
        תוכלו למצוא מידע מקיף ועדכני על המטבע <?php the_field('post_name'); ?>  , כולל שער עדכני להיום ובהשוואה לשנה האחרונה
        , שווי שוק, מחזור ביממה האחרונה, מספר מטבעות ורקע כללי על המטבע. כאן גם תוכלו לקנות <?php the_field('post_name'); ?> במקום אחד." />

        <meta property="og:description" content="
        כל מה שרציתם לדעת על
        <?php the_field('post_name_translate'); ?> ( <?php the_field('post_name'); ?>, <?php the_field('post_short_name_connected_to_api'); ?> ) – באתר COINDEX
        תוכלו למצוא מידע מקיף ועדכני על המטבע <?php the_field('post_name'); ?>  , כולל שער עדכני להיום ובהשוואה לשנה האחרונה
        , שווי שוק, מחזור ביממה האחרונה, מספר מטבעות ורקע כללי על המטבע. כאן גם תוכלו לקנות <?php the_field('post_name'); ?> במקום אחד." />

    <?php } ?>


</head>
<body dir="rtl" class="lock <?php if ( is_front_page() ){ echo 'frontpage'; }?> ">

<script>

    var logined = false;
    var steakNames;
    var isItCabinet = false;
    var steakCounts = [];
</script>



<?php

    $args = array(
        'numberposts' => -1,
        'post_type'   => 'post',
        'suppress_filters' => true,
    );

    $posts = get_posts( $args );

    $stack_translates = [];

    foreach($posts as $post){ setup_postdata($post);
        $stack_translates[] = array(
            'name'      => get_field( 'post_short_name_connected_to_api', $post->ID ),
            'translate' => get_field( 'post_name_translate' ,$post->ID ),
        );
    }

    wp_reset_postdata();


?>

<?php if ( is_user_logged_in() ) :?>
    <div class="mbox" style="display: none;">

        <?php

        $current_user = wp_get_current_user();
        $userID = $current_user->ID;
        ?>


        <script>
            var timeline = <?php echo json_encode($arrstack);?>;
        </script>
    </div>

<?php endif; ?>


<script>
    var translates =  <?php echo json_encode( $stack_translates ); ?>;
</script>

<style>

    html{ margin-top: 0!important;}
    /*body.lock{ width: 100vw; height: 100vh;  width: 100%; overflow: hidden;}*/
    body{ direction: rtl; width: 100%; overflow-x: hidden; }

    body
    {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
    }
    #loader1{
        display: block;
        width: 200px;
        margin: auto;
    }

    .loader2{
        stroke-dasharray: 999;
        animation: pulse 5s ease-in-out infinite;
    }

    @keyframes pulse{
        0%{
            stroke-dashoffset: 1000;
        }
        50%{
            stroke-dashoffset: 0;
        }
        100%{
            stroke-dashoffset: 0;
        }
    }

    /*#preloader{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999; background-color: #fff ; }*/
    /*#preloader .con{ position: absolute; top: 50%; left: 50%;  transform: translate(-50%, -50%); }*/
    /*#preloader .con .convert-topper { position: relative;}*/
    #logosvg{ width: 300px; margin: 0 auto; display: block;  }

</style>

<div id="preloader">
    <div class="con">
        <img src="<?php echo $blog_url; ?>/images/spiner.gif" alt="">
    </div>
</div>


<div class="global-wrapper">
    <!-- HEADER -->

    <header>
        <div id="topper-line">
            <div class="mbox">
                <div class="infos">
                    <div class="item" style="display: none;">
                        <div class="name">מטבעות דיגיטליים :</div>
                        <div class="data"></div>
                    </div>
                    <div class="item">
                        <div class="name"> שווי שוק כולל :</div>
                        <div class="data"></div>
                    </div>
                    <div class="item">
                        <div class="name">שווי שוק ביטקויין :</div>
                        <div class="data"></div>
                    </div>
                    <div class="item">
                        <div class="name"> שווי שוק לייטקויין :</div>
                        <div class="data"></div>
                    </div>
                    <div class="item">
                        <div class="name">מחיר ביטקויין : </div>
                        <div class="data"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="head-row">
            <div class="mbox">
                <div class="siders">
                    <div class="simple-part">
                        <div class="logo-part">
                            <a href="/">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 911 159" style="enable-background:new 0 0 911 159; width: 100%;" xml:space="preserve">
                                <style type="text/css">
                                    .st0{fill:#1A1A1A;}
                                    .st1{fill:url(#SVGID_1_);}
                                </style>
                                    <g>
                                        <g>
                                            <path class="st0" d="M316.4,35.5c1.3,0.8,2,1.6,2,2.5c0,0.5-0.1,1-0.4,1.4c-0.3,0.5-0.5,0.8-0.7,1.1l-3.1,5
                                        c-0.9,1.2-1.8,1.8-2.5,1.8c-0.3-0.1-0.7-0.2-1.1-0.4c-0.5-0.1-1-0.4-1.6-0.8c-3.8-2.7-8-4.8-12.5-6.4c-4.5-1.5-9.1-2.3-13.6-2.3
                                        c-6.6,0-12.6,1.2-18.1,3.6c-5.5,2.4-10.2,5.6-14.1,9.7c-4,4-7,8.8-9.2,14.1c-2.2,5.4-3.3,11-3.3,16.9c0,6.2,1.2,12,3.7,17.4
                                        c2.4,5.4,5.7,10.1,9.8,14c4.1,4,8.8,7,14.2,9.3c5.3,2.2,10.9,3.4,16.7,3.4c3.8,0,7.5-0.5,11.2-1.5c3.7-1,7.8-2.8,12.3-5.5
                                        c1-0.5,2-1.2,3-2c1-0.8,1.9-1.3,2.6-1.3c0.9,0,1.7,0.6,2.5,1.8l3.5,5.7c0.3,0.7,0.4,1.4,0.4,2.1c0,1.1-0.6,2-1.6,2.5
                                        c-4.8,3.5-10,6.2-15.8,8.2c-5.7,2-11.9,2.9-18.5,2.9c-7.9,0-15.3-1.5-22.3-4.5c-7-3-13-7.1-18.1-12.2c-5.2-5.1-9.2-11.2-12.2-18.1
                                        c-3-7-4.5-14.4-4.5-22.3c0-7.9,1.5-15.3,4.5-22.3c3-6.9,7.1-13,12.3-18.2c5.2-5.2,11.3-9.3,18.2-12.3c6.9-3,14.4-4.5,22.3-4.5
                                        c6.3,0,12.3,1,18.1,2.9C306.1,29.1,311.5,31.9,316.4,35.5z"></path>
                                            <path class="st0" d="M382.1,24.2c7.9,0,15.3,1.5,22.3,4.5c6.9,3,13,7.1,18.2,12.2c5.2,5.2,9.3,11.2,12.3,18.2
                                        c3,7,4.5,14.5,4.5,22.5c0,7.9-1.5,15.3-4.5,22.2c-3,6.9-7.1,12.9-12.3,18.1c-5.2,5.2-11.3,9.2-18.2,12.2c-7,3-14.4,4.5-22.4,4.5
                                        c-7.9,0-15.3-1.5-22.3-4.5c-7-3-13-7.1-18.1-12.2c-5.2-5.1-9.2-11.2-12.2-18.1c-3-7-4.5-14.4-4.5-22.3c0-7.9,1.5-15.3,4.5-22.3
                                        c3-6.9,7.1-13,12.3-18.2c5.2-5.2,11.3-9.3,18.2-12.3C366.7,25.7,374.2,24.2,382.1,24.2z M337.8,81.4c0,6.1,1.1,11.9,3.4,17.2
                                        c2.3,5.4,5.4,10.1,9.5,14.2c4,4,8.7,7.2,14.1,9.5c5.4,2.3,11.1,3.5,17.2,3.5c6.1,0,11.8-1.1,17.2-3.5c5.3-2.3,10-5.5,14-9.5
                                        c4-4.1,7.1-8.8,9.5-14.2c2.3-5.4,3.5-11.1,3.5-17.2c0-6.1-1.1-11.8-3.5-17.2c-2.3-5.3-5.5-10-9.5-14c-4-4-8.7-7.1-14-9.5
                                        c-5.4-2.3-11.1-3.5-17.2-3.5c-6.1,0-11.9,1.1-17.2,3.5c-5.4,2.3-10.1,5.5-14.1,9.5c-4,4-7.1,8.7-9.5,14
                                        C339,69.5,337.8,75.3,337.8,81.4z"></path>
                                            <path class="st0" d="M471.2,29v104.7c0,2.2-1.1,3.3-3.3,3.3h-6.3c-2.2,0-3.3-1.1-3.3-3.3V29c0-2.2,1.1-3.3,3.3-3.3h6.3
                                        C470.1,25.7,471.2,26.8,471.2,29z"></path>
                                            <path class="st0" d="M586.7,137h-7c-1.1,0-2.1-0.5-2.8-1.3l-68.4-89.9v87.9c0,2.2-1.2,3.3-3.5,3.3h-6.1c-2.2,0-3.3-1.1-3.3-3.3
                                        V29.2c0-1,0.3-1.8,0.9-2.5c0.6-0.6,1.4-1,2.4-1h8.2c1.2,0,2.1,0.5,2.8,1.5l67.4,87.6V28.5c0.3-1.9,1.4-2.9,3.3-2.9h6.1
                                        c0.9,0,1.7,0.3,2.5,0.9c0.8,0.6,1.1,1.4,1.1,2.4v104.7C590.3,135.9,589.1,137,586.7,137z"></path>
                                            <path class="st0" d="M614.1,133.9V29.3c0-2.4,1.1-3.6,3.4-3.6h34.4c7.9,0,15.2,1.5,22,4.4c6.8,2.9,12.7,6.9,17.7,11.9
                                        c5,5,8.9,10.9,11.8,17.7c2.9,6.8,4.3,14.1,4.3,21.9c0,7.6-1.5,14.8-4.3,21.5c-2.9,6.8-6.9,12.7-11.9,17.7c-5.1,5.1-11,9-17.8,11.9
                                        c-6.8,2.9-14.1,4.3-21.8,4.3h-34.4c-1,0-1.8-0.2-2.5-0.7C614.4,135.9,614.1,135.1,614.1,133.9z M627,124.3h25.8
                                        c6.2,0,11.9-1.2,17-3.6c5.1-2.4,9.6-5.6,13.3-9.7c3.7-4,6.6-8.7,8.7-14c2.1-5.2,3.2-10.7,3.2-16.4c0-6.4-1.2-12.2-3.5-17.4
                                        c-2.3-5.2-5.4-9.6-9.4-13.3c-4-3.6-8.5-6.5-13.7-8.5c-5.2-2-10.7-3-16.5-3H627L627,124.3L627,124.3z"></path>
                                            <path class="st0" d="M729.2,25.7h72.1c2.2,0,3.3,1.1,3.3,3.5v6.1c0,0.9-0.3,1.7-0.9,2.4c-0.6,0.7-1.5,1-2.5,1h-62.4v33.1h49.7
                                        c0.9,0,1.7,0.3,2.3,0.8c0.6,0.6,1,1.4,1,2.6v6.1c0,0.9-0.3,1.7-0.8,2.4c-0.6,0.7-1.4,1-2.5,1h-49.7v39h63c2.3,0,3.5,1.2,3.5,3.6
                                        v6.2c0,2.2-1.1,3.3-3.3,3.3h-72.8c-2.2,0-3.3-1-3.3-3.2V29.1C725.9,26.9,727,25.7,729.2,25.7z"></path>
                                            <path class="st0" d="M867.8,81.5l35.5,52.2c0.6,0.7,0.9,1.4,0.9,2.1c0,0.8-0.8,1.2-2.2,1.2h-9c-1.8,0-3.3-0.9-4.5-2.7l-28.4-41.9
                                        l-28.2,41.9c-1.3,1.8-2.8,2.7-4.5,2.7h-9.2c-1.4,0-2.1-0.4-2.1-1.2c0-0.5,0.3-1.2,0.9-2.1l35.5-52.2c-6.3-9.4-12.6-18.6-18.8-27.8
                                        c-6.2-9.1-11.8-17.2-16.6-24.3c-0.7-1-1-1.8-1-2.4c0-0.9,1-1.4,3-1.4h8.1c1,0,1.8,0.2,2.5,0.7c0.6,0.5,1.5,1.3,2.5,2.6l27.9,41.4
                                        L888.3,29c1-1.3,1.9-2.2,2.6-2.6s1.7-0.7,2.9-0.7h7.4c2,0,3,0.4,3,1.2c0,0.7-0.4,1.6-1,2.5L867.8,81.5z"></path>
                                        </g>

                                        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="9.94" y1="115.235" x2="178.168" y2="115.235" gradientTransform="matrix(1 0 0 -1 0 196)">
                                            <stop offset="0" style="stop-color:#FFB127"></stop>
                                            <stop offset="1" style="stop-color:#FCC460"></stop>
                                        </linearGradient>
                                        <path class="st1" d="M137.9,117.3c-7.7,11.9-19.1,21.1-32.5,26.2c-5.5,2.1-11.6,2.1-17.1,0.1c-25.4-9.5-43.6-34-43.6-62.8
                                    C44.7,52,62.8,27.5,88.2,18c5.5-2.1,11.6-2,17.1,0.1c13.4,5.1,24.8,14.3,32.5,26.2c3.9,5.9,10.4,9.5,17.5,9.5h22.8
                                    C167.5,27.5,141.8,9,111.7,9H82.6C43,9,10.2,40.7,9.9,80.2c-0.3,39.9,31.9,72.3,71.7,72.3h30c30.1,0,55.8-18.5,66.5-44.8h-22.8
                                    C148.3,107.8,141.7,111.4,137.9,117.3z M81.7,147.8c-37,0-67-30-67-67s30-67,67-67c1.3,0,2.7,0.1,4,0.1
                                    C58.9,24.3,39.9,50.3,39.9,80.8s19,56.5,45.7,66.9C84.4,147.7,83,147.8,81.7,147.8z"></path>
                                    </g>
                            </svg>
                            </a>
                        </div>
                        <label for="currencySelector" >
                             מטבע
                        <select id="currencySelector" class="currency" style="width: 4rem">

                        </select>
                        </label>

                    </div>

                    <?php if ( is_user_logged_in() ) :?>
                        <?php
                            $user = wp_get_current_user();
                        ?>

                        <div class="user-part logined" >

                            <?php wp_nav_menu(array('menu'=> 5, 'menu_class' => '', 'container' => false )); ?>


                            <div class="user-controll">
                                <div class="visible">
                                    <a href="/cabinet/" class="user">
                                        <?php
                                            $current_user = wp_get_current_user();

                                            $user_info = get_userdata(get_current_user_id());
                                            global $current_user;
//                                            get_currentuserinfo();

                                        ?>
                                        <div class="con">
                                            <!--
                                            <img src="<?php echo esc_url( get_avatar_url( $user->ID ) ); ?>" alt="">
                                            -->
                                            <?php echo get_avatar( $current_user->ID, 64 );?>
                                        </div>



                                        <span> <?php echo $current_user->user_firstname; ?></span>
                                    </a>
                                </div>
                                <div class="hiddener">
                                    <div class="line">
                                        <a href="<?php echo wp_logout_url( "/" ); ?>">
                                            <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-141.000000, -92.000000)" fill="#000000" fill-rule="nonzero">
                                                        <g transform="translate(141.000000, 92.000000)">
                                                            <path d="M0,0 L0,19 L12.9545455,19 L12.9545455,13.3863636 L12.0909091,13.3863636 L12.0909091,18.1363636 L0.863636364,18.1363636 L0.863636364,0.863636364 L12.0909091,0.863636364 L12.0909091,5.61363636 L12.9545455,5.61363636 L12.9545455,0 L0,0 Z M14.7252185,6.44658427 L15.335901,5.83590095 L19,9.5 L15.335901,13.164099 L14.7252185,12.5534157 L17.348165,9.93046832 L6.04953091,9.93046832 L6.04953091,9.06818182 L17.3468152,9.06818182 L14.7252185,6.44658427 Z" id="common-logout-signout-exit-outline-stroke"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span> התנתק </span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="hidden-butter">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>

                    <?php else: ?>

                        <div class="user-part not-logined">

                            <?php wp_nav_menu(array('menu'=> 5, 'menu_class' => '', 'container' => false )); ?>


                            <div class="hidden-butter">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    <?php endif; ?>



                </div>
            </div>

            <div class="hidden-menu">
                <div class="convert">
                    <div class="top-part">

                        <ul>


                            <li>
                                <a href="/מילון-קריפטו-2/">מילון קריפטו  </a>
                            </li>
                            <li><a href="/about-us/">אודות  </a></li>
                            <li><a href="/צור-קשר/">צור קשר</a></li>
                            <li><a href="/blog/"> מאמרים </a></li>
                        </ul>
                    </div>
                    <div class="bottom-part">

                        <?php if ( is_user_logged_in() ) :?>

                            <div class="login">
                                <a href="<?php echo wp_logout_url( "/" ); ?>" class="butt type1">
                                    <span>התנתק</span>
                                </a>
                            </div>

                        <?php else: ?>


                        <?php endif; ?>

                    </div>
                </div>
            </div>
        </div>
    </header>