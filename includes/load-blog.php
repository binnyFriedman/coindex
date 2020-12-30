<?php

function true_load_posts(){

    $args = unserialize(stripslashes($_POST['query']));
    $args['paged'] = $_POST['page'] + 1; // следующая страница
    $args['post_status'] = 'publish';
    $q = new WP_Query($args);
    if( $q->have_posts() ):
        while($q->have_posts()): $q->the_post();

            ?>


            <a href="<?php echo get_permalink(); ?>" class="single">

                <?php
                $thumbnail_attributes = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' );
                ?>
                <div class="con" <?php if(  $thumbnail_attributes == '' ){ echo 'style="background-color: #ccc;"';}; ?> >
                    <img src="<?php echo $thumbnail_attributes[0]; ?>" alt="">
                </div>
                <div class="texter">
                    <div class="name"> <?php the_title() ?> </div>
                    <p> <?php the_field('short_text_news'); ?></p>
                </div>
            </a>

        <?php
        endwhile;
    endif;
    wp_reset_postdata();
    die();
}


add_action('wp_ajax_loadmore_blog', 'true_load_posts');
add_action('wp_ajax_nopriv_loadmore_blog', 'true_load_posts');


?>