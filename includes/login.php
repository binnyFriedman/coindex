<?php

    add_action('wp_ajax_deleteFromSteakCurrent', 'del_from_steak_current');
    add_action('wp_ajax_nopriv_deleteFromSteakCurrent', 'del_from_steak_current');


    function del_from_steak_current(){

        $userID = 'user_' . $_POST['userID'] ;
        $pp = stripslashes( str_replace('"', "",$_POST['named'] ) ) ;

        if( have_rows('user_coins_list', $userID ) ) {
            while ( have_rows('user_coins_list', $userID ) ) :  the_row();
                $i = 1;
                $value =  get_sub_field('user_coins_list_name');

                if ( $value == $pp ) {
                    $curr = get_row_index();
                }
                $i++;

            endwhile;
        }

        delete_row('user_coins_list', $curr , $userID );
        echo true;
        wp_die();
    }

    add_action('wp_ajax_addToSteakCurrent', 'add_to_steak_current');
    add_action('wp_ajax_nopriv_addToSteakCurrent', 'add_to_steak_current');


    function add_to_steak_current(){

        $userID = 'user_' . $_POST['userID'] ;

        $row = array(
            'user_coins_list_name'	=>  str_replace('"', "", $_POST['named']),
            'user_coins_list_count'	=>  str_replace('"', "", $_POST['summ']),
            'user_coins_list_price'	=>  str_replace('"', "", $_POST['price']),
            'user_coins_list_time'	=>  str_replace('"', "", $_POST['time'])
        );

        add_row( 'user_coins_list', $row , $userID );

        echo true;

        wp_die();
    }

    add_action('wp_ajax_cangeCabItem', 'change_steak_item');
    add_action('wp_ajax_nopriv_cangeCabItem', 'change_steak_item');


    function change_steak_item(){

        $userID = 'user_' . $_POST['userID'] ;
        $pp = stripslashes( str_replace('"', "",$_POST['named'] ) ) ;


        if( have_rows('user_coins_list', $userID ) ) {
            while ( have_rows('user_coins_list', $userID ) ) :  the_row();
                $i = 1;
                $value =  get_sub_field('user_coins_list_name');

                if ( $value == $pp ) {

                    update_sub_field('user_coins_list_count' , str_replace('"', "", $_POST['summ']) );
                }
                $i++;

            endwhile;
        }

        echo true;
        wp_die();
    }



// add new post type

    add_action( 'init', 'cpt_mail_calback' );

    function cpt_mail_calback() {

        $labels = array(
            "name" => "Mail",
            "singular_name" => "Mail",
            "menu_name" => "Mail",
            "all_items" => "All mail",
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
            "rewrite" => false,
            "query_var" => true,
            "menu_position" => 7,
            "menu_icon" => "dashicons-email-alt",
            "supports" => array( "title", "editor" ),
        );

        register_post_type( "mail", $args );

    }


    function send_mail() {

        $admin_email = get_option('admin_email');

        $client_fio = $_POST['name'];
        $client_mail = $_POST['page'];
        $client_quest = $_POST['error'];

        /* send mail */
        $emailTo = $admin_email;
        $subject = 'SOME ERROR on coindex.co.il';
        $headers = "Content-type: text/html; charset=\"utf-8\"";
        $mailBody = "$client_fio <br/><br/> $client_mail <br/><br/> $client_quest";

        wp_mail($emailTo, $subject, $mailBody, $headers);

        /* create new post */
        $post_data = array(
            'post_title'    =>  $client_fio,
            'post_content'  =>  $client_mail . '<br/>' . $client_quest,
            'post_status'   =>  'publish',
            'post_author'   =>  1,
            'post_type' => 'mail',
        );

        wp_insert_post( $post_data );

        echo 'true';
        
        die();

    }

    add_action("wp_ajax_send_mail", "send_mail");
    add_action("wp_ajax_nopriv_send_mail", "send_mail");






/**
 * Extend WordPress search to include custom fields
 *
 * https://adambalee.com
 */

/**
 * Join posts and postmeta tables
 */
function cf_search_join( $join ) {
    global $wpdb;

    if ( is_search() ) {
        $join .=' LEFT JOIN '.$wpdb->postmeta. ' ON '. $wpdb->posts . '.ID = ' . $wpdb->postmeta . '.post_id ';
    }

    return $join;
}
add_filter('posts_join', 'cf_search_join' );

/**
 * Modify the search query with posts_where
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_where
 */
function cf_search_where( $where ) {
    global $pagenow, $wpdb;

    if ( is_search() ) {
        $where = preg_replace(
            "/\(\s*".$wpdb->posts.".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
            "(".$wpdb->posts.".post_title LIKE $1) OR (".$wpdb->postmeta.".meta_value LIKE $1)", $where );
    }

    return $where;
}
add_filter( 'posts_where', 'cf_search_where' );

/**
 * Prevent duplicates
 *
 * http://codex.wordpress.org/Plugin_API/Filter_Reference/posts_distinct
 */
function cf_search_distinct( $where ) {
    global $wpdb;

    if ( is_search() ) {
        return "DISTINCT";
    }

    return $where;
}
add_filter( 'posts_distinct', 'cf_search_distinct' );


?>