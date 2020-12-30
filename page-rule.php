<?php get_header(); ?>
<?php
// Template Name: Rule

$blog_url= get_bloginfo( 'template_directory' );
?>

    <!-- MAIN -->
    <div class="main">
        <div class="breadcrums">
            <div class="mbox">
                <ul>
                    <li><a href="/"> דף הבית </a></li>
                    <li><span> <?php the_title(); ?>  </span></li>
                </ul>
            </div>
        </div>

        <div class="texter-part">
            <div class="mbox">
                <div class="parters">

                    <div class="convert-stick cfix" data-sticky-container>

                        <?php include( TEMPLATEPATH . '/partials/socials.php' );  ?>

                        <div class="text-part">
                            <div class="texter">
                                <h1><?php the_title(); ?></h1>

                                <?php the_content(); ?>

                                <br><br>

                            </div>

                            <div class="texter">
                                <p>חשוב לדעת: כל ההסברים על המטבעות השונים מבוססים על פרסומים של יוצריהם. אין לראות במידע כהמלצה, או כייעוץ.השימוש באתר על אחיות המשתמש/ת בלבד.</p>

                                <p>
                                    <a data-fancybox="" data-src="#find-error" href="javascript:;" class="pop-error">מצאת טעות? כתוב לנו</a>
                                </p>
                            </div>

                        </div>

                        <?php include( TEMPLATEPATH . '/partials/blog.php' );  ?>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- /MAIN -->



    </div>

<?php get_footer(); ?>