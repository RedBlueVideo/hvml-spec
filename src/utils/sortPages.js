import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';

const rootOrder = [
	'rationale',
	'elements',
	'glossary'
];

const elementOrder = [
	'hvml',
	'title',
	'video',
	'series',
	'group',
	'scale',
	'rating',
	'maturity',
	'verdict',
];

// @todo
// const sortPages = function sortPages( pageType, pages ) {};

const sortElementPages = function sortElementPages( elementPages ) {
	let sorted = sortBy( elementPages, ( { node } ) => {
		let bareSlug = node.fields.slug.replace( /^\/elements\/([^/]+)\//i, '$1' );
		let index = elementOrder.indexOf( bareSlug );

		// console.log( `${bareSlug}: ${index}` );

		return index;
	} );

	return sorted;
};

const groupElementPages = function groupElementPages( elementPages ) {
	let grouped = groupBy( elementPages, ( { node } ) => {
		// console.log( 'node.fields.slug', node.fields.slug );

		let matches = node.fields.slug.match( /^\/([^/]+)\/[^/]+\//i );

		// console.log( 'matches', matches );

		if ( matches ) {
			return matches[1];
		}

		return "root";
	} );

	return grouped;
};

const sortRootPages = function sortRootPages( rootPages ) {
	let sorted = sortBy( rootPages, ( { node } ) => {
		let bareSlug = node.fields.slug.replace( /^\/([^/]+)\//i, '$1' );
		let index = rootOrder.indexOf( bareSlug );

		// console.log( `${bareSlug}: ${index}` );

		return index;
	} );

	return sorted;
};

export default { elementOrder, sortElementPages, sortRootPages, groupElementPages };
