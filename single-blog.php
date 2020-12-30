<?php get_header(); ?>

<?php setPostViews(get_the_ID()); ?>
<!-- MAIN -->
<div class="main">
    <!-- add partials here -->

    <div class="breadcrums">
        <div class="mbox">
            <ul>
                <li><a href="/"> דף הבית </a></li>
                <li><a href="/blog/"> מאמרים </a></li>
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

                            <h1> <?php the_title(); ?> </h1>
                            <br>
                            <?php the_content(); ?>
                            <br>
                            <br>

                        </div>

                        <div class="texter">
                            <p>חשוב לדעת: כל ההסברים על המטבעות השונים מבוססים על פרסומים של יוצריהם. אין לראות במידע כהמלצה, או כייעוץ.השימוש באתר על אחיות המשתמש/ת בלבד.</p>

                            <p>
                                <a data-fancybox="" data-src="#find-error" href="javascript:;" class="pop-error">מצאת טעות? כתוב לנו</a>
                            </p>
                        </div>

                    </div>

                    <?php include( TEMPLATEPATH . '/partials/blog.php' );?>
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

                <?php if (get_field('post_short_name_connected_to_api' ) == 'BTC' ) : ?>

                    <a href="https://www.coinmama.com/?ref=shay" class="butt type2" target="_blank">
                        <span>  להמרת ביטקויין ל<?php  the_field('post_name' ) ?></span>
                    </a>

                <?php else :?>

                    <a  href="https://changelly.com/?ref_id=f9f7373bf362" class="butt type2" target="_blank">
                        <span>  להמרת ביטקויין ל<?php  the_field('post_name' ) ?></span>
                    </a>
                    <a href="https://www.coinmama.com/?ref=shay" class="butt type3" target="_blank">
                        <span> להמרת ש״ח לביטקויין </span>
                    </a>

                <?php endif;?>

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
                    <input type="text" name="name" required value="" placeholder="שם (לא חובה)">
                </div>
                <div class="inputer">
                    <textarea name="error" placeholder="פירוט הטעות שמצאת" required></textarea>
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

<?php if (is_user_logged_in()) : ?>

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

<?php endif;?>

<?php get_footer(); ?>
