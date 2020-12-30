<?php get_header(); ?>

<?php
// Template Name: Blog

$blog_url= get_bloginfo( 'template_directory' );
?>

<!-- MAIN -->
<div class="main">
    <!-- add partials here -->

    <div class="breadcrums">
        <div class="mbox">
            <ul>
                <li><a href="/"> דף הבית </a></li>
                <li><span> מאמרים </span></li>
            </ul>
        </div>
    </div>

    <div class="texter-part">
        <div class="mbox">
            <div class="contein-blog">

                <div class="blog-list">

                    <?php

                    $args = array(
                        'post_type' => 'blog',
                        'post_status' => 'publish',
                        'paged' =>  1,
                        'posts_per_page' => 5,
                        'caller_get_posts'=> 1
                    );
                    
                    $query = new WP_Query( $args );
                    ?>

                    <?php  if($query->have_posts()){?>
                        <?php while($query->have_posts()){ $query->the_post(); ?>


                            <a href="<?php echo get_permalink(); ?>" class="single">

                                <?php
                                    $thumbnail_attributes = wp_get_attachment_image_src( get_post_thumbnail_id( $post_->ID  ), 'full' );
                                ?>
                                <div class="con" <?php if(  $thumbnail_attributes == '' ){ echo 'style="background-color: #ccc;"';}; ?> >
                                    <img src="<?php echo $thumbnail_attributes[0]; ?>" alt="">
                                </div>
                                <div class="texter">
                                    <div class="name"> <?php the_title() ?> </div>
                                    <!--
                                    <p> <?php the_field('short_text_news', $post_->ID ); ?></p>
                                    -->
                                </div>
                            </a>

                        <?php } ?>
                    <?php  } ?>

                </div>

                <div class="after-all">

                    <script>

                        var true_posts = '<?php echo serialize($query->query_vars); ?>';
                        var current_page = <?php echo (get_query_var('paged')) ? get_query_var('paged') : 1; ?>;
                        var max_pages = '<?php echo $query->max_num_pages; ?>';

                    </script>

                    <a href="/wp-admin/admin-ajax.php" class="butt loadblog">
                        <span> הצג עוד</span>
                    </a>
                </div>
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

                <?php if (get_field('post_short_name_connected_to_api' ) == 'BTC' ) { ?>

                    <a href="https://www.coinmama.com/?ref=shay" class="butt type2" target="_blank">
                        <span>  להמרת ביטקויין ל<?php  the_field('post_name' ) ?></span>
                    </a>

                <?php } else {?>

                    <a  href="https://changelly.com/?ref_id=f9f7373bf362" class="butt type2" target="_blank">
                        <span>  להמרת ביטקויין ל<?php  the_field('post_name' ) ?></span>
                    </a>
                    <a href="https://www.coinmama.com/?ref=shay" class="butt type3" target="_blank">
                        <span> להמרת ש״ח לביטקויין </span>
                    </a>

                <?php }?>

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
                    <input type="text" name="name" value="" placeholder="שם (לא חובה)">
                </div>
                <div class="inputer">
                    <textarea name="error" placeholder="פירוט הטעות שמצאת" required="required" ></textarea>
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

<?php if (is_user_logged_in()) { ?>

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

<?php } ?>

<?php get_footer(); ?>