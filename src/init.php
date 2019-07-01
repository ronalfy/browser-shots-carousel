<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function browser_shots_carousel_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'browser_shots_carousel', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		BROWSER_SHOTS_CAROUSEL_BEAVER_BUILDER_VERSION
	);

	// Register block editor script for backend.
	wp_register_script(
		'browser_shots_carousel', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		BROWSER_SHOTS_CAROUSEL_BEAVER_BUILDER_VERSION,
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'browser_shots_carousel_editor', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		BROWSER_SHOTS_CAROUSEL_BEAVER_BUILDER_VERSION
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'browser-shots/browser-shots-carousel',
		array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'browser_shots_carousel',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'browser_shots_carousel',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'browser_shots_carousel_editor',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'browser_shots_carousel_assets' );
