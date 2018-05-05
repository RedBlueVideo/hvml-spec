import sortBy from 'lodash/sortBy';

const elementOrder = [
	'hvml',
	'title',
	'video',
	'group',
];

const sortElementPages = function sortElementPages( elementPages ) {
	return sortBy( elementPages, ( { node } ) => {
		let bareSlug = node.fields.slug.replace( /\/elements\/([^/]+)\//, '$1' );
		let index = elementOrder.indexOf( bareSlug );

		console.log( `${bareSlug}: ${index}` );

		return index;
	} );
}

export default { elementOrder, sortElementPages };
