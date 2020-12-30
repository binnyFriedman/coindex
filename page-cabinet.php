<?php if (is_user_logged_in()) { ?>

<?php get_header(); ?>
<?php
// Template Name: Cabinet
$blog_url= get_bloginfo( 'template_directory' );
?>
    <script>
        var urlDataText = 'http://coincap.io/page/BTC';
        var urlDataGraph = 'http://coincap.io/history/30day/BTC';
    </script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <script>
        var isItCabinet = true;
    </script>

<div class="main">

    <div class="breadcrums">
        <div class="mbox">
            <ul>
                <li><a href="/"> דף הבית </a></li>
                <li><span> <?php the_title(); ?>  </span></li>
            </ul>
        </div>
    </div>


    <div class="cab-infos">
        <div class="mbox">
            <div class="topper-line">
                <div class="name">
                    <h1><?php the_title(); ?></h1>
                </div>
                <div class="stats">
                    <div id="header"></div>
                </div>
            </div>
            <div class="drowing">
                <div class="top-line">
                    <div class="links">
                        <a href="/1day/" class="day small-butt ">Today</a>
                        <a href="/7day/" class="day small-butt">1W</a>
                        <a href="/30day/" class="day small-butt active">1M</a>
                        <a href="/90day/" class="day small-butt">3M</a>
                        <a href="/180day/" class="day small-butt">6M</a>
                        <a href="/365day/" class="day small-butt">1Y</a>
                    </div>
                </div>
                <div class="topper-graph">
                    <div id="curve_chart_cab"></div>
                </div>
            </div>

        </div>
    </div>

    <div class="cab-page">
        <div id=app></div>
    </div>

    <div class="after-button">
        <div class="mbox">
            <a href="#pop-valute" class="go-to-main">
                <span>הוסף מטבע לתיק האישי</span>
            </a>
        </div>
    </div>




</div>

    <div class="hidden-block">


        <div id="pop-valute">
            <div class="contein">
                <div class="closer-pop"><span></span> <span></span></div>
                <div id="popup"></div>
            </div>
        </div>


        <?php
        $lastposts = get_posts( array(
            'numberposts' => -1,
        ) );
        foreach ( $lastposts as $post ) :

            setup_postdata( $post );
            ?>

            <?php $image = wp_get_attachment_image_src(get_field('post_image'), 'full'); ?>

            <style>
                .con-img.sprite-<?php  the_field('post_short_name_connected_to_api', $post_->ID ) ?> {
                    background-image: url("<?php the_field('post_image' , $post_->ID ) ?>");
                }
            </style>

            <div id="call-popup-<?php the_field('post_short_name_connected_to_api', $post_->ID )  ?>" class="popup">
                <div class="contein-popup">
                    <div class="head-text">  עליך להחזיק ארנק ביטקויין, על מנת שתוכל לקנות מטבע מסוג <?php  the_field('post_name', $post_->ID ) ?></div>
                    <div class="chooser">

                        <a href="<?php  the_field('link_bye_for_dollars', $post_->ID ) ?>" class="butt" target="_blank">
                            <span>  להמרת ביטקויין ל<?php  the_field('post_name', $post_->ID ) ?></span>
                        </a>
                        <a href="<?php  the_field('link_bye_for_shakle', $post_->ID ) ?>" class="butt" target="_blank">
                            <span> להמרת ש״ח לביטקויין </span>
                        </a>

                    </div>
                </div>
            </div>
        <?php
        endforeach;
        wp_reset_postdata();
        ?>


    </div>


    <?php get_footer(); ?>

<?php } else { ?>

    <?php
        header("Location: /");
        die();
    ?>

<?php } ?>
