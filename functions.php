 <?php
// remove_filter ('the_content',  'wpautop');
 add_filter( 'the_content', 'wpautop' );

    add_theme_support( 'post-thumbnails' );

    $includes_path = TEMPLATEPATH . '/includes/';
    require_once $includes_path . 'login.php';
    require_once $includes_path . 'load-blog.php';

     /* logo */
        add_action( 'after_setup_theme', 'coindex_setuplogo' );
        function coindex_setuplogo() {
            add_theme_support( 'custom-logo', array(
                'width' => 250,
                'height' => 100,
                'flex-width' => true,
                'flex-height' => true,
                'header-text' => array('site-title', 'site-description')
            ));
        }

    /* menu */
    add_action( 'after_setup_theme', 'coindex_menu' );

    function coindex_menu() {
        register_nav_menus( ['primary'=> __( 'Primary Menu', 'theme-text-domain' ),
            'footer_posts'=> __( 'Posts location', 'theme-text-domain')
            ]  );
    }

    /* footer contacts */

    function coindex_customize_register( $wp_customize ) {

        /* info */
        $wp_customize->add_section( 'coindex_contact_name' , array(
            'title'      => __( 'Edit contacts in footer', 'coindex' ),
            'priority'   => 30,
        ));


        $wp_customize->add_setting( 'footer_contact_phone' , array(
            'default'   => __('+00000000000'),
            'transport' => 'refresh',
        ));

        $wp_customize->add_setting( 'footer_contact_email' , array(
            'default'   => __('mail@mail.com'),
            'transport' => 'refresh',
        ));

        $wp_customize->add_setting( 'footer_slogan' , array(
            'default'   => __('Footer with solid color background and a contact form, Easily add subscribe and contact forms without any server-side integration.'),
            'transport' => 'refresh',
        ));

        $wp_customize->add_control( 'footer_contact_phone', array(
            'label'      => __( 'Footer contact phone', 'coindex' ),
            'section'    => 'coindex_contact_name',
            'settings'   => 'footer_contact_phone',
            'type' => 'text',
        ));

        $wp_customize->add_control( 'footer_contact_email', array(
            'label'      => __( 'Footer contact email', 'coindex' ),
            'section'    => 'coindex_contact_name',
            'settings'   => 'footer_contact_email',
            'type' => 'text',
        ));

        $wp_customize->add_control( 'footer_slogan', array(
            'label'      => __( 'Footer slogan', 'coindex' ),
            'section'    => 'coindex_contact_name',
            'settings'   => 'footer_slogan',
            'type' => 'textarea',
        ));

        /* copyright */

        $wp_customize->add_section( 'coindex_copyright' , array(
            'title'      => __( 'Edit copyright text', 'coindex' ),
            'priority'   => 30,
        ));

        $wp_customize->add_setting( 'footer_copyright_text' , array(
            'default'   => __('© Copyright 2018 - All Rights Reserved'),
            'transport' => 'refresh',
        ));

        $wp_customize->add_control( 'footer_copyright', array(
            'label'      => __( 'Footer slogan', 'coindex' ),
            'section'    => 'coindex_copyright',
            'settings'   => 'footer_copyright_text',
            'type' => 'textarea',
        ));

    }




    add_action( 'customize_register', 'coindex_customize_register' );


    // function to display number of posts.
    function getPostViews($postID){
        $count_key = 'post_views_count';
        $count = get_post_meta($postID, $count_key, true);
        if($count==''){
            delete_post_meta($postID, $count_key);
            add_post_meta($postID, $count_key, '0');
            return "0 View";
        }
        return $count.' Views';
    }

    // function to count views.
    function setPostViews($postID) {
        $count_key = 'post_views_count';
        $count = get_post_meta($postID, $count_key, true);
        if($count==''){
            $count = 0;
            delete_post_meta($postID, $count_key);
            add_post_meta($postID, $count_key, '0');
        }else{
            $count++;
            update_post_meta($postID, $count_key, $count);
        }
    }


    // Add it to a column in WP-Admin
    add_filter('manage_posts_columns', 'posts_column_views');
    add_action('manage_posts_custom_column', 'posts_custom_column_views',5,2);
    function posts_column_views($defaults){
        $defaults['post_views'] = __('Views');
        return $defaults;
    }
    function posts_custom_column_views($column_name, $id){
        if($column_name === 'post_views'){
            echo getPostViews(get_the_ID());
        }
    }


add_action( 'init', 'create_taxblog', 0 );
function create_taxblog() {
    $args = array(
         'label' => _x( 'Category', 'taxonomy general name' ),
         'labels' => array(
             'name' => _x( 'Category', 'taxonomy general name' ),
             'singular_name' => _x( 'Category', 'taxonomy singular name' ),
             'menu_name' => __( 'Category' ),
             'all_items' => __( 'All ' ),
             'edit_item' => __( 'edit' ),
             'view_item' => __( 'view' ),
             'update_item' => __( 'update' ),
             'add_new_item' => __( 'add new' ),
             'new_item_name' => __( 'Name' ),
             'parent_item' => __( 'parent' ),
             'parent_item_colon' => __( 'parent:' ),
             'search_items' => __( 'search' ),
             'popular_items' => null,
             'separate_items_with_commas' => null,
             'add_or_remove_items' => null,
             'choose_from_most_used' => null,
             'not_found' => __( 'not found' ),
         ),
         'public' => true,
         'show_ui' => true,
         'show_in_menu' => true,
         'show_in_nav_menus' => true,
         'show_tagcloud' => true,
         'show_in_quick_edit' => true,
         'meta_box_cb' => null,
         'show_admin_column' => true,
         'description' => '',
         'hierarchical' => true,
         'update_count_callback' => '',
         'query_var' => true,
         'rewrite' => array(
             'slug' => 'taxblog',
             'with_front' => true,
             'hierarchical' => true,
             'ep_mask' => EP_NONE,
         ),

         'sort' => null,
         '_builtin' => false,
     );
     register_taxonomy( 'taxblog', array('blog'), $args );
}


add_action( 'init', 'cpt_news_calback' );

function cpt_news_calback() {

    $labels = array(
        "name" => "News",
        "singular_name" => "News",
        "menu_name" => "News",
        "all_items" => "All news",
        "add_new" => "Add New",
        "add_new_item" => "Add New",
        "edit" => "Edit",
        "edit_item" => "Edit",
        "new_item" => "New item",
        "view" => "View",
        "view_item" => "View item",
        "search_items" => "Search item",
        "not_found" => "No found",
        "not_found_in_trash" => "No found",
    );

    $args = array(
        "labels" => $labels,
        "description" => "",
        "public" => true,
        "show_ui" => true,
        "has_archive" => false,
        "show_in_menu" => true,
        "exclude_from_search" => true,
        "capability_type" => "post",
        "map_meta_cap" => true,
        "hierarchical" => true,
        "rewrite" => true,
        "query_var" => true,
        "menu_position" => 10,
        "menu_icon" => "dashicons-format-aside",
        "supports" => array( "title", 'thumbnail', "editor" ),
    );

    register_post_type( "blog", $args );


}

