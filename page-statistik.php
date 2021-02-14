<?php get_header(); ?>
<?php
// Template Name: Statistic

$blog_url= get_bloginfo( 'template_directory' );
?>

    <script type="text/javascript" src="<?php echo $blog_url; ?>/addon/tablesort.js" ></script>

    <style>
        th[role=columnheader]:not(.no-sort) {
            cursor: pointer;
        }

        th[role=columnheader]:not(.no-sort):after {
            margin-left: 10px;
            content: '';
            float: right;
            margin-top: 7px;
            border-width: 0 4px 4px;
            border-style: solid;
            border-color: #404040 transparent;
            visibility: hidden;
            opacity: 1;
            -ms-user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }

        th[aria-sort=ascending]:not(.no-sort):after {
            border-bottom: none;
            border-width: 4px 4px 0;
        }

        th[aria-sort]:not(.no-sort):after {
            visibility: visible;
            opacity: 1;
        }

        th[role=columnheader]:not(.no-sort):hover:after {
            visibility: visible;
            opacity: 1;
        }
    </style>


    <!-- MAIN -->
    <div class="main">
        <div class="text-part single-texter ">
            <div class="bread-row">
                <div class="mbox">
                    <ul>
                        <li><a href="/"> דף הבית </a></li>
                        <li><span> <?php the_title(); ?>  </span></li>
                    </ul>
                </div>
            </div>
            <div class="mbox bottom-content">
                <div class="title-page">
                    <h1> <?php the_title(); ?> </h1>
                </div>
                <div class="texter">
                    <style>
                        tr td { padding: 5px; border: 1px solid #ccc; }
                        tr th {  padding: 10px; }
                    </style>
                    <table id="table-id">
                        <thead>
                            <tr data-sort-method='none'>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Content</th>
                                <th>Video</th>
                                <th>Icon</th>
                                <th>Image</th>
                                <th>Edit</th>
                            </tr>
                        </thead>

                        <tbody>

                            <?php
                                $lastposts = get_posts( array(
                                    'posts_per_page' => -1,
                                    'orderby'     => 'title',
                                    'order' => 'ASC'
                                ) );

                                if ( $lastposts ) {
                                    $index = 1;
                                    foreach ( $lastposts as $post ) :
                                        setup_postdata( $post ); ?>

                                        <?php
                                            $postID = $post->ID;
                                            $currentContent = get_field('post_description', $postID );
                                            $currentIcon  = get_field('post_image', $postID );
                                            $currentShort = get_field('post_short_name_connected_to_api', $postID );



                                            if ( $currentContent == '' || ( strpos( $currentContent, "iframe" ) && substr_count($currentContent, '<p>') == 1 ) ){
                                                $colorContent = 'red';
                                            } else {
                                                $colorContent = 'green';
                                            }

                                            if (strpos( $currentContent, "iframe" )) {
                                                $colorCVideo = 'green';
                                            } else {
                                                $colorCVideo = 'red';
                                            }

                                            if (strpos( $currentContent, "img" )) {
                                                $colorImage = 'green';
                                            } else {
                                                $colorImage = 'red';
                                            }

                                            if ( $currentIcon != '' ) {
                                                $colorIcon = 'green';
                                            } else {
                                                $colorIcon = 'red';
                                            }


                                        ?>

                                        <tr data-short="<?php echo $currentShort;?>" >
                                            <td >

                                            </td>
                                            <td>
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </td>
                                            <td>

                                                <div class="coll" style="background-color: <?php echo $colorContent; ?>; width: 30px; height: 30px;" >
                                                    <?php
                                                        if ( $currentContent == '' || ( strpos( $currentContent, "iframe" ) && substr_count($currentContent, '<p>') == 1 ) ){
                                                            echo '0';
                                                        } else {
                                                            echo '1';
                                                        }
                                                    ?>
                                                </div>
                                            </td>
                                            <td>

                                                <div class="coll" style="background-color: <?php echo $colorCVideo; ?>; width: 30px; height: 30px;" >
                                                    <?php
                                                        if ( strpos( $currentContent, "iframe" ) ){
                                                            echo '1';
                                                        } else {
                                                            echo '0';
                                                        }
                                                    ?>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="coll" style="background-color: <?php echo $colorIcon; ?>; width: 30px; height: 30px;" >
                                                    <?php
                                                        if ( $currentIcon != '' ) {
                                                            echo '1';
                                                        } else {
                                                            echo '0';
                                                        }
                                                    ?>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="coll" style="background-color: <?php echo $colorImage; ?>; width: 30px; height: 30px;" >
                                                    <?php
                                                        if (strpos( $currentContent, "img" )) {
                                                            echo '1';
                                                        } else {
                                                            echo '0';
                                                        }
                                                    ?>
                                                </div>
                                            </td>
                                            <td>
                                                <?php edit_post_link('edit', '<p>', '</p>'); ?>
                                            </td>
                                        </tr>
                                        <?php the_content(); ?>
                                    <?php
                                    $index++;
                                    endforeach;
                                    wp_reset_postdata();
                                }
                            ?>

                        </tbody>

                    </table>


                </div>
            </div>
        </div>
    </div>
    <!-- /MAIN -->



    </div>

    <script>
        new Tablesort(document.getElementById('table-id'));
    </script>

<?php get_footer(); ?>