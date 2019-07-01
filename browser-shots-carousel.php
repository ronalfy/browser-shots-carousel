<?php
/**
 * Plugin Name: Browser Shots Carousel
 * Plugin URI: https://mediaron.com/downloads/browser-shots-carousel/
 * Description: Show off your website screenshots in a carousel format.
 * Version: 1.0.0
 * Author: Ronald Huereca
 * Author URI: https://mediaron.com
 * Requires at least: 5.0
 * Contributors: ronalfy
 * Text Domain: browser-shots-carousel
 * Domain Path: /languages
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BROWSER_SHOTS_CAROUSEL_PLUGIN_NAME', 'Browser Shots Carousel' );
define( 'BROWSER_SHOTS_CAROUSEL_BEAVER_BUILDER_DIR', plugin_dir_path( __FILE__ ) );
define( 'BROWSER_SHOTS_CAROUSEL_BEAVER_BUILDER_URL', plugins_url( '/', __FILE__ ) );
define( 'BROWSER_SHOTS_CAROUSEL_BEAVER_BUILDER_VERSION', '1.0.0' );
define( 'BROWSER_SHOTS_CAROUSEL_BEAVER_BUILDER_SLUG', plugin_basename( __FILE__ ) );
define( 'BROWSER_SHOTS_CAROUSEL_BEAVER_BUILDER_FILE', __FILE__ );



/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
