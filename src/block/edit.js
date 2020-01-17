/**
 * External dependencies
 */
import loadjs from 'loadjs';

const { Component, Fragment } = wp.element;

const { __, _x } = wp.i18n;

const {
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
	Toolbar,
	ToggleControl,
	Button,
	ButtonGroup,
	PanelRow,
	ExternalLink,
} = wp.components;

const {
	InspectorControls,
	BlockControls
} = wp.editor;

const {
	RichText
} = wp.blockEditor;


class Browser_Shots_Carousel extends Component {

	constructor() {

		super( ...arguments );

		this.state = {
			slides: this.props.attributes.slides || [''],
			directionNav: this.props.attributes.directionNav,
			controlNav: this.props.attributes.controlNav,
			lightbox: this.props.attributes.lightbox,
			align: this.props.attributes.align,
			welcome: true,
			version: '1',
			width: this.props.attributes.width,
			height: this.props.attributes.height,
			link: this.props.attributes.link,
			target: this.props.attributes.target,
			rel: this.props.attributes.rel,
			image_class: this.props.attributes.image_class,
			image_size: this.props.attributes.image_size,
			display_link: 'undefined' === typeof this.props.attributes.display_link ? true : this.props.attributes.display_link,
			preview: false,
			previewSlide: 0,
		};
		this.props.attributes.slides = this.state.slides;

	};



	/**
	 * Reload the image from the image server.
	 * This allows users to get rid of the 'generating screenshot' message.
	 */
	refresh = () => {

		const version = parseInt( this.state.version ) + 1;
		this.setState( { version } );

	};

	/**
	 * Return all slides in JSX format.
	 */
	showSlides = () => {
		return ( this.state.slides.map((el, i) =>
			<div key={i}>
				<div className="browser-shots-carousel-input-row" style={{position: 'relative'}}>
					<div>
						<label>{__( 'URL to Preview', 'browser-shots-carousel' )}
							<br />
							<input
								type="text"
								value={ undefined != this.props.attributes.slides[i] ? this.props.attributes.slides[i].title : ''}
								placeholder = "https://"
								onChange={this.handleChange.bind(this, i)}
							/>
						</label>
					</div>
					<div>
						<label>{__( 'Slide URL (Optional)', 'browser-shots-carousel' )}
							<br />
							<input
								type="text"
								value={ undefined != this.props.attributes.slides[i] ? this.props.attributes.slides[i].link : ''}
								placeholder = "https://"
								onChange={this.handleLinkChange.bind(this, i)}
							/>
						</label>
					</div>
					<div>
						<label>{__( 'Image Caption', 'browser-shots-carousel')}</label><br />
						<RichText
							tagName="div"
							className='wp-caption-text'
							placeholder={__( 'Write caption...', 'browser-shots' )}
							value={undefined != this.props.attributes.slides[i] ? this.props.attributes.slides[i].caption : ''}
							onChange={this.handleCaptionChange.bind(this, i)}
						/>
					</div>
					<div className="browser-shots-carousel-remove">
						<button class='button button-link-delete' value={__('Remove', 'browser-shots-carousel')} onClick={this.removeClick.bind(this, i)}>
							{__('Remove Slide', 'browser-shots-carousel')}
						</button>
						<button class='button button-secondary' value={__('Preview', 'browser-shots-carousel')} onClick={ ( event ) => { this.refresh.bind(this, i); this.previewImage(i) } }>
							{__('Preview Image', 'browser-shots-carousel')}
						</button>
					</div>
				</div>
			</div>
		) );
	}

	/**
	 * Add a new slide.
	 */
	addClick = () => {
		this.setState(prevState => ({ slides: [...prevState.slides, '']}));
	}

	/**
	 * Remove a Slide.
	 */
	removeClick(i){
		let slides = [...this.state.slides];
		slides.splice(i,1);
		this.props.setAttributes( { slides: slides } );
		this.setState({ slides });
	}

