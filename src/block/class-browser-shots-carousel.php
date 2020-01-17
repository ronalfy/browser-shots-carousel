<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 * Also register rest route and initialize Gutenberg block.
 *
 * @since   1.0.0
 * @package browser-shots-carousel
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Browser shots Carousel Block initialization.
 */
class Browser_Shots_Carousel {

	/**
	 * Initialize actions for Gutenberg.
	 *
	 * @since 2.7.0
	 */
	public function __construct() {

		add_action( 'init', array( $this, 'register_block' ) );

	}


	/**
	 * Registers the block in PHP and its attributes.
	 *
	 * @since 2.7.0
	 */
	public function register_block() {

		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Register block styles for both frontend + backend.
		wp_register_style(
			'browser_shots_carousel', // Handle.
			plugins_url( 'dist/blocks.style.build.css', dirname( dirname( __FILE__ ) ) ), // Block style CSS.
			array( 'wp-editor' ), // Dependency to include the CSS after it.
			BROWSER_SHOTS_CAROUSEL_VERSION
		);

		// Register block editor script for backend.
		wp_register_script(
			'browser_shots_carousel', // Handle.
			plugins_url( '/dist/blocks.build.js', dirname( dirname( __FILE__ ) ) ), // Block.build.js: We register the block here. Built with Webpack.
			array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
			BROWSER_SHOTS_CAROUSEL_VERSION,
			true // Enqueue the script in the footer.
		);

		// // Register Fancy Box.
		wp_register_script(
			'fancybox', // Handle.
			BROWSER_SHOTS_CAROUSEL_URL . 'src/fancybox.js',
			array( 'jquery' ),
			BROWSER_SHOTS_CAROUSEL_VERSION,
			true // Enqueue the script in the footer.
		);

		// Register Nivo Slider for front and backend.
		wp_register_script(
			'nivo-slider', // Handle.
			BROWSER_SHOTS_CAROUSEL_URL . 'src/jquery.nivo.slider.pack.js',
			array( 'jquery' ),
			BROWSER_SHOTS_CAROUSEL_VERSION,
			true // Enqueue the script in the footer.
		);
		wp_localize_script(
			'nivo-slider',
			'browser_shots_nivo',
			array(
				'location' => BROWSER_SHOTS_CAROUSEL_URL . 'src/nivo-slider-init.js',
			)
		);

		// Register Nivo Slider for front and backend.
		wp_register_style(
			'nivo-slider', // Handle.
			BROWSER_SHOTS_CAROUSEL_URL . 'src/nivo-slider.css',
			BROWSER_SHOTS_CAROUSEL_VERSION,
			'all' // Enqueue the script in the footer.
		);

		// Register Nivo Slider Theme.
		wp_register_style(
			'nivo-slider-theme-default', // Handle.
			BROWSER_SHOTS_CAROUSEL_URL . 'src/themes/default/default.css',
			array(),
			BROWSER_SHOTS_CAROUSEL_VERSION,
			'all' // Enqueue the script in the footer.
		);

		wp_set_script_translations( 'browser_shots_carousel', 'browser-shots-carousel' );

		// Register block editor styles for backend.
		wp_register_style(
			'browser_shots_carousel_editor', // Handle.
			plugins_url( 'dist/blocks.editor.build.css', dirname( dirname( __FILE__ ) ) ), // Block editor CSS.
			array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
			BROWSER_SHOTS_CAROUSEL_VERSION
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
				'style'           => array( 'browser_shots_carousel', 'fancybox' ),
				// Enqueue blocks.build.js in the editor only.
				'editor_script'   => array( 'browser_shots_carousel', 'nivo-slider', 'fancybox' ),
				// Enqueue blocks.editor.build.css in the editor only.
				'editor_style'    => array( 'browser_shots_carousel_editor', 'nivo-slider', 'nivo-slider-theme-default', 'fancybox' ),
				'attributes'      => array(
					'theme'        => array(
						'type'    => 'string',
						'default' => 'default',
					),
					'effect'       => array(
						'type'    => 'string',
						'default' => 'random',
					),
					'directionNav' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'controlNav'   => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'lightbox'     => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'slides'       => array(
						'type'    => 'array',
						'default' => array( '' ),
						'items'   => array(
							'type' => 'object',
						),
					),
					'html'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'width'        => array(
						'type'    => 'int',
						'default' => 1280,
					),
					'height'       => array(
						'type'    => 'int',
						'default' => 960,
					),
					'alt'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'link'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'target'       => array(
						'type'    => 'string',
						'default' => '',
					),
					'align'        => array(
						'type'    => 'string',
						'default' => 'center',
					),
					'classname'    => array(
						'type'    => 'string',
						'default' => '',
					),
					'rel'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'display_link' => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'image_size'   => array(
						'type'    => 'string',
						'default' => 'medium',
					),
					'content'      => array(
						'type'    => 'string',
						'default' => '',
					),
					'post_links'   => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'align'                  => array(
						'type'    => 'string',
						'default' => 'full',
					),
				),
				'render_callback' => array( $this, 'block_frontend' ),
			)
		);
	}


	/**
	 * Block front-end output.
	 *
	 * @since 2.7.0
	 * @see register_block
	 *
	 * @param array $attributes Array of passed shortcode attributes.
	 */
	public function block_frontend( $attributes ) {

		if ( is_admin() || defined( 'REST_REQUEST' ) ) {
			return;
		}
		ob_start();

		$args = array(
			'slides'       => $attributes['slides'],
			'theme'        => $attributes['theme'],
			'effect'       => $attributes['effect'],
			'lightbox'     => $attributes['lightbox'],
			'directionNav' => $attributes['directionNav'],
			'controlNav'   => $attributes['controlNav'],
			'width'        => absint( $attributes['width'] ),
			'height'       => absint( $attributes['height'] ),
			'target'       => sanitize_text_field( $attributes['target'] ),
			'class'        => sanitize_text_field( $attributes['classname'] ),
			'image_class'  => sanitize_text_field( isset( $attributes['align'] ) ? 'align' . $attributes['align'] : 'alignnone' ),
			'rel'          => sanitize_text_field( $attributes['rel'] ),
			'display_link' => (bool) $attributes['display_link'],
		);

		// Setup link and lightbox options.
		$show_link     = filter_var( $args['display_link'], FILTER_VALIDATE_BOOLEAN );
		$show_lightbox = filter_var( $args['lightbox'], FILTER_VALIDATE_BOOLEAN );

		wp_enqueue_script( 'nivo-slider' );
		if ( $show_lightbox ) {
			wp_enqueue_script( 'fancybox' );
		}
		wp_print_styles( 'nivo-slider' );
		wp_register_style(
			'nivo-slider-theme', // Handle.
			BROWSER_SHOTS_CAROUSEL_URL . 'src/themes/' . $args['theme'] . '/' . $args['theme'] . '.css',
			array(),
			BROWSER_SHOTS_CAROUSEL_VERSION,
			'all' // Enqueue the script in the footer.
		);
		wp_print_styles( 'nivo-slider-theme' );
		if ( $show_lightbox ) {
			wp_register_style(
				'fancybox', // Handle.
				BROWSER_SHOTS_CAROUSEL_URL . 'src/fancybox.css',
				array(),
				BROWSER_SHOTS_CAROUSEL_VERSION,
				'all' // Enqueue the script in the footer.
			);
			wp_print_styles( 'fancybox' );
		}

		// Set up direction nav and bullets.
		$direction_nav = filter_var( $args['directionNav'], FILTER_VALIDATE_BOOLEAN );
		if ( $direction_nav ) {
			$direction_nav = 'true';
		} else {
			$direction_nav = 'false';
		}
		$control_nav = filter_var( $args['controlNav'], FILTER_VALIDATE_BOOLEAN );
		if ( $control_nav ) {
			$control_nav = 'true';
		} else {
			$control_nav = 'false';
		}
		?>
		<div class="browser-shots-carousel-slider-wrapper theme-<?php echo esc_attr( $args['theme'] ); ?> <?php echo esc_attr( $args['image_class'] ); ?>" style="position: relative; width: <?php echo absint( $args['width'] ); ?>px; height: auto;">
			<div id="bsc-slideshow" class="nivoSlider">
				<?php
				foreach ( $args['slides'] as $slide ) {
					$img_url = sprintf(
						'https://s0.wordpress.com/mshots/v1/%s?w=1280&h=960',
						rawurlencode( $slide['title'] )
					);
					$href    = '';
					if ( $show_link ) {
						$href = empty( $slide['link'] ) ? $slide['title'] : $slide['link'];
					}
					if ( $show_lightbox ) {
						$href = $img_url;
					}
					?>
					<?php
					if ( $show_link || $show_lightbox ) :
						?>
						<a
						<?php
						if ( $show_lightbox ) :
							?>
							data-fancybox-trigger="gallery" data-fancybox="gallery" data-caption="<?php echo esc_attr( $slide['caption'] ); ?>" <?php endif; ?> href="<?php echo esc_url_raw( $href ); ?>" target="<?php echo esc_attr( $args['target'] ); ?>" rel="<?php echo esc_attr( $args['rel'] ); ?>">
						<?php
					endif;
					?>
					<img src='https://s0.wordpress.com/mshots/v1/<?php echo rawurlencode( $slide['title'] ); ?>?w=<?php echo absint( $args['width'] ); ?>&h=<?php echo absint( $args['height'] ); ?>' width="<?php echo absint( $args['width'] ); ?>" height="<?php echo absint( $args['height'] ); ?>" title="<?php echo esc_attr( $slide['caption'] ); ?>" />
					<?php
					if ( $show_link || $show_lightbox ) :
						?>
						</a>
						<?php
					endif;
				}
				?>
			</div>
		</div>
		<script>
			jQuery( document ).ready( function($ ) {
				jQuery( '#bsc-slideshow').nivoSlider({
					effect: '<?php echo esc_js( $args['effect'] ); ?>',
					directionNav: <?php echo esc_js( $direction_nav ); ?>,
					controlNav: <?php echo esc_js( $direction_nav ); ?>,
				} );
			} );
		</script>

		<?php
		return ob_get_clean();
	}

}

new Browser_Shots_Carousel();
