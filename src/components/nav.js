export default class Nav {

	#navigation = `
		<div>LINK 1</div>
	`;
	
	constructor ( ) {

		console.log( "components/nav.js" );

	}

	get html ( ) {
	
		return this.#navigation;

	}
}
