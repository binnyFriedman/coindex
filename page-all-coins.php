<?php
// Template Name: All coins
get_header();
$blog_url= get_bloginfo( 'template_directory' );
?>
    <script>
        window.fetchCoinIds = false;
    </script>
    <!-- MAIN -->
    <div class="main">
        <!-- add partials here -->

        <?php if( get_field('show_bunner') ): ?>
            <div class="bunner-row">
                <div class="mbox">
                    <a href="<?php the_field('main_bunner_url');?>" class="con">
                        <img src="<?php the_field('main_bunner_image');?>" alt="">
                    </a>
                </div>
            </div>
        <?php endif; ?>

        <div class="title-part">
            <div class="mbox">
                <div class="title-part">
                    <h1> שערי המטבעות הדיגיטליים
                    </h1>
                </div>
            </div>
        </div>


        <div class="table-wrap">
            <div class="mbox">
                <div class="convert-table">
                    <div class="contein-list" id="coins-content">

                        <div class="table-row title-row">
                            <div class="content">
                                <div class="counter">
                                    <div class="name no-sorter"> #</div>
                                </div>
                                <div class="long">
                                    <div class="name no-sorter"> שם</div>
                                </div>
                                <div class="short">
                                    <div class="name no-sorter"> סימול</div>
                                </div>
                                <div class="price sort"  >
                                    <div class="name " data-sort="price"> מחיר</div>
                                </div>
                                <div class="mktcap sort"  >
                                    <div class="name " data-sort="market_cap"> שווי שוק</div>
                                </div>
                                <div class="usdVolume sort"  >
                                    <div class="name" data-sort="volume_24h"> מחזור 24ש</div>
                                </div>
                                <div class="cap24hrChange sort"  >
                                    <div class="name" data-sort="percent_change_24h"> שינוי 24ש</div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="load-more">
                            <div class="load-more butt"><span>הצג 100 נוספים</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="news-wrap">
            <div class="mbox">
                <div class="con-block">
                    <div class="title-row">
                        <h2>
                            <a href="/blog/"> מאמרים </a>
                        </h2>
                    </div>

                    <div class="contein">

                        <div class="small-side">

                            <?php
                            wp_reset_postdata();
                            $postsW = new WP_Query( array(
                                'post_type'=>'blog',
                                'meta_key' => 'post_views_count',
                                'orderby' => 'meta_value_num',
                                'offset' => 2,
                                'paged' => 1,
                                'posts_per_page' => 6
                            ) );


                            while ( $postsW->have_posts() ) {
                                $postsW->the_post();

                                ?>

                                <a href="<?php echo get_permalink(); ?>" class="single">

                                    <?php
                                    $thumbnail_attributes = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID  ), 'full' ); // возвращает массив параметров миниатюры

                                    if ( $thumbnail_attributes == '' ){
                                        // $thumbnail_attributes[0] = '/wp-content/themes/coindex/images/logo.png';
                                    }

                                    ?>
                                    <div class="con" <?php if(  $thumbnail_attributes == '' ){ echo 'style="background-color: #ccc;"';}; ?> >
                                        <img src="<?php echo $thumbnail_attributes[0]; ?>" alt="">
                                    </div>
                                    <div class="texter">
                                        <div class="name"> <?php the_title() ?> </div>

                                        <?php
                                        $gettext = get_field('short_text_news');
                                        ?>

                                        <p> <?php substr( htmlspecialchars( $gettext ), 0, 30); ?></p>
                                    </div>
                                </a>


                            <?php };

                            wp_reset_postdata();
                            ?>
                        </div>
                        <div class="big-side">

                            <?php
                            wp_reset_postdata();
                            $postsW = new WP_Query( array(
                                'post_type'=>'blog',
                                'meta_key' => 'post_views_count',
                                'orderby' => 'meta_value_num',
                                'offset' => 0,
                                'paged' => 1,
                                'posts_per_page' => 2
                            ) );


                            while ( $postsW->have_posts() ) {
                                $postsW->the_post();

                                ?>

                                <a href="<?php echo get_permalink(); ?>" class="single">
                                    <?php
                                    $thumbnail_attributes = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID  ), 'full' ); // возвращает массив параметров миниатюры

                                    if ( $thumbnail_attributes == '' ){
                                        // $thumbnail_attributes[0] = '/wp-content/themes/coindex/images/logo.png';
                                    }

                                    ?>
                                    <div class="con" <?php if(  $thumbnail_attributes == '' ){ echo 'style="background-color: #ccc;"';}; ?> >
                                        <img src="<?php echo $thumbnail_attributes[0]; ?>" alt="">
                                    </div>
                                    <div class="texter">
                                        <div class="name"> <?php the_title() ?> </div>

                                        <?php
                                        $gettext = get_field('short_text_news', $post->ID );
                                        ?>

                                        <p> <?php // echo $gettext; ?></p>
                                    </div>
                                </a>


                            <?php };

                            wp_reset_postdata();
                            ?>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- /MAIN -->




<?php get_footer(); ?>