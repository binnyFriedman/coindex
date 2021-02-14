<div class="news-list" data-sticky_column>
    <?php
        if ( get_field('adsense') != '' ){
            the_field('adsense');
        }

    ?>

    <div class="convert" data-margin-top="20">
        <div class="head-name">
            <a href="/blog/"> מאמרים </a>
        </div>
        <!--<div class="small-side">

            <?php/*
            $currr = get_the_ID();
            wp_reset_postdata();
            $postsW = new WP_Query( array(
                'post_type'=>'blog',
                'meta_key' => 'post_views_count',
                'orderby' => 'meta_value_num',
                'post__not_in' => array( $currr ),
                'offset' => 0,
                'paged' => 1,
                'posts_per_page' => 3
            ) );


            while ( $postsW->have_posts() ) {
                $postsW->the_post();

                */?>

                <!-- <a href="<?php/* echo get_permalink();*/?>" class="single"> -->

                    <?php/*
                    $thumbnail_attributes = wp_get_attachment_image_src( get_post_thumbnail_id( $post_ID  ), 'full' ); /* возвращает массив параметров миниатюры */

                    /*if ( $thumbnail_attributes == '' ){
                         $thumbnail_attributes[0] = '/wp-content/themes/coindex/images/logo.png';
                    }

                    */?>
<!--
                    <div class="con" <?php/* if(  $thumbnail_attributes == '' ){ echo 'style="background-color: #ccc;"';}; */?> >
                        <img src="<?php/* echo $thumbnail_attributes[0]; */?>" alt="">
                    </div>
                    <div class="texter">
                        <div class="name"> <?php/* the_title() */?> </div>
                        <p> <?php/* the_field('short_text_news'); */?></p>
                    </div>
-->
                <!-- </a> -->


            <?php/*};

            wp_reset_postdata();
            */?>


        <!-- </div> -->

        <?php
            $args = array(
                'taxonomy' => 'taxblog',
                'hide_empty' => true,
            );
            $terms = get_terms( $args );

        ?>

        <ul class="head-tabs">
            <?php
                $int = 0;
            ?>

            <?php  foreach ($terms as $term ) : ?>

                <li  class="<?php if ($int == 0 ) { echo 'active'; } ?> ">
                    <a href="#">
                        <?php echo $term->name;?>
                    </a>
                </li>

                <?php $int++; ?>

            <?php endforeach; ?>

        </ul>
        <ul class="content-tabs">

            <?php
                $int2 = 0;
            ?>

            <?php  foreach ($terms as $term ) : ?>

                <li class="<?php if ( $int2 == 0 ) { echo 'active'; } ?>">
                    <div class="cont">
                        <div class="small-side">

                            <?php
                            $currr = get_the_ID();
                            wp_reset_postdata();
                            $postsW = new WP_Query( array(
                                'post_type'=>'blog',
                                'meta_key' => 'post_views_count',
                                'orderby' => 'meta_value_num',
                                'post__not_in' => array( $currr ),
                                'offset' => 0,
                                'paged' => 1,
                                'posts_per_page' => 3,
                                'tax_query' => array(
                                    array(
                                        'taxonomy' => 'taxblog',
                                        'field'    => 'slug',
                                        'terms'    => $term->slug
                                    )
                                )
                            ) );


                            while ( $postsW->have_posts() ) {
                                $postsW->the_post();
                                $thumb = get_the_post_thumbnail_url();
                                if(!$thumb){
                                    $thumb = '/wp-content/themes/coindex/images/logo.png';
                                }
                                ?>


                                <a href="<?php echo get_permalink();?>" class="single">

                                    <div class="con" >
                                        <img src="<?php echo $thumb; ?>" alt="">
                                    </div>
                                    <div class="texter">
                                        <div class="name"> <?php the_title()?> </div>
                                        
<!--                                    <p> --><?php //the_field('short_text_news');?><!--</p>-->
                                    </div>
                                </a>


                            <?php };

                            wp_reset_postdata();
                            ?>

                        </div>
                    </div>
                </li>

                <?php $int2++; ?>
            <?php endforeach; ?>
       </ul>
   </div>
</div>