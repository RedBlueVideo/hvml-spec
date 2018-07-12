const sortBy = require('lodash/sortBy');

const elementOrder = [
	'hvml',
	'title',
	'video',
	'series',
	'group',
	'scale',
	'maturity',
	'verdict'
];

exports.elementOrder = elementOrder;

const sortElementPages = function sortElementPages( elementPages ) {
	let sorted = sortBy( elementPages, ( { node } ) => {
		let bareSlug = node.fields.slug.replace( /^\/elements\/([^/]+)\//i, '$1' );
		let index = elementOrder.indexOf( bareSlug );

		// console.log( `${bareSlug}: ${index}` );

		return index;
	} );

	return sorted;
};

exports.sortElementPages = sortElementPages;

const groupElementPages = function groupElementPages( elementPages ) {
	let grouped = groupBy( elementPages, ( { node } ) => {
		console.log( 'node.fields.slug', node.fields.slug );

		let matches = node.fields.slug.match( /^\/([^/]+)\/[^/]+\//i );

		// console.log( 'matches', matches );

		if ( matches ) {
			return matches[1];
		}

		return "root";
	} );

	return grouped;
};

exports.groupElementPages = groupElementPages;
