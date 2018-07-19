const sortBy = require('lodash/sortBy');
const groupBy = require('lodash/groupBy');

const pageOrder = [
	'/rationale/',
	'/elements/',
	'/elements/hvml/',
	'/elements/title/',
	'/elements/video/',
	'/elements/series/',
	'/elements/group/',
	'/elements/scale/',
	'/elements/rating/',
	'/elements/maturity/',
	'/elements/verdict/',
	'/glossary/'
];

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

const sortRootPages = function sortRootPages( rootPages ) {
	let sorted = sortBy( rootPages, ( { node } ) => {
		let bareSlug = node.fields.slug.replace( /^\/([^/]+)\//i, '$1' );
		let index = rootOrder.indexOf( bareSlug );

		// console.log( `${bareSlug}: ${index}` );

		return index;
	} );

	return sorted;
};

exports.sortRootPages = sortRootPages;

const sortPages = function sortPages( pages ) {
	let sorted = sortBy( pages, ( { node } ) => {
		let slug = node.fields.slug//.replace( /^\/([^/]+)\//i, '$1' );
		let index = pageOrder.indexOf( slug );

		// console.log( `${slug}: ${index}` );

		return index;
	} );

	return sorted;
};

exports.sortPages = sortPages;