	/**
	 * Update the caption when it's changed.
	 */
	handleCaptionChange = (i, event) => {
		if ( undefined == event ) {
			return;
		}
		let slides = [...this.state.slides];
		if ( slides.length == 0 ) {
			return;
		}
		slides[i] = { link: slides[i].link || '', caption : event || '', title: slides[i].title || '' };
		this.props.setAttributes( { slides: slides } );
		this.setState({ slides });

	}

	/**
	 * Update the title when it's changed.
	 */
	handleChange = (i, event) => {
		if ( undefined == event ) {
			return;
		}
		let slides = [...this.state.slides];
		if ( slides.length == 0 ) {
			return;
		}
		slides[i] = { link: slides[i].link || '', title: event.target.value || '', caption: slides[i].caption || '' };
		this.props.setAttributes( { slides: slides } );
		this.setState({ slides });
	}

	/**
	 * Update the title when it's changed.
	 */
	handleLinkChange = (i, event) => {
		if ( undefined == event ) {
			return;
		}
		let slides = [...this.state.slides];
		if ( slides.length == 0 ) {
			return;
		}
		slides[i] = { link: event.target.value, title: slides[i].title || '', caption: slides[i].caption || '' };
		this.props.setAttributes( { slides: slides } );
		this.setState({ slides });
	}


	/**
	 * Create a preview image.
	 *
	 * This is a not a complete screenshot image as output by the shortcode. It
	 * simply has enough info to preview what will be output.
	 */
	createPreviewImage = () => {
		const { width, height, slides } = this.props.attributes;
		return ( slides.map((el, i) =>
				<img src={ 'https://s0.wordpress.com/mshots/v1/' + encodeURI( this.state.slides[i].title ) + `?w=${width}&h=${height}&version=${this.state.version}`} alt={`${this.props.attributes.alt}`} width={`${width}`} height={`${height}`} title={this.state.slides[i]['caption']} key={i} />
		 ) );
	};

	/**
	 * Show the current image in a lightbox.
	 */
	previewImage = (i) => {
		this.setState( {
			preview: true,
			previewSlide: i,
		} );
	}


