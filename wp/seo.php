

    <?php
// header 
    if(have_posts())
    {
        the_post(); 
        ?>

        <title><?php echo get_post_meta( $post->ID, 'seo_title', true );  ?></title>

        <meta name="description" content="<?php echo get_post_meta( $post->ID, 'seo_desc', true );  ?>">

        <meta name="keywords" content="<?php echo get_post_meta( $post->ID, 'seo_key', true );  ?>">

        <?php

        rewind_posts(); //Resets the Loop. Very important for using the Loop later.
    }

?>


<?php

// meta box file

function add_seo_meta_box() {
    $post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] ;
    $template_file = get_post_meta($post_id,'_wp_page_template',TRUE);
// check for a template type
    $types = array('page','post','esittelyt','talomallisto','offices','edustajat','blogi','cities','yhteystiedot');
//,'esittelyt','talomallisto','offices','edustajat','blogi','cities'
    foreach( $types as $type ) {
    add_meta_box(
            'seo_meta_box',
            'seo',
            'show_seo_meta_box',
            $type,
            'normal',
            'high'
        );
    }
}

add_action('add_meta_boxes', 'add_seo_meta_box');

// Field Array
$prefix = 'seo_';
$seo_meta_fields = array(
    array(
        'label'=> 'title',
        'id'    => $prefix.'title',
        'type'  => 'text'
    ),
    array(
        'label'=> 'description',
        'id'    => $prefix.'desc',
        'type'  => 'text'
    ),
    array(
        'label'=> 'keywords',
        'id'    => $prefix.'key',
        'type'  => 'text'
    ),
);

// The Callback
function show_seo_meta_box() {
    global $seo_meta_fields, $post;
// Use nonce for verification
    echo '<input type="hidden" name="custom_meta_box_nonce" value="'.wp_create_nonce(basename(__FILE__)).'" />';

// Begin the field table and loop
    echo '<table class="form-table">';
    foreach ($seo_meta_fields as $field) {
        // get value of this field if it exists for this post
        $meta = get_post_meta($post->ID, $field['id'], true);
        // begin a table row with
        echo '<tr>
        <th><label for="'.$field['id'].'">'.$field['label'].'</label></th>
        <td>';
        switch($field['type']) {
            // case items will go here
            case 'text':
                echo '<input type="text" name="'.$field['id'].'" id="'.$field['id'].'" value="'.$meta.'" style="width: 100%; height: 40px;" />
            <br />';
                break;
            case 'textarea':
                echo '<textarea name="'.$field['id'].'" id="'.$field['id'].'" style="width: 100%; height: 80px;" />'.$meta.'</textarea>
            <br />';
                break;
            case 'editor':
                wp_editor( htmlspecialchars_decode($meta), $field['id'] );
                break;
            case 'upload':
                echo '<p class="image-upload"><img src="'.$meta.'" name="'.$field['id'].'" style="max-width: 300px; max-height: 200px;" /><input type="text" class="custom_media_url hidden" name="'.$field['id'].'" id="'.$field['id'].'" value="'.$meta.'" style="width: 100%; height: 40px;" /><br />
        <input type="button" class="button button-primary custom_media_button" name="'. $field['id'] .'" value="Upload Image" style="margin-top:5px;" /></p>';
                break;
            case 'separate':
                echo '<hr />';
                break;
        } //end switch
        echo '</td></tr>';
    } // end foreach
    echo '</table>'; // end table
}


// Save the Data
function save_seo_meta($post_id) {
    global $seo_meta_fields;

// verify nonce
    if (!wp_verify_nonce($_POST['custom_meta_box_nonce'], basename(__FILE__)))
        return $post_id;
// check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
        return $post_id;
// check permissions
    if ('page' == $_POST['post_type']) {
        if (!current_user_can('edit_page', $post_id))
            return $post_id;
    } elseif (!current_user_can('edit_post', $post_id)) {
        return $post_id;
    }

// loop through fields and save the data
    foreach ($seo_meta_fields as $field) {
        $old = get_post_meta($post_id, $field['id'], true);
        $new = $_POST[$field['id']];
        if ($new && $new != $old) {
            update_post_meta($post_id, $field['id'], $new);
        } elseif ('' == $new && $old) {
            delete_post_meta($post_id, $field['id'], $old);
        }
    } // end foreach
}
add_action('save_post', 'save_seo_meta');

?>