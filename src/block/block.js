/**
 * BLOCK: browser-shots-carousel
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import edit from './edit';


const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
const validAlignments = [ 'full' ];
registerBlockType( 'browser-shots/browser-shots-carousel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Browser Shots Carousel', 'browser-shots-carousel' ), // Block title.
	icon: <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="none" rx="0" ry="0"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M19.4003 5.6001H4.60034V14.4001H19.4003V5.6001Z" fill="#ffffff"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.50015 3.3999H20.5001C21.1101 3.3999 21.6001 3.8899 21.6001 4.4999V15.4999C21.6001 16.1099 21.1101 16.5999 20.5001 16.5999H14.0002V19.3999H17.0001C17.3301 19.3999 17.6001 19.6699 17.6001 19.9999C17.6001 20.3299 17.3301 20.5999 17.0001 20.5999H7.00015C6.67015 20.5999 6.40015 20.3299 6.40015 19.9999C6.40015 19.6699 6.67015 19.3999 7.00015 19.3999H10.0002V16.5999H3.50015C2.89015 16.5999 2.40015 16.1099 2.40015 15.4999V4.4999C2.40015 3.8899 2.89015 3.3999 3.50015 3.3999ZM3.60015 15.3999H20.4001V4.5999H3.60015V15.3999Z" fill="#000000"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.0001 19.3999H7.00015C6.67015 19.3999 6.40015 19.6699 6.40015 19.9999C6.40015 20.3299 6.67015 20.5999 7.00015 20.5999H17.0001C17.3301 20.5999 17.6001 20.3299 17.6001 19.9999C17.6001 19.6699 17.3301 19.3999 17.0001 19.3999Z" fill="black" fill-opacity="0.2"></path></svg>,
	category: 'embed', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Browser Shots', 'browser-shots-carousel' ),
		__( 'website', 'browser-shots-carousel' ),
		__( 'screenshot', 'browser-shots-carousel' ),
		__( 'slide', 'browser-shots-carousel' )
	],
	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},
	edit: edit,
	save() {
		return null;
	}
} );
