<?php

add_action( 'after_setup_theme', function() {
    remove_theme_support( 'core-block-patterns' );
} );

add_filter( 'should_load_remote_block_patterns', '__return_false' );

add_action( 'init', function() {
    if ( ! class_exists( 'WP_Block_Patterns_Registry' ) ) {
        return;
    }

    $theme_slug = 'twentytwentyfive';

    $patterns = (array) WP_Block_Patterns_Registry::get_instance()->get_all_registered();

    foreach ( $patterns as $pattern ) {
        if ( isset( $pattern['name'] ) && str_starts_with( $pattern['name'], $theme_slug ) ) {
            if (
				( 	isset($pattern['properties']['blockTypes'][0]) && str_starts_with( $pattern['properties']['blockTypes'][0], "core/template-part" ) ) ||
					str_starts_with( $pattern['name'], $theme_slug . '/hidden')  ||
					str_starts_with( $pattern['name'], $theme_slug . '/template')  
				) {
                continue;
            }
            unregister_block_pattern( $pattern['name'] );
        }
    }
} );

?>
