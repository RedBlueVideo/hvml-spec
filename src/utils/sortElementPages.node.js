let sortBy = require('lodash/sortBy');

let elementOrder = [
	'hvml',
	'title',
	'video',
	'group',
];

exports.elementOrder = elementOrder;

let sortElementPages = function sortElementPages( elementPages ) {
	return sortBy( elementPages, ( { node } ) => {
		let bareSlug = node.fields.slug.replace( /\/elements\/([^/]+)\//, '$1' );
		let index = elementOrder.indexOf( bareSlug );

		console.log( `${bareSlug}: ${index}` );

		return index;
	} );
}

exports.sortElementPages = sortElementPages;
