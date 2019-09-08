import Nav from "/dist/components/nav.js";

export default class TemplateWhite {

	#template = `
		<header></header>
		<content></content>
	`;

	constructor ( ) {
	
		console.log( "templates/white.js" );

		document.body.insertAdjacentHTML( "afterbegin", this.#template );

	}

	async init ( ) {

		return new Promise( async ( resolve ) => {
		
			let navigation = new Nav( );

			document.querySelector( "header" )
				.insertAdjacentHTML( 
					"afterbegin", 
					navigation.html
				);

			resolve( );

		} );

	}

}