	render() {
		const { attributes } = this.props;
		const { effect, align, directionNav, controlNav, lightbox, theme, width, height, alt, link, target, rel, image_size, content, display_link, post_links } = attributes;

		const relOptions = [
			{
				value: '',
				label: __( 'None', 'browser-shots' )
			},
			{
				value: 'nofollow',
				label: __( 'No Follow', 'browser-shots' )
			}
		];

		const themeOptions = [
			{ value: 'default', label: __( 'Default', 'browser-shots-carousel' ) },
			{ value: 'bar', label: __( 'Bar', 'browser-shots-carousel' ) },
			{ value: 'dark', label: __( 'Dark', 'browser-shots-carousel' ) },
			{ value: 'light', label: __( 'Light', 'browser-shots-carousel' ) },
		];

		const effectOptions = [
			{ value: 'sliceDown', label: __( 'Slide Down', 'browser-shots-carousel' ) },
			{ value: 'sliceDownLeft', label: __( 'Slide Down Left', 'browser-shots-carousel' ) },
			{ value: 'sliceUp', label: __( 'Slice Up', 'browser-shots-carousel' ) },
			{ value: 'sliceUpLeft', label: __( 'Slice Up Left', 'browser-shots-carousel' ) },
			{ value: 'sliceUpDown', label: __( 'Slice Up Down', 'browser-shots-carousel' ) },
			{ value: 'sliceUpDownLeft', label: __( 'Slice Up Down Left', 'browser-shots-carousel' ) },
			{ value: 'fold', label: __( 'Fold', 'browser-shots-carousel' ) },
			{ value: 'fade', label: __( 'Fade', 'browser-shots-carousel' ) },
			{ value: 'random', label: __( 'Random', 'browser-shots-carousel' ) },
			{ value: 'slideInRight', label: __( 'Slide In Right', 'browser-shots-carousel' ) },
			{ value: 'slideInLeft', label: __( 'Slide In Left', 'browser-shots-carousel' ) },
			{ value: 'boxRandom', label: __( 'Box Random', 'browser-shots-carousel' ) },
			{ value: 'boxRain', label: __( 'Box Rain', 'browser-shots-carousel' ) },
			{ value: 'boxRainGrow', label: __( 'Box Rain Grow', 'browser-shots-carousel' ) },
			{ value: 'boxRainGrowReverse', label: __( 'Box Rain Grow Reverse', 'browser-shots-carousel' ) },
		];

		const alignOptions = [
			{ value: 'left', label: __( 'Align Left', 'browser-shots-carousel' ) },
			{ value: 'center', label: __( 'Align Center', 'browser-shots-carousel' ) },
			{ value: 'right', label: __( 'Align Right', 'browser-shots-carousel' ) },
		];

		const resetSelect = [
			{
				icon: 'edit',
				title: __( 'Edit URL', 'browser-shots' ),
				onClick: () => this.setState( { welcome: true, preview: false } )
			},
			{
				icon: 'update',
				title: __( 'Refresh Image', 'browser-shots' ),
				onClick: ( e ) => this.refresh()
			}
		];

		const inspectorControls = (

			<InspectorControls>

				<PanelBody title={__( 'Browser Shots Settings', 'browser-shots' )}>
					{this.state.preview &&
						<Button
							className='button button-secondary'
							onClick={
								( e ) => {
									this.setState( {
										welcome: true,
										preview: false,
									});
								}
							}
						>
							{_x( 'Close Preview', 'Close preview image button text', 'browser-shots' )}
						</Button>
					}
					{!this.state.welcome &&
						<Button
							className='button button-secondary'
							onClick={
								( e ) => {
									this.setState( {
										welcome: true,
										preview: false,
									});
								}
							}
						>
							{_x( 'Close Preview', 'Close preview image button text', 'browser-shots' )}
						</Button>
					}
					<p>{__( 'Image Dimensions', 'browser-shots' )}</p>
					<PanelRow className="browser-shots-dimensions">
						<TextControl
							type="number"
							label={__( 'Width', 'browser-shots' )}
							value={width}
							min={100}
							max={1280}
							onChange={
								( value ) => {
									if ( value > 1280 ) {
										value = 1280;
									}
									this.props.setAttributes( { width: value, image_size: 'custom' } )
								}
							}
						/>
						<TextControl
							type="number"
							label={__( 'Height', 'browser-shots' )}
							value={height}
							min={100}
							max={960}
							onChange={
								( value ) => {
									if ( value > 960 ) {
										value = 960;
									}
									this.props.setAttributes( { height: value, image_size: 'custom' } )
								}
							}
						/>
					</PanelRow>

					<PanelRow className="browser-shots-dimensions-options">
						<ButtonGroup>
							<Button
								isDefault
								isPrimary={'small' == image_size ? true : false}
								onClick={
									( e ) => {
										this.props.setAttributes(
											{
												width: 320,
												height: 240,
												image_size: 'small',
											}
										);
									}
								}
							>
								{_x( 'S', 'Small Image Size', 'browser-shots' )}
							</Button>
							<Button
								isDefault
								isPrimary={'medium' == image_size ? true : false}
								onClick={
									( e ) => {
										this.props.setAttributes(
											{
												width: 640,
												height: 480,
												image_size: 'medium',
											}
										);
									}
								}
							>
								{_x( 'M', 'Medium Image Size', 'browser-shots' )}
							</Button>
							<Button
								isDefault
								isPrimary={'large' == image_size ? true : false}
								onClick={
									( e ) => {
										this.props.setAttributes(
											{
												width: 960,
												height: 720,
												image_size: 'large',
											}
										);
									}
								}
							>
								{_x( 'L', 'Large Image Size', 'browser-shots' )}
							</Button>
							<Button
								isDefault
								isPrimary={'full' == image_size ? true : false}
								onClick={
									( e ) => {
										this.props.setAttributes(
											{
												width: 1280,
												height: 960,
												image_size: 'full',
											}
										);
									}
								}
							>
								{_x( 'XL', 'Extra Large Image Size', 'browser-shots' )}
							</Button>
						</ButtonGroup>
						<Button
							isDefault
							onClick={
								( e ) => {
									this.props.setAttributes(
										{
											width: 600,
											height: 450,
											image_size: 'medium',
										}
									);
								}
							}
						>
							{_x( 'Reset', 'Reset Image Size to Default', 'browser-shots' )}
						</Button>
					</PanelRow>

					<Button
						onClick={( e ) => { this.refresh() }}
						isDefault
					>
						{__( 'Refresh Image', 'browser-shots' )}
					</Button>

				</PanelBody>

				<PanelBody title={__( 'Slider Settings', 'browser-shots' )} initialOpen={false}>
					<p><em>{__('This is previewed using the default theme with bullets and navigation available. You can change these on the front-end by adjusting your slider settings.', 'browser-shots-carousel' )}</em></p>
					<SelectControl
						label={ __( 'Theme', 'wp-plugin-info-card' ) }
						options={ themeOptions }
						value={ theme }
						onChange={ ( value ) => {
							this.props.setAttributes( { theme: value } );
							this.props.attributes.theme = value;
							this.setState( { theme: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Effect', 'wp-plugin-info-card' ) }
						options={ effectOptions }
						value={ effect }
						onChange={ ( value ) => {
							this.props.setAttributes( { effect: value } );
							this.props.attributes.effect = value;
							this.setState( { effect: value } );
						} }
					/>
					<SelectControl
						label={ __( 'Align', 'wp-plugin-info-card' ) }
						options={ alignOptions }
						value={ align }
						onChange={ ( value ) => {
							this.props.setAttributes( { align: value } );
							this.props.attributes.align = value;
							this.setState( { align: value } );
						} }
					/>
					<ToggleControl
						label={__( 'Allow Next/Prev Nav', 'browser-shots' )}
						onChange={
							( value ) => {
								this.props.setAttributes( { directionNav: value } );
								this.setState( { directionNav: value } );
							}
						}
						checked={this.state.directionNav}
					/>
					<ToggleControl
						label={__( 'Allow Bullets', 'browser-shots' )}
						onChange={
							( value ) => {
								this.props.setAttributes( { controlNav: value } );
								this.setState( { controlNav: value } );
							}
						}
						checked={this.state.controlNav}
					/>
					<ToggleControl
						label={__( 'Pop images in a lightbox', 'browser-shots' )}
						onChange={
							( value ) => {
								this.props.setAttributes( { lightbox: value } );
								this.setState( { lightbox: value } );
							}
						}
						checked={this.state.lightbox}
					/>
				</PanelBody>

				<PanelBody title={__( 'Link Settings', 'browser-shots' )} initialOpen={false}>

					<ToggleControl
						label={__( 'Use link', 'browser-shots' )}
						onChange={
							( display_link ) => {
								this.props.setAttributes( { display_link: display_link } );
								this.setState( { display_link: display_link } );
							}
						}
						checked={this.state.display_link}
					/>

					{this.state.display_link &&
						<Fragment>
							<ToggleControl
								label={__( 'Open in New Tab', 'browser-shots' )}
								onChange={
									( value ) => {
										let linkTarget = value ? '_blank' : 'none';
										this.props.setAttributes( { target: linkTarget } );
									}
								}
								checked={target === '_blank'}
							/>

							<ToggleControl
								label={__( 'Set Nofollow', 'browser-shots' )}
								onChange={
									( value ) => {
										let linkRel = value ? 'nofollow' : '';
										this.props.setAttributes( { rel: linkRel } );
									}
								}
								checked={rel === 'nofollow'}
							/>
						</Fragment>
					}

				</PanelBody>
			</InspectorControls>
		);

		return (

			<Fragment>
				{this.state.preview &&
					<Fragment>
						<BlockControls>
							<Toolbar controls={resetSelect} />
						</BlockControls>
						{inspectorControls}
						<div style={{backgroundImage: 'url(https://s0.wordpress.com/mshots/v1/' + encodeURI( this.state.slides[this.state.previewSlide].title ) + `?w=${width}&h=${height}&version=${this.state.version})`,backgroundSize: 'cover', width: '100%', minHeight: '100vh' }}>
							<button class='button button-primary' value={__('Close Preview', 'browser-shots-carousel')} onClick={ ( event ) => { this.setState( { welcome: true, preview: false } ); } }>
							{__('Close Preview', 'browser-shots-carousel')}
							</button>
						</div>
					</Fragment>
				}
				{this.state.welcome && !this.state.preview &&
					<Fragment>
						{inspectorControls}
						<div className="browsershots-block-carousel">
							<div className="browsershots-svg">
							<svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="none" rx="0" ry="0"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M19.4003 5.6001H4.60034V14.4001H19.4003V5.6001Z" fill="#ffffff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.50015 3.3999H20.5001C21.1101 3.3999 21.6001 3.8899 21.6001 4.4999V15.4999C21.6001 16.1099 21.1101 16.5999 20.5001 16.5999H14.0002V19.3999H17.0001C17.3301 19.3999 17.6001 19.6699 17.6001 19.9999C17.6001 20.3299 17.3301 20.5999 17.0001 20.5999H7.00015C6.67015 20.5999 6.40015 20.3299 6.40015 19.9999C6.40015 19.6699 6.67015 19.3999 7.00015 19.3999H10.0002V16.5999H3.50015C2.89015 16.5999 2.40015 16.1099 2.40015 15.4999V4.4999C2.40015 3.8899 2.89015 3.3999 3.50015 3.3999ZM3.60015 15.3999H20.4001V4.5999H3.60015V15.3999Z" fill="#000000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0001 19.3999H7.00015C6.67015 19.3999 6.40015 19.6699 6.40015 19.9999C6.40015 20.3299 6.67015 20.5999 7.00015 20.5999H17.0001C17.3301 20.5999 17.6001 20.3299 17.6001 19.9999C17.6001 19.6699 17.3301 19.3999 17.0001 19.3999Z" fill="black" fill-opacity="0.2"></path></svg>
							<h4>{__('Browser Shots Carousel', 'browser-shots-carousel')}</h4>
							</div>
							{this.showSlides()}
							<div className="browser-shots-carousel-actions">
								<a
									href="#"
									title={__( 'Add Slide', 'browser-shots-carousel' )}
									className="add-slide"
									onClick={
										( e ) => {
											e.preventDefault();
											this.addClick();
										}
									}
								>
									<span className="dashicons dashicons-plus"></span>
								</a><br />
								<button
									class="button button-primary" id="browsershots-input-preview"
									onClick={
										( e ) => {
											this.setState( { welcome: false } );
										}
									}
								>
									{__( 'Preview Slideshow', 'browser-shots-carousel' )}
								</button>
							</div>
						</div>
					</Fragment>
				}

				{!this.state.welcome &&

					<Fragment>
						{inspectorControls}
						<BlockControls>
							<Toolbar controls={resetSelect} />
						</BlockControls>
						<div
							className={'browser-shots-gutenberg-wrapper'}
							style={
								{
									overflow: 'hidden',
									maxWidth: '100%',
								}
							}
						>
							<div className="section slideshow">
								<div className="slider-wrapper theme-default">
									<div className="ribbon"></div>
									<div id="bsc-slideshow" className="nivoSlider">
										{this.createPreviewImage()}
										{loadjs(browser_shots_nivo.location, () => {})}
									</div>
								</div>
							</div>
						</div>
					</Fragment>
				}
			</Fragment>
		);
	}
}

export default Browser_Shots_Carousel;
