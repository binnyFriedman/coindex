<?php get_header(); ?>
<?php
// Template Name: Dictionary
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

        <div class="texter-part lib-text">
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

    <div class="hidden-block">

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

<?php get_footer(); ?>