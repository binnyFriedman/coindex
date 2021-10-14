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

    <title><?php wp_title(''); ?></title>

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
                        <div class="logo-part" style="margin-left: 1rem">
                            <a href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1022.39 269.62"><defs><style>.cls-1{fill:#11bc83;}</style></defs><g id="Layer_1" data-name="Layer 1"><path class="cls-1" d="M346.76,180.27a6.35,6.35,0,0,0-4.07-2.37,7.89,7.89,0,0,0-4.75.84,49.14,49.14,0,0,1-12.2,5.43A48,48,0,0,1,312.35,186a48.53,48.53,0,0,1-17.88-3.22,41.38,41.38,0,0,1-14.4-9.41,44.31,44.31,0,0,1-9.75-15,53.1,53.1,0,0,1-3.56-20,52,52,0,0,1,3.39-19.15,44.47,44.47,0,0,1,9.49-14.92,43.09,43.09,0,0,1,14.41-9.74,49.11,49.11,0,0,1,31.86-1.53,52.48,52.48,0,0,1,12,5.34,9.08,9.08,0,0,0,4.75,1,5,5,0,0,0,3.9-2.37,7.13,7.13,0,0,0,1.61-5.6,5.89,5.89,0,0,0-3.31-4.57,57.6,57.6,0,0,0-15.34-6.78,62.92,62.92,0,0,0-17.2-2.37,60.63,60.63,0,0,0-23.64,4.57A59.73,59.73,0,0,0,269.56,95a58,58,0,0,0-12.8,19.15,62.6,62.6,0,0,0-4.57,24.24A63.67,63.67,0,0,0,257,163.74a57.22,57.22,0,0,0,32.28,31.44,62.9,62.9,0,0,0,23.05,4.24,59.15,59.15,0,0,0,11.78-1.19,68.36,68.36,0,0,0,11.27-3.3,63.93,63.93,0,0,0,9.66-4.66,5.68,5.68,0,0,0,3.22-4.32A7.18,7.18,0,0,0,346.76,180.27Z"/><path class="cls-1" d="M466.5,114.09a59,59,0,0,0-11.87-19.32A53.67,53.67,0,0,0,436.5,82a59.79,59.79,0,0,0-45.85,0,54,54,0,0,0-18,12.8,59,59,0,0,0-11.86,19.32,71.38,71.38,0,0,0,0,48.47A59.89,59.89,0,0,0,372.6,182a53.43,53.43,0,0,0,18,12.88,59.66,59.66,0,0,0,45.85,0A53.06,53.06,0,0,0,454.63,182a59.91,59.91,0,0,0,11.87-19.4,67.27,67.27,0,0,0,4.23-24.15A67.74,67.74,0,0,0,466.5,114.09ZM450.65,162.9a42.68,42.68,0,0,1-15,16.86,39.82,39.82,0,0,1-22,6.1,40.25,40.25,0,0,1-22.12-6.1,41.94,41.94,0,0,1-15-16.86,53.77,53.77,0,0,1-5.42-24.49,53.62,53.62,0,0,1,5.42-24.58,42,42,0,0,1,15-16.77A40.25,40.25,0,0,1,413.62,91a39.83,39.83,0,0,1,22,6.11,42.76,42.76,0,0,1,15,16.77,52.89,52.89,0,0,1,5.51,24.58A53,53,0,0,1,450.65,162.9Z"/><path class="cls-1" d="M503,81a6.86,6.86,0,0,0-4.92-2A7,7,0,0,0,493,81a6.61,6.61,0,0,0-2,5V190.78a7,7,0,0,0,1.86,4.91,6.53,6.53,0,0,0,5.08,2,7,7,0,0,0,5-2,6.57,6.57,0,0,0,2.12-4.91V86A6.65,6.65,0,0,0,503,81Z"/><path class="cls-1" d="M622.44,80.87a6.67,6.67,0,0,0-9.07,0,6.09,6.09,0,0,0-1.78,4.49v87.76L542.27,81.46a5.07,5.07,0,0,0-2.45-1.78,9.2,9.2,0,0,0-3.14-.59,6.53,6.53,0,0,0-6.61,6.78V191.45a6.28,6.28,0,0,0,1.7,4.5,5.79,5.79,0,0,0,4.4,1.77,6.31,6.31,0,0,0,4.66-1.77,6.1,6.1,0,0,0,1.78-4.5V104.08l69.15,91.44a5.57,5.57,0,0,0,2.37,1.61,8.3,8.3,0,0,0,3,.59,6.79,6.79,0,0,0,7-7.11V85.36A6.31,6.31,0,0,0,622.44,80.87Z"/><path class="cls-1" d="M745.14,115.78a58.39,58.39,0,0,0-9.41-19.06,43.64,43.64,0,0,0-15.67-13,48.55,48.55,0,0,0-21.78-4.66H655.91a6.66,6.66,0,0,0-6.78,6.78V190.78a6.84,6.84,0,0,0,2,4.91,6.4,6.4,0,0,0,4.83,2h42.37q16.79,0,27.79-8.05a49.45,49.45,0,0,0,16.61-21.52,76.82,76.82,0,0,0,5.59-29.74A80.55,80.55,0,0,0,745.14,115.78Zm-15.25,45.68a36,36,0,0,1-12,16.77q-8.22,6.28-21.27,6.28H663.2V92.14h33.38a35.64,35.64,0,0,1,16.87,3.73A32.36,32.36,0,0,1,725,106a44.8,44.8,0,0,1,6.61,14.83,71.48,71.48,0,0,1,2.12,17.54A67.19,67.19,0,0,1,729.89,161.46Z"/><path class="cls-1" d="M835.79,184.51h-53V143.32h45.42a7.19,7.19,0,0,0,4.91-1.78,5.87,5.87,0,0,0,2-4.66,6.12,6.12,0,0,0-2-4.74,7,7,0,0,0-4.91-1.87H782.75V92.14h53a7.21,7.21,0,0,0,4.92-1.78,5.92,5.92,0,0,0,2-4.66,6.16,6.16,0,0,0-2-4.74,7,7,0,0,0-4.92-1.87H775.46a6.66,6.66,0,0,0-6.78,6.78V190.78a6.84,6.84,0,0,0,2,4.91,6.4,6.4,0,0,0,4.83,2h60.33a7,7,0,0,0,4.92-1.86,6.16,6.16,0,0,0,2-4.74,6.33,6.33,0,0,0-2-4.58A6.7,6.7,0,0,0,835.79,184.51Z"/><path class="cls-1" d="M916,138.21l36.51-49.29A7,7,0,0,0,954,84.68a5.71,5.71,0,0,0-1.95-4.23,6.33,6.33,0,0,0-4.49-1.87,6.46,6.46,0,0,0-5.43,3.22l-33.94,45.93L873.86,81.46a6.49,6.49,0,0,0-5.6-2.88,6.74,6.74,0,0,0-4.66,2,6.65,6.65,0,0,0-.76,8.9l36.4,49.11L863,187.89a7.43,7.43,0,0,0-1.69,4.58,6.38,6.38,0,0,0,6.27,5.93,6.23,6.23,0,0,0,5.42-3.05l34-46.3,34.45,46.47a6.74,6.74,0,0,0,5.59,2.88,7,7,0,0,0,4.58-1.86,6.14,6.14,0,0,0,2.2-4.92,7.47,7.47,0,0,0-1.36-4.23Z"/><path class="cls-1" d="M86.11,125a58.55,58.55,0,0,1,3.33-11,57.94,57.94,0,0,1,12.83-19.21A59.94,59.94,0,0,1,121.48,82a57.79,57.79,0,0,1,8.61-2.82V56.05h-55A12.13,12.13,0,0,0,62.93,68.18V125Z"/><path class="cls-1" d="M148.18,77.48V56.05h-9.3V77.68c2.06-.2,4.17-.3,6.31-.3C146.19,77.38,147.18,77.44,148.18,77.48Z"/><path class="cls-1" d="M84.85,138.24c0-1.52.06-3,.15-4.48H62.93v9.3H85C84.91,141.48,84.85,139.88,84.85,138.24Z"/><path class="cls-1" d="M145.19,199.43c-2.19,0-4.34-.11-6.46-.31v21.64h9.59V199.35C147.28,199.4,146.24,199.43,145.19,199.43Z"/><path class="cls-1" d="M203.9,170.84a6.14,6.14,0,0,1-8.69-8.69L219,138.41l-23.74-23.74A6.14,6.14,0,0,1,203.9,106l23.74,23.74V68.18a12.13,12.13,0,0,0-12.13-12.13H157V78.5c1.84.35,3.68.75,5.49,1.26a58.37,58.37,0,0,1,15.38,6.8,5.91,5.91,0,0,1,3.32,4.59,7.12,7.12,0,0,1-1.62,5.61,5.06,5.06,0,0,1-3.91,2.38,9,9,0,0,1-4.76-1,52.61,52.61,0,0,0-12.07-5.35,46.49,46.49,0,0,0-13.6-2,47,47,0,0,0-18.36,3.49,43.19,43.19,0,0,0-14.45,9.77,44.28,44.28,0,0,0-9.51,15,47.83,47.83,0,0,0-2.73,10.25.22.22,0,0,1,0,.08,4.59,4.59,0,0,1-.21,1.3,58.21,58.21,0,0,0-.47,7.58,62.46,62.46,0,0,0,.49,8,4.45,4.45,0,0,1,.19,1.22v.05A48.25,48.25,0,0,0,103,158.3a44.59,44.59,0,0,0,9.78,15,41.63,41.63,0,0,0,14.45,9.43A48.56,48.56,0,0,0,145.19,186a47.93,47.93,0,0,0,13.43-1.87,49.4,49.4,0,0,0,12.24-5.43,8,8,0,0,1,4.76-.86,6.38,6.38,0,0,1,4.08,2.39,7.17,7.17,0,0,1,1.53,5.69,5.67,5.67,0,0,1-3.23,4.33,64.8,64.8,0,0,1-9.69,4.68,67.76,67.76,0,0,1-11.3,3.31l-.19,0v22.48h58.69a12.13,12.13,0,0,0,12.13-12.13V147.1Z"/><path class="cls-1" d="M130.24,220.76v-23a59.44,59.44,0,0,1-8.17-2.54,58.37,58.37,0,0,1-36-43.33H62.93v56.78a12.13,12.13,0,0,0,12.13,12.13Z"/></g></svg>
                            </a>
                        </div>





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
            <style>
                .second-header-row{
                    justify-content: space-between;
                    display: flex;
                    margin-top: 0.5rem;
                }
            </style>
            <div class="mbox second-header-row" style="justify-content: space-between">
                <select id="currencySelector" class="currency" style="margin:0 1rem">
                    <option></option>
                </select>

                <select id="searchCoins" class="currency" style="margin:0 1rem;">
                    <option></option>
                </select>
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