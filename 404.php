<?php get_header(); ?>
<?php
// Template Name: Rule

$blog_url= get_bloginfo( 'template_directory' );
?>

    <!-- MAIN -->
    <div class="main">

        <div class="main">
            <!-- add partials here -->
            <div class="page404" style="background-image: url(<?php echo $blog_url; ?>/images/404.jpg);">
                <div class="contein">
                    <h1>404</h1>
                    <h2>oops! </h2>
                    <p> we can’t seem to find <br /> the page you’re looking for </p>
                    <div class="after-butt">
                        <a href="/" class="butt"><span>go back home</span></a>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- /MAIN -->



    </div>

<?php get_footer(); ?>